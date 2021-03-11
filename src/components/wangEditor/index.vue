<template>
    <div class="editorDiv">
        <!-- <div ref="editor">
        </div>    
        <div class="sizeDiv">
            <p :class="showWarning?'red':''" style="text-align: right;"><span class="moreMsg" v-if="showWarning">{{"超出内容提交时会删掉!"}}</span> {{ size }}/{{maxSize}}</p>
        </div>
        <div v-show="readOnly" class="quillDis">
        </div> -->
    </div>
</template>

<script>
// import wangeditor from "wangeditor"

// export default {
//     name: "editor",
//     data(){
//         return{
//             readOnly: !!this.disabled,
//             editor: null,
//             size: 0,
//             showWarning: false,
//             maxSize: 5000,
//             isPC: /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
//         }
//     },
//     props: ["value", "disabled", "valuePorps"],
//     watch:{
//         disabled(val){
//             if(val == true){
//                 this.editor.disable()
//             }else{
//                 this.editor.enable()
//             }
//             this.readOnly = !!val;
//         },
//         value(val){
//             // console.log("@@@@@", val)
//             // if(val == undefined){
//             //     this.editor.txt.html('<p><br></p>') 
//             // }
//         },
//         valuePorps(val){
//             this.editor.txt.html(val)
//         }
//     },
//     mounted(){
//         this.editor = new wangeditor(this.$refs.editor)

//         this.editor.config.showLinkImg = false //插入网络图片
//         this.editor.config.uploadImgShowBase64 = false // base 64 存储图片
//         this.editor.config.uploadImgServer = '/qgrd/suggest/api/file/upload'// 配置服务器端地址
//         this.editor.config.uploadImgHeaders = { }// 自定义 header
//         this.editor.config.uploadFileName = 'file' // 后端接受上传文件的参数名
//         this.editor.config.uploadImgMaxSize = 10 * 1024 * 1024 // 将图片大小限制为 2M
//         this.editor.config.uploadImgMaxLength = 1 // 限制一次最多上传 3 张图片
//         this.editor.config.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
//         this.editor.config.zIndex = 999 //层级

//         // 配置菜单
//         this.editor.config.menus = [
//         //   'head', // 标题
//           'bold', // 粗体
//         //   'fontSize', // 字号
//         //   'fontName', // 字体
//         //   'italic', // 斜体
//           'underline', // 下划线
//           'strikeThrough', // 删除线
//           'foreColor', // 文字颜色
//         //   'backColor', // 背景颜色
//         //   'link', // 插入链接
//         //   'list', // 列表
//         //   'justify', // 对齐方式
//         //   'quote', // 引用
//         //   'emoticon', // 表情
//           'image', // 插入图片
//         //   'table', // 表格
//         //   'video', // 插入视频
//         //   'code', // 插入代码
//           'undo', // 撤销
//           'redo', // 重复
//           'fullscreen' // 全屏
//         ]

//         this.editor.menus.bold = {
//             // normal 配置正常状态下显示的UI
//             normal: '<button style="color:red; font-size:20px; margin-top:5px;">B1</button>',
//             // selected 配置选中状态下的UI，.selected 说明菜单在选中状态下要增加一个 selected class
//             selected: '.selected'
//         };

//         this.editor.config.uploadImgHooks = {
//             fail: (xhr, editor, result) => {
//                 // 插入图片失败回调
//             },
//             success: (xhr, editor, result) => {
//                 // 图片上传成功回调
//             },
//             timeout: (xhr, editor) => {
//                 // 网络超时的回调
//             },
//             error: (xhr, editor) => {
//                 // 图片上传错误的回调
//             },
//             customInsert: (insertImg, result, editor) => {
//                 // 图片上传成功，插入图片的回调
//                 //result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
//                 // console.log(result.data[0].url)
//                 //insertImg()为插入图片的函数
//                 //循环插入图片
//                 // for (let i = 0; i < 1; i++) {
//                 insertImg(result.data.url)
//                 // }
//             }
//         }

//         let initSize = (text, html, isSend)=>{
//             this.size = text.length;
            
//             if(this.size > this.maxSize){
//                 this.showWarning = true;
//             }else{
//                 this.showWarning = false;
//                 isSend && this.$emit('on-change', {
//                     html,
//                     text
//                 }) // 将内容同步到父组件中
//                 isSend && this.$emit('change', html);
//             }
//         }

//         let stm;
//         this.editor.config.onchange = (html) => {
//             clearTimeout(stm)
//             stm = setTimeout(()=>{
//                 let text = this.editor.txt.text() || "";
//                 initSize(text, html, true)
//             }, 200)
//         }
        
//         this.editor.create()

//         if(this.disabled){
//             this.editor.disable();
//         }

//         this.editor.txt.html(this.value)

//         setTimeout(()=>{
//             initSize(this.editor.txt.text() || "", this.value, false)
//         },200)

//         this.$emit("init", this.editor)

//         this.init();
        
//     },
//     beforeDestroy() {
//         // 销毁编辑器
//         this.editor.destroy()
//         this.editor = null
//     },
//     methods:{
//         init(){
//             document.getElementsByClassName("w-e-icon-bold")[0] && document.getElementsByClassName("w-e-icon-bold")[0].parentNode.setAttribute("title", "加粗")
//             document.getElementsByClassName("w-e-icon-underline")[0] && document.getElementsByClassName("w-e-icon-underline")[0].parentNode.setAttribute("title", "下划线")
//             document.getElementsByClassName("w-e-icon-strikethrough")[0]&&document.getElementsByClassName("w-e-icon-strikethrough")[0].parentNode.setAttribute("title", "删除线")
//             document.getElementsByClassName("w-e-icon-image")[0]&&document.getElementsByClassName("w-e-icon-image")[0].parentNode.setAttribute("title", "图片")
//             // document.getElementsByClassName("w-e-icon-table2")[0].parentNode.setAttribute("title", "表格")
//             document.getElementsByClassName("w-e-icon-undo")[0]&&document.getElementsByClassName("w-e-icon-undo")[0].parentNode.setAttribute("title", "撤销")
//             document.getElementsByClassName("w-e-icon-redo")[0]&&document.getElementsByClassName("w-e-icon-redo")[0].parentNode.setAttribute("title", "恢复")
//             document.getElementsByClassName("w-e-icon-fullscreen")[0]&&document.getElementsByClassName("w-e-icon-fullscreen")[0].parentNode.setAttribute("title", "全屏")
            
//         }
//     }
// }
</script>

<style lang="less" scoped>
.editorDiv{
    position: relative;
}
.sizeDiv{
    position: absolute;
    right: 0;
    line-height: 20px !important;
}
.red{
    color: #f5222d;
}
.moreMsg{
    margin-right: 10px;
}
.quillDis{
    background: #f5f5f5;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    opacity:0.5;
}
</style>