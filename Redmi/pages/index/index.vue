<template>
	<view>
		<!-- 轮播图组件 -->
		<swiperImage :resdata="swiper"></swiperImage>
		<!-- 首页分类 -->
		<view class="row j-center m-2">
			<block v-for="(item, index) in indexnavs" :key="index">
				<view class="span-4 d-flex flex-column j-center a-center py-1" @tap="event(item)">
					<image :src="item.src" style="width: 60upx; height: 60upx;" mode="widthFix"></image>
					<text class="font-sm">{{ item.text }}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import swiperImage from '@/components/index/swiper-image.vue';
export default {
	components: {
		swiperImage
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
			]
		};
	},
	methods: {
		event(item) {
			console.log('点击了图标');
		}
	}
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
