<template>
	<view class="content" @click="closeIcon()">
		<u-navbar :is-back="back" :title="title" title-color="#000000" :title-size="36">
			<view class="slot-wrap" :class="{slotSearch: solt}">
				<slot name="right" v-if="icon">
					<u-icon name="search" @click="searchCK" />
					<view class="" @click.stop="operShow = !operShow">
						<u-icon name="plus" />
					</view>
				</slot>
				<view class="search-wrap" v-if="search">
					<u-search v-model="keyword" height="56" :action-style="{color: '#fff'}" :show-action="true"
						action-text="返回" @blur="searchFn()" @custom="searchBK()" />
				</view>
			</view>
			<view class="operation" v-show="operShow">
				<view class="opt_ck" @click.stop="$u.route('pages/device/deviceScan')">
					设备入库
				</view>
			</view>
		</u-navbar>
		<view v-show="deviceListShow">
			<view class="content_box" v-for="(item, index) in deviceList" :key="index">
				<!-- <view class="avatar">
					<u-avatar :src="item.Avatar" />
				</view> -->
				<view class="text-area">
					<view class="cust_title">
						<view>{{item.company}}</view>
					</view>
					<view class="cust_centent">
						<view>设备序列号：{{item.SerialNo}}</view>
						<view>设备名称：{{item.Name}}</view>
						<view>下次维保时间：{{item.NextMaintAt}}</view>
					</view>
					<view class="cust_operation">
						<view class="btn_box">
							<button class="btn_cance btn" @click.stop="toCancelDevice(item.Id)">注销</button>
							<button class="btn_loss btn" @click.stop="toLossDevice(item.Id)">报损</button>
							<button class="btn_updata btn"
								@click.stop="toUpdataDevice(item.Id,item.CustomerId,item.Model)">更新</button>
						</view>
					</view>
				</view>
			</view>
			<u-empty mode="list" v-if="!deviceList.length" />
			<u-loadmore :status="status" />
		</view>
		<view v-show="dataListShow">
			<view class="content_box" v-for="(item, index) in searchList" :key="index">
				<view class="avatar">
					<u-avatar :src="item.Avatar" />
				</view>
				<view class="text-area">
					<view class="cust_title">
						<view>{{item.company}}</view>
					</view>
					<view class="cust_centent">
						<view>设备序列号：{{item.SerialNo}}</view>
						<view>设备名称：{{item.Name}}</view>
						<view>下次维保时间：{{item.NextMaintAt}}</view>
					</view>
					<view class="cust_operation">
						<view class="btn_box">
							<button class="btn_cance btn" @click.stop="toCancelDevice(item.Id)">注销</button>
							<button class="btn_loss btn" @click.stop="toLossDevice(item.Id)">报损</button>
							<button class="btn_updata btn"
								@click.stop="toUpdataDevice(item.Id,item.CustomerId,item.Model)">更新</button>
						</view>
					</view>
				</view>
			</view>
			<u-empty mode="search" v-if="!searchList.length" />
		</view>
		<u-modal v-model="cancel" content="确定要注销吗？" title="提示" show-cancel-button @confirm="signHandle" />
		<u-modal v-model="uCancel" content="确定要报损吗？" title="提示" show-cancel-button @confirm="lossHandle" />
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
				title: '设备管理',
				userId: uni.getStorageSync('userInfo').OrgId,
				companyList: [],
				optionId: null,
				warning: [],
				deviceList: [],
				searchList: [],
				status: 'nomore',
				page: 1,
				pageSize: 10,
				uCancel: false,
				cancel: false,
				operShow: false,
				search: false,
				icon: true,
				back: true,
				solt: false,
				dataListShow: false,
				keyword: '',
				deviceListShow: false
			}
		},
		onLoad() {

		},
		onShow() {
			this.operShow = false;
		},
		mounted() {
			this.$u.api.getCompanyList().then(e => {
				if (e.success) {
					this.companyList = e.data
					return e.data
				}
				console.log(e);
			}).then(c => {
				this.$u.api.deviceCompanyGetpagedall({
					company: this.userId,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					if (res.success) {
						this.deviceList = res.data.rows
						this.deviceList.map((v, i) => {
							v.NextMaintAt && (v.NextMaintAt = v.NextMaintAt.slice(0, 10))
							v.company = c.find(s => v.CompanyId === s.Id).Name
						})
						this.deviceListShow = true
					}
					else {
						this.$u.toast(res.message)
					}
					console.log(res);
				}).catch(err => {
					this.$u.toast(err.message)
				})
			})
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
			// 分页获取设备信息
			onReachBottom() {
				var nomorn = false
				if (nomorn === true) return;
				this.status = 'loading';
				this.page = ++this.page;
				this.$u.api.deviceCompanyGetpagedall({
					company: this.userId,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					if (res.success) {
						res.data.rows.map((v, i) => {
							v.NextMaintAt && (v.NextMaintAt = v.NextMaintAt.slice(0, 10))
							v.company = this.companyList.find(s => v.CompanyId === s.Id).Name
						})
						this.deviceList = this.deviceList.concat(res.data.rows)
						if (res.data.rows.length < 10) {
							this.status = 'nomore'
							nomorn = false
						} else this.status = 'loading'
					}
					console.log(res, this.deviceList);
				})
			},
			toCancelDevice(id) {
				this.cancel = true
				this.optionId = id
				console.log('cancel==>', id);
			},
			toUpdataDevice(id, cId, mId) {
				this.$u.api.getModelFindById({
					id: mId
				}).then(res => {
					console.log(res.data.Type);
					switch (res.data.Type) {
						case 1:
							this.$u.route('pages/device/updataDevice/updataAlarm', {
								id,
								cId
							});
							break;
						case 2:
							this.$u.route('pages/device/updataDevice/updataFire', {
								id,
								cId
							});
							break;
						case 3:
							this.$u.route('pages/device/updataDevice/updataGas', {
								id,
								cId
							});
							break;
						case 4:
							this.$u.route('pages/device/updataDevice/updataNvr', {
								id,
								cId
							});
							break;
						case 5:
							this.$u.route('pages/device/updataDevice/updataIpc', {
								id,
								cId
							});
							break;
						case 7:
							this.$u.route('pages/device/updataDevice/updataDtu', {
								id,
								cId
							});
							break;
						case 8:
							this.$u.route('pages/device/updataDevice/updataGateway', {
								id,
								cId
							});
							break;
					}
				})
			},
			toLossDevice(id) {
				this.uCancel = true
				this.optionId = id
			},
			// 搜索回调
			searchFn() {
				this.$u.api.getSearchbyName({
					name: this.keyword
				}).then(res => {
					this.searchList = res.data
					this.searchList.map((v, i) => {
						v.NextMaintAt && (v.NextMaintAt = v.NextMaintAt.slice(0, 10))
						v.company = this.companyList.find(s => v.CompanyId === s.Id).Name
					})
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
				console.log(this.keyword);
			},
			searchCK() {
				this.search = true,
					this.icon = false,
					this.back = false,
					this.solt = true,
					this.dataListShow = true,
					this.deviceListShow = false,
					this.title = ''
			},
			// 搜索返回
			searchBK() {
				this.search = false,
					this.icon = true,
					this.back = true,
					this.solt = false,
					this.dataListShow = false,
					this.deviceListShow = true,
					this.title = '客户管理',
					this.keyword = '',
					this.searchList = []
			},
			signHandle() {
				this.$u.api.deviceDestroy({
					id: this.optionId
				}).then(res => {
					if (res.success) this.$u.toast('设备注销成功！')
					else this.$u.toast(res.message)
					console.log(res);
				}).catch(err => {
					this.$u.toast('设备注销失败！')
				})
			},
			lossHandle() {
				this.$u.api.deviceLoss({
					id: this.optionId
				}).then(res => {
					if (res.success) this.$u.toast('设备报损成功！')
					else this.$u.toast(res.message)
					console.log(res);
				}).catch(err => {
					this.$u.toast('设备报损失败！')
				})
			},
			closeIcon() {
				this.operShow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;

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

				// &:nth-child(1) {
				// 	border-bottom: 1px solid #F5F5F5;
				// }
			}
		}
	}

	.slotSearch {
		width: 100% !important;
		margin-left: 12px;
	}
</style>
