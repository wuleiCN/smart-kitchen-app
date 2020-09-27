<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="销售工单"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<scroll-view class="product" show-scrollbar :scroll-y="true" :lower-threshold="5" @scrolltolower="toLowFun">
			<view class="order">
				<view class="customer">
					<span><strong>客户名称：</strong>test01</span>
					<span><strong>销售时间：</strong>{{new Date().getTime() | date}}</span>
					<span><strong>派单人：</strong>test</span>
				</view>
				<view class="operation">
					<span>
						<u-button type="success" plain @click="toProduct">施工</u-button>
					</span>
					<span>
						<u-button type="warning" plain ripple>回单</u-button>
					</span>
					<span>
						<u-button type="error" plain ripple>退单</u-button>
					</span>
					<span>
						<u-button plain>详情</u-button>
					</span>
				</view>
			</view>
			<u-loadmore :status="status" />
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				status: 'loadmore',
			}
		},
		methods: {
			toProduct() {
				this.$u.route('pages/order/install/install', {
					id: 123
				})
			},
			toLowFun() {
				this.$u.throttle(this.load, 2000)
			},
			load() {
				this.status = 'loading';
				setTimeout(() => {
					this.status = 'nomore';
				}, 2000)
				console.log("触底事件");
			},
		}
	}
</script>

<style scoped lang="scss">
	.product {
		.order {
			height: 270rpx;
			background: #FFFFFF;

			.customer {
				display: flex;
				flex-direction: column;
				padding: 15px 0 0 15px;
				justify-content: center;

				span {
					margin-bottom: 5px;
					color: #666666;
				}
			}

			.operation {
				display: flex;
				justify-content: flex-end;

				::v-deep .u-btn {
					width: 116rpx;
					height: 64rpx;
					margin-right: 20rpx;
				}
			}
		}
	}
</style>
