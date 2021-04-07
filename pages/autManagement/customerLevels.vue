<template>
	<view class="content">
		<u-navbar :is-back="true" :title="title" title-color="#000000" :title-size="36" />
		<u-subsection :list="list" :current="1" @change="sectionChange" />
		<view class="text-area" v-for="item in form" :key="item">
			<view class="cust_title">
				<view>我是单位名称我是单位名称</view>
				<button class="btn" @click.stop="$u.route('pages/customer/employees')">更新</button>
			</view>
			<view class="cust_centent">
				<view>公司法人：张三</view>
				<view>公司系统管理员姓名：李四</view>
				<view>公司系统管理员联系电话：1234567890</view>
			</view>
		</view>
		<view class="operation" v-show="operShow = !operShow">
			<view class="opt_ck" @click.stop="$u.route('pages/customer/register')">
				角色注册
			</view>
			<view class="opt_ck" @click.stop="$u.route('pages/customer/register')">
				用户注册
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
				title: '本级权限管理管理',
				warning: [],
				operShow: false,
				form: 3
				list: [
					{
						name: '角色管理'
					},
					{
						name: '角色管理'
					}
				],
				curNow: 0
			}
		},
		mounted() {
			console.log(this.warning, this.vuex_tabbar)
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
			sectionChange(index) {
				this.curNow = index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.text-area {
			width: 702rpx;
			height: 240rpx;
			background: #FFFFFF;
			border: 1rpx solid #FFFFFF;
			border-radius: 20rpx;
			padding: 24rpx;
			margin-top: 24rpx;
			margin-left: 50%;
			transform: translateX(-50%);

			.cust_title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-weight: 600;
				height: 39rpx;
				padding: 24rpx 0;

				.btn {
					background: #FC7930;
					height: 32rpx;
					border-radius: 6rpx;
					font-size: 24rpx;
					line-height: 32rpx;
					color: #ffffff;
					margin: 0;
				}

			}

			.cust_centent {
				padding: 23rpx 0;
				border-top: 1rpx solid #F5F5F5;
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
			top: 44px;
			right: 15px;

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
