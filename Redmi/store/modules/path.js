export default {
	state: {
		list: [],
	},
	getters: {
		// 获取默认地址
		defaultPath: (state) => {
			return state.list.filter(v => v.isdefault)
		}
	},
	mutations: {
		// 覆盖收货地址
		updatePathList(state, {
			refresh,
			list
		}) {
			state.list = refresh ? list : [...state.list, ...list]
		},
		// 创建收货地址
		createPath(state, item) {
			state.list.unshift(item)
		},
		// 删除收货地址
		delPath(state, index) {
			state.list.splice(index, 1)
		},
		// 修改收货地址
		updatePath(state, {
			index,
			item
		}) {
			for (let key in item) {
				state.list[index][key] = item[key]
			}
		},
		// 取消默认地址
		removeDefault(state) {
			state.list.forEach((v) => {
				if (v.isdefault) {
					v.isdefault = false
				}
			})
		}

	},
	actions: {
		// 修改地址
		updatePathAction({
			commit
		}, obj) {
			if (obj.item.default) {
				commit('removeDefault')
			}
			commit('updatePath', obj)
		},
		// 增加地址
		createPathAction({
			commit
		}, item) {
			if (item.isdefault) {
				commit('removeDefault')
			}
			commit('createPath', item)
		}
	}
}
