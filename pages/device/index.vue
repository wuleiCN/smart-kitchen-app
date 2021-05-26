<template>
	<view class="content">
		<u-navbar :is-back="true" :title="title" title-color="#000000" :title-size="36" />
			<view class="order">
				<view class="sales" @click="$u.route('pages/device/Detail')" />
			</view>
			<view class="order">
				<view class="left MaintenanceOrder" @click="$u.route('pages/order/distribute/list')" />
				<view class="right ConstructionOrder" @click="$u.route('pages/order/install/list')" />
			</view>
			<view class="order">
				<view class="left RepairOrder" @click="$u.route('pages/order/repair/list')" />
				<view class="right DeliveryOrder" @click="$u.route('pages/order/maintenance/list')" />
			</view>
			<view class="order">
				<view class="left RepairOrder" @click="$u.route('pages/order/repair/list')" />
				<view class="right DeliveryOrder" @click="$u.route('pages/order/maintenance/list')" />
			</view>
		<Modal />
	</view>
</template>

<script>
	// import {
	// 	mapState
	// } from "vuex"
	import Modal from "../components/modal.vue"
	export default {
		components: {
			Modal
		},
		data() {
			return {
				title: '订单管理'
			}
		},
		mounted() {
			
		},
		watch: {
			'$store.state.vuex_popupShow': {
				handler() {
					this.warning = uni.getStorageSync('warnInfo')
				},
				immediate: true
			}
		},
		computed: {

		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.order {
			width: 702rpx;
			height: 301rpx;
			border-radius: 20rpx;
			margin-top: 24rpx;
			margin-left: 50%;
			transform: translateX(-50%);
			.sales {
				height: 100%;
				background-image: url(../../static/order/SalesOrder.png);
				background-size: 702rpx 301rpx;
			}
			.left{
				float: left;
				height: 301rpx;
				width: 340rpx;
				background-size: 340rpx 301rpx;
			}
			.MaintenanceOrder {
				background-image: url(../../static/order/DeliveryOrder.png);
			}
			.RepairOrder {
				background-image: url(../../static/order/RepairOrder.png);
			}
			.right {
				float: right;
				height: 301rpx;
				width: 340rpx;
				background-size: 340rpx 301rpx;
			}
			.ConstructionOrder {
				background-image: url(../../static/order/ConstructionOrder.png);
			}
			.DeliveryOrder {
				background-image: url(../../static/order/MaintenanceOrder.png);
			}
		}
	}
</style>
