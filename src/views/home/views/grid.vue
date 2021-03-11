<template>
    <div class="advice-tab">
        <div class="header">
            <div class="leftbox">
                <a-input-search style="width: 100%" placeholder="请输入搜索内容" @search="onSearch" />
            </div>

            <!-- <div class="rightbox">
                <i class="phoneicon"></i>
                <span>
                    服务电话: {{serviceCall}}
                </span>
            </div> -->
            
        </div>


        <w-card :model="model" :searchProps="searchProps"></w-card>
    </div>
</template>

<script>
import card from "@/components/card"
import selectPorps from "@/dictionaries/select"
import req from "@/utils/req"
export default {
    name: 'grid',
    components: {
        'w-card':card,
    },
    data() {
        return {
            searchProps:"",
            selectPorps,
            selSuggestType: [
                {value: '', text: '最新' },
            ],
            model: {
                suggestType: ''
            },
            serviceCall:"",
        }
    },
    async created() {
        let selSuggestType = await selectPorps.selSuggestType();
        this.selSuggestType = [{value: '', text: '最新' }, ...selSuggestType];
        // this.serviceCall = await selectPorps.getTelephoneNumber();
    },
    methods: {
        onSearch(value){
            this.searchProps = value;
        }
    },
}
</script>

<style scoped lang="less">
    .header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
    }
    // .advice-tab{
    //     position: relative;
    //     .advice-search{
    //         position: absolute;
    //         right:left;
    //         top: 0;
    //         width: 400px;
    //     }
    //     .ant-spin-nested-loading{
    //         min-height: 360px;
    //         padding-top: 45px;
    //     }
    // }
    // @media only screen and (min-width: 321px) and (max-width: 1200px){
    //     .advice-tab .advice-search{
    //         top: -20px;
    //     }
    // }
</style>
<style lang="less">
    .leftbox{
        // width: 360px;
        width: 100%;
        .ant-input{
            height: 40px !important;
            color: #222;
        }
    }
</style>