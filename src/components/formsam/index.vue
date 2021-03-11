<template>
    <div class="white">
        <a-form class="ant-advanced-search-form" :form="form" @submit="submit">
            <a-row :gutter="24">
                <a-col :span="4">
                    <a-form-item :label="`Field`">
                        <a-input
                        v-decorator="[
                            `field-${i}`,
                            {
                            rules: [
                                {
                                required: true,
                                message: 'Input something!',
                                },
                            ],
                            },
                        ]"
                        placeholder="placeholder"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="4">
                    <a-form-item :label="`Field`">
                        <a-input
                        v-decorator="[
                            `field-${i}`,
                            {
                            rules: [
                                {
                                required: true,
                                message: 'Input something!',
                                },
                            ],
                            },
                        ]"
                        placeholder="placeholder"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="4">
                    <a-form-item :label="`Field`">
                        <a-input
                        v-decorator="[
                            `field-${i}`,
                            {
                            rules: [
                                {
                                required: true,
                                message: 'Input something!',
                                },
                            ],
                            },
                        ]"
                        placeholder="placeholder"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="4">
                    <a-form-item :label="`Field`">
                        <a-input
                        v-decorator="[
                            `field-${i}`,
                            {
                            rules: [
                                {
                                required: true,
                                message: 'Input something!',
                                },
                            ],
                            },
                        ]"
                        placeholder="placeholder"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="4">
                    <a-form-item :label="`Field`">
                        <a-input
                        v-decorator="[
                            `field-${i}`,
                            {
                            rules: [
                                {
                                required: true,
                                message: 'Input something!',
                                },
                            ],
                            },
                        ]"
                        placeholder="placeholder"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </div>    
</template>

<script>
export default {
    name: "formsam-com",
    data() {
        return {
            form: this.$form.createForm(this, { name: 'formsam-com' })
        }
    },
    methods:{
        submit(e){
            e.preventDefault();
            this.form.validateFields((error, values) => {
                console.log('error', error);
                console.log('Received values of form: ', values);
            });
            console.log("@@@", err, vals)
        }
    }
}
</script>

<style lang="less" scoped>
</style>