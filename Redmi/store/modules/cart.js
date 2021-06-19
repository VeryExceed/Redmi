export default {
	state: {
		number:1,
		list: [{
				id: 1,
				name: "商品一",
				status: false,
				num: 1
			},
			{
				id: 2,
				name: "商品二",
				status: true,
				num: 5
			},
			{
				id: 3,
				name: "商品三",
				status: false,
				num: 9
			},
			{
				id: 4,
				name: "商品四",
				status: true,
				num: 10
			},
			{
				id: 5,
				name: "商品五",
				status: false,
				num: 15
			},
		]
	},
	getters: {
		activeList: (state) => {
			return state.list.filter(v => {
				return v.status // 找到status为true的
			})
		},
		noActiveList: (state) => {
			return state.list.filter(v => {
				return !v.status // 找到status为false的
			})
		},
		getList: (state, getters) =>{
			return getters.activeList.filter(v=>{
				return v.num>5  // 找到status为true的并且num大于5的数
			})
		},
		getById:(state)=>(id)=>{
			return state.list.filter(v=>{
				return v.id === id // 找到当前id
			})
		}
	},
	mutations: { // 同步的方法
		inc(state,n) {
			state.number += n
			console.log(state.number);
		}
	},
	actions: { // 异步方法
		AsyncInc({commit,state},n){ // 解构方法
			console.log(n);
			setInterval(()=>{
				commit('inc',n)
				console.log(state.number)
			},2000)
		}
	}
}