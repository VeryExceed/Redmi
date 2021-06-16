<template>
	<view>
		 <view class="d-flex bg-white border-top position-fixed bottom-0 left-0 right-0" style="height: 90upx;">
		 	<view class="flex-1 d-flex j-center a-center flex-column line-h">
		 		<view class="iconfont icon-xihuan line-h"></view>
				<text  class="mt">收藏</text>
		 	</view>
			<view class="flex-1 d-flex j-center a-center flex-column line-h">
				<view class="iconfont icon-gouwuche line-h"></view>
				<text class="mt">购物车</text>
			</view>
			<view style="flex:2.5" class="text-white main-bg-color d-flex j-center a-center" hover-class="main-bg-hover-color">
				加入购物车
			</view>
		 </view>
	</view>
</template>

<script>
	import {mapState,mapGetters} from "vuex"
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			// console.log(JSON.stringify(this.$store.state.list));
			// console.log(JSON.stringify(this.list));
			// console.log(JSON.stringify(this.newList));
			
			// console.log(JSON.stringify(this.$store.getters.activeList));
			console.log(JSON.stringify(this.active));
			console.log(JSON.stringify(this.noActive));
			console.log(JSON.stringify(this.getList));
			console.log(JSON.stringify(this.getById(1)));
		},
		// computed:mapState({
		// 	list:state => state.list,
		// 	list:"list",
		// 	newList(state) {
		// 		return state.list.filter(v=> v.status)
		// 	}
		// }),
		computed:{
			// ...mapState({
			// 	list:state => state.list,
			// 	list:"list",
			// 	newList(state){
			// 		return state.list.filter(v=> v.status)
			// 	}
			// })
			// ...mapState([
			// 	'list'  // 通过数组的形式
			// ])
			...mapGetters({
				active:'activeList',
				noActive:'noActiveList',
				getList:'getList',
				getById:'getById'
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
