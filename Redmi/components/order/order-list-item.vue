<template>
	<view class="border-bottom d-flex a-center py-2 border-light-secondary"
	@click="open">
		<image :src="item.cover" mode="widthFix"
		style="width: 150rpx; height:150rpx;"
		class="rounded mx-2 flex-shrink">
		</image>
		<view class="flex-1">
			<view class="d-flex a-center font-md text-dark">
				<text>{{item.title}}</text>
				<text class="text-light-muted ml-auto">￥{{item.pprice}}</text>
			</view>
			<view class="d-flex a-center font text-light-muted">
				<text>{{item.attrs}}</text>
				<text class="ml-auto">x{{item.num}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object,
			index:Number
		},
		data(){
			return {
				
			}
		},
		methods:{
			open(){
				uni.navigateTo({
					url:'../../pages/detail/detail'
				})
			}
		}
	}
</script>

<style>
</style>
