<template>
	<view>
		<!-- 收货人 -->
		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				收货人：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.name" />
		</view>
		<!-- 手机号码 -->
		<view class="p-2 d-flex a-center bg-white border-bottom">
			<view class="font-md text-secondary mr-1 flex-shrink">
				手机号码：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.phone" />
		</view>
		<!-- 邮编 -->
		<view class="p-2 d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				邮编：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.zip" />
		</view>

		<divider></divider>

		<!-- 所在地区 -->
		<view class="line-h p-2 border-bottom d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				所在地区：
			</view>
			<input class="px-1 font-md flex-1" type="text" disabled @click="showMulLinkageThreePicker"
				placeholder="请选择所在地区" :value="path" />

			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="pickerValue"
				@onConfirm="onConfirm"></mpvue-city-picker>
		</view>
		<!-- 详细地址 -->
		<view class="p-2 d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				详细地址：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.address" />
		</view>

		<divider></divider>
		<!-- 设为默认地址 -->
		<view class="p-2 d-flex a-center bg-white">
			<view class="font-md text-secondary mr-1 flex-shrink">
				设为默认地址：</view>
			<switch :checked="form.default" class="ml-auto" color="#FD6801"
				@change="form.default = $event.detail.value ? 1 : 0" />
		</view>

		<view class="p-3">
			<view class="text-center w-100 main-bg-color text-white font-md rounded py-2"
				hover-class="main-bg-hover-color" @click="submit">
				保 存
			</view>
		</view>
	</view>
</template>

<script>
	import mpvueCityPicker from "@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue"
	import {
		mapActions
	} from "vuex"
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				themeColor: '#007AFF',
				pickerValue: [0, 0, 1],
				isedit: false,
				index: -1,
				form: {
					zip: "",
					name: "",
					province: "",
					city: "",
					phone: "",
					district: "",
					address: "",
					default: 0
				}
			}
		},
		// 监听返回
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		// 页面卸载
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		onLoad(e) {
			if (e.data) {
				console.log(e.data)
				let result = JSON.parse(e.data)
				this.form = result.item

				this.index = result.index
				this.isedit = true
				uni.setNavigationBarTitle({
					title: "修改收货地址"
				})
			}
		},
		computed: {
			path() {
				if (this.form.province) {
					return this.form.province + '-' + this.form.city + '-' + this.form.district
				}
			}
		},
		methods: {
			...mapActions(['createPathAction', 'updatePathAction']),
			// 提交
			submit() {
				// 验证表单
				// 修改
				if (this.isedit) {

					this.$H.post('/useraddresses/' + this.form.id, this.form, {
						token: true
					}).then(res => {
						this.updatePathAction({
							index: this.index,
							item: this.form
						})
						uni.showToast({
							title: '修改成功'
						});
						uni.navigateBack({
							delta: 1
						})
						uni.$emit('updateUserPathList')

					}).catch(err => {
						uni.showToast({
							title: err + '修改失败啦',
							icon:'none'
						});
						console.log(err + '修改失败啦')

					})
					return;

				}
				// 创建
				this.$H.post('/useraddresses', this.form, {
					token: true
				}).then(res => {
					// 创建成功
					this.createPathAction(this.form)
					uni.showToast({
						title: '创建成功'
					});
					uni.navigateBack({
						delta: 1
					});
				}).catch(err => {
					console.log(err.msg + '创建失败啦')
				})
			},
			// 三级联动确定
			onConfirm(e) {
				// this.form.path = e.label
				let arr = e.label.split('-')
				this.form.province = arr[0]
				this.form.city = arr[1]
				this.form.district = arr[2]
				this.pickerValue = e.value
			},
			// 显示三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			}
		}
	}
</script>

<style>
	page {
		background: #EEEEEE;
	}
</style>
