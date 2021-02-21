<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="员工信息"
		 :title-width="300" title-color="#ffffff" :background="background" />
	<!-- 	<u-swipe-action v-for="(item, index) in list" :key="index" @content-click="toDetail(item)"> -->
			<view class="item u-border-bottom" v-for="(item, index) in list" :key="index" @click="toDetail(item)">
				<image mode="aspectFill" shape="circle" src="@/static/tabbar/user2.png" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<view class="name">{{ item.Name }}</view>
					<!-- <view class="title u-line-2">{{ item.Gender === 1 ? '男' : '女'}}</view> -->
					<view class="time">{{ item.Phone }}</view>
					<span>详情>></span>
				</view>
			</view>
		<!-- </u-swipe-action> -->
		<u-empty v-if="!list.length" text="列表为空" mode="list" />
		<Modal />
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import Modal from "@/pages/components/modal.vue"
	export default {
		components: {
			Modal
		},
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				list: [],
				disabled: false,
				btnWidth: 180,
				show: false
			};
		},
		onLoad() {
			this.$u.api.getEmployees().then(res => {
				this.list = res
				console.log(res)
			}).catch(err => {
				uni.showToast({
					icon: 'none',
					title: '获取数据失败！'
				})
			})
		},
		computed: {
			...mapState(['vuex_token'])
		},
		methods: {
			toDetail(e) {
				setTimeout(() => {
					this.$u.route('pages/customer/detail', {
						list: JSON.stringify(e)
					});
				}, 300);
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		.item {
			display: flex;
			padding: 20rpx;
		}

		image {
			width: 100rpx;
			flex: 0 0 100rpx;
			height: 100rpx;
			margin-right: 20rpx;
			border-radius: 12rpx;
		}

		.title-wrap {
			width: 100%;

			.name {
				font-size: 28rpx;
				color: $u-type-info;
			}

			.title {
				text-align: left;
				font-size: 24rpx;
				color: $u-type-info-dark;
				margin-top: 10rpx;
			}

			.time {
				font-size: 24rpx;
				color: $u-tips-color;
				margin-top: 10px;
			}

			span {
				position: absolute;
				top: 50%;
				right: 40rpx;
				font-size: 24rpx;
				color: $u-type-info-dark;
			}
		}

		._none {
			height: 200rpx;
			background: #ffffff;
			text-align: center;

			p {
				transform: translateY(90rpx);
			}
		}
	}
</style>
