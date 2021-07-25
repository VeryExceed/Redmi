<template>
	<view class="d-flex flex-column" style="height: 100%;">
		<!-- 选项卡 -->
		<view class="d-flex bg-white a-center j-center font-md text-muted border-top border-bottom border-light-secondary">
			<view class="flex-1 d-flex a-center j-center py-2"  v-for="(item,index) in tabBars" :key="index"
				:class="tabIndex === index ? 'tabactive' : ''" @tap="changeTab(index)">
				{{item.name}}
			</view>
		</view>

		<scroll-view scroll-y class="flex-1" style="background: #F5F5F5;">
			<block v-for="(tab,tabI) in tabBars" :key="tabI">
				<view class="position-relative" v-show="tabI === tabIndex" style="min-height: 440rpx;">
					<template v-if="tab.list.length > 0">
						<view class="p-3">
							<coupon v-for="(item,index) in tab.list" :key="index" :item="item" :index="index" @click="chooseCoupon(item)"></coupon>
						</view>
					</template>
					<template v-else>
						<no-thing :icon="tab.no_thing" :msg="tab.msg" style="height: 100%;"></no-thing>
					</template>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import noThing from "@/components/common/no-thing.vue"
	import coupon from "@/components/order-coupom/coupon.vue"
	export default {
		components: {
			noThing,
			coupon
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
						name: "可用",
						no_thing: "no_pay",
						msg: "你还没有可用的优惠券",
						page:1,
						key:"valid",
						firstLoad:false,
						list: []
					},
					{
						name: "已失效",
						no_thing: "no_pay",
						msg: "你还没有优惠券",
						page:1,
						key:"invalid",
						firstLoad:false,
						list: []
					},
				]
			}
		},
		onLoad() {
			this.getData()
		},
		computed:{
			// 是否失效
			isvalid(){
				return this.tabBars[this.tabIndex].key
			},
			// 当前页码
			page(){
				return this.tabBars[this.tabIndex].page
			}
		},
		methods: {
			getData(){
				let index = this.tabIndex
				this.$H.get('/usercoupon/'+this.page+'/'+this.isvalid,{},{
					token:true
				}).then(res=>{
					this.tabBars[index].list = res.map(item=>{
						return {
							id:item.id,
							title: item.coupon.name,
							start_time: item.coupon.start_time,
							end_time: item.coupon.end_time,
							price: item.coupon.value,
							desc: item.coupon.desc,
							status: index === 0,
							disabled: item.used,
							type:item.coupon.type
						}
					})
					this.tabBars[index].firstLoad = true
				})
			},
			
			// 切换选项卡
			changeTab(index) {
				this.tabIndex = index
				if (!this.tabBars[index].firstLoad) {
					this.getData()
				}
			},
			// 选择优惠券
			chooseCoupon(item){
				uni.$emit('couponUser',{
					id:item.id,
					type:item.type,
					value:item.price
				})
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	.tabactive {
		border-bottom: 5rpx solid #FD6801;
		color: #FD6801;
		margin-bottom: -5rpx;
	}
</style>
