<template>
	<view>
		<uni-status-bar />
		<view class="d-flex a-center j-sb py-2 px-3 text-light-muted">
			<view class="iconfont icon-shanchu1" @click="goBack"></view>
			<view class="font-md" @click="forget">忘记密码</view>
		</view>
		
		<view class="p-5">
			<view class="font-big mb-5">密码登录</view>
			<input type="text" class="border-bottom mb-4 uni-input px-0" 
			placeholder="请输入手机号/邮箱/账号"
			placeholder-class="text-light-muted" />
			<input type="text" class="border-bottom mb-4 uni-input px-0"
			placeholder="请输入密码"
			placeholder-class="text-light-muted" />
			<view class="py-2 w-100 d-flex a-center j-center main-bg-color text-white rounded font-md mb-4"
			hover-class="main-bg-hover-color">
				登录
			</view>
			<label class="checkbox d-flex a-center">
				<checkbox value="" />
				<text class="text-light-muted font">已阅读并同意XXXXX协议</text>
			</label>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goBack(){
				uni.navigateBack({
					delta:1
				})
			},
			forget(){
				
			}
		}
	}
</script>

<style>

</style>
