<template>
	<view class="content">
		<u-navbar :is-back="true" :title="title" title-color="#000000" :title-size="36" />
		<view>
			<view class="type">
				<u-input v-model="warnName" :select-open="warnShow" border type="select" placeholder="选择消息类别"
					@click="warnShow=true" />
			</view>
			<view class="content_box" v-for="(item, index) in messageList" :key="index">
				<view class="text-area">
					<view class="cust_title">
						<view>{{item.companyName}}</view>
					</view>
					<view class="cust_centent">
						<view class="u-col-line">报警信息：{{item.Content}}</view>
						<view>处置：{{item.ProcessMessage}}</view>
						<view>发布时间：{{item.HappendOn}}</view>
					</view>
					<view class="cust_operation">
						<view class="btn_box">
							<button class="btn_updata btn" :class="{disableded: item.Status === 3}"
								:disabled="item.Status === 3" @click.stop="resetAlarm(item.Id)">复位</button>
							<button class="btn_loss btn" :class="{disableded: item.Status === 2}"
								:disabled="item.Status === 2" @click.stop="executeAlarm(item.Id)">处置</button>
							<button class="btn_cance btn" @click.stop="toAlarmDetail(item.Id)">详情</button>
						</view>
					</view>
				</view>
			</view>
			<view class="content_box" v-for="(item, i) in faceList" :key="i+'a'">
				<view class="text-area">
					<view class="cust_title">
						<view>湖南精安消防科技有限公司</view>
					</view>
					<view class="cust_centent">
						<view class="u-col-line">报警信息：{{item.Content}}</view>
						<view>网络摄像机：{{item.Camera}}</view>
						<view>发布时间：{{item.HappendOn}}</view>
					</view>
					<view class="cust_operation">
						<view class="btn_box">
							<button class="btn_updata btn" :class="{disableded: item.Status === 3}"
								:disabled="item.Status === null" @click.stop="resetAlarm(item.id)">复位</button>
							<button class="btn_loss btn" :class="{disableded: item.Status === 2}"
								:disabled="item.Status === null" @click.stop="executeAlarm(item.id)">处置</button>
							<button class="btn_cance btn" @click.stop="toFaceDetail(item.Id)">详情</button>
						</view>
					</view>
				</view>
			</view>
			<u-empty mode="list" v-if="!messageList.length && !faceList.length" />
			<u-loadmore :status="status" />
		</view>
		<u-modal v-model="cancel" title="报警设备复位" show-cancel-button @confirm="signHandle" @cancel="reset.ProcessMessage=''">
			<view class="slot-content">
				<u-input v-model="reset.ProcessMessage" type="textarea" focus border />
			</view>
		</u-modal>
		<u-modal v-model="uCancel" title="报警设备处置" show-cancel-button @confirm="lossHandle" @cancel="execute.ProcessMessage=''">
			<view class="slot-content">
				<u-input v-model="execute.ProcessMessage" type="textarea" focus border />
			</view>
		</u-modal>
		<u-select mode="single-column" v-model="warnShow" :list="warnList" value-name="value" label-name="name"
			@confirm="confirmSelected" />
		<Modal />
	</view>
</template>

