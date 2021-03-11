import req from '@/utils/req';
// import moment from "moment";
import {message} from 'ant-design-vue'
import {sysTime} from "@/utils/time"

export default {
    namespaced: true,
    state: {
        num:0,
        loading: false,
        body:{
            isReply: 0
        },
        paginationprops:{
            pageSize: 10, 
            current: 1, 
            total: 0
        },
        columns: [
            {
                title: '序号',
                dataIndex: 'sort',
                key: 'sort',
                align: "center",
            },
            // {
            //     title: '建言对象',
            //     dataIndex: 'suggestObject',
            //     key: 'suggestObject',
            //     align: "center",
            // },
            // {
            //     title: '建言类别',
            //     dataIndex: 'suggestType',
            //     key: 'suggestType',
            //     align: "center",
            // },
            {
                title: '代表姓名',
                dataIndex: 'representName',
                key: 'representName',
                align: "center",
            },
            {
                title: '代表团',
                dataIndex: 'representGroupName',
                key: 'representGroupName',
                align: "center",
            },
            // {
            //     title: '电话',
            //     dataIndex: 'representTel',
            //     key: 'representTel',
            //     align: "center",
            // },
            {
                title: '建言时间',
                dataIndex: 'createTime',
                key: 'createTime',
                align: "center",
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: '操作',
                key: 'action',
                scopedSlots: { customRender: 'action' },
                align: "center",
            },
        ],
        data:[
        ]
    },
    getters: {
      
    },
    mutations: {
        addNum(state, p){
            state.num = state.num+1;
        },
        setDatas(state, p){
            state.data = [...p];
        },
        setPage(state, p){
            state.paginationprops = {...state.paginationprops, ...p}
        },
        setBody(state, p){
            state.body = {...p}
        },
        setLoading(state, p){
            state.loading = p;
        }
    },
    actions:{
        addNumAction({commit, state}, p){
            commit("addNum", 1)
        },
        async getDatasPending({dispatch, commit, state}, p=[]){
            dispatch("getDatas")
        },
        async getDatas({commit, state}, p={}){
            try {
                commit("setLoading", true)
                commit("setDatas", []);
                let body = {
                    ...state.body,
                    ...p,
                    ...state.paginationprops,
                };
    
                commit("setBody", body);
                
                let res:any = await req.ajax({
                    method: "post",
                    url: "/suggest/getAllSuggests",
                    body
                })
    
                const { pageSize, current } = state.paginationprops;
                res.list = res.list.map((d, index)=>{
                    let sort = pageSize * (current - 1) + 1 + index;
                    return {
                        ...d,
                        sort, 
                        key: d.suggestId,
                        createTime: sysTime(d.createTime)
                    }
                })
    
                commit("setPage", {total: res.total});
                commit("setDatas", res.list);
            } catch (error) {
            }finally{
                commit("setLoading", false)
            }
        },
        async checked({dispatch, commit, state}, p=[]){
            let body = p.map((d)=>{
                return {
                    remark: "",
                    suggestId: d
                }
            })
            let res:any = await req.ajax({
                method: "post",
                url: "/suggest/approveSuggest",
                body
            })

            dispatch("getDatas")
            message.success('操作成功！');
        },
        async remove({dispatch, commit, state}, id){
            let res:any = await req.ajax({
                method: "get",
                url: `/suggest/deleteSuggest/${id}`,
                body:{}
            })

            dispatch("getDatas")
            message.success('操作成功！');
        },
    }
}
  