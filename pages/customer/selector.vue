<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="销售工单"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="_top">
			<u-search placeholder="请输入关键字" v-model="value" />
		</view>
		<view class="_list">
			<view class="customer u-flex" v-for="(value,index) in customers" :key="index" @click="toCreateOrder(value)">
				<u-image width="80rpx" height="80rpx" shape="circle" :src="value.url" />
				<view class="_info u-flex-col">
					<span>{{value.name}}</span>
					<span>{{value.address}}</span>
				</view>
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
				},
				value: '',
				customers: [{
					name: 'test',
					address: 'cswcmqh',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					name: 'test',
					address: 'cswcmqh',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}, {
					name: 'test',
					address: 'cswcmqh',
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
				}]
			}
		},
		methods: {
			toCreateOrder(data) {
				this.$store.commit('setCustomer',data)
				this.$u.route({
					type: 'navigateBack',
					url: 'pages/order/sale/create',
					delta: 1
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		._top {
			width: 100%;
			z-index: 1024;
			position: fixed;
			box-shadow: 0 1rpx 6px rgba(0, 0, 0, 0.1);
		}

		::v-deep .u-search {
			background: #ffffff;
			padding: 20rpx;
		}

		::v-deep .u-action {
			background: #39b54a;
			height: 60rpx;
			width: 110rpx;
			border-radius: 30rpx;
			padding: 8rpx;
			color: #FFFFFF;
		}

		._list {
			margin-top: 104rpx;

			.customer {
				background: #FFFFFF;
				padding: 10rpx;
				border-bottom: 1px solid #f3f3f3;

				._info {
					margin-left: 20rpx;
					color: $u-type-info;
				}
			}
		}
	}
</style>
