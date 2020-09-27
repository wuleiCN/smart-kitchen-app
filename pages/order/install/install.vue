<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="设备出库"
		 :title-width="300" title-color="#ffffff" :background="background" />
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">订单信息</span>
		</view>
		<view class="info u-flex-col">
			<span><strong>客户名称：</strong></span>
			<span><strong>联系人：</strong></span>
			<span><strong>联系电话：</strong></span>
			<span><strong>销售说明：</strong></span>
		</view>
		<view class="scan u-flex u-row-around">
			<view class="describe u-flex-col">
				<text>扫码设备条码/二维码</text>
				<text>或输入设备编号</text>
			</view>
			<u-image width="180rpx" height="180rpx" src="/static/tabbar/Scanning-code.png" shape="circle"></u-image>
		</view>
		<view class="code u-flex">
			<text>设备编码：</text>
			<u-input v-model="scanCode" type="text" />
			<u-button type="success" size="medium">确定</u-button>
		</view>
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">设备基本信息</span>
		</view>
		<view class="info u-flex-col u-row-around">
			<span>设备型号：</span>
			<span>设备类别：</span>
			<span>设备编码：</span>
		</view>
		<view class="section u-flex">
			<span class="line" />
			<span class="_title u-flex">设备安装信息</span>
		</view>
		<view class="code u-flex">
			<text>安装区域：</text>
			<u-input v-model="areaValue" type="select" :select-open="selectShow" @click="selectShow = true" />
		</view>
		<view class="code u-flex">
			<text>设备名称：</text>
			<u-input v-model="nameValue" type="text" />
		</view>
		<u-select mode="single-column" :list="selectList" v-model="selectShow" @confirm="selectConfirm"></u-select>
		<view class="_submit">
			<u-button type="success">提交安装信息</u-button>
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
				scanCode: '',
				areaValue: '',
				nameValue: '',
				selectShow: false,
				selectList: [{
						value: '电子产品',
						label: '电子产品'
					},
					{
						value: '服装',
						label: '服装'
					},
					{
						value: '工艺品',
						label: '工艺品'
					}
				]
			}
		},
		methods: {
			selectConfirm(e) {
				this.areaValue = '';
				e.map((val, index) => {
					this.areaValue += this.areaValue == '' ? val.label : '-' + val.label;
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.scan {
		width: 100%;
		height: 240rpx;
		background: #FFFFFF;

		.describe {
			text:nth-child(1) {
				font-size: 36rpx;
				font-weight: 600;
				display: block;
				margin-bottom: 5rpx;
				color: #666666;
			}

			text:nth-child(2) {
				color: $u-tips-color;
				font-size: 30rpx;
			}
		}
	}

	.code {
		width: 100%;
		height: 80rpx;
		background: #ffffff;
		padding: 0 30rpx;
		border-top: 1rpx solid #eeeeee;
		border-buttom: 1rpx solid #eeeeee;

		text {
			font-size: 30rpx;
			color: #666666;
		}

		::v-deep .u-btn {
			width: 116rpx;
		}
	}

	.section {
		z-index: 9;
		position: sticky;
		width: 100%;
		height: 80rpx;
		background: #FFFFFF;
		border-bottom: 1px solid #f3f3f3;
		box-shadow: 6rpx 1rpx 6rpx rgba(0, 0, 0, 0.1);

		._title {
			height: 80rpx;
			margin-left: 20rpx;
		}

		.line {
			height: 30rpx;
			border-radius: 30%;
			border: 5rpx solid #0081ff;
			margin-left: 5%;
		}
	}

	.info {
		height: 260rpx;
		background: #FFFFFF;
		padding: 30rpx;
		color: #666666;
		border-bottom: 1px solid #f5f5f5;

		span {
			padding-bottom: 10rpx;
		}
	}

	._submit {
		width: 100%;
		// height: 110rpx;

		::v-deep .u-btn {
			margin: 30rpx 30rpx 0 30rpx;
		}
	}
</style>
