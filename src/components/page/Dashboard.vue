<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{statistics.dayVisit}}</div>
                                    <div>今日访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{statistics.dayHits}}</div>
                                    <div>今日文章点击量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{statistics.visit}}</div>
                                    <div>总访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{statistics.hits}}</div>
                                    <div>总文章点击量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{statistics.categoryNum}}</div>
                                    <div>分类数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{statistics.articleNum}}</div>
                                    <div>文章数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{statistics.commentNum}}</div>
                                    <div>评论数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{statistics.messageNum}}</div>
                                    <div>留言量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import { fetchTest } from '../../api';
import { fetchDaily, fetchMonthly, fetchStat, fetchWeekly } from '../../api/statistics';
import moment from 'moment';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            statistics:{
                articleNum: 0,
                categoryNum: 0,
                commentNum: 0,
                createTime: null,
                hits: 29,
                id: null,
                messageNum: 0,
                visit: 0,
                dayHits: 34,
                dayVisit: 45
            },
            options: {
                type: 'bar',
                title: {
                    text: '最近一周的访问量'
                },
                legend:{
                    display: false
                },
                xRorate: 45,
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '访问量',
                        data: [164, 178, 190, 135, 160]
                    },
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近一周的文章点击量'
                },
                bgColor: '#fbfbfb',
                colorList:[
                    '#ff7f00'
                ],
                legend: {
                    display: false,
                },
                labels: ['周一', '周二', '周三', '周四', '周五'],
                datasets: [
                    {
                        label: '点击量',
                        data: [334, 278, 190, 235, 260, 200]
                    }
                ]
            }
        };
    },
    components: {
        Schart
    },
    computed: {
    },
    created() {
        this.handleListener();
    },
    activated() {
        this.handleListener();
    },
    deactivated() {
        window.removeEventListener('resize', this.renderChart);
        bus.$off('collapse', this.handleBus);
    },
    created:function(){
        this.fetchData()
    },
    methods: {
        fetchData(){
            fetchStat().then(res =>{
                this.statistics = res.data
            })
            fetchDaily().then(res =>{

            });
            fetchWeekly().then(res =>{
                var content = res.data.content;
                this.options.labels=[];
                this.options2.labels=[];
                var labels = [];
                this.options.datasets[0].data = []
                this.options2.datasets[0].data = []
                content.forEach((item,index)=>{
                    labels.push(moment(item.createTime).format("MM月DD日"))
                    this.options.datasets[0].data.push(item.visit)
                    this.options2.datasets[0].data.push(item.hits)
                    this.options.labels=labels;
                    this.options2.labels=labels;
                })
            });
        },
        changeDate() {

        },
        handleListener() {
            bus.$on('collapse', this.handleBus);
            // 调用renderChart方法对图表进行重新渲染
            window.addEventListener('resize', this.renderChart);
        },
        handleBus(msg) {
            setTimeout(() => {
                console.log(msg)
                this.renderChart();
            }, 200);
        },
        renderChart() {
            this.$refs.bar.renderChart();
            this.$refs.line.renderChart();
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
