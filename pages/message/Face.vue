<template>
	<view class="face">
		<view class="faceImg">
			<u-image :src="src1" @click="FaceImageCK"></u-image>
			<u-image :src="src2" @click="GlobalImageCK"></u-image>
		</view>
		<view class="faceInfo">
			<view class="cust_title">
				<view>{{message.name}}</view>
			</view>
			<view class="cust_centent">
				<view>消息内容：{{message.Content}}</view>
				<view>消息推送时间：{{message.HappendOn}}</view>
				<view>识别：{{situation}}</view>
				<view>年龄：{{age || '未知'}}</view>
				<view>性别：{{GenderArr[gender]}}</view>
			</view>
		</view>
		<view v-show="FaceShow" class="Preview" @click.stop="FaceShow=false">
			<u-image :src="src3" mode="aspectFit"></u-image>
			<!-- <image mode="aspectFit" :src="src3" /> -->
		</view>
	</view>
</template>

<script>
	// import { mapState } from "vuex";
	export default {
		data() {
			return {
				device: '',
				message: {},
				situation: '',
				GenderArr: ['男', '女', '未知'],
				gender: null,
				age: 0,
				FaceShow: false,
				baseSrc: 'http://175.6.77.126:9001/api/file/getimage?filename=',
				src1: '',
				src2: '',
				src3: ''
			}
		},
		onLoad(e) {
			console.log(e);
			this.getFaceData(e)
		},
		onShow() {

		},
		computed: {

		},
		watch: {

		},
		methods: {
			getFaceData(e) {
				this.$u.api.faceGetById({
					id: e.id
				}).then(res => {
					if (res.success) {
						res.data.HappendOn = res.data.HappendOn.slice(0, 10)
						res.data.name = ''
						this.$u.api.getIpcById({
							id: res.data.CameraId
						}).then(v => {
							console.log(v);
							res.data.name = v.data.Name
						})
						this.$u.api.faceeventById({
							id: res.data.EventId
						}).then(res => {
							if (res.success) {
								this.situation = res.data.Name
								this.gender = res.data.Gender
								this.age = res.data.age
								this.src1 = this.baseSrc + res.data.FaceImage
								this.src2 = this.baseSrc + res.data.GlobalImage
							}
						})
						this.message = res.data
						console.log(this.message);
					}
					uni.hideLoading()
				}).catch(err => {
					console.log(err);
				})
			},
			FaceImageCK() {
				this.FaceShow = true
				this.src3 = this.src1
			},
			GlobalImageCK() {
				this.FaceShow = true
				this.src3 = this.src2
			}
		}
	}
</script>


<style scoped lang="scss">
	::v-deep * {
		background-position: inherit !important;
	}
	.faceImg {
		display: flex;
		padding: 10rpx;
		width: 100%;
		height: 502rpx;

		::v-deep .u-image {
			width: 50% !important;
			height: 430rpx !important;
		}
	}

	.faceInfo {
		width: 702rpx;
		// height: 240rpx;
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

		}

		.cust_centent {
			padding: 23rpx 0;
			border-top: 1rpx solid #F5F5F5;
		}
	}

	.Preview {
		width: 100vh;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #000000;
		z-index: 99;

		::v-deep .u-image {
			width: 100vh;
			height: 50vh !important;
			margin-top: 50%;
			transform: translateY(-50%);
			border-radius: 0px;
			overflow: visible;
			opacity: 1;
			transition: opacity 0.5s ease-in-out 0s;
		}
	}
</style>
