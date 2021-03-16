<template>
	<view class="card">
		<!-- head -->
		<view class="p-2 border-bottom main-border-color">
			<slot name="title">
				<text class="font-md font-weight">{{headTitle}}</text>
			</slot>
		</view>
		<!-- body -->
		<view>
			<image v-if="bodyCover" :src="bodyCover"
			mode="widthFix"></image>
			<slot/>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			// 头部标题
			headTitle:String,
			// 封面图
			bodyCover:String,
			// 是否显示头部
			showhead:{
				type:Boolean,
				default:true
			}
		}
	}
</script>

<style>

</style>
