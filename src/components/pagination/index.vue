<template>
  <div class="pageDiv">
      <span class="pageTotal">共 {{pagination.total || 0}} 条</span>
      <a-pagination :current="pagination.current" @change="pagechange" @showSizeChange="pagechange" :default-current="1" :total="pagination.total" :pageSize="pagination.pageSize" />
  </div>
</template>

<script lang="ts">
export default {
    name: "pagination-sam",
    data() {
        return {
            pagination: this.paginationprops && Object.assign({}, this.paginationprops) || false,
        }
    },
    props:["paginationprops"],
    watch: {
        paginationprops(val){
            this.pagination = val && Object.assign(this.pagination, this.paginationprops) || false;
        }
    },
    components:{

    },
    methods:{
        pagechange(current, pageSize){
            let obj = {
                current: current,
                pageSize: pageSize
            };

            this.pagination = Object.assign(this.pagination, obj);

            this.$emit("pagechange", this.pagination)
        },

    }
}
</script>

<style lang="less" scoped>
.pageDiv{
    display: flex;
    justify-content: right;
    align-items: center;
    flex-direction: row-reverse;
    margin: 30px 0 10px;
    white-space: nowrap;
    overflow-x: auto;
}
.pageTotal{
    margin-left: 5px;
}
</style>
