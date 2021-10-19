<script>
	// import upApp from "@/uni_modules/uni-upgrade-center-app/utils/check-update.js"
	export default {
		onLaunch: function() {
			// upApp()
			console.log('App Launch')
		},
		onShow: function() {
			setTimeout(() => {
				// #ifdef APP-PLUS 
				plus.navigator.closeSplashscreen()
				// #endif
			}, 2000)
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

/*每个页面公共css */
<style lang="scss">
	@import "uview-ui/index.scss";

	// *{touch-action: none;}
	body {
		background-color: #F5F5F5;

		button::after {
			border: none !important;
		}
	}
</style>
