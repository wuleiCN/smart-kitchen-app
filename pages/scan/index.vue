<template>
	<view class="content">
		<u-navbar :is-back="false" title="香道云厨智慧厨房" :title-width="300" title-color="#ffffff" :background="background" />
		<u-tabbar :list="vuex_tabbar" bg-color="#303133" active-color="#aaaaaa" inactive-color="#aaaaaa" :mid-button="true" />
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				title: 'scan',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 117, 200), rgb(21, 178, 163))'
				}
			}
		},
		onLoad() {

		},
		onShow() {
			console.log(2)
		},
		computed: {
			...mapState(["vuex_tabbar"])
		},
		methods: {
			scanning() {
				console.log(2)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
