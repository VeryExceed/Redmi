<template>
	<view class="d-flex flex-column" style="height: 100%;">
		<!-- 选项卡 -->
		<view class="d-flex bg-white a-center j-center font-md text-muted border-top border-bottom">
			<view class="flex-1 d-flex a-center j-center py-2" v-for="(item,index) in tabBars" :key="index"
				:class="tabIndex === index ? 'tabactive' : ''" @tap="changeTab(index)">
				{{item.name}}
			</view>
		</view>
		
		<scroll-view scroll-y class="flex-1" style="background: #F5F5F5;">
			<block v-for="(tab,tabI) in tabBars" :key="tabI">
				<view class="position-relative" v-show="tabI === tabIndex"
				style="min-height: 440rpx;">
					<template v-if="tab.list.length > 0">
						
					</template>
					<template v-else>
						<no-thing :icon="tab.no_thing" :msg="tab.msg"></no-thing>
					</template>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import noThing from "@/components/common/no-thing.vue"
	export default {
		components:{
			noThing
		},
		data() {
			return {
				tabIndex:0,
				tabBars:[
					{ 
						name:"可用",
						no_thing:"no_pay",
						msg:"你还没有可用的优惠券",
						list:[],
					},
					{
						name:"已失效",
						no_thing:"no_pay",
						msg:"你还没有优惠券",
						list:[]
					},
				]
			}
		},
		methods: {
			// 切换选项卡
			changeTab(index) {
				this.tabIndex = index
			}
		}
	}
</script>

<style>
.tabactive{
	border-bottom: 5rpx solid #FD6801;
	color: #FD6801;
	margin-bottom: -5rpx;
}
</style>
