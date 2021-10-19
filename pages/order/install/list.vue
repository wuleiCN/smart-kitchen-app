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
			<view class="text-area" v-for="(item,index) in orderList" :key="index">
				<view class="cust_title">
					{{item.companyName}}
				</view>
				<view class="cust_centent">
					<view>联系人：{{item.Contact}}</view>
					<view>联系电话：{{item.Phone}}</view>
					<view>联系地址：{{item.Address}}</view>
					<view>创建时间：{{item.CreatedOn}}</view>
				</view>
				<view class="cust_oper">
					<button class="btn_send btn" @click.stop="toProduct(item.Id)">接单</button>
					<button class="btn_deli btn" @click.stop="refuseSale(item.Id)">退单</button>
				</view>
			</view>
			<view class="text-area" v-for="(item,index) in orderDeliver" :key="index+'-only'">
				<view class="cust_title">
					{{item.companyName}}
				</view>
				<view class="cust_centent">
					<view>联系人：{{item.Contact}}</view>
					<view>联系电话：{{item.Phone}}</view>
					<view>联系地址：{{item.Address}}</view>
					<view>创建时间：{{item.CreatedOn}}</view>
				</view>
				<view class="cust_oper">
					<button v-if="item.Status === 7" class="btn_list btn"
						@click.stop="toSaledevices(item.Id)">派单施工</button>
				</view>
			</view>
			<u-empty mode="list" v-if="!(orderList.length || orderDeliver.length)" margin-top="40" />
		</view>
		<u-empty mode="search" v-if="dataListShow" margin-top="40" />
		<u-modal v-model="distributeShow" content="确定要接单吗？" show-cancel-button @confirm="distribute" />
		<u-modal v-model="refuseShow" title="退单原因" show-cancel-button @confirm="refuseOrderBute">
			<view class="slot-content">
				<u-input v-model="commentValue" type="textarea" border />
			</view>
		</u-modal>
		<Modal />
	</view>
</template>

<script>
	// import {
	// 	mapState
	// } from "vuex"
	import Modal from "../../components/modal.vue"
	export default {
		components: {
			Modal
		},
		data() {
			return {
				title: '施工定单',
				warning: [],
				search: false,
				icon: true,
				back: true,
				solt: false,
				dataListShow: false,
				orderShow: true,
				keyword: '',
				distributeShow: false,
				refuseShow: false,
				orderId: '',
				itemId: '',
				commentValue: '',
				orderList: [],
				orderDeliver: [],
				distributeId: '',
				companyList: []
			}
		},
		onShow() {
			this.$u.dictionary.getCompanyListFc().then(res => this.companyList = res)
			this.getorderDeliveried();
			this.getorderInstalling();
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
			// 出库接单
			toProduct(Id) {
				this.itemId = Id
				this.distributeShow = true
			},
			// 跳转销售清单
			toSaledevices(Id) {
				this.$u.route('pages/order/install/installDevice', {
					Id
				})
			},
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
			// 获得所在已销售提交的销售定单
			getorderDeliveried() {
				this.$u.api.getorderDeliveried().then(res => {
					if (res.success) {
						this.orderList = res.data
						this.orderList.map((v, i) => {
							v.CreatedOn = v.CreatedOn.slice(0, 10)
							v.companyName = this.companyList.find(i => v.Company === i.Id).Name
						})
						if (!res.data.length) this.orderShow = true
					} else this.$u.toast(res.message)
					console.log(res)
				})
			},
			// 获得所在未施工提交的销售定单
			getorderInstalling() {
				this.$u.api.getorderInstalling().then(res => {
					if (res.success) {
						this.orderDeliver = res.data
						this.orderDeliver.map((v, i) => {
							v.CreatedOn = v.CreatedOn.slice(0, 10)
							v.companyName = this.companyList.find(i => v.Company === i.Id).Name
						})
						if (!res.data.length) this.orderShow = true
					} else this.$u.toast(res.message)
					console.log(res)
				})
			},
			// 获得指定销售订单
			searchFn() {
				console.log('===> 搜索');
			},
			// 派单施工
			sendToDistribute(id) {
				this.distributeId = id
				this.distributeShow = true
			},
			// 确定施工接单
			distribute() {
				this.$u.api.acceptSaleInstall({
					id: this.itemId
				}).then(res => {
					if (res.success) {
						this.getorderDeliveried();
						this.getorderInstalling();
						this.$u.toast('接单成功！')
					} else this.$u.toast(res.message)
					console.log(res)
				})
			},
			// 退单
			refuseSale(id) {
				this.refuseShow = true
				this.orderId = id
			},
			// 确定退单
			refuseOrderBute() {
				this.$u.api.refuseSaleInstall({
					Order: this.orderId,
					Comment: (this.commentValue || '无')
				}).then(res => {
					if (res.success) {
						this.getorderDeliveried();
						this.getorderInstalling();
						this.$u.toast('退单成功！')
					} else this.$u.toast(res.message)
				})
			}
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

			.cust_title {
				font-weight: 600;
				height: 39rpx;
				width: 100%;

			}

			.cust_centent {
				padding: 23rpx 0;
				border-top: 1rpx solid #F5F5F5;
			}

			.cust_oper {
				display: flex;
				justify-content: start;
				// align-items: center;

				.btn_send {
					background: rgba(252, 121, 48, .2);
					color: #FC7930;
					width: 116rpx;
				}

				.btn_list {
					background: rgba(54, 182, 177, .2);
					color: #36B6B1;
					width: 116rpx;
				}

				.btn_deli {
					background: rgba(252, 48, 48, .2);
					color: #FC3030;
					width: 68rpx;
				}

				.btn {
					width: 116rpx;
					height: 50rpx;
					border-radius: 10rpx;
					font-size: 24rpx;
					// font-weight: 600;
					line-height: 50rpx;
					margin: 0 12rpx 0 0;
					border: 0;
					padding: 0;
				}
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
		.slot-content {
			width: 100%;
			padding: 30rpx;
		}

		.operation {
			position: absolute;
			width: 200rpx;
			// height: 156rpx;
			font-size: 28rpx;
			background: #FFFFFF;
			box-shadow: 1rpx 1rpx 6rpx 0rpx rgba(151, 151, 151, 0.27);
			border-radius: 10rpx;
			top: 44px;
			right: 15px;

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
		.u-model {
			.u-input {
				margin: 30rpx;
			}
		}
	}

	.slotSearch {
		width: 100% !important;
		margin-left: 12px;
	}
</style>
