<template>
    <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <!-- <div v-for="item in menuArr" :key="item.name"> -->
            <a-menu-item v-for="item in menuArr" :key="'item_'+item.name" v-if="!item.child"  @click="to(item.path)">
                <a-icon :type='item.icon' />
                <span>{{item.name}}</span>
            </a-menu-item>
            <a-sub-menu v-else :key="'sub_'+item.name">
                <span slot="title"><a-icon :type='item.icon' /><span>{{item.name}}</span></span>

                <a-menu-item v-for="c in item.child" :key="c.name" @click="to(c.path)">
                    <a-icon :type='c.icon' />
                    <span>{{c.name}}</span>
                </a-menu-item>
                
            </a-sub-menu>
        <!-- </div> -->
    </a-menu>
</template>

<script>
export default {
    name:"cust_menu",
    data() {
        return {
            menuArr:[]
        }
    },
    mounted() {
        this.initMenu();   
    },
    methods: {
        to(path){
            this.$router.push(path)
        },
        initMenu(){
            let that = this;
            /* 模拟请求接口,后台根据每个用户权限获取不通的menu配置 */
            setTimeout(()=>{
                that.menuArr=[
                    {
                        name: "home",
                        path: "/home",
                        icon: "pie-chart"
                    },
                    {
                        name: "home1",
                        path: "/home1",
                        icon: "pie-chart"
                    },
                    {
                        name: "二级",
                        icon: "user",
                        child:[
                            {
                                icon: "team",
                                name: "demo",
                                path: "/demo",
                            },
                            {
                                icon: "team",
                                name: "demo1",
                                path: "/demo1",
                            },
                        ]
                    }
                ]
            }, 100)
        }
    },
}
</script>
<style lang="less" scoped>

</style>