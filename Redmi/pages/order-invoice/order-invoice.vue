<template>
	<view>
		<divider></divider>
		<card headTitle="发票类型" bodyPadding cardStyle="background:#ffffff;">
			<zcm-radio-group :label="label1"
			:selected.sync='label1.selected'></zcm-radio-group>
			<view class="text-light-muted line-h-md">
				电子发票与纸质发票具有相同的法律效力，可作为报销、售后、维权凭证，推荐使用电子发票，不怕丢失，更方便，环保。
			</view>
		</card>
		<divider></divider>
		<card headTitle="发票抬头" bodyPadding cardStyle="background:#ffffff;">
			<zcm-radio-group :label="label2"
			:selected.sync='label2.selected'></zcm-radio-group>
		</card>
		<divider></divider>
		
		<view class="font-md p-2 border-bottom d-flex a-center bg-white">
			<text>个人姓名：</text>
			<text>个人</text>
		</view>
		<view class="font-md p-2 border-bottom d-flex a-center bg-white">
			<text>发票内容：</text>
			<text>商品明细</text>
		</view>
		<divider></divider>
		<view class="font-md p-2 border-bottom d-flex a-center bg-white">
			<text>发票人手机：</text>
			<text>181*****163</text>
		</view>
		
		<view class="text-light-muted p-2 d-flex flex-column">
			<text>发票须知：</text>
			<text>1.发票为实际支付金额，不包括优惠券等；</text>
			<text>2.电子发票可在订单完成后，在订单详情中查看；</text>
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
				label1:{
					selected:0,
					list:[
						{name:"电子发票"},
					]
				},
				label2:{
					selected:0,
					list:[
						{name:"个人"},
						{name:"单位"},
					]
				}
			}
		},
		methods: {
			
		}
	}
</script>

<style>
page{
	background-color: #EEEEEE;
}
</style>
