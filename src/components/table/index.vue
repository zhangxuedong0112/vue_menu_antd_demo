<template>
    <div class="tableDiv">
        <div class="topAactionDiv" v-if="!!rowaction">
            <div>
                <!-- <a-button v-if="rowaction=='pending'" class="btn" type="primary" @click="onCheck">
                    审核通过
                </a-button> -->

                <!-- <a-button v-if="rowaction=='checked'" class="zhidingbtn btn" type="primary" @click="onTop">
                    置顶
                </a-button>

                <a-button v-if="rowaction=='checked'" class="zhidingbtn btn" type="primary" @click="onNoTop">
                    取消置顶
                </a-button> -->
            </div>
        </div>
            <!-- :row-selection="hideselection?null:{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" -->
        <a-table 
            class="tableCust"
            :pagination="false" 
            :loading="loading"
            rowKey="key"
            :columns="columns" 
            :data-source="data"
            @change="onTableChange"
        >

            <span slot="sort" slot-scope="text, record" class="topDiv">
                <span>{{record.sort}}</span>
                <!-- <a class="advice-top" v-if="record.isTop === 1">置顶</a> -->
                <!-- <a class="advice-top " v-if="record.isSelection === 1">选登</a> -->
            </span>

            <span slot="action" class="actionDiv" slot-scope="text, record">
                <a-button class="btnDetail btn" type="primary" size="small" @click="()=>{
                        detail(record)
                    }">
                    查看/回复
                </a-button>

                <!-- <a-button v-if="rowaction=='checked'" class="btn" type="primary" size="small" @click="()=>{
                        onSelectLogin(record)
                    }">
                    选登
                </a-button>

                <a-button v-if="rowaction=='checked' && record.isSelection == 1" class="btn" type="primary" size="small" @click="()=>{
                        onDelSelectLogin(record)
                    }">
                    取消选登
                </a-button> -->

                <a-popconfirm
                    title="是否确认删除当前建言？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="remove(record)"
                >
                    <a-button type="primary btn" size="small">
                        删除
                    </a-button>
                </a-popconfirm>

                <!-- <a-button v-if="rowaction=='checked' && record.isEvaluate == 1" class="btn" type="primary" size="small" @click="()=> $info({
                            width: 520,
                            centered: true,
                            closable: true,
                            maskClosable: true,
                            class:'confirm-modal',
                            icon: '<span/>',
                            okText: '确定',
                            title: '评价详情',
                            content: record.evaluateContent,
                            onOk() {},
                            onCancel() {},
                })">
                    评价详情
                </a-button> -->
            </span>

            <span slot="actiondel" slot-scope="text, record">
                <a-popconfirm
                    title="是否确认删除当前建言？"
                    ok-text="确定"
                    cancel-text="取消"
                    @confirm="remove(record)"
                >
                    <a-button type="primary" size="small">
                        删除
                    </a-button>
                </a-popconfirm>
            </span>
        </a-table>

        <div v-if="pagination" class="pageDiv">
            <span class="pageTotal">共 {{pagination.total || 0}} 条</span>
            <a-pagination :current="pagination.current" @change="pagechange" @showSizeChange="pagechange" :default-current="1" :total="pagination.total" :pageSize="pagination.pageSize" />
        </div>
    </div>
</template>

<script>
export default {
    name: "tablesam",
    data() {
        return {
            data: this.value || [],
            columns: this.columnsprops || [],
            pagination: this.paginationprops && Object.assign({}, this.paginationprops) || false,
            selectedRowKeys: [],
            loading: this.loadingprops || false,
        }
    },
    props:["loadingprops","columnsprops", "value", "paginationprops", "rowaction", "hideselection"],
    watch: {
        value(val) {
            this.data = val;
        },
        columnsprops(val) {
            this.columns = val;
        },
        paginationprops(val){
            this.pagination = val && Object.assign(this.pagination, this.paginationprops) || false;
        },
        loadingprops(val) {
            this.loading = val;
        },
    },
    components:{

    },
    methods:{
        detail(p){
            this.$emit("ondetail", p)
        },
        remove(p){
            this.$emit("onremove", p)
        },
        pagechange(current, pageSize){
            let obj = {
                current: current,
                pageSize: pageSize
            };

            this.pagination = Object.assign(this.pagination, obj);

            this.$emit("pagechange", this.pagination)
        },
        onSelectChange(keys){
            this.selectedRowKeys = keys;
            this.$emit("onSelectChange", keys)
        },
        onTableChange(pagination, filters, sorter = {}){
            let param = {
                order: sorter && sorter.order,
                field: sorter && sorter.field
            }
            this.$emit("onTableChange", param)
        },
        onCheck(){
            this.$emit("onCheck", this.selectedRowKeys)
        },
        onSelectLogin(p){
            this.$emit("onSelectLogin", p)
        },
        onTop(){
            this.$emit("onTop", this.selectedRowKeys)
        },
        onNoTop(){
            this.$emit("onNoTop", this.selectedRowKeys)
        },
        onDelSelectLogin(p){
            this.$emit("onDelSelectLogin", p)
        }

    }
}
</script>

<style lang="less" scoped>
.btnDetail{
    background: #646474 !important;
    border: 1px solid #646474 !important;
    border-radius: 4px !important;
}
.pageDiv{
    display: flex;
    justify-content: right;
    align-items: center;
    flex-direction: row-reverse;
    margin-top: 20px;
}
.pageTotal{
    margin-left: 5px;
}
.topAactionDiv{
    margin-bottom: 10px;
}
.btn{
    margin: 5px;
}
.zhidingbtn{
    background: #fff;
    color: #222;
    border: 1px solid #D9D9D9;
    border-radius: 4px;
}
.topDiv{
    display: flex;
    justify-content: center;
    position: relative;
}
.advice-top{
    width: 40px;
    height: 20px;
    background: #FF3732;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    color: #FFFFFF !important;
    margin-left: 5px;
    border: 1px solid #FF3732;
    border-radius: 4px;
    line-height: 20px;
    // position: absolute;
    // right: 0;
    // top: 0;
}
.tableCust{
    min-width: 1024px;
}
.tableDiv{
    overflow-x: auto
}
// .actionDiv{
//     display: flex;
// }

</style>