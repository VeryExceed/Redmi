export default {
	state:{
		list:[
			{
				name:"罗喵",
				phone:"181****163",
				path:"广东省 广州市 白云区",
				detailPath:"XXXXX街道",
				isdefault:false
			},
			{
				name:"summer",
				phone:"158****531",
				path:"广东省 广州市 白云区",
				detailPath:"XXXXX街道",
				isdefault:false
			}
		],
	},
	mutations:{
		// 创建收货地址
		createPath(state,item){
			state.list.unshift(item)
		},
		// 删除收货地址
		delPath(state,index){
			state.list.splice(index,1)
		},
		// 修改收货地址
		updatePath(state,{index,item}){
			for (let key in item) {
				state.list[index][key] = item[key]
			}
		}
	}
}