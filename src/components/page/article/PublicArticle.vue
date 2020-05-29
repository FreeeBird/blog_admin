<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 文章管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
<!--            <div class="handle-box">-->
<!--                <el-button-->
<!--                    type="primary"-->
<!--                    icon="el-icon-delete"-->
<!--                    class="handle-del mr10"-->
<!--                    @click="delAllSelection"-->
<!--                >批量删除</el-button>-->
<!--                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>-->
<!--            </div>-->
            <el-table
                :data="tableData"
                border
                stripe
                class="table"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column label="封面" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumbnailUrl"
                            :preview-src-list="[scope.row.thumbnailUrl]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="category" label="分类"></el-table-column>
                <el-table-column label="创建时间">
                    <template slot-scope="scope">
                        {{ scope.row.createTime | dateFmt('YYYY/MM/DD HH:mm:SS')}}
                    </template>
                </el-table-column>
                <el-table-column label="更新时间">
                    <template slot-scope="scope">
                        {{scope.row.updateTime | dateFmt('YYYY/MM/DD HH:mm:SS')}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

    </div>
</template>

<script>
    import { delArticle, fetchArticles } from '../../../api/article';
export default {
    name: 'articles',
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            articleItem : {
                id:5,
                thumbnailUrl:"",
                title:"开过课",
                summary:"也要",
                categoryId:0,
                category:"默认分类",
                createTime:"2020-03-29T09:52:25.000+0000",
                updateTime:"2020-03-29T09:52:25.000+0000"
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchArticles(this.query.pageIndex-1,this.query.pageSize).then(res => {
                const data = res.data
                this.tableData = data.content
                this.pageTotal = data.totalElements
            });
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            }).then(() => {
                delArticle(row.id).then(res =>{
                    if(res.code === 2000){
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    }else this.$message.warning('删除错误');
                })
                }).catch((err) => {
                this.$message.error(err.toString());
            });
        },
        // 编辑操作
        handleEdit(index, row) {
            this.$router.push('/article/'+row.id)
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
