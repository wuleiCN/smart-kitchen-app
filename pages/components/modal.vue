<template>
	<view>
		<u-modal v-model="$store.state.vuex_popupShow" :content="warning.message || ''" title="警告"
		 show-cancel-button confirm-text="立刻处理" cancel-text="稍好处理" cancel-color="#fa3534" @confirm="handle" @cancel="cancel" />
	</view>
</template>

<script>
	require('fast-text-encoding')
	export default {
		name: 'Modal',
		data() {
			return {
				warning: {},
			}
		},
		onLoad() {
			console.log(this.$store.state.vuex_popupShow);
		},
		watch: {
			'$store.state.vuex_popupShow': {
				handler(e, v) {
					if (e) {
						const msg = this.$store.state.vuex_popupData
						this.warning = JSON.parse(msg)
						console.log('弹框', e, v, msg)
						console.log('消息', this.warning);
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
				this.$u.route('pages/message/Detail', {
					id: this.warning.id
				})
			},
			cancel() {
				this.$store.commit('setWarning', {
					v: null,
					t: false
				})
			}
		}
	}
</script>

<style>
</style>
