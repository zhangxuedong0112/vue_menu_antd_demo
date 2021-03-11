<template>
    <div>
        demo11
        {{num}}
        <a-button type="primary" @click="()=>{
                this.addNum()
            }">
            addMutations
        </a-button>
        
        <a-button type="primary" @click="()=>{
                this.addNumAction()
            }">
            addActions
        </a-button>

         <a-button type="primary" @click="()=>{
                this.getMock();
            }">
            mock
        </a-button>

        <div>
            mockData:
            {{mockData}}
        </div>

        <div>
            富文本
            <quill-sam :value="html" @on-change="editorChange" > </quill-sam>
        </div>
        
    </div>
</template>

<script>
// import wangeditor from "@/components/editor"
import { mapState, mapActions, mapMutations } from 'vuex'
import req from "@/utils/req"
import quillSam from "@/components/quillSam"
export default {
    name: 'demo',
    data() {
        return {
            mockData: "",
            html: "<div>哈喽</div>",
            content:"",
            editorOption: {
               placeholder: '编辑文章内容'
            },
        }
    },
    components: {
        // 'sam-editor':wangeditor,
        "quill-sam": quillSam
    },
    computed: {
        ...mapState('setting', ["num"])
    },
    methods: {
        ...mapMutations('setting',[
            "addNum"
        ]),
        ...mapActions('setting', ["addNumAction"]),
        async getMock(){
            let s = await req.ajax({
                method: "post",
                url: "/table/search",
                body: {
                    current:1, 
                    pageSize: 10
                }
            })

            this.mockData = JSON.stringify(s)
            

            console.log("@@@@@",s)
        },
        editorChange(v){
            console.log("@@@@editor", v)
        }
    },
}
</script>