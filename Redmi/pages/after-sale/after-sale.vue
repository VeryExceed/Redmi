<template>
	<view>
		<divider></divider>
		<card headTitle="申请售后产品" cardStyle="background:#FFFFFF">
			<view class="d-flex a-center px-3 py-2">
				<image src="../../static/demo/cate_09.png" mode="widthFix" style="width: 100rpx; height: 100rpx;"></image>
				<view class="flex-1 ml-3 font-md">
					<view>小米8</view>
					<view class="text-light-muted">
						维修服务:剩余100天
					</view>
				</view>
			</view>
		</card>
		<divider></divider>
		<card headTitle="服务类型" bodyPadding cardStyle="background:#FFFFFF">
			<zcm-radio-group :label="label"
			:selected.sync='label.selected'></zcm-radio-group>
		</card>
		<divider></divider>
		<card headTitle="问题描述" bodyPadding cardStyle="background:#FFFFFF">
			<view class="position-relative">
				<textarea placeholder="请详细描述一下你遇到的问题" :maxlength="maxlength" style="width: 100%; height: 400rpx; box-sizing: border-box;" 
				class="border rounded p-2" 
				v-model="content" />
				<view class="position-absolute font" style="right: 10rpx;bottom: 5rpx;"
				:class="remain > 0 ? 'text-light-muted' : 'text-danger'">
					{{remain}}/{{maxlength}}
				</view>
			</view>
		</card>
		
		<view class="p-3">
			<view class="rounded main-bg-color text-white text-center font-md py-2" hover-class="main-bg-hover-color">
				下一步
			</view>
		</view>
	</view>
</template>

<script>
	import card from "@/components/common/card.vue"
	import zcmRadioGroup from "@/components/common/radio-group.vue"
	export default {
		components:{
			card,
			zcmRadioGroup
		},
		data() {
			return {
				content:"",
				maxlength:200,
				label:{
					selected:0,
					list:[
						{name:"维修"}
					]
				}
			}
		},
		computed:{
			// 剩余可输入的字数
			remain(){
				return this.maxlength - this.content.length
			}
		},
		methods: {
			
		}
	}
</script>

<style>
page {
	background: #EEEEEE;
}
</style>
