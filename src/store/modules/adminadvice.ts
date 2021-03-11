import req from '@/utils/req';
import {Alert, message} from 'ant-design-vue'

export default {
    namespaced: true,
    state: {
        disabled: true,
        replyflag: false,
        fileList: [],
        file: {},
        details: {},
    },
    getters: {
        
    },
    mutations: {
        setDisabled(state, p){
            state.disabled = p;
        },
        setDetails(state, p){
            state.details = {...p};
        },
        setFile(state, file){
            state.file = file;
        },
        setFileList(state, fileList){
            state.fileList = [...fileList];
        },
        setReply(state, p){
            state.replyflag = p;
        },
    },
    actions:{
        //详情
        async getDetails({commit, state}, id){
            let res:any = await req.ajax({
                method: "get",
                url: `/suggest/getSuggestDetail/${id}`,
            })
            const { isReply, attachmentName, attachment, suggestId } = res.suggest || {};
            commit("setDetails", res.suggest || {});
            commit("setReply", isReply === 1);
            if(attachment){
                commit("setFile", { attachmentName: attachmentName || attachment, attachment: attachment });
                commit("setFileList", [{ uid: suggestId, name: attachmentName || attachment, url: attachment }]);
            }
        },
        //保存
        async preserv({commit, state}, p){
            let res:any = await req.ajax({
                method: "post",
                url: `/suggest/updateSuggest`,
                body: {...p}
            })

            commit("setDisabled", true);
            message.success('操作成功！');
        },
        //回复
        async reply({commit, state}, p){
            let res:any = await req.ajax({
                method: "post",
                url: `/suggest/createSuggestReply`,
                body: p
            })

            commit("setReply", true);
            message.success('操作成功！');
            history.back();
        },
        //导出
        onExport({commit, state}, id){
            var ua = navigator.userAgent.toLowerCase();  
            //禁止PC端政务微信下载文件，会造成政务微信无响应
            if(ua.indexOf('micromessenger')>0&&ua.indexOf('android')<0) {  
                message.info('请在浏览器中打开下载'); 
            } else {  
                req.fileDownload('get', `/suggest/exportSuggest/${id}`, {});  
            } 
        },
    }
}
  