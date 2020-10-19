<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
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
		background-color: #f2f2f2f2;
	}
</style>
