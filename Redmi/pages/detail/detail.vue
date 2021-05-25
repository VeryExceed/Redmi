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
				<!-- <uni-list> -->
					<uni-list-item style="background-color: #EEEEEE">
						<view slot="body" class="d-flex">
							<text class="mr-2 text-muted">已选</text>
							<text>火焰红 64G 标配</text>
						</view>
					</uni-list-item>
				<!-- </uni-list> -->
			</view>
		</view>
		
		<!-- 横向滚动评论 -->
		
		<!-- 商品详情 -->
		<!-- 热门推荐 -->
	</view>
</template>

<script>
	import swiperImage from "@/components/index/swiper-image.vue"
	import baseInfo from "@/components/detail/base-info.vue"
	import scrollAttrs from "@/components/detail/scroll-attrs.vue"
	// import uniListItem from "@/components/uni-ui/uni-list/components/uni-list-item/uni-list-item.vue"

	export default {
		components: {
			swiperImage,
			baseInfo,
			scrollAttrs,
			// uniListItem,
		},
		data() {
			return {
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
					pprice: 3299
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
		methods: {

		}
	}
</script>

<style>

</style>
