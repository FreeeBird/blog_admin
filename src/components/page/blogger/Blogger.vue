<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-user"></i> 博主信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="昵称">
                        <el-input :disabled="!isEdit" v-model="form.nickname"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input :disabled="!isEdit" v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="Email">
                        {{ form.email }}
                    </el-form-item>
                    <el-alert
                            title="用户名或者邮箱可用作系统登录"
                            type="success"
                            :closable="false">
                    </el-alert>
                    <el-divider></el-divider>
                    <el-form-item label="头像">
                    <el-image :src="form.portraitUrl" style="width: 100px; height: 100px"
                              :preview-src-list="[form.portraitUrl]"></el-image>
                    </el-form-item>
                    <el-form-item label="Email">
                        {{ form.email }}
                    </el-form-item>
                    <el-form-item label="个人简介">
                        <el-input :disabled="!isEdit" type="textarea" rows="5" v-model="form.introduction"></el-input>
                    </el-form-item>
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


    import { fetchBlogger, saveBlogger } from '../../../api/blogger';

export default {
    name: 'blogger',
    data(){
        return{
            form: {
                nickname: '',
                username: '',
                email: '',
                introduction: '',
                portraitUrl: ''
            },
            blogger:{},
            isEdit: false,
        }
    },
    created:function() {
        this.fetchData()
    },
    methods: {
        fetchData(){
            fetchBlogger().then(res=>{
                const data = res.data;
                this.form = data;
            })
        },
        handleEdit(){
            this.blogger = JSON.parse(JSON.stringify(this.form))
            this.isEdit = true
        },
        cancelEdit(){
            this.form = JSON.parse(JSON.stringify(this.blogger))
            this.isEdit = false
        },
        saveData(){
            saveBlogger(this.form).then(res =>{
                const re = res
                if(re.code===2000){
                    this.$message.success(re.message)
                    this.blogger = re.data
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
