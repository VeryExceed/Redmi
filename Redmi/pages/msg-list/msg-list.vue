<template>
	<view class="p-2">
		<view class="mb-2 p-2 bg-white rounded font" hover-class="bg-light"
		v-for="(item,index) in list" :key="index">
			<view class="text-dark font-md">{{item.title}}</view>
			<view class="text-light-muted">
				{{item.desc}}
			</view>
			<view class="text-light-muted">
				{{item.create_time}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						title:"uni-app仿小米商城",
						desc:"多多干货",
						create_time:"2021-06-28"
					},
					{
						title:"uni-app仿小米商城",
						desc:"多多干货",
						create_time:"2021-06-28"
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
page{
	background: #EEEEEE;
}
</style>
