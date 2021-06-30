export default {
	data(){
		return {
			beforeReady:true,
		}
	},
	onReady() {
		// 当前页面加载完成时
		this.$nextTick(()=>{
			setTimeout(()=>{
				this.beforeReady = false
			},500)
		})
		
	},
}