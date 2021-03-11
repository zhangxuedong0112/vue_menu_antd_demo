<template>
    <div class="app-page">
        <w-breadcrumb></w-breadcrumb>

        <create-opinion-com class="main" :toPath="'/'"></create-opinion-com>
    </div>
</template>

<script>
/* zxd */
import createOpinion from "@/components/createOpinion"
import breadcrumb from "@/components/breadcrumb"
export default {
    name: "create-opinion-page",
    data() {
        return {
            
        }
    },
    components:{
        'create-opinion-com':createOpinion,
        'w-breadcrumb': breadcrumb,
    }
}
</script>

<style lang="less" scoped>

</style>