<template>
	<view>
		<!-- 排序|筛选 -->
		<view class="d-flex border-top border-bottom border-light-secondary a-center position-fixed top-0 left-0 right-0 bg-white" style="height: 100rpx; z-index: 100;">
			<view class="flex-1 d-flex a-center j-center font-md" v-for="(item,index) in screen.list" :key="index"
				@tap="changeScreen(index)">
				<text :class="screen.currentIndex === index ? 'main-text-color':'text-muted'">{{item.name}}</text>
				<view>
					<view class="iconfont icon-paixu-shengxu line-h0"
						:class="item.status === 1 ? 'main-text-color':'text-light-muted'">
					</view>
					<view class="iconfont icon-paixu-jiangxu line-h0"
						:class="item.status === 2 ? 'main-text-color' :'text-light-muted'">
					</view>
				</view>
			</view>
			<view class="flex-1 d-flex a-center j-center main-text-color font-md" @click="showDrawer">筛选</view>
		</view>
		<view style="height: 100rpx;"></view>
		<!-- 抽屉 -->

		<uni-drawer ref="showRight" mode="right" :mask-click="true" :width="300">
			<card headTitle="价格范围" :headBorderBottom="false" :headTitleWeight="false">
				<!-- 单选按钮组 -->
				<zcm-radio-group :label="label" :selected.sync='label.selected'></zcm-radio-group>
			</card>
			<!-- 按钮 -->
			<view class="d-flex position-fixed bottom-0 right-0 w-100 border-top border-light-secondary">
				<view class="flex-1 main-bg-color text-white font-md py-2 text-center" hover-class="main-bg-hover-color"
					@click="confirm">
					确定
				</view>
				<view class="flex-1 font-md py-2 text-center" hover-class="bg-light-secondary" @click="reset">
					重置
				</view>
			</view>
		</uni-drawer>
		<!-- 列表 -->
		<block v-for="(item,index) in list" :key="index">
			<search-list :item="item" :index="index"></search-list>
		</block>
		<!-- 没有数据 -->
		<no-thing v-if="list.length === 0 " msg="没有这个商品"></no-thing>
		<!-- 上拉加载更多 -->
		<divider />
		<view class="d-flex a-center j-center text-light-muted font-md py-3">
			{{loadtext}}
		</view>
	</view>
</template>

