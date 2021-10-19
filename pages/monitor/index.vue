<template>
	<view class="content" @click.stop="isvideo = false">
		<u-navbar :is-back="true" title="视频监控" :title-width="300" title-color="#000000" :title-size="36" />
		<view class="type">
			<u-input v-model="areaName" :select-open="areaShow" border type="select" placeholder="请选择监控区域"
				@click="areaShowCK" />
		</view>
		<view class="monitorList">
			<u-card :title="tilte+areaName+'监控'" :sub-title="time" :show-foot='false'>
<!-- 				<view v-if="areaValue==0 || areaValue==1" class="monitor" slot="body">
					<j-video class="monitorVideo" :url="url"></j-video>
				</view> -->
				<view v-if="areaValue==1" class="monitor" slot="body">
					<u-image v-if="isvideo" width="650rpx" height="450rpx" :src="src" />
					<video v-else class="monitorVideo" :src="url1" :autoplay="true" muted />
				</view>
				<view v-if="areaValue==2" class="monitor" slot="body">
					<u-image v-if="isvideo" width="650rpx" height="450rpx" :src="src" />
					<video v-else class="monitorVideo" :src="url2" :autoplay="true" muted />
				</view>
				<view v-if="areaValue==3" class="monitor" slot="body">
					<u-image v-if="isvideo" width="650rpx" height="450rpx" :src="src" />
					<video v-else class="monitorVideo" :src="url3" :autoplay="true" muted />
				</view>
			</u-card>
		</view>
		<u-select mode="single-column" v-model="areaShow" :list="areaList" value-name="value" label-name="name"
			@confirm="confirmSelected" @cancel="isvideo = false" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				areaShow: false,
				isvideo: false,
				areaName: '前门',
				areaValue: 1,
				areaList: [
					{
						value: 1,
						name: '前门'
					},
					{
						value: 2,
						name: '室内'
					},
					{
						value: 3,
						name: '操作台'
					},
				],
				tilte: '精安公司员工食堂A区',
				time: '2021-09-14',
				src: '../../static/comment/video.jpg',
				url1: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4',
				url2: '',
				url3: ''
			}
		},
		onLoad() {},
		onReady() {},
		onShow() {},
		computed: {

		},
		watch: {

		},
		methods: {
			areaShowCK() {
				this.areaShow = true
				this.isvideo = true
			},
			confirmSelected(e) {
				this.areaName = '';
				e.map((val, index) => {
					this.areaName = val.label;
					this.areaValue = val.value;
					this.isvideo = false
				})
				console.log(e);
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {

		.type {
			width: 702rpx;
			// height: 120rpx;
			background: #FFFFFF;
			margin-top: 40rpx;
			transform: translateX(-50%);
			margin-left: 50%;
		}

		::v-deep .u-card__body {
			padding: 10rpx !important;
		}

		.monitor {
			height: 450rpx;
			margin-bottom: 10rpx;

			.monitorVideo {
				width: 650rpx;
				transform: translateX(-50%);
				margin-left: 50%;
			}
		}
		.u-select {
			z-index: 9999;
		}
	}
</style>
