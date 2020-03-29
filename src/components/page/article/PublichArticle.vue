<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 发表文章</el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div class="container">
            <el-row :gutter="1">
                <el-col :span="2">文章标题：</el-col>
                <el-col :span="10">
                    <el-input placeholder="请输入标题" v-model="article.title" ></el-input>
                </el-col>

            </el-row>
            <el-row>
                文章类型：
                <el-radio-group v-model="article.type">
                    <el-radio-button :label=0>富文本</el-radio-button>
                    <el-radio-button :label=1>Markdown文本</el-radio-button>
                </el-radio-group>
                文章分类：
                <el-select v-model="select_category" placeholder="请选择" @change="onCategoryChange" @blur="onCategoryChange">
                    <el-option
                            v-for="(item,i) in categories"
                            :key="item.id"
                            :label="item.name"
                            :value="i">
                        <span style="float: left">{{ i }}  {{ item.name }}</span>
                    </el-option>
                </el-select>
            </el-row>


            <el-row>
                <quill-editor  v-if="article.type===0" ref="myTextEditor" v-model="article.content" :options="editorOption"></quill-editor>
                <mavon-editor v-else v-model="article.content" ref="md" @imgAdd="$imgAdd" @change="change" style="min-height: 600px"/>
            </el-row>

            <el-row>
                <el-col :span="2">文章摘要：</el-col>
                <el-col :span="22">
                    <el-input type="textarea" :autosize="{ minRows: 3}" placeholder="请输入摘要" v-model="article.summary"></el-input>
                </el-col>
            </el-row>
            <el-button class="editor-btn" type="primary" @click="submit">发表文章</el-button>
            <el-button class="editor-btn" type="secondary" @click="">保存草稿</el-button>
        </div>

    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'publish',
        data: function(){
            return {
                categories:[
                    { id: 0, name: "默认分类" },
                    { id: 1, name: "生活随想" },
                ],
                select_category: 0,
                article:{
                    thumbnailUrl: "",
                    title: "",
                    summary: "",
                    content: '',
                    categoryId: 0,
                    category: '默认分类',
                    status: 0,
                    type: 0
                },
                html:'',
                editorOption: {
                    // placeholder: 'Hello World'
                }
            }
        },
        components: {
            quillEditor,
            mavonEditor
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            onCategoryChange(){
                const cate = this.categories[this.select_category]
                this.article.categoryId = cate.id
                this.article.category = cate.name
            },
            // 将图片上传到服务器，返回地址替换到md中
            $imgAdd(pos, $file){
                var formdata = new FormData();
                formdata.append('file', $file);
                // 这里没有服务器供大家尝试，可将下面上传接口替换为你自己的服务器接口
                this.$axios({
                    url: '/common/upload',
                    method: 'post',
                    data: formdata,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((url) => {
                    this.$refs.md.$img2Url(pos, url);
                })
            },
            change(value, render){
                // render 为 markdown 解析后的结果
                this.html = render;
            },
            submit(){
                console.log(this.content);
                console.log(this.html);
                this.$message.success('提交成功！');
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
