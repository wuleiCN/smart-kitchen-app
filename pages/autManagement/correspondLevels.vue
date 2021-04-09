<template>
	<view class="content" @click="closeIcon">
		<u-navbar :is-back="true" :title="title" title-color="#000000" :title-size="36">
			<view class="slot-wrap">
				<slot name="right">
					<view class="" @click.stop="operShow = !operShow">
						<u-icon name="plus" />
					</view>
				</slot>
			</view>
			<view class="operation" v-show="operShow">
				<view class="opt_ck" @click.stop="$u.route('pages/autManagement/role')">
					角色注册
				</view>
				<view class="opt_ck" @click.stop="$u.route('pages/autManagement/user')">
					用户注册
				</view>
			</view>
		</u-navbar>
		<u-subsection :list="list" :current="0" @change="sectionChange" font-size="36" active-color="#ffffff"
			inactive-color="#666666" />
		<view class="content_box" v-show="role" v-for="(item, index) in currentRoleList">
			<view class="avatar">
				<u-avatar />
			</view>
			<view class="text-area">
				<view class="cust_title">
					<view>{{item.Type}}</view>
					<!-- <button class="btn" @click.stop="$u.route('pages/customer/employees')">更新</button> -->
				</view>
				<view class="cust_centent">
					<view>角色代码：{{item.Code}}</view>
					<view>用户名称：{{item.Name}}</view>
				</view>
				<view class="cust_operation">
					<view class="creat_date">
						创建时间：{{item.RegistOn}}
					</view>
					<view class="btn">
						<button class="btn_cance" @click.stop="$u.route('pages/customer/employees')">注销</button>
						<button class="btn_updata" @click.stop="$u.route('pages/customer/employees')">更新</button>
					</view>
				</view>
			</view>
		</view>
		<view class="content_box" v-show="user" v-for="(item, index) in currentRoleList" :key="index">
			<view class="avatar">
				<u-avatar />
			</view>
			<view class="text-area">
				<view class="cust_title">
					<view>我是单位名称</view>
					<!-- <button class="btn" @click.stop="$u.route('pages/customer/employees')">更新</button> -->
				</view>
				<view class="cust_centent">
					<view>所属组织ID：1001011</view>
					<view>用户名称：张三</view>
				</view>
				<view class="cust_operation">
					<view class="creat_date">
						创建时间：2021-03-21
					</view>
					<view class="btn">
						<button class="btn_cance" @click.stop="$u.route('pages/customer/employees')">注销</button>
						<button class="btn_updata" @click.stop="$u.route('pages/customer/employees')">更新</button>
					</view>
				</view>
			</view>
		</view>
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
				title: '本级权限管理',
				warning: [],
				operShow: false,
				currentRoleList: [],
				role: true,
				user: false,
				list: [{
						name: '角色管理'
					},
					{
						name: '用户管理'
					}
				],
				curNow: 0
			}
		},
		onLoad() {
		},
		onShow() {
			this.getCurrentRoleList()
			this.operShow = false
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
			// 获取角色列表
			getCurrentRoleList() {
				this.$u.api.getCurrentRoleList().then(res => {
					this.currentRoleList = res.data
					this.currentRoleList.map((v, i) => {
						v.RegistOn = this.$u.timeFormat(res.data.RegistOn,'yyyy-mm-dd')
						this.getCompanyById(v, i)
					})
					if (!res.success) this.$u.toast(res.message)
					console.log(this.currentRoleList);
				}).catch(err => {
					console.log(err);
				})
			},
			// 获取指定单位
			getCompanyById(v, i) {
				this.$u.api.getCompanyFind({id: v.OrgId}).then(res => {
					v.Type = res.data.Name
					console.log(v,res);
				})
			},
			sectionChange(index) {
				this.curNow = index;
				this.role = !this.role;
				this.user = !this.user
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

		.u-subsection {
			width: 480rpx;
			height: 72rpx !important;
			background: #FFFFFF !important;
			border-radius: 36rpx !important;
			padding: 0 !important;
			margin-top: 24rpx;
			margin-left: 50%;
			transform: translateX(-50%);

			.u-item {
				padding: 0 !important;
			}

			::v-deep .u-item-bg {
				border-radius: 36rpx !important;
				background: #FC7930 !important;
				height: 36px !important;
				bottom: 0 !important;
			}
		}

		.content_box {
			display: flex;
			width: 702rpx;
			height: 240rpx;
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
					justify-content: space-between;
					align-items: center;
					border-top: 2rpx solid #F5F5F5;

					.btn {
						display: flex;
						align-items: center;
						height: 72rpx;
						color: #ffffff;

						.btn_cance {
							color: #FFFFFF;
							line-height: 36rpx;
							width: 88rpx;
							height: 36rpx;
							font-size: 24rpx;
							margin-left: 12rpx;
							padding: 0;
							background: #CCCCCC;
							border-radius: 6px;
						}

						.btn_updata {
							color: #FFFFFF;
							font-size: 24rpx;
							line-height: 36rpx;
							width: 88rpx;
							height: 36rpx;
							margin-left: 12rpx;
							padding: 0;
							border-radius: 6px;
							background: #FC7930;
						}
					}
				}
			}
		}

		.slot-wrap {
			display: flex;
			align-items: center;
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
			top: 44px;
			right: 15px;
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