<script>
	// import {
	// 	mapState
	// } from "vuex"
	import Modal from "../components/modal.vue"
	export default {
		components: {
			Modal
		},
		data() {
			return {
				title: '报警管理',
				warnName: '',
				warnShow: false,
				userId: uni.getStorageSync('userInfo').OrgId,
				warning: [],
				warnList: [{
						name: '所有消息',
						value: 0
					},
					{
						name: '火灾',
						value: 1
					},
					{
						name: '燃气泄漏',
						value: 2
					},
					{
						name: '人脸消息',
						value: 3
					}
				],
				messageList: [],
				faceList: [],
				fireList: [],
				GasList: [],
				execute: {
					Id: null,
					ProcessMessage: ''
				},
				reset: {
					Id: null,
					ProcessMessage: ''
				},
				cancel: false,
				uCancel: false,
				status: 'nomore'
			}
		},
		onLoad() {

		},
		mounted() {
			this.getAlarmUnreadAll()
			this.getFaceListAll()
		},
		watch: {
			'$store.state.vuex_popupShow': {
				handler() {
					this.warning = uni.getStorageSync('warnInfo')
				},
				immediate: true
			}
		},
		computed: {

		},
		methods: {
			// 获得当前用户未读取报警消息
			async getAlarmUnreadAll() {
				const res = await this.$u.api.alarmUnreadAll()
				console.log(res);
				if (res.success) {
					res.data.map(v => {
						v.HappendOn = v.HappendOn.slice(0, 10)
					})
					this.$u.dictionary.getCompanyListFc().then(cb => {
						res.data.forEach(v => {
							v.companyName = cb.find(e => e.Id = v.Company).Name;
						})
						this.messageList = res.data
						this.messageList.map(e => {
							if (e.AlarmType == 1) this.fireList.push(e)
						})
						this.messageList.find(e => {
							if (e.AlarmType == 2) this.GasList.push(e)
						})
					})
				}
			},
			// 获得当前用户火灾未读取报警消息
			async getUnreadAll() {
				const res = await this.$u.api.alarmUnreadAll()
				console.log(res);
				if (res.success) {
					this.$u.dictionary.getCompanyListFc().then(cb => {
						res.data.forEach(v => {
							v.companyName = cb.find(e => e.Id == v.Company).Name;
							v.HappendOn = v.HappendOn.slice(0, 10)
						})
						this.messageList = res.data
					})
				}
			},
			// 获得当前用户人脸未读取报警消息
			async getFaceListAll() {
				const res = await this.$u.api.faceList()
				console.log(res);
				if (res.success) {
					res.data.forEach(v => {
						v.Camera = ''
						this.$u.api.getIpcById({
							id: v.CameraId
						}).then(e => v.Camera = e.data.Name)
						v.HappendOn = v.HappendOn.slice(0, 10)
					})
				}
				this.faceList = res.data
			},
			// 获得当前用户燃气泄漏未读取报警消息
			async getAlarmAll() {
				const res = await this.$u.api.alarmUnreadAll()
				console.log(res);
				if (res.success) {
					res.data.map(v => {
						v.HappendOn = v.HappendOn.slice(0, 10)
					})
					this.$u.dictionary.getCompanyListFc().then(cb => {
						res.data.forEach(v => {
							v.companyName = cb.find(e => e.Id = v.Company).Name;
						})
						this.messageList = res.data
					})
				}
			},
			// 消息详情
			toAlarmDetail(id) {
				this.$u.route('pages/message/Detail', {
					id
				})
			},
			resetAlarm(id) {
				this.cancel = true
				this.reset.Id = id
			},
			executeAlarm(id) {
				this.uCancel = true
				this.execute.Id = id
			},
			// 人脸消息详情
			toFaceDetail(id) {
				this.$u.route('pages/message/Face', {
					id
				})
			},
			signHandle() {
				this.$u.api.processReset(this.reset).then(res => {
					if (res.success) this.$u.toast('设备复位成功！')
					else this.$u.toast(res.message)
					this.reset.ProcessMessage = ''
					console.log(res);
				}).catch(err => {
					this.$u.toast('设备注销失败！')
				})
			},
			lossHandle() {
				this.$u.api.processExecute(this.execute).then(res => {
					if (res.success) this.$u.toast('设备处置成功！')
					else this.$u.toast(res.message)
					this.execute.ProcessMessage = ''
					console.log(res);
				}).catch(err => {
					this.$u.toast('设备报损失败！')
				})
			},
			confirmSelected(e) {
				this.warnName = '';
				e.map((val, index) => {
					this.warnName = val.label;
					if (val.value === 0) {
						this.getAlarmUnreadAll()
						this.getFaceListAll()
					}
					switch (val.value) {
						case 0:
							this.getAlarmUnreadAll()
							this.getFaceListAll()
							break;
						case 1:
							this.faceList = []
							this.messageList = []
							this.messageList = this.fireList
							console.log(this.fireList);
							break;
						case 2:
							this.faceList = []
							this.messageList = this.GasList
							// this.messageList = this.GasList
							console.log(this.fireList, this.messageList);
							break;
						case 3:
							this.messageList = []
							this.getFaceListAll()
							break;
					}
				})
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;
		margin-top: 68rpx;
		.type {
			width: 100%;
			// height: 120rpx;
			position: fixed;
			top: 138rpx;
			background: #FFFFFF;
			z-index: 99;
			.u-input {
				border-top: 0;
				border-radius: 0 0 10px 10px;
			}
		}

		.content_box {
			display: flex;
			width: 702rpx;
			height: 270rpx;
			background: #FFFFFF;
			border: 1rpx solid #FFFFFF;
			border-radius: 20rpx;
			padding: 24rpx;
			margin-top: 24rpx;
			margin-left: 50%;
			transform: translateX(-50%);

			.avatar {
				width: 86rpx;
			}

			.text-area {
				width: 604rpx;
				padding: 0 0 0 12px;

				.cust_title {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-weight: 600;
					height: 39rpx;
					padding: 24rpx 0;

				}

				.cust_centent {
					padding-bottom: 12rpx;
				}

				.cust_operation {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					border-top: 2rpx solid #F5F5F5;

					.btn_box {
						display: flex;
						align-items: center;
						height: 72rpx;

						.btn {
							color: #ffffff;
							line-height: 36rpx;
							width: 88rpx;
							height: 36rpx;
							font-size: 24rpx;
							margin-left: 12rpx;
							padding: 0;
							border-radius: 6px;
						}

						.btn_cance {
							background: #CCCCCC;
						}

						.btn_updata {
							background: #FC7930;
						}

						.btn_loss {
							background: #ff0000;
						}
					}
				}
			}
		}

		.slot-wrap {
			display: flex;
			align-items: center;

			.search-wrap {
				margin: 0 20rpx;
				flex: 1;

				::v-deep .u-action {
					background: #f3f3f3;
					color: #000000 !important;
					height: 28px;
					line-height: 28px;
					border-radius: 5px;
				}
			}
		}

		::v-deep .u-slot-content {
			justify-content: flex-end;
			margin-right: 24rpx;
			font-size: 36rpx;

			.u-icon {
				padding: 10rpx;
			}
		}

		.slot-content {
			width: 100%;
			padding: 30rpx;
		}

		.operation {
			position: absolute;
			width: 200rpx;
			// height: 156rpx;
			font-size: 28rpx;
			background: #FFFFFF;
			box-shadow: 1rpx 1rpx 6rpx 0rpx rgba(151, 151, 151, 0.27);
			border-radius: 10rpx;
			top: 88rpx;
			right: 30rpx;
			z-index: 999;

			.opt_ck {
				height: 78rpx;
				color: #000000;
				text-align: center;
				line-height: 78rpx;
			}
		}
	}

	.u-load-more-wrap {
		margin-top: 20rpx !important;
	}

	.disableded {
		opacity: .5;
	}

	.slotSearch {
		width: 100% !important;
		margin-left: 12px;
	}
</style>
