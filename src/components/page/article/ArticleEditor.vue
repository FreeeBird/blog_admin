<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 发表文章</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="1">
                <el-col :span="12">
                    <el-form ref="form" :model="article" label-width="80px">
                        <el-form-item label="文章标题">
                            <el-input  placeholder="请输入标题" v-model="article.title"></el-input>
                        </el-form-item>
                        <el-form-item label="文章分类">
                            <el-select v-model="select_category" placeholder="请选择" @change="onCategoryChange" @blur="onCategoryChange">
                                <el-option
                                        v-for="(item,i) in categories"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="i">
                                    <span style="float: left">{{ i }}  {{ item.name }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="文章类型">
                            <el-radio-group v-model="article.type">
                                <el-radio-button :label=0>富文本</el-radio-button>
                                <el-radio-button :label=1>Markdown文本</el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="文章摘要">
                            <el-input type="textarea" :autosize="{ minRows: 3}" placeholder="请输入摘要" v-model="article.summary"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :offset="2" :span="10">
                    文章封面上传:
                    <el-upload
                            class="upload-demo"
                            action="http://localhost:8888/blog/api/admin/upload/img"
                            name="img"
                            :on-preview="handlePictureCardPreview"
                            :auto-upload="false"
                            :file-list="fileList"
                            :limit="1"
                            ref="upload"
                            :multiple="false"
                            :on-success="onSuccess"
                            list-type="picture-card">
                        <el-button size="small" >选择图片</el-button>
                    </el-upload>
                    <el-button size="small"  type="primary" @click="onUpload">上传封面</el-button>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-col>
            </el-row>
            <el-row>
                <quill-editor  v-if="article.type===0" ref="myTextEditor" v-model="article.content" :options="editorOption"></quill-editor>
<!--                <div v-if="article.type===0" ref="editorElem" ></div>-->
                <mavon-editor v-else v-model="article.content" ref="md" @imgAdd="$imgAdd" @change="change" placeholder="" style="min-height: 600px"/>
            </el-row>

            <el-button class="editor-btn" type="primary" @click="submit">发表文章</el-button>
            <el-button class="editor-btn" type="secondary" @click="saveDraft">保存草稿</el-button>
        </div>

    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    import {  publishArticle } from '../../../api/article';
    import { fetchCategories } from '../../../api/category';
    import {quillEditor, Quill} from 'vue-quill-editor'
    import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
    import axios from 'axios'
    Quill.register('modules/ImageExtend', ImageExtend)
    export default {
        name: 'publish',
        data: function(){
            return {
                categories:[
                    { id: 0, name: "默认分类" },
                ],
                fileList:[],
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false,
                select_category: 0,
                updateUrl: "http://localhost:8888/blog/api/admin/upload/img",
                article:{
                    // createTime: null,
                    // id: null,
                    // updateTime: null,
                    thumbnailUrl: "",
                    title: "",
                    summary: "",
                    content: '',
                    categoryId: 0,
                    status: 0,
                    type: 0
                },
                html:'',
                editorOption: {
                    modules: {
                        ImageExtend: {
                            loading: true,
                            name: 'img',
                            size: 3,
                            action: 'http://localhost:8888/blog/api/admin/upload/img',
                            response: (res) => {
                                return res.data
                            }
                        },
                        toolbar: {
                            container: container,
                            handlers: {
                                'image': function () {
                                    QuillWatch.emit(this.quill.id)
                                }
                            }
                        }
                    }
                }
            }
        },
        components: {
            quillEditor,
            mavonEditor
        },
        created:function() {
            this.fetchData()
        },
        methods: {
            fetchData(){
                fetchCategories().then(res => {
                    const re = res.data
                    this.categories = re.content
                })
            },
            onUpload:function(res){
                this.$refs.upload.submit();
            },
            onSuccess:function(res){
                console.log(res)
                this.article.thumbnailUrl = res.data
            },
            handleRemove(file) {
                console.log(file);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            onCategoryChange(){
                const cate = this.categories[this.select_category]
                this.article.categoryId = cate.id
                this.article.category = cate.name
            },
            uploadImg(){

            },
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                var formdata = new FormData();
                formdata.append('img', $file);
                // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
                axios.request({
                    url: 'http://localhost:8888/blog/api/admin/upload/img',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((res) => {
                    this.$refs.md.$img2Url(pos, res.data.data);
                })
            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
            },
            submit(){
                publishArticle(this.article).then(res =>{
                    const re = res;
                    if(re.code===2000){
                        this.$message.success(re.message)
                        this.article.content=''
                        this.article.summary=''
                        this.article.title=''
                    }
                })
            },
            saveDraft(){
                this.article.status=1
                this.submit()
            }
        }
    }
</script>
<style scoped>
    .el-row{
        margin-bottom: 10px;
    }
    .editor-btn{
        margin-top: 20px;
    }
</style>
