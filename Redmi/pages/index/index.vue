<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x class="border-bottom scroll-row" 
		style="height: 80rpx;"
		:scroll-into-view="scrollinto"
		:scroll-with-animation="true">
			<view class="scroll-row-item px-3"
			@click="changeTab(index)"
			style="height: 80rpx; line-height: 80rpx;" 
			v-for="(item,index) in tabBars" :key="index"
			:class="tabIndex === index ? 'main-text-color':''"
			:id="'tab'+ index">
				<text class="font-md">{{item.name}}</text>
			</view>
		</scroll-view>
		
		<swiper :current="tabIndex" :duration="150" :style="'height:'+scrollH+'px;'" @change="onChangeTab">
			<swiper-item v-for="(item,index) in tabBars" :key="index">
				<scroll-view scroll-y="true" :style="'height:'+scrollH+'px;'">
					<!-- 轮播图组件 -->
					<swiperImage :resdata="swiper" />
					<!-- 首页分类 -->
					<indexNav :resdata="indexnavs" />
					<!-- 分割线 -->
					<divider />
					<!-- 三图广告 -->
					<threeAdv :resdata="threeAdv" />
					<!-- 大图广告位 -->
					<card headTitle="每日精选" bodyCover="/static/demo/demo4.jpg" />
					<!-- 公共列表组件 -->
					<view class="row j-sb">
						<block v-for="(item, index) in commonList" :key="index"><common-list :item="item" :index="index" /></block>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	
		
	</view>
</template>

<script>
import swiperImage from '@/components/index/swiper-image.vue';
import indexNav from '@/components/index/index-nav.vue';
import threeAdv from '@/components/index/three-adv.vue';
import card from '@/components/common/card.vue';
import commonList from '@/components/common/common-list.vue';
export default {
	components: {
		swiperImage,
		indexNav,
		threeAdv,
		card,
		commonList
	},
	data() {
		return {
			scrollinto:"",
			scrollH: 500,
			tabIndex: 0,
			tabBars: [
				{
					name: '关注',
					id: 'guanzhu',
					template: 'index'
				},
				{
					name: '推荐',
					id: 'tuijian',
					template: 'special'
				},
				{
					name: '体育',
					id: 'tiyu',
					template: 'special'
				},
				{
					name: '热点',
					id: 'redian',
					template: 'special'
				},
				{
					name: '财经',
					id: 'caijing',
					template: 'special'
				},
				{
					name: '娱乐',
					id: 'yule',
					template: 'special'
				},
				{
					name: '军事',
					id: 'junshi',
					template: 'special'
				},
				{
					name: '历史',
					id: 'lishi',
					template: 'special'
				},
				{
					name: '本地',
					id: 'bendi',
					template: 'special'
				}
			],
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
			},
			commonList: [
				{
					cover: '/static/images/demo/list/1.jpg',
					title: '小米手机',
					desc: '小米8',
					oprice: '2699',
					pprice: '1399'
				},
				{
					cover: '/static/images/demo/list/1.jpg',
					title: '小米手机',
					desc: '小米8',
					oprice: '2699',
					pprice: '1399'
				},
				{
					cover: '/static/images/demo/list/1.jpg',
					title: '小米手机',
					desc: '小米8',
					oprice: '2699',
					pprice: '1399'
				},
				{
					cover: '/static/images/demo/list/1.jpg',
					title: '小米手机',
					desc: '小米8',
					oprice: '2699',
					pprice: '1399'
				}
			]
		};
	},
	onLoad() {
		// 获取可视区域高度
		uni.getSystemInfo({
			success: (res) => {
				this.scrollH = res.windowHeight - uni.upx2px(82) //upx 换算为 px 
			}
		})
	},
	methods: {
		// 切换选项卡
		changeTab(index){
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex = index
			this.scrollinto = 'tab' + index
		},
		// 监听滑动列表
		onChangeTab(e) {
			this.changeTab(e.detail.current)
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
