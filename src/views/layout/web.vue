<template>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
        <a-layout-sider v-model="collapsed" collapsible>
        <div class="logo" />
            
            <!-- 渲染menu -->
            <cust-menu></cust-menu>

        </a-layout-sider>

        <a-layout>
            <a-layout-header style="background: #fff; padding: 0" />
            <a-layout-content style="margin: 0 16px">
                <a-breadcrumb style="margin: 16px 0">
                <a-breadcrumb-item>User</a-breadcrumb-item>
                <a-breadcrumb-item>Bill</a-breadcrumb-item>
                </a-breadcrumb>
                <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                    <!-- 渲染路由 -->
                    <router-view/>
                </div>
            </a-layout-content>

            <a-layout-footer style="text-align: center">
                Ant Design ©2018 Created by Ant UED
            </a-layout-footer>
        </a-layout>
    </a-layout>
    
</template>

<script>
import CustMenu from './menu'
export default {
    data() {
        return {
            collapsed: false,
        };
    },
    components:{
        "cust-menu": CustMenu
    },
    mounted() {
        // console.log("!!!!!!!", this.$router.push)
    },
}
</script>
<style lang="less" scoped>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>