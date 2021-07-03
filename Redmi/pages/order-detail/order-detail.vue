<template>
	<view>
		<view class="main-bg-color text-white p-4 d-flex a-end j-sb" style="height: 300rpx;">
			<view class="mb-3">
				<view class="font-lg">{{status}}</view>
				<view class="font">还差7天10小时自动确认</view>
			</view>
			<view class="iconfont icon-daishouhuo line-h mb-3" style="font-size: 100rpx;"></view>
		</view>
		<view class="p-3 bg-white text-light-muted font-md">
			<view>
				<text class="font-lg text-dark mr-2">罗喵</text>
				181*****163
			</view>
			<view>广东省 广州市 天河区 天河新天地</view>
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
			<view slot="right" class="font-md text-light-muted">￥123.01</view>
		</uni-list-item>
		<uni-list-item :showArrow="false">
			<text class="font-md text-light-muted">快递</text>
			<view slot="right" class="font-md text-light-muted">￥10.00</view>
		</uni-list-item>
		<uni-list-item :showArrow="false">
			<text class="font-md text-light-muted">优惠券</text>
			<view slot="right" class="font-md text-light-muted">-￥20.00</view>
		</uni-list-item>
		<uni-list-item :showArrow="false">
			<text class="font-md text-light-muted">实际付款</text>
			<view slot="right" class="font-md text-light-muted">
				<price>110.00</price>
			</view>
		</uni-list-item>
		<divider></divider>
		<card headTitle="订单信息">
			<uni-list-item title="订单编号">
				<view slot="right" class="font-md text-light-muted">
					20210701000000
				</view>
			</uni-list-item>
		</card>
	</view>
</template>

<script>
	import orderListItem from "@/components/order/order-list-item.vue"
	import price from "@/components/common/price.vue"
	import card from "@/components/common/card.vue"
	export default {
		components:{
			orderListItem,
			price,
			card
		},
		data() {
			return {
				create_time:"2021-07-01 10:20",
				status:"已发货",
				order_items:[
					{
						cover:"/static/images/demo/list/1.jpg",
						title:"小米8",
						pprice:1999.00,
						attrs:"金色 标配",
						num:1
					}
				],
				total_num:3,
				total_price:299.00
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
