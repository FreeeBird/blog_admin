<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 链接管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
<!--                <el-button-->
<!--                    type="primary"-->
<!--                    icon="el-icon-delete"-->
<!--                    class="handle-del mr10"-->
<!--                    @click="delAllSelection"-->
<!--                >批量删除</el-button>-->
<!--                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>-->
                <el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="title" label="网站名"></el-table-column>
                <el-table-column prop="url" label="网站地址"></el-table-column>
                <el-table-column prop="description" label="网站简介"></el-table-column>
                <el-table-column label="时间">
                    <template slot-scope="scope">
                        {{ scope.row.createTime | dateFmt('YYYY/MM/DD HH:mm:SS')}}
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

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="网站名">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="网站地址">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="网站简介">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加弹出框 -->
        <el-dialog title="添加链接" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="link" label-width="70px">
                <el-form-item label="网站名">
                    <el-input v-model="link.title"></el-input>
                </el-form-item>
                <el-form-item label="网站地址">
                    <el-input v-model="link.url"></el-input>
                </el-form-item>
                <el-form-item label="网站简介">
                    <el-input v-model="link.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="addLink">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { deleteLink, fetchLinks, saveLink, updateLink } from '../../../api/link';
export default {
    name: 'message',
    data() {
        return {
            query: {
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible: false,
            link:{},
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
            fetchLinks(this.query.pageIndex-1,this.query.pageSize).then(res => {
                const data = res.data
                this.tableData = data.content;
                this.pageTotal = data.totalElements;
            });
        },
        handleAdd(){
            this.addVisible = true;
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    deleteLink(row.id).then(res => {
                        if(res.code === 2000){
                            this.$message.success('删除成功');
                            this.tableData.splice(index, 1);
                            this.pageTotal -= 1
                        }
                    })

                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$delete(this.form,"createTime")
            updateLink(this.form).then(res => {
                this.form = res.data
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.form);
            })
        },
        addLink() {
            this.addVisible = false;
            saveLink(this.link).then(res => {
                this.link = res.data
                this.tableData.push(this.link)
                this.link = {}
                this.pageTotal += 1
                this.$message.success(`添加成功`);
            })


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
