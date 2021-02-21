<template>
	<view>
		<u-modal v-model="$store.state.vuex_popupShow" :content="!warning.length ? '' : warning[0].Content" title="警告"
		 show-cancel-button confirm-text="立刻处理" cancel-text="稍好处理" cancel-color="#fa3534" @confirm="handle" />
	</view>
</template>

<script>
	export default {
		name: 'Modal',
		data() {
			return {
				warning: [],
			}
		},
		watch: {
			'$store.state.vuex_popupShow': {
				handler(e, v) {
					this.warning = uni.getStorageSync('warnInfo')
					console.log(e, v, this.warning)
					if (e) {
						uni.vibrateLong({
							success: () => {
								console.log('success', this.warning);
							}
						});
					}
				},
				immediate: true
			}
		},
		methods: {
			handle() {
				this.$store.commit('setWarning', {
					v: null,
					t: false
				})
				this.$u.route('pages/message/New')
			}
		}
	}
</script>

<style>
</style>
