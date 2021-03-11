<template>
    <div>
        <a-select :disabled="disabledSam" :allowClear="true" :value="sel" style="width: 100%" @change="triggerChange" :placeholder="placeholder || ''">
            <a-select-option v-for="(item,index) in selOptions"
            :key="index" :value="item.value">
                {{item.text}}
            </a-select-option>
        </a-select>
  </div>
</template>

<script>
export default {
    name: "select-sam",
    data() {
        return {
            selOptions: [],
            sel: this.value || undefined,
            disabledSam: this.disabled || false,
        }
    },
    props:["selOptionsProps", "value", "placeholder", "disabled"],
    watch: {
        value(val) {
            this.sel = val;
        },
        selOptionsProps(val){
            this.initPorps(val);
        },
        disabled(val){
            this.disabledSam = val;
        }
    },
    mounted(){
        this.initPorps(this.selOptionsProps);
    },
    methods:{
        async initPorps(sel){
            let type = typeof sel;
            let arr = [];
            if(type == "function"){
                arr = await sel();
            }else{
                arr = sel;
            }

            this.selOptions = arr;
        },
        triggerChange(changedValue) {
            this.$emit('change', changedValue);
        },
    }
}
</script>

<style lang="less" scoped>

</style>