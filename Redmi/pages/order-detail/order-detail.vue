<template>
	<view>
		<view class="main-bg-color text-white p-4 d-flex a-end j-sb" style="height: 300rpx;">
			<view class="mb-3">
				<view class="font-lg">{{status}}</view>
				<view class="font">{{timeDownText}}</view>
			</view>
			<view class="iconfont icon-daishouhuo line-h mb-3" style="font-size: 100rpx;"></view>
		</view>
		<view class="p-3 bg-white text-light-muted font-md">
			<view>
				<text class="font-lg text-dark mr-2">{{address.name}}</text>
				{{address.phone}}
			</view>
			<view>{{path}}</view>
		</view>
		<divider></divider>
		<view class="px-2">
			<block v-for="(item,index) in order_items" :key="index">
				<order-list-item :item="item" :index="index"></order-list-item>
			</block>
		</view>
		<divider></divider>
		<uni-list-item :showArrow="false">
			<text class="font-md text-light-muted">商品总价</text>
			<view slot="right" class="font-md text-light-muted">{{total_price}}</view>
		</uni-list-item>
		<uni-list-item :showArrow="false">
			<text class="font-md text-light-muted">快递</text>
			<view slot="right" class="font-md text-light-muted">包邮</view>
		</uni-list-item>
		<uni-list-item :showArrow="false">
			<text class="font-md text-light-muted">优惠券</text>
			<view slot="right" class="font-md text-light-muted">-￥20.00</view>
		</uni-list-item>
		<uni-list-item :showArrow="false">
			<text class="font-md text-light-muted">实际付款</text>
			<view slot="right" class="font-md text-light-muted">
				<price>{{total_price}}</price>
			</view>
		</uni-list-item>
		<divider></divider>
		<card headTitle="订单信息">
			<uni-list-item title="订单编号">
				<view slot="right" class="font-md text-light-muted">
					{{no}}
				</view>
			</uni-list-item>
		</card>
	</view>
</template>

<script>
	var timer = null
	import orderListItem from "@/components/order/order-list-item.vue"
	import price from "@/components/common/price.vue"
	import card from "@/components/common/card.vue"
	import $T from "@/common/lib/time.js"
	export default {
		components: {
			orderListItem,
			price,
			card
		},
		data() {
			return {
				id: 0,
				no: "",
				address: {
					province: "",
					city: "",
					district: "",
					address: "",
					zip: 0,
					name: "",
					phone: "",
				},
				total_price: 0,
				remark: "",
				paid_time: null,
				payment_method: "",
				payment_no: "",
				refund_status: "pending",
				ship_status: "",
				extra: null,
				create_time: "",
				update_time: "",
				reviewed: 0,
				order_items: [],
				couponUserItem: [],
				end_time: 0,
				timeDown: ''
			}
		},
		computed: {
			path() {
				let {
					province,
					city,
					district,
					address
				} = this.address
				return `${province} ${city} ${district} ${address}`
			},
			// 订单状态
			status() {
				return this.$U.formatStatus({
					paid_time: this.paid_time,
					refund_status: this.refund_status,
					ship_status: this.ship_status
				})
			},
			timeDownText() {
				let msg = ''
				switch (this.status) {
					case '待支付':
						msg = '取消'
						break;
					case '待收货':
						msg = '确认'
						break;
					case '待发货':
						return '等待商家发货'
						break;
					case '退款中':
						return '等待商家审核'
						break;
					case '已签收':
						return '订单已签收'
						break;
				}
				if (msg !== '' && this.timeDown !== '') {
					return `还差${this.timeDown} 自动${msg}`
				}
				return ''
			}
		},
		onLoad(e) {
			if (!e.id) {
				uni.showToast({
					title: '订单不存在',
					icon: 'none'
				})
				return uni.navigateBack({
					delta: e
				})
			}
			this.id = e.id
			// 获取订单详情页
			this.getData()
		},
		methods: {
			// 开启定时器
			openTimeDown() {
				if (this.status === '待支付') {
					timer = setInterval(() => {
						let now = (new Date().getTime()) / 1000
						if (now > this.end_time) {
							uni.switchTab({
								url: '../index/index'
							})
							uni.showToast({
								title: '订单已关闭',
								icon: 'none'
							})
							this.timeDown = ''
							return clearInterval(timer)
						}
						this.timeDown = $T.timeDown(this.end_time)
					}, 1000)
				}
			},
			getData() {
				this.$H.get('/order/' + this.id, {}, {
					token: true
				}).then(res => {
					this.end_time = res.end_time ? res.end_time : 0
					this.no = res.no
					this.address = res.address
					this.total_price = res.total_price
					this.remark = res.remark
					this.paid_time = res.paid_time
					this.payment_method = res.payment_method
					this.payment_no = res.payment_no
					this.refund_status = res.payment_no
					this.ship_status = res.ship_status
					this.extra = res.extra
					this.create_time = res.create_time
					this.update_time = res.update_time
					this.reviewed = res.reviewed
					// 整理商品数据列表
					let order_items = res.orderItems.map(v => {
						let attrs = []
						if (v.skus_type === 1 && v.goodsSkus && v.goodsSkus.skus) {
							let skus = v.goodsSkus.skus
							for (let k in skus) {
								attrs.push(skus[k].value)
							}
						}
						return {
							id: v.goods_id,
							cover: v.goodsItem.cover,
							title: v.goodsItem.title,
							pprice: v.price,
							attrs: attrs.join(','),
							num: v.num
						}
					})
					// 开启定时器
					this.openTimeDown()
					this.order_items = order_items
					this.couponUserItem = res.couponUserItem
				})
			}
		}
	}
</script>

<style>

</style>
