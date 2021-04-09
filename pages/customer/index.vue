<template>
	<view class="content" @click="closeIcon()">
		<u-navbar :is-back="back" :title="title" title-color="#000000" :title-size="36">
			<view class="slot-wrap" :class="{slotSearch: solt}">
				<slot name="right" v-if="icon">
					<u-icon name="search" @click="searchCK" />
					<view class="" @click.stop="operShow = !operShow">
						<u-icon name="plus" />
					</view>
				</slot>
				<view class="search-wrap" v-if="search">
					<u-search v-model="keyword" height="56" :action-style="{color: '#fff'}" :show-action="true"
						action-text="返回" @blur="searchFn()" @custom="searchBK()" />
				</view>
			</view>
			<view class="operation" v-show="operShow">
				<view class="opt_ck" @click.stop="$u.route('pages/customer/register')">
					客户注册
				</view>
			</view>
		</u-navbar>
		<view v-show="customerShow">
			<view class="text-area u-line-1" v-for="(item, index) in customersList" :key="index">
				<view class="cust_title">
					<view>{{item.Name}}</view>
					<button class="btn" @click.stop="toCustomerInfo(item.Id)">更新</button>
				</view>
				<view class="cust_centent">
					<view>公司法人：{{item.Master}}</view>
					<view>公司系统管理员姓名：{{item.Admin}}</view>
					<view>公司系统管理员联系电话：{{item.AdminPhone}}</view>
				</view>
			</view>
			<u-empty mode="list" v-if="!customersList.length" />
		</view>
		<view v-show="dataListShow">
			<view class="text-area u-line-1" v-for="(item, index) in searchList" :key="index">
				<view class="cust_title">
					<view>{{item.Name}}</view>
					<button class="btn" @click.stop="toCustomerInfo(item.Id)">更新</button>
				</view>
				<view class="cust_centent">
					<view>公司法人：{{item.MasterId}}</view>
					<view>公司系统管理员姓名：{{item.AdminId}}</view>
					<view>公司系统管理员联系电话：{{item.AdminPhone}}</view>
				</view>
			</view>
			<u-empty mode="search" v-if="!searchList.length" />
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
				title: '客户管理',
				warning: [],
				customersList: [],
				searchList: [],
				operShow: false,
				search: false,
				icon: true,
				back: true,
				solt: false,
				dataListShow: false,
				keyword: '',
				customerShow: false
			}
		},
		onLoad() {
			this.$u.api.getCustomersList().then(res => {
				this.customersList = res.data
				this.customerShow = true
				console.log(res);
			}).catch(err => {
				this.$u.toast(res.data.Message)
			})
		},
		onShow() {
			this.operShow = false;
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
			// 客户详情
			toCustomerInfo(id) {
				this.$u.route('pages/customer/employees', {
					id
				})
			},
			// 搜索回调
			searchFn() {
				this.$u.api.getCustomerByName({
					name: this.keyword
				}).then(res => {
					this.searchList = res.data
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
				console.log(this.keyword);
			},
			searchCK() {
				this.search = true,
					this.icon = false,
					this.back = false,
					this.solt = true,
					this.dataListShow = true,
					this.customerShow = false,
					this.title = ''
			},
			// 搜索返回
			searchBK() {
				this.search = false,
					this.icon = true,
					this.back = true,
					this.solt = false,
					this.dataListShow = false,
					this.customerShow = true,
					this.title = '客户管理',
					this.keyword = '',
					this.searchList = []
			},
			closeIcon() {
				this.operShow = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;

		.text-area {
			width: 702rpx;
			height: 240rpx;
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

				.btn {
					background: #FC7930;
					height: 32rpx;
					border-radius: 6rpx;
					font-size: 24rpx;
					line-height: 32rpx;
					color: #ffffff;
					margin: 0;
				}

			}

			.cust_centent {
				padding: 23rpx 0;
				border-top: 1rpx solid #F5F5F5;
			}
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

		.operation {
			position: absolute;
			width: 200rpx;
			// height: 156rpx;
			font-size: 28rpx;
			background: #FFFFFF;
			box-shadow: 1rpx 1rpx 6rpx 0rpx rgba(151, 151, 151, 0.27);
			border-radius: 10rpx;
			top: 88rpx;
			right: 30rpx;
			z-index: 999;

			.opt_ck {
				height: 78rpx;
				color: #000000;
				text-align: center;
				line-height: 78rpx;

				// &:nth-child(1) {
				// 	border-bottom: 1px solid #F5F5F5;
				// }
			}
		}
	}

	.slotSearch {
		width: 100% !important;
		margin-left: 12px;
	}
</style>
