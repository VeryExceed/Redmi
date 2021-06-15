<template>
	<view>
		<!-- 商品详情大图 -->
		<swiper-image :resdata="banners" height="750" priview />
		<!-- 基础详情 -->
		<base-info :detail="detail"></base-info>
		<!-- 滚动商品特性 w170*h110 -->
		<scroll-attrs :baseAttrs="baseAttrs"></scroll-attrs>
		<!-- 属性选择 -->
		<view class="p-2">
			<view class="rounded border bg-light-secondary">
				<uni-list-item clickable @click="show('attr')" style="background-color: #EEEEEE">
					<view slot="body" class="d-flex">
						<text class="mr-2 text-muted">已选</text>
						<text>火焰红 64G 标配</text>
					</view>
				</uni-list-item>
				<uni-list-item clickable @click="show('express')" style="background-color: #EEEEEE">
					<view slot="body" class="d-flex">
						<text class="mr-2 text-muted">配送</text>
						<text class="mr-2">北京 东城区</text>
						<text class="main-text-color">现配</text>
					</view>
				</uni-list-item>
				<uni-list-item clickable @click="show('service')" style="background-color: #EEEEEE">
					<view slot="body" class="d-flex a-center">
						<view class="text-muted font d-flex a-center mr-2">
							<view class="iconfont icon-finish main-text-color"></view>
							小米自营
						</view>
						<view class="text-muted font d-flex a-center mr-2">
							<view class="iconfont icon-finish main-text-color"></view>
							小米发货
						</view>
						<view class="text-muted font d-flex a-center mr-2">
							<view class="iconfont icon-finish main-text-color"></view>
							七天无理由退货
						</view>
					</view>
				</uni-list-item>
			</view>
		</view>

		<!-- 横向滚动评论 
		外层 w620*h380
		头像 w70*h70
		图片 h115
		-->
		<scroll-comments :comments="comments" />


		<!-- 商品详情 -->
		<view class="py-4">
			<u-parse className="uparse" :content="context" @preview="preview" @navigate="navigate"></u-parse>
		</view>

		<!-- 热门推荐 -->
		<card headTitle="热门推荐" :headTitleWeight="false" :headBorderBottom="false">
			<view class="row j-sb">
				<common-list v-for="(item,index) in hotList" :key="index" :item="item" :index="index"></common-list>
			</view>
		</card>
		<!-- 底部操作条 -->
		<bottom-btn></bottom-btn>
		<!-- 属性筛选框 -->
		<common-popup :popupClass="popup.attr" @hide="hide('attr')">
			<!--
			商品信息(275rpx)
			图片 180*180
			-->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="../../static/images/demo/cate_01.png" mode="widthFix" style="height: 180rpx; width: 180rpx;"
					class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">2365</price>
					<text class="d-block">
						火焰红 64GB 标配
					</text>
				</view>
			</view>
			<!--
			表单部分(660rpx)
			-->
			<scroll-view scroll-y class="w-100" style="height: 660rpx;">
				<card headTitle="颜色" :headTitleWeight="false" :headBorderBottom="false" v-for="(item,index) in selects">
					<zcm-radio-group :label="item" :selected.sync='item.selected'></zcm-radio-group>
				</card>
				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="1" :value="detail.num" @change="detail.num = $event"></uni-number-box>
				</view>
			</scroll-view>
			<!-- 按钮(100rpx) -->
			<view class="main-bg-color text-white font-md d-flex a-center j-center" hover-class="main-bf-hover-color"
				style="height: 100rpx;margin-left: -30rpx; margin-right: -30rpx;" @tap.stop="hide">
				加入购物车
			</view>
		</common-popup>
		<!-- 收货地址 -->
		<common-popup :popupClass="popup.express" @hide="hide('express')">
			<view class="d-flex a-center j-center font-md border-bottom border-light-secondary" style="height: 100rpx;">
				收货地址
			</view>
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<uni-list-item v-for="i in 10" :key="i">
					<view slot="body">
						<view class="iconfont icon-dingwei font-weight font-md">罗喵</view>
						<view class="font text-light-muted">
							广东省广州市天河区
						</view>
					</view>
				</uni-list-item>
			</scroll-view>
			<!--
			 按钮(100rpx)
			 -->
			<view class="main-bg-color text-white font-md d-flex a-center j-center" hover-class="main-bg-hover-color"
				style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="hide('express')">
				选择新的地址
			</view>
		</common-popup>
		<!-- 服务说明 -->
		<common-popup :popupClass="popup.service" @hide="hide('service')">
			<view class="d-flex a-center j-center font-md border-bottom border-light-secondary" style="height: 100rpx;">
				服务说明
			</view>
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<view class="py-1" v-for="(item,index) in servicelist" :key="index">
					<view class="d-flex a-center">
						<view class="iconfont icon-finish main-text-color mr-1"></view>
						{{item.title}}
					</view>
					<template v-if="item.list">
						<text v-for="(item2,index2) in item.list" class="text-light-muted font pl-4 d-block">
							{{item2.explain}}
						</text>
					</template>
					
				</view>
			</scroll-view>
			<!--
			 按钮(100rpx)
			 -->
			<view class="main-bg-color text-white font-md d-flex a-center j-center" hover-class="main-bg-hover-color"
				style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="hide('service')">
				确定
			</view>
		</common-popup>
	</view>
