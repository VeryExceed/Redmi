<template>
	<view>
		<!-- 轮播图组件 -->
		<swiperImage :resdata="swiper" />
		<!-- 首页分类 -->
		<indexNav :resdata="indexnavs" />
		<!-- 分割线 -->
		<divider />
		<!-- 三图广告 -->
		<threeAdv :resdata="threeAdv"/>
		<!-- 基础卡片组件 -->
		<view class="card">
			<!-- 标题 -->
			<view class="font-md font-weight p-2 border-bottom main-border-color">
				每日精选
			</view>
			<!-- body -->
			<view>
				<image src="/static/demo/demo4.jpg" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
import swiperImage from '@/components/index/swiper-image.vue';
import indexNav from '@/components/index/index-nav.vue';
import threeAdv from '@/components/index/three-adv.vue';
export default {
	components: {
		swiperImage,
		indexNav,
		threeAdv
	},
	data() {
		return {
			swiper: [{ src: '../../static/images/demo/demo4.jpg' }, { src: '../../static/images/demo/demo4.jpg' }, { src: '../../static/images/demo/demo4.jpg' }],
			indexnavs: [
				{ src: '/static/images/indexnav/1.png', text: '新品发布' },
				{ src: '/static/images/indexnav/2.gif', text: '小米众筹' },
				{ src: '/static/images/indexnav/3.gif', text: '以旧换新' },
				{ src: '/static/images/indexnav/4.gif', text: '一分换团' },
				{ src: '/static/images/indexnav/5.gif', text: '超值特卖' },
				{ src: '/static/images/indexnav/6.gif', text: '小米秒杀' },
				{ src: '/static/images/indexnav/7.gif', text: '真心想要' },
				{ src: '/static/images/indexnav/8.gif', text: '电视热卖' },
				{ src: '/static/images/indexnav/9.gif', text: '家电热卖' },
				{ src: '/static/images/indexnav/10.gif', text: '米粉卡' }
			],
			threeAdv: {
				big: {
					src: '/static/demo/demo1.jpg'
				},
				smalltop: {
					src: '/static/demo/demo2.jpg'
				},
				smallbottom: {
					src: '/static/demo/demo2.jpg'
				}
			}
		};
	},
	methods: {}
};
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
