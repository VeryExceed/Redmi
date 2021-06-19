<template>
	<view style="background: #F5F5F5;">
		<uni-nav-bar :right-text="isedit?'完成':'编辑'" title="购物车" :fixed="true" statusBar :shadow="false"
			@clickRight="isedit = !isedit"></uni-nav-bar>
		<!-- 购物车为空 -->
		<!-- <view class="py-5 d-flex a-center j-center bg-white">
			<view class="iconfont icon-gouwuche text-light-muted" style="font-size: 50rpx;"></view>
			<text class="text-light-muted mx-1">购物车为空</text>
			<view class="px-2 py-1 border border-light-secondary rounded"
			hover-class="bg-light-secondary">
				去逛逛
			</view>
		</view> -->

		<!-- 购物车商品列表 -->
		<view class="bg-white px-2">
			<!-- 列表 -->
			<view class="d-flex a-center py-3 border-bottom border-light-secondary"
			v-for="(item,index) in list" :key="index">
				<label class="radio d-flex a-center j-center" style="width: 80rpx; height: 80rpx;">
					<radio :value="item.id" color="#FD6801" />
				</label>

				<image :src="item.cover" mode="widthFix" style="height: 150rpx;width: 150rpx;"
					class="border border-light-secondary rounded p-1 flex-shrink">
				</image>

				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark" style="font-size: 35rpx;">
						{{item.title}}
					</view>
					<view class="d-flex text-light-muted mb-1">
						<text class="mr-1"
						v-for="(attr,attrIndex) in item.attrs"
						:key="attrIndex">{{attr.list[attr.selected].name}}</text>
					</view>
					<view class="mt-auto d-flex j-sb">
						<price>{{item.pprice}}</price>
						<view class="a-self-end">
							<uni-number-box :min="item.minnum" :value="item.num" 
							:max="item.maxnum"
							@change="changeNum($event,item,index)">
							</uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 合计 -->
		<view class="d-flex a-center position-fixed left-0 bottom-0 right-0 border-top border-light-secondary"
		style="height: 100rpx; z-index: 100;">
			<label class="radio d-flex a-center j-center flex-shrink">
				<radio color="#FD6801" />
			</label>
		</view>
	</view>
</template>

<script>
	import price from "@/components/common/price.vue"
	export default {
		components: {
			price
		},
		data() {
			return {
				isedit: false,
				list: [{
					checked: false,
					id: 11,
					title: "商品标题111",
					cover: "/static/images/demo/list/1.jpg",
					// 选中商品属性
					attrs: [{
							title: "颜色",
							selected: 0,
							list: [{
									name: '火焰红',
								},
								{
									name: '炭黑',
								},
								{
									name: '冰川兰',
								}
							]
						},
						{
							title: "容量",
							selected: 0,
							list: [{
									name: '64GB',
								},
								{
									name: '128GB',
								},
							]
						},
						{
							title: "套餐",
							selected: 0,
							list: [{
									name: '标配',
								},
								{
									name: '套餐一',
								},
								{
									name: '套餐二',
								}
							]
						},
					],
					pprice: 336,
					num: 1,
					minnum: 1,
					maxnum: 10, // 该商品最大商品数，跟库存有关
				}, ]
			}
		},
		onLoad() {

		},
		methods: {
			changeNum(e,item,index){
				item.num = e
			}
		}
	}
</script>

<style>

</style>
