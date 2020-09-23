<template>
	<view class="content">
		<u-navbar :is-back="true" back-text="返回" :back-text-style="{color: '#fff'}" back-icon-color="#ffffff" title="警告信息"
		 :title-width="300" title-color="#ffffff" :background="background" />
		123
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
		methods: {}
	}
</script>

<style scoped lang="scss">
</style>
