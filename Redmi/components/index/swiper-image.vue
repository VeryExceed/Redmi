<template>
	<view>
		<swiper indicator-dots autoplay :interval="3000" :duration="1000" circular
		:style="getStyle">
			<block v-for="(item, index) in resdata" :key="index">
				<swiper-item>
					<view class="swiper-item" @tap="event(item,index)">
						<image :src="item.src" lazy-load 
						:style="getStyle"></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props: {
			resdata: Array,
			height: {
				type: String,
				default:"350"
			},
			priview:{
				type:Boolean,
				default:false
			}
		},
		computed: {
			getStyle() {
				return `height:${this.height}rpx;`
			},
			getUrls(){
				return this.resdata.map((v)=> v.src)
			}
		},
		data() {
			return {

			};
		},
		methods: {
			event(item,index) {
				if (this.priview) {
					return uni.previewImage({
						current:index,
						urls:this.getUrls,
						indicator:"default"
					})
				}
			}
		}
	}
</script>

<style>

</style>
