<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="警告信息"
		 :title-width="300" title-color="#ffffff" :background="background" />
<!-- 		<view v-if="list.length === 0" class="_none">
			<p>暂无数据~</p>
		</view> -->
		<u-swipe-action v-for="(item, index) in list" :key="index" @content-click="toDetail">
			<view class="item u-border-bottom" :class="{success:item.Type < 3,error: item.Type === 3}">
				<image mode="aspectFill" src="@/static/devices/fire.png" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="name">{{ item.Type }}</text>
					<text class="title u-line-2">{{ item.Content }}</text>
					<text class="time">{{ $date.dateFormat('YY-mm-dd HH:MM', item.DisposedOn) }}</text>
					<span>详情>></span>
				</view>
			</view>
		</u-swipe-action>
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
				list: uni.getStorageSync('warnInfo') || [],
				disabled: false,
				btnWidth: 180,
				show: false
			};
		},
		onLoad() {
			// this.$u.api.getMessageList({token: this.vuex_token}).then(res => {
			// 	console.log(res)
			// }).catch(err => {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		title: '获取数据失败！'
			// 	})
			// })
		},
		computed: {
			...mapState(['vuex_token'])
		},
		methods: {
			toDetail() {
				this.$u.route('pages/message/Detail', {
					name: 'lisa',
					age: 20
				});
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
			}

			span {
				font-size: 24rpx;
				color: $u-type-info-dark;
				margin-left: 49%;
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

		.success {
			background: rgba(0, 100, 0, .3);
		}

		.error {
			background: rgba(255, 0, 0, .3);
		}
	}
</style>
