<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-coin"></i> 博客信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="博客名称">
                        <el-input :disabled="!isEdit" v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="关键词">
                        <el-select
                                :disabled="!isEdit"
                                v-model="value"
                                multiple
                                filterable
                                allow-create
                                default-first-option
                                placeholder="请输入关键词">
<!--                            <el-option-->
<!--                                    v-for="item in options"-->
<!--                                    :key="item.value"-->
<!--                                    :label="item.label"-->
<!--                                    :value="item.value">-->
<!--                            </el-option>-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="博客介绍">
                        <el-input :disabled="!isEdit" type="textarea" rows="5" v-model="form.description"></el-input>
                    </el-form-item>
<!--                    <el-form-item label="创建时间">-->
<!--                        <el-input disabled :value="form.createTime | dateFmt('YYYY-MM-DD HH:mm:SS')"></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item v-if="isEdit">
                        <el-button type="primary" @click="saveData">保存</el-button>
                        <el-button @click="cancelEdit">取消</el-button>
                    </el-form-item>
                    <el-form-item v-if="!isEdit">
                        <el-button type="primary" @click="handleEdit">编辑</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { fetchBlogInfo, saveBlogInfo } from '../../../api/blogInfo';

export default {
    name: 'blogInfo',
    data(){
        return{
            form: {
                id: 0,
                title: '',
                keywords: '',
                description: '',
                createTime: null
            },
            blogInfo:{},
            options: [],
            value: [],
            isEdit: false,
        }
    },
    created:function() {
        this.fetchData()
    },
    methods: {
        fetchData(){
            fetchBlogInfo().then(res=>{
                const data = res.data;
                this.form = data;
                this.options = data.keywords.split(' ')
                this.value = this.options
            })
        },
        handleEdit(){
            this.blogInfo = JSON.parse(JSON.stringify(this.form))
            this.isEdit = true
        },
        cancelEdit(){
            this.form = JSON.parse(JSON.stringify(this.blogInfo))
            this.isEdit = false
        },
        saveData(){
            this.form.keywords = this.value.join(' ')
            saveBlogInfo(this.form).then(res =>{
                const re = res
                if(re.code===2000){
                    this.$message.success(re.message)
                    this.blogInfo = re.data
                    this.isEdit = false
                }else {
                    this.$message.warning(re.message)
                }
            })
        },
    },
};
</script>

<style>
</style>
