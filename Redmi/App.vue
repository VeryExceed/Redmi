<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// 初始化登录状态
			this.$store.commit('initUser')
			// 更新购物车数据
			this.$store.dispatch('updateCartList')
			// 监听购物车更新
			uni.$on('updateCart',()=>{
				this.$store.dispatch('updateCartList')
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "/common/uni.css";
	/*官方ui库 */
	@import "/common/animate.css";
	/*自定义图标库 */
	@import "/common/icon.css";
	/* UI基础库 */
	@import "/common/zcm-main.css";
	/*公共样式 */
	@import "/common/common.css";
</style>
