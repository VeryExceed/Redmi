<template>
	<view>
		<card :headTitle="item.label" bodyStyle="background:#FFFFFF;"
		v-for="(item,index) in list" :key="index">
			<uni-list-item :title="list.title" v-for="(list,listIndex) in item.value"
			:key="listIndex" @click="navigate(list.path)"></uni-list-item>
		</card>
		<view class="p-3">
			<button type="default" class="bg-white">退出登陆</button>
		</view>
	</view>

</template>

<script>
	import card from "@/components/common/card.vue"
	export default {
		components: {
			card
		},
		data() {
			return {
				list: [
					{
						label: "账户管理",
						value: [{
								title: "个人资料",
								path: "user-userinfo"
							},
							{
								title: "收货地址",
								path: "user-path-list"
							}
						]
					},
					{
						label: "关于",
						value: [{
								title: "关于商城",
								path: ""
							},
							{
								title: "意见反馈",
								path: ""
							},
							{
								title: "协议规则",
								path: ""
							},
							{
								title: "资质证件",
								path: ""
							},
							{
								title: "用户协议",
								path: ""
							},
							{
								title: "隐私政策",
								path: ""
							}
						]
					}
				]
			}
		},
		methods: {
			navigate(path){
				if (!path) return;
				uni.navigateTo({
					url:`/pages/${path}/${path}`
				})
			}
		}
	}
</script>

<style>
	page {
		background: #EEEEEE;
	}
</style>