</template>

<script>
	import swiperImage from "@/components/index/swiper-image.vue"
	import baseInfo from "@/components/detail/base-info.vue"
	import scrollAttrs from "@/components/detail/scroll-attrs.vue"
	import scrollComments from "@/components/detail/scroll-comments.vue"
	import uParse from "@/components/uni-ui/uParse/src/wxParse.vue"
	import card from "@/components/common/card.vue"
	import commonList from "@/components/common/common-list.vue"
	import bottomBtn from "@/components/detail/bottom-btn.vue"
	import commonPopup from "@/components/common/common-popup.vue"
	import price from "@/components/common/price.vue"
	import zcmRadioGroup from "@/components/common/radio-group.vue"
	var htmlString = `
	<p>
		<img src="https://i8.mifile.cn/v1/a1/9c3e29dc-151f-75cb-b0a5-c423a5d13926.webp">
		<img src="https://i8.mifile.cn/v1/a1/f442b971-379f-5030-68aa-3b0accb8c2b9.webp">
		<img src="https://i8.mifile.cn/v1/a1/63b700b6-643e-ec18-fdf3-da66b4b4173f.webp">
		<img src="https://i8.mifile.cn/v1/a1/e9dbf276-193e-11c4-99a6-3097fde82350.webp">
		<img src="https://i8.mifile.cn/v1/a1/1249d3ee-2990-a2b4-28d9-f719c2417b1f.webp">
		<img src="https://i8.mifile.cn/v1/a1/97c79915-64b2-808c-53b4-4345652a179f.webp">
		<img src="https://i8.mifile.cn/v1/a1/cd0fbe1e-a1b3-a87a-f4a6-6fb08ec54931.webp">
	</p>
	    `
	export default {
		components: {
			swiperImage,
			baseInfo,
			scrollAttrs,
			scrollComments,
			uParse,
			card,
			commonList,
			bottomBtn,
			commonPopup,
			price,
			zcmRadioGroup
		},
		data() {
			return {
				servicelist: [{
						title: "小米自营"
					},
					{
						title: "小米发货",
						list: [{
							explain: "由小米商城发货"
						}]
					}, {
						title: "七天无理由不退货",
					}, {
						title: "运费说明",
						list: [{
								explain: "不管满多少，就是不包邮;"
							},
							{
								explain: "特殊产品，也是一样;"
							}
						]
					},
				],
				selects: [{
						title: "颜色",
						selected: 0,
						list: [{
								name: "黄色"
							},
							{
								name: "黑色"
							},
							{
								name: "红色"
							},
						]
					},
					{
						title: "容量",
						selected: 0,
						list: [{
								name: "64GB"
							},
							{
								name: "128GB"
							},
						]
					},
					{
						title: "套餐",
						selected: 0,
						list: [{
								name: "标配"
							},
							{
								name: "套餐一"
							},
							{
								name: "套餐二"
							},
						]
					}
				],
				popup: {
					attr: "none",
					express: "none",
					service: "none"
				},
				context: htmlString,
				hotList: [{
						cover: "/static/images/demo/list/1.jpg",
						title: "米家空调",
						desc: "1.5匹变频",
						oprice: 2699,
						pprice: 1399
					},
					{
						cover: "/static/images/demo/list/1.jpg",
						title: "米家空调",
						desc: "1.5匹变频",
						oprice: 2699,
						pprice: 1399
					},
					{
						cover: "/static/images/demo/list/1.jpg",
						title: "米家空调",
						desc: "1.5匹变频",
						oprice: 2699,
						pprice: 1399
					},
					{
						cover: "/static/images/demo/list/1.jpg",
						title: "米家空调",
						desc: "1.5匹变频",
						oprice: 2699,
						pprice: 1399
					},
					{
						cover: "/static/images/demo/list/1.jpg",
						title: "米家空调",
						desc: "1.5匹变频",
						oprice: 2699,
						pprice: 1399
					},
					{
						cover: "/static/images/demo/list/1.jpg",
						title: "米家空调",
						desc: "1.5匹变频",
						oprice: 2699,
						pprice: 1399
					}
				],
				comments: [{
						userpic: "/static/images/demo/demo6.jpg",
						username: "罗喵琳",
						create_time: "2021-05-28",
						goods_num: 123,
						context: "丁尼格菲尔：神说要有光就有了光",
						imglist: [
							"/static/images/demo/demo6.jpg",
							"/static/images/demo/demo6.jpg",
							"/static/images/demo/demo6.jpg"
						]
					},
					{
						userpic: "/static/images/demo/demo6.jpg",
						username: "罗喵",
						create_time: "2021-05-28",
						goods_num: 123,
						context: "评论内容",
						imglist: [
							"/static/images/demo/demo6.jpg",
							"/static/images/demo/demo6.jpg",
							"/static/images/demo/demo6.jpg"
						]
					},
					{
						userpic: "/static/images/demo/demo6.jpg",
						username: "罗喵",
						create_time: "2021-05-28",
						goods_num: 123,
						context: "评论内容",
						imglist: [
							"/static/images/demo/demo6.jpg",
							"/static/images/demo/demo6.jpg",
							"/static/images/demo/demo6.jpg"
						]
					}
				],
				banners: [{
						src: 'https://i8.mifile.cn/v1/a1/6d13e060-d5c5-e610-88d0-80816fa2b0ce.webp'
					},
					{
						src: 'https://i8.mifile.cn/v1/a1/aff0b715-e63a-68f3-91b0-46a22543555e.webp'
					}
				],
				detail: {
					title: "小米MIX3 6GB+128GB",
					desc: "磁动力滑盖全面屏 / 前后旗舰AI双摄 / 四曲面彩色陶瓷机身 / 高效10W无线充电",
					pprice: 3299,
					num: 1,
					max: 100
				},
				baseAttrs: [{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
				]
			}
		},
		// 监听页面返回事件
		onBackPress() {
			// 关闭模态框
			for (let key in this.popup) { // 遍历每一个popup
				// 如果popup[key]不等于none的情况下
				if (this.popup[key] !== 'none') {
					this.hide(key) // 关闭模态框
					return true
				}
			}
		},
		methods: {
			hide(key) {
				this.popup[key] = 'hide'
				setTimeout(() => {
					this.popup[key] = "none"
				}, 200);
			},
			show(key) { // 打开弹出框
				this.popup[key] = 'show'
			},
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				console.log("href: " + href);
			}
		}
	}
</script>

<style>
	.uparse .p {
		padding: 0 !important;
	}

	.uparse view,
	.uparse uni-view {
		line-height: 0 !important;
	}
</style>
