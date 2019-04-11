<template>
    <div class="animated fadeIn">
        <!--tab-->
        <Tabs type="card">
            <Tab-pane label="个人信息表">
                <i-table stripe border :content="self" :columns="columns1" :data="data1"></i-table>
                <Row class="pagewrap">
                    <i-col :xs="2" :sm="4" :md="6" :lg="8">&nbsp;&nbsp;</i-col>
                    <i-col :xs="20" :sm="16" :md="12" :lg="8"><Page :total="100"></Page></i-col>
                    <i-col :xs="2" :sm="4" :md="6" :lg="8">&nbsp;&nbsp;</i-col>
                </Row>
            </Tab-pane>
            <Tab-pane label="成绩表">
                <div class="del">
                    <Poptip
                            confirm
                            title="您确认删除这条内容吗？"
                            @on-ok="ok"
                            @on-cancel="cancel"
                    <i-button>删除</i-button>
                    </Poptip>
                </div>

            </Tab-pane>
            <Tab-pane label="老师评价表">

            </Tab-pane>
        </Tabs>
        <!--表格-->

        <!--修改弹出层-->
        <Modal
                :visible.sync="modal"
                title="修改"
                width="600" v-model="modal">
            <ul class="modcont">
                <li>姓名：<i-input :value.sync="value" placeholder="请输入..." style="width: 50%;" v-model="data2.name"></i-input></li>
                <li>年龄：<i-input :value.sync="value" placeholder="请输入..." style="width: 50%;" v-model="data2.age"></i-input></li>
                <li>性别：<i-input :value.sync="value" placeholder="请输入..." style="width: 50%;" v-model="data2.sex"></i-input></li>
                <li>身高：<i-input :value.sync="value" placeholder="请输入..." style="width: 50%;" v-model="data2.height"></i-input></li>
                <li>体重：<i-input :value.sync="value" placeholder="请输入..." style="width: 50%;" v-model="data2.weight"></i-input></li>
                <li>地址：<i-input :value.sync="value" placeholder="请输入..." style="width: 50%;" v-model="data2.address"></i-input></li>
            </ul>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "Index1",
        data () {
            return {
                self: this,
                value:'',
                modal:false,
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '性别',
                        key: 'sex'
                    },
                    {
                        title: '身高',
                        key: 'height'
                    },
                    {
                        title: '体重',
                        key: 'weight'
                    },
                    {
                        title: '地址',
                        key: 'address',
                        ellipsis:true
                    },{
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.mod(params.index)

                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        sex: '男',
                        height: 150,
                        weight: 172,
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        sex: '女',
                        height: 180,
                        weight: 172,
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        sex: '男',
                        height: 140,
                        weight: 172,
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        sex: '女',
                        height: 189,
                        weight: 152,
                        address: '深圳市南山区深南大道'
                    }
                ],
                data2: {
                        name: '王小明',
                        age: 18,
                        sex: '男',
                        height: 150,
                        weight: 172,
                        address: '北京市朝阳区芍药居'
                }

            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.data1[index].name}<br>年龄：${this.data1[index].age}<br>性别：${this.data1[index].sex}<br>身高：${this.data1[index].height}<br>体重：${this.data1[index].weight}<br>地址：${this.data1[index].address}`
                })
            },
            mod (index) {
                /*this.$Modal.info({
                    title: '用户信息',
                    content: `姓名：${this.data1[index].name}<br>年龄：${this.data1[index].age}<br>地址：${this.data1[index].address}`
                })*/
                this.modal=true

            },
            remove (index) {
                this.$Modal.confirm({
                    title: '确定要删除么',
                    content: `姓名：${this.data1[index].name}<br>年龄：${this.data1[index].age}<br>地址：${this.data1[index].address}`,
                    onOk: () => {
                        //this.$Message.info('点击了确定');
                        this.data1.splice(index, 1);
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }

                })
                //this.data1.splice(index, 1);
            },
            ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            }
        }
    }
</script>

<style scoped>
    .pagewrap{height: 35px;text-align: center;margin-top: 30px}
    .modcont{text-align: center}
    .modcont>li{list-style: none;line-height: 40px;}
    .del{height: 500px;background: pink;line-height: 500px;text-align: center}
</style>
