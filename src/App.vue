<template>
    <div id="app">
        <div class="spinDiv" v-if="loading">
            <a-spin/>
        </div>
        <a-config-provider v-else :locale="zh_CN">
            <router-view/>
        </a-config-provider>
    
    </div>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
    data() {
        return {
            zh_CN,
            loading: false,
        };
    },
    mounted() {
        this.initUser()
    },
    methods:{
        initUser(){
            // setTimeout(()=>{
            //     this.loading = false
            // }, 3000)
        }
    }
}
</script>
<style lang="less">
#app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #222;
}
.spinDiv{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
</style>
