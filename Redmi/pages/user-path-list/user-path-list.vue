<template>
	<view>
		<uni-swipe-action>
			<!-- 基础用法 -->
			<uni-swipe-action-item :right-options="options" @click="bindClick($event,index)"
				v-for="(item,index) in list" :key="index">
				<uni-list-item>
					<view class="text-secondary">
						<view class="d-flex a-center">
							<text class="main-text-color">{{item.name}}</text>
							{{item.phpne}}
							<text class="main-text-color" v-if="item.isdefault">[默认]</text>
						</view>
						<view>
							{{item.path}}
						</view>
						<view>
							{{item.detailPath}}
						</view>
					</view>
				</uni-list-item>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {

			return {
				options: [{
					text: '修改',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		// 监听导航栏按钮点击
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.navigateTo({
					url: '../user-path-edit/user-path-edit'
				})
			}
		},
		computed: {
			...mapState({
				list: state => state.path.list
			}) 
		},
		methods: {
			...mapMutations(['delPath']),
			bindClick(value, i) {
				switch (value.index) {
					case 0: // 修改
					let obj = JSON.stringify({
						index:i,
						item:this.list[i]
					})
					setTimeout(()=>{
						uni.navigateTo({
							url: '../user-path-edit/user-path-edit?data='+obj,
						});
					})
						break;
					case 1: //删除
						uni.showModal({
							content: '要删除该收货地址吗？',
							success: (res) => {
								if (res.confirm) {
									this.delPath(i)
									uni.showToast({
										title: '删除成功'
									});
								}
							}
						})
						break;
				}
			}
		}
	}
</script>

<style>

</style>
