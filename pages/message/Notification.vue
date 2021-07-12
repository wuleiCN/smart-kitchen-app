<template>
	<view class="content">
		<u-navbar :is-back="back" :title="title" title-color="#000000" :title-size="36">
			<view class="slot-wrap" :class="{slotSearch: solt}">
				<slot name="right" v-if="icon">
					<u-icon name="search" @click="searchCK" />
				</slot>
				<view class="search-wrap" v-if="search">
					<u-search v-model="keyword" height="56" :action-style="{color: '#fff'}" :show-action="true"
						action-text="返回" @blur="searchFn()" @custom="searchBK()" />
				</view>
			</view>
		</u-navbar>
		<view v-show="orderShow">
			<view class="text-area" v-for="(item,index) in orderDeliver" :key="index+'-only'">

			</view>
			<u-empty mode="list" v-if="!orderList.length" margin-top="40" />
		</view>
		<u-empty mode="search" v-if="dataListShow" margin-top="40" />
		<!-- <Modal /> -->
	</view>
</template>

<script>
	// import {
	// 	mapState
	// } from "vuex"
	// import Modal from "../../components/modal.vue"
	export default {
		data() {
			return {
				title: '通知公告',
				warning: [],
				search: false,
				icon: true,
				back: true,
				solt: false,
				dataListShow: false,
				orderShow: true,
				keyword: '',
				orderList: [],
				orderDeliver: [],
			}
		},
		onShow() {
			// this.$u.dictionary.getCompanyListFc().then(res => this.companyList = res)
			// this.getorderInstalled();
		},
		mounted() {
			console.log(this.warning, this.vuex_tabbar)
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
			searchCK() {
				this.search = true,
					this.icon = false,
					this.back = false,
					this.solt = true,
					this.dataListShow = true,
					this.orderShow = false,
					this.title = ''
			},
			searchBK() {
				this.search = false,
					this.icon = true,
					this.back = true,
					this.solt = false,
					this.dataListShow = false,
					this.orderShow = true,
					this.title = '客户管理'
			},
			// 获得指定销售订单
			searchFn() {
				console.log('===> 搜索');
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;

		.text-area {
			width: 702rpx;
			height: 340rpx;
			background: #FFFFFF;
			border: 1rpx solid #FFFFFF;
			border-radius: 20rpx;
			padding: 24rpx;
			margin-top: 24rpx;
			margin-left: 50%;
			transform: translateX(-50%);
		}

		.slot-wrap {
			display: flex;
			align-items: center;

			.search-wrap {
				margin: 0 20rpx;
				flex: 1;

				::v-deep .u-action {
					background: #f3f3f3;
					color: #000000 !important;
					height: 28px;
					line-height: 28px;
					border-radius: 5px;
				}
			}
		}

		::v-deep .u-slot-content {
			justify-content: flex-end;
			margin-right: 24rpx;
			font-size: 36rpx;

			.u-icon {
				padding: 10rpx;
			}
		}

		.slot-content {
			width: 100%;
			padding: 15px;
		}

		.slotSearch {
			width: 100% !important;
			margin-left: 12px;
		}
	}
</style>
