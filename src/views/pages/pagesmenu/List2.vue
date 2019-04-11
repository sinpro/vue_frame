<template>
    <div class="animated fadeIn">
        <Row type="flex" justify="start" class="code-row-bg">
            <i-col span="3">col-3</i-col>
            <i-col span="3">col-4</i-col>
            <i-col span="3">col-4</i-col>
            <i-col span="3">col-4</i-col>
            <i-col span="3">col-4</i-col>
        </Row>

        <Row type="flex" justify="start" class="listinp">
            <i-col span="3">
                <span class="">姓名：</span><i-input placeholder="请输入姓名" style="width: 60%"></i-input>
            </i-col>
            <i-col span="3">
                <span>身份：</span><i-input placeholder="请输入身份" style="width: 60%"></i-input>
            </i-col>
            <i-col span="3">
                <!--<span style="float: left;">日期：</span>-->
                <span style="display: inline-block">
                    <row style="float: left;">
                        <i-col span="12">
                            <Date-picker type="date" placeholder="选择日期" style="width:6rem;"></Date-picker>
                        </i-col>
                    </row>
                </span>

            </i-col>
            <i-col span="3">
                <span>地点：</span>
                <i-select v-model="model" style="width: 60%;">
                    <i-option v-for="(list,index) in cityList" :value="list.val" :key="index">{{ list.name }}</i-option>
                </i-select>
            </i-col>
            <i-col span="2">
                <i-button type="primary"  icon="ios-search" style="width: 90%;">搜索</i-button>
            </i-col>
            <i-col span="2">
                <i-button type="success" icon="plus-round" style="width: 90%">增加</i-button>
            </i-col>
            <i-col span="2">
                <i-button type="warning" icon="android-delete" style="width: 90%">删除</i-button>
            </i-col>
        </Row>

        <Row>
            <!--<i-table border :data="tableData1" :columns="tableColumns1" stripe></i-table>-->
        </Row>
    </div>
</template>

<script>
    export default {
        name: "List2",
        data () {
            return {
                model: '01',
                cityList: [
                    {val:'01',name:'企业账户'},
                    {val:'02',name:'个人账户'},
                ],
                tableData1:[],
                tableColumns1:[]
            }
        },
        methods: {
            mockTableData1 () {
                let data = [];
                for (let i = 0; i < 10; i++) {
                    data.push({
                        name: '商圈' + Math.floor(Math.random () * 100 + 1),
                        status: Math.floor(Math.random () * 3 + 1),
                        portrayal: ['城市渗透', '人群迁移', '消费指数', '生活指数', '娱乐指数'],
                        people: [
                            {
                                n: '客群' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            },
                            {
                                n: '客群' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            },
                            {
                                n: '客群' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            }
                        ],
                        time: Math.floor(Math.random () * 7 + 1),
                        update: new Date()
                    })
                }
                return data;
            },
            formatDate (date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            changePage () {
                // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
                this.tableData1 = this.mockTableData1();
            }
        }
    }
</script>

<style scoped>
    .code-row-bg>div{background: #414e61;margin-right: 3px;text-align: center;line-height: 50px;color: #fff;}
    .code-row-bg>div:hover{background: #143f6d;}
    .listinp{margin: 20px 0;}
</style>
