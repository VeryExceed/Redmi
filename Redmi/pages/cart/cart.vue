<template>
	<view class="animated fadeIn faster" style="background: #F5F5F5;">

		<loading-plus v-if="beforeReady"></loading-plus>

		<uni-nav-bar :right-text="isedit?'完成':'编辑'" title="购物车" :fixed="true" statusBar :shadow="false"
			@clickRight="isedit = !isedit"></uni-nav-bar>
		<!-- 购物车为空 -->
		<view v-if="disableSelectAll" class="py-5 d-flex a-center j-center bg-white">
			<view class="iconfont icon-gouwuche text-light-muted" style="font-size: 50rpx;"></view>
			<text class="text-light-muted mx-1">购物车为空</text>
			<view class="px-2 py-1 border border-light-secondary rounded" hover-class="bg-light-secondary">
				去逛逛
			</view>
		</view>

		<!-- 购物车商品列表 -->
		<view class="bg-white px-2" v-else>
			<!-- 列表 -->
			<view class="d-flex a-center py-3 border-bottom border-light-secondary" 
			v-for="(item,index) in list" :key="index">
				<label class="radio d-flex a-center j-center" style="width: 80rpx; height: 80rpx;"
					@click="selectItem(index)">
					<radio :value="item.id" :checked="item.checked" color="#FD6801" />
				</label>

				<image :src="item.cover" mode="widthFix" style="height: 150rpx;width: 150rpx;"
					class="border border-light-secondary rounded p-1 flex-shrink">
				</image>

				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark" style="font-size: 35rpx;">
						{{item.title}}
					</view>
					<!-- 规格属性 -->
					<view class="d-flex text-light-muted mb-1"
					:class="isedit ? ' p-1 bg-light-secondary mb-2' : ''"
					@tap.stop="showPopup(index,item)"
					v-if="item.skus_type === 1">
						{{item.skusText}}
						<view class="iconfont icon-bottom font ml-auto"
						v-if="isedit"></view>
					</view>
					<view class="mt-auto d-flex j-sb">
						<price>{{item.pprice}}</price>
						<view class="a-self-end">
							<uni-number-box :min="item.minnum" :value="item.num" :max="item.maxnum"
								@change="changeNum($event,item,index)">
							</uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 为你推荐 -->
		<view class="text-center main-text-color font-md font-weight mt-5">
			为你推荐
		</view>
		<view class="position-relative d-flex a-center j-center text-secondary mb-3 pt-3">
			<view style="background: #F5F5F5; z-index: 2;" class="px-2 position-absolute">
				买的人还买了</view>
			<view class="position-absolute" style="height: 1rpx;left: 0;right: 0; background-color: #DDDDDD;"></view>
		</view>
		<view class="row j-sb bg-white">
			<common-list v-for="(item,index) in hotList" :key="index" :item="item" :index="index">
			</common-list>
		</view>

		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		<!-- 合计 -->
		<view
			class="d-flex a-center position-fixed left-0 right-0 bottom-0 border-top border-light-secondary a-stretch bg-white"
			style="height: 100rpx; z-index: 1000; bottom: var(--window-bottom,0);">
			<label class="radio d-flex a-center j-center flex-shrink" style="width: 120rpx;" @click="doSelectAll">
				<radio color="#FD6801" :disabled="disableSelectAll" :checked="checkedAll" />
			</label>
			<template v-if="!isedit">
				<view class="flex-1 d-flex a-center j-center font-md">
					合计 <price>{{totalPrice}}</price>
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-md"
					hover-class="main-bg-hover-color" @click="orderConfirm">
					结算
				</view>
			</template>
			<template v-else>
				<view class="flex-1 d-flex a-center j-center font-md main-bg-color text-white">
					移入收藏
				</view>
				<view @tap="doDelGoods" class="flex-1 d-flex a-center j-center bg-danger text-white font-md"
					hover-class="main-bg-hover-color">
					删除
				</view>
			</template>
		</view>
		<!-- 属性筛选框 -->
		<sku-popup></sku-popup>
	</view>
</template>

<script>
	import loading from "@/common/mixin/loading.js"
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from "vuex"
	import price from "@/components/common/price.vue"
	import commonList from "@/components/common/common-list.vue"
	import skuPopup from "@/components/cart/sku-popup.vue"
	export default {
		mixins: [loading],
		components: {
			price,
			commonList,
			skuPopup
		},
		data() {
			return {
				isedit: false,
				hotList: []
			}
		},
		computed: {
			...mapState({
				list: state => state.cart.list,

			}),
			...mapGetters([
				'checkedAll',
				'totalPrice',
				'disableSelectAll',
			])
		},
		onShow() {
			this.getData()
		},
		methods: {
			...mapActions([
				'doSelectAll',
				'doDelGoods',
				'doShowPopup',
			]),
			...mapMutations([
				'selectItem',
				'initCartList'
			]),
			changeNum(e,item,index){
				if (item.num === e) return;
				uni.showLoading({
					title:"加载中..."
				})
				this.$H.post('/cart/updatenumber/'+item.id,{
					num:e
				},{
					token:true
				}).then(res=>{
					console.log(res);
					item.num = e
					uni.hideLoading()
				}).catch(err=>{
					console.log(err + '失败啦')
				})
			},
			// 订单结算
			orderConfirm() {
				uni.navigateTo({
					url: '../order-confirm/order-confirm'
				})
			},
			showPopup(index,item){
				this.$H.get('/cart/'+item.id+'/sku',{},{
					token:true
				}).then(res=>{
					if (this.isedit) {
						this.doShowPopup({
							index,
							data:res
						})
					}
				})
			},
			// 获取数据
			getData() {
				// 获取购物车
				this.$H.get('/cart', {}, {
					token: true,
					toast: false
				}).then(res => {
					console.log(res)
					this.initCartList(res)
				})
				// 获取热门推荐
				this.$H.get('/goods/hotlist').then(res => {
					this.hotList = res.map(v => {
						return {
							id: v.id,
							cover: v.cover,
							title: v.title,
							desc: v.desc,
							oprice: v.min_oprice,
							pprice: v.min_price
						}
					})
				})
			}
		}
	}
</script>

<style>

</style>
