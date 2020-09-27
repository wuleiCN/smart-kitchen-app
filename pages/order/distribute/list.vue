<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="销售工单"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="order">
			<view class="_info">
				<u-image src="/static/devices/device.png" width="120rpx" height="120rpx" shape="circle" />
				<view class="customer">
					<span>test</span>
					<span>销售时间：{{new Date().getTime() | date}}</span>
					<span>接单时间：{{new Date().getTime() | date}}</span>
				</view>
			</view>
			<view class="operation">
				<span>
					<u-button type="success" plain ripple @click="toProduct">出库</u-button>
				</span>
				<span>
					<u-button type="warning" plain ripple>退单</u-button>
				</span>
				<span>
					<u-button plain ripple>查看</u-button>
				</span>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				}
			}
		},
		methods: {
			toProduct() {
				this.$u.route('pages/order/distribute/distribute', {
					id: 123
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.order {
		height: 270rpx;
		background: #FFFFFF;

		._info {
			display: flex;
			padding: 20rpx;

			.customer {
				display: flex;
				flex-direction: column;
				margin-left: 10px;
				justify-content: center;

				span {
					margin-bottom: 5px;

					&:nth-child(1) {
						font-weight: 600;
						color: #000000 !important;
					}

					&:nth-child(n-1) {
						color: $u-tips-color;
					}
				}
			}
		}

		.operation {
			display: flex;
			justify-content: flex-end;

			::v-deep .u-btn {
				width: 160rpx;
				height: 64rpx;
				margin-right: 30rpx;
			}
		}
	}

	.add {
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