<script>
	import card from "@/components/common/card.vue"
	import zcmRadioGroup from "@/components/common/radio-group.vue"
	import searchList from "@/components/search-list/search-list.vue"
	import noThing from "@/components/common/no-thing.vue"
	export default {
		components: {
			card,
			zcmRadioGroup,
			searchList,
			noThing
		},
		data() {
			return {
				// 1.上拉加载更多 2.加载中... 3.没有更多了
				loadtext: "上拉加载更多",
				keyword: "",
				page: 1,
				screen: {
					currentIndex: 0,
					list: [{
							name: "综合",
							status: 2,
							key: "all"

						},
						{
							name: "销量",
							status: 0,
							key: "sale_count"
						},
						{
							name: "价格",
							status: 0,
							key: "min_price"
						},
					],

				},
				label: {
					selected: 0,
					list: [{
							name: "不限",
							rule: false,
							value: false
						}, {
							name: "0-50",
							rule: "between",
							value: "0,50"
						},
						{
							name: "50-100",
							rule: "between",
							value: "50,100"
						},
						{
							name: "100-500",
							rule: "between",
							value: "100,500"
						},
						{
							name: "500-1000",
							rule: "between",
							value: "500,1000"
						},
						{
							name: "大于1000",
							rule: ">",
							value: "1000"
						},
					]
				},
				list: [],
				condition: {},
				oldSelected: 0
			}
		},
		computed: {
			// 排序相关
			options() {
				let obj = this.screen.list[this.screen.currentIndex]
				let value = obj.status === 1 ? 'asc' : 'desc'
				return {
					[obj.key]: value
				}
			},

		},
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text
		},
		onNavigationBarSearchInputConfirmed() {
			this.search()
		},
		onNavigationBarButtonTap() {
			this.search()
		},
		onLoad(e) {
			this.keyword = e.keyword
			// 加载数据
			this.getData()
		},
		onPullDownRefresh() {
			this.getData(true, () => {
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				})
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			// 是否处于加载状态
			if (this.loadtext !== '上拉加载更多') return
			// 改变加载状态
			this.loadtext = '加载中...'
			this.page++
			// 请求数据
			this.getData(false)
		},
		methods: {
			// 初始化搜索
			initSearch(){
				this.label.selected = 0
				this.condition = {},
				this.page = 1 
			},
			// 搜索记录
			search(){
				if (this.keyword === ''){
					return uni.showToast({
						title:'关键词不能为空',
						icon:'none'
					})
				}
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
				// #ifndef APP-PLUS
				uni.hideKeyboard()
				// #endif
				this.addHistory()
				this.initSearch()
				this.getData()
			},
			addHistory(){
				// 拿到所有的搜索历史
				let history = uni.getStorageSync('searchHistory')
				history = history ? JSON.parse(history) : []
				// 判断之前是否有这个搜索记录
				let index = history.indexOf(this.keyword)
				if (index === -1) {
					history.unshift(this.keyword)
				}else {
					history.unshift(history.splice(index,1)[0])
				}
				uni.setStorageSync('searchHistory',JSON.stringify(history))
			},
			// 加载数据
			getData(refresh = true, callback = false) {
				let page = refresh ? 1 : this.page
				this.$H.post('/goods/search', {
					title: this.keyword,
					page: page,
					...this.options,
					...this.condition
				}).then(res => {
					console.log(res)
					let list = this.format(res)
					this.list = refresh ? [...list] : [...this.list, ...list]

					// 恢复加载状态
					this.loadtext = res.length < 10 ? '没有更多了' : '上拉加载更多'
					if (typeof callback === 'function') {
						callback()
					}
				})
			},
			// 格式化数据
			format(res) {
				return res.map(item => {
					var good_num = item.comments_count === 0 ? 0 : (item.comments_good_count / item
						.comments_count) * 100
					return {
						id: item.id,
						title: item.title,
						titlepic: item.cover,
						desc: item.desc,
						pprice: item.min_price,
						comment_num: item.comments_count,
						good_num: good_num.toFixed(2) + '%'
					}
				})
			},
			changeScreen(index) {
				// 判断当前点击是否已经是激活状态
				let oldIndex = this.screen.currentIndex
				let oldItem = this.screen.list[oldIndex]
				if (oldIndex === index) {
					console.log(oldItem)
					return oldItem.status = oldItem.status === 1 ? 2 : 1
					// 加载数据
					this.getData()
					return
				}
				let newIitem = this.screen.list[index]
				// 移除旧的激活状态

				oldItem.status = 0
				this.screen.currentIndex = index
				// 增加新激活状态 
				newIitem.status = 1
				// 加载数据
				this.getData()
			},
			// 打开抽屉
			showDrawer() {
				this.$refs.showRight.open();
				// 记录旧的值
				this.oldSelected = this.label.selected
			},
			// 关闭抽屉
			closeDrawer() {
				// 恢复原来的值
				this.label.selected = this.oldSelected
				this.$refs.showRight.close();
				this.oldSelected = 0
			},
			// 提交筛选条件
			confirm() {
				// 组织筛选条件
				this.getCondition()
				// 获取数据
				this.getData()
				// 关闭抽屉
				this.closeDrawer()
			},
			// 重置
			reset() {
				this.condition = {}
				this.label.selected = 0
				// 获取数据
				this.getData()
				// 关闭抽屉
				this.closeDrawer()
			},
			// 组织价格筛选条件
			getCondition() {
				let item = this.label.list[this.label.selected]
				this.condition = (item.rule && item.value) ? {
					price:item.rule+','+item.value
				} : {}
			}
		}
	}
</script>

<style>

</style>
