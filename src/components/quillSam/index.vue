<template>
    <div class="pre">
        <quill-editor ref="myQuillEditor" @change="onEditorChange" v-model="content" :options="editorOption" class="quillDiv"></quill-editor>
        <div class="sizeDiv">
            <p :class="showWarning?'red':''" style="text-align: right;"><span class="moreMsg" v-if="showWarning">{{"超出内容提交时会删掉!"}}</span> {{ size }}/{{maxSize}}</p>
        </div>
        <div v-show="readOnly" class="quillDiv quillDis">
        </div>
        <input type="file" accept="image/*" id="quillUpload" style="display: none" ref="upload" @change="uploadChange"/>
    </div>
</template>


<script>
/* https://www.kancloud.cn/liuwave/quill/1409383 */
import req from "@/utils/req"
let stm;
export default {
    data() {
        return {
            content: this.value || "",
            size: 0,
            showWarning: false,
            maxSize: 10000,
            editorOption: {
                readOnly: true,
                debug: 'warn',
                modules: {
                    toolbar:{
                        container: [
                            [
                                // { 'header': 1 }, 
                                // { 'header': 2 },
                                'bold', 
                                'italic', 
                                'underline', 
                                'strike',
                                { 'color': [] }, 
                                // { 'background': [] },
                                // { 'list': 'ordered'}, 
                                // { 'list': 'bullet' }, 
                                // { 'align': [] }, 
                                "image"
                            ],
                        ],
                        handlers: {
                            image: function (value) {
                                if (value) {
                                // 调用iview图片上传
                                // document
                                //     .querySelector(".quillEditerClass .el-icon-plus")
                                //     .click();
                                    // this.$refs.upload.click();
                                    document.getElementById("quillUpload").click()
                                } else {
                                this.quill.format("image", false);
                                }
                            },
                        },
                    }
                    // toolbar: [
                    //     [
                    //         // { 'header': 1 }, 
                    //         // { 'header': 2 },
                    //         'bold', 
                    //         'italic', 
                    //         'underline', 
                    //         'strike',
                    //         { 'color': [] }, 
                    //         // { 'background': [] },
                    //         // { 'list': 'ordered'}, 
                    //         // { 'list': 'bullet' }, 
                    //         // { 'align': [] }, 
                    //         "image"
                    //     ],        // toggled buttons
                    // ]
                },
                placeholder: '请输入内容',
                theme: 'snow'
            },
            readOnly: !!this.disabled
        }
    },
    props: ["value", "disabled", "valuePorps"],
    watch:{
        disabled(val){
            this.readOnly = !!val
        },
        value(val){
            // console.log("@@@@@", val)
            // if(val == undefined){
            //     this.editor.txt.html('<p><br></p>') 
            // }
            this.content = val;
        },
        valuePorps(val){
            this.content = val;
        }
    },
    methods:{
        async uploadChange(e){
            // console.log("@@@@@@", e)
            const input = e.target;
            const files = e.target.files;

            let formData = new FormData(); // 每次失败要重置formdata对象
            formData.append('file', files[0]);

            let result = await req.ajax({
                method: "post",
                url: "/file/upload",
                body: formData
            })

            // console.log("@@@@@@@@@@@@@@@", result, result.url)

            let quill = this.$refs.myQuillEditor.quill;
            // 获取光标所在位置
            let length = quill.getSelection().index;
            // 插入图片，res为服务器返回的图片链接地址
            quill.insertEmbed(
                length,
                "image",
                result.url
                // "https://static001.geekbang.org/resource/image/9f/28/9f68cbdfd275739a1cd3a4dfa85ead28.jpg"
            );
            // 调整光标到最后
            quill.setSelection(length + 1);
            
        },
        initSize(text, html, isSend){
            this.size = text.length-1;
            if(this.size > this.maxSize){
                this.showWarning = true;
            }else{
                this.showWarning = false;
                isSend && this.$emit('on-change', {
                    html,
                    text
                }) // 将内容同步到父组件中
                isSend && this.$emit('change', html);
            }
        },
        onEditorChange({ editor, html, text }) {
            // console.log("@@@@@@@", editor, html, text, typeof text, text.length)
            this.content = html;
            this.$emit('on-change', {
                html,
                text
            }) // 将内容同步到父组件中
            // this.$emit('change', html);
            clearTimeout(stm)
            stm = setTimeout(()=>{
                this.initSize(text, html, true)
            }, 200)

        },
        onEditorFocus(event){
            // this.disabled ? event.enable(false) : event.enable(true);
        }
    }
}
</script>

<style lang="less" scoped>
.pre{
    height: 438px;
    position: relative;
}
.quillDis{
    background: #f5f5f5;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 438px;
    opacity:0.5;
}
.sizeDiv{
    position: absolute;
    right: 2px;
    bottom: 0;
    line-height: 20px !important;
}
.red{
    color: #f5222d;
}
</style>