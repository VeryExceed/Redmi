export default {
	// 更新tabbar角标
	updateCartBadge(count){
		if (count > 0 ){
			return uni.setTabBarBadge({
				index:2,
				text:count.toString()
			})
		}
		uni.removeTabBarBadge({
			index:2
		})
	}
}