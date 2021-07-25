<template>
	<view style="background: #F5F5F5; min-height: 100%; height: auto;">
		<!-- 地址选择 -->
		<view class="main-bg-color text-white d-flex a-center px-3" style="height: 250rpx;" hover-class="main-bg-color"
			@click="openPathList">
			<view>
				<template v-if="path">
					<view class="font-weight font-md d-flex a-center">
						{{path.name}} {{path.phone}}
						<view class="border border-white rounded px-1 font ml-auto" v-if="path.isdefault">默认</view>
					</view>
					<view class="font">
						{{path.province}} {{path.city}} {{path.district}} {{path.address}}
					</view>
				</template>
				<template v-else>
					<view class="font-weight font-md d-flex a-center font-lg">
						请选择收货地址</view>
				</template>
			</view>
			<view class="iconfont icon-you ml-auto"></view>
		</view>

		<view style="border-top-left-radius: 25rpx;border-top-right-radius: 25rpx; overflow: hidden;">
			<view class="bg-white">
				<uni-list-item :clickable="false">
					<view class="d-flex a-center">
						<image :src="item.cover" style="width: 100rpx;height: 100rpx;" class="rounded mr-2"
							v-for="(item,index) in goodsList" :key="index"></image>
					</view>
					<view slot="rightContent">共{{goodsList.length}}件</view>
				</uni-list-item>
				<uni-list-item title="商品总价" :showArrow="false">
					<view slot="rightContent">
						<price color="text-dark">{{totalPrice}}</price>
					</view>
				</uni-list-item>
				<uni-list-item title="运费" :showArrow="false">
					<view slot="rightContent">包邮</view>
				</uni-list-item>
				<uni-list-item title="优惠券" :showArrow="false" @click="openNavigate('order-coupon')">
					<view slot="rightContent" class="text-light-muted">
						<text v-if="coupon.id > 0">{{coupon.type === 0 ? '-'+coupon.value+'元' : coupon.value+'折'}}</text>
						<text v-else>{{couponCount ===0 ? '无可用' : couponCount + '张可用'}}</text>
					</view>
				</uni-list-item>
				<uni-list-item :showArrow="false">
					<text class="main-text-color">小计</text>
					<view slot="rightContent">
						<price>{{price}}</price>
					</view>
				</uni-list-item>
				<divider></divider>
				<uni-list-item title="发票" @click="openNavigate('order-invoice')">
					<view slot="rightContent">电子发票-个人</view>
				</uni-list-item>
			</view>
		</view>

		<view class="position-fixed d-flex a-center j-end  bottom-0 left-0 right-0 bg-white p-2 font-md">
			合计:
			<view class="ml-2">
				<price>{{price}}</price>
			</view>
			<view class="ml-2 px-2 py-1 main-bg-color text-white font-md" hover-class="main-bg-hover-color"
				style="border-radius: 80rpx;" @click="oepnPayMethods">
				去支付
			</view>
		</view>
	</view>
</template>

<script>
	import price from "@/components/common/price.vue"
	import {
		mapGetters,
		mapState
	} from "vuex"
	export default {
		components: {
			price
		},
		data() {
			return {
				path: false,
				items: [],
				couponCount:0,
				coupon:{
					id:0,
					type:0,
					value:0
				}
			}
		},
		computed: {
			...mapState({
				list: state => state.cart.list
			}),
			...mapGetters(['defaultPath','totalPrice']),
			// 商品列表
			goodsList() {
				// 简写一
				return this.items.map(id => {
					return this.list.find(v => v.id === id)
				})
				// // 复杂写法二
				// let list = this.items.map(id=>{
				// 	let obj = this.list.find(v=>{
				// 		return v.id === id
				// 	})
				// 	return obj
				// })
				// return list
			},
			// 最终价格
			price(){
				// 没有优惠券
				if(this.coupon.id === 0) {
					return this.totalPrice
				}
				if (this.coupon.type === 0) {
					return  this.totalPrice - this.coupon.value
				}
				return (this.totalPrice * (this.coupon.value/10)).toFixed(2)
			}
		},
		onLoad(e) {
			console.log(e.detail)
			if (!e.detail) {
				uni.showToast({
					title: '请选择要下单的商品',
					icon: 'none'
				})
				return uni.navigateBack({
					delta: 1
				})
			}
			this.items = JSON.parse(e.detail)

			if (this.defaultPath.length) {
				this.path = this.defaultPath[0]
			}
			// 开启监听选择收货地址事件
			uni.$on('choosePath', (res) => {
				this.path = res
			})
			uni.$on('couponUser',(res)=>{
				this.coupon = res
			})
			// 计算当前价格有多少张可用优惠券
			this.getCouponCount()
		},
		onUnload() {
			// 关闭监听选择收货地址事件
			uni.$off('choosePath', (e) => {
				console.log('关闭监听选择收货地址');
			})
			uni.$off('couponUser', (e) => {
				console.log('关闭监听选择优惠券');
			})
		},
		methods: {
			oepnPayMethods() {
				uni.navigateTo({
					url: '../pay-methods/pay-methods'
				})
			},
			openPathList() {
				uni.navigateTo({
					url: '../user-path-list/user-path-list?type=choose'
				})
			},
			openNavigate(path) {
				if (!path) return
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				})
			},
			// 计算当前价格有多少张可用优惠券
			getCouponCount(){
				this.$H.post('/coupon_count',{
					price:this.totalPrice
				},{
					token:true
				}).then(res=>{
					this.couponCount =res
				}).catch(err=>{
					uni.showToast({
						title:'获取可用优惠券失败',
						icon:'none'
					})
				})
			}

		}
	}
</script>

<style>

</style>
