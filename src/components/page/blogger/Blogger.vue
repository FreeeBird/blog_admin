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
                    <el-alert
                            title="用户名可用作系统登录"
                            type="success"
                            :closable="false">
                    </el-alert>
                    <el-form-item label="Email">
                        {{ form.email }}
                    </el-form-item>
<!--                    <el-alert-->
<!--                            title="忘记账户密码时可用邮箱找回"-->
<!--                            type="success"-->
<!--                            :closable="false">-->
<!--                    </el-alert>-->
                    <el-divider></el-divider>
                    <el-form-item label="头像">
                        <img v-if="!isEdit" :src="form.portraitUrl" class="pre-img">
                        <div v-if="isEdit" class="crop-demo">
                            <img :src="form.portraitUrl"  class="pre-img">
                            <div class="crop-demo-btn">更换头像
                                <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
                            </div>
                        </div>

                        <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                            <vue-cropper
                                    ref='cropper'
                                    :src="imgSrc"
                                    :info="true"
                                    style="width:100%;height:300px;"
                            ></vue-cropper>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="cancelCrop">取 消</el-button>
                                <el-button type="primary" @click="finish">确 定</el-button>
                            </span>
                        </el-dialog>
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
    import VueCropper  from 'vue-cropperjs';
    import axios from 'axios';
    import bus from '../../common/bus';
export default {
    name: 'blogger',
    components: {
        VueCropper
    },
    data(){
        return{
            fileList: [],
            imgSrc: '',
            cropImg: '',
            dialogVisible: false,
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
                if(data==null) return;
                this.form = data;
                this.cropImg = this.form.portraitUrl;
            })
        },
        setImage(e){
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                this.dialogVisible = true;
                this.imgSrc = event.target.result;
                this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
        },
        cropImage () {
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        },
        cancelCrop(){
            this.dialogVisible = false;
            this.form.portraitUrl = this.blogger.portraitUrl;
        },
        finish(){
            this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
                const formData = new FormData();
                formData.append('img',blob,'po'+blob.type.replace('image/','.'))
                axios.request({
                    url: 'http://localhost:8888/blog/api/upload/img',
                    method: 'post',
                    withCredentials:true,
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((res) => {
                    this.form.portraitUrl = res.data.data
                    this.dialogVisible = false
                })
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
                    bus.$emit('blogger',this.blogger)
                    this.isEdit = false
                }else {
                    this.$message.warning(re.message)
                }
            }).catch(err=>{
                this.$message.error(err)
            })
        },
    },
};
</script>

<style>
    .pre-img{
        width: 100px;
        height: 100px;
        background: #f8f8f8;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
</style>
