<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="警告信息"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view v-if="list.length === 0" class="_none">
			<p>暂无数据~</p>
		</view>
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list"
		 :key="item.id" :options="options" @open="open" @content-click="toDetail" @click="alarm">
			<view class="item u-border-bottom" :class="{success:item.id === 3,error: item.id < 3}">
				<image mode="aspectFill" :src="item.images" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-wrap">
					<text class="name">{{ item.name }}</text>
					<text class="title u-line-2">{{ item.title }}</text>
					<text class="time">{{ item.time | date }}</text>
					<span>详情>></span>
				</view>
			</view>
		</u-swipe-action>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				},
				list: [{
						id: 1,
						name: 'test01',
						time: new Date().getTime(),
						title: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
						images: '/static/devices/fire.png',
						show: false
					},
					{
						id: 2,
						name: 'test02',
						time: new Date().getTime(),
						title: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
						images: '/static/devices/fire.png',
						show: false
					},
					{
						id: 3,
						name: 'test03',
						time: new Date().getTime(),
						title: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						images: '/static/devices/warning.png',
						show: false,
					}
				],
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		methods: {
			open(index) {
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			toDetail() {
				this.$u.route('pages/message/Detail', {
					name: 'lisa',
					age: 20
				});
			},
			alarm(index) {
				this.list.splice(index, 1);
				console.log(index)
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
				margin-left: 320rpx;
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
