<template>
	<view class="d-flex">
		<image :src="resdata[0].src" lazy-load style="width: 373upx;height: 530rpx;border-right: 2rpx solid #F5F5F5;"
			@tap="event(resdata[0])"></image>
		<view class="d-flex flex-column">
			<image :src="resdata[1].src" style="width: 375upx;
			height: 264rpx; border-bottom:2rpx solid #F5F5F5;" @tap="event(resdata[1])"></image>
			<image :src="resdata[2].src"
				style="width: 375upx;height: 264rpx; border-bottom:2rpx solid #F5F5F5;"
				@tap="event(resdata[2])"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			resdata: Object
		},
		onLoad() {
			console.log(resdata)
		},
		methods: {
			event(obj) {
				console.log(obj)
			}
		}
	};
</script>

<style></style>
