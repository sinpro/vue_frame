<template>
    <div>
        <Row>
            <i-col span="24">
                <Table border :columns="historyColumns" :data="historyData" ref="table" @on-select="selectOne" @on-select-all="selectAll"></Table>
                <i-button type="primary" class="paging1" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> 导出自定义数据</i-button>
                <Page :total="dataCount" :page-size="pageSize" show-total class="paging" @on-change="changepage"></Page>
            </i-col>

        </Row>

    </div>
</template>
<style scoped>
    .paging1{
        float:left;
        margin-top:10px;
    }
    .paging{
        float:right;
        margin-top:10px;
    }
</style>
<script>
    let testData = {
        "histories": [
            {
                "username": "智能审批1",
                "shenpistatus": "审批已通过",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 18:11"
            },
            {
                "username": "智能审批2",
                "shenpistatus": "审批已通过",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 18:11"
            },
            {
                "username": "智能审批3",
                "shenpistatus": "审批已通过",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 10:04"
            },
            {
                "username": "智能审批4",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201",
                "time": "2017-07-24 10:03"
            },
            {
                "username": "智能审批5",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201",
                "time": "2017-07-24 10:02"
            },
            {
                "username": "智能审批6",
                "shenpistatus": "审批已通过",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 10:02"
            },
            {
                "username": "智能审批7",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 10:01"
            },
            {
                "username": "智能审批8",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-24 09:56"
            },
            {
                "username": "智能审批9",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批10",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批11",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批12",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批13",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:23"
            },
            {
                "username": "智能审批14",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:21"
            },
            {
                "username": "智能审批15",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:21"
            },
            {
                "username": "智能审批16",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:20"
            },
            {
                "username": "智能审批17",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-21 14:20"
            },
            {
                "username": "智能审批18",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:14"
            },
            {
                "username": "智能审批19",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:13"
            },
            {
                "username": "智能审批20",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:11"
            },
            {
                "username": "智能审批21",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-21 14:10"
            },
            {
                "username": "智能审批22",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-20 18:09"
            },
            {
                "username": "智能审批22-1",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-20 18:08"
            },
            {
                "username": "智能审批23",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "  收入 > 999 && 支出 < 201 && 所有项目的总净收入 > 5000",
                "time": "2017-07-20 18:08"
            },
            {
                "username": "智能审批24",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-20 18:07"
            },
            {
                "username": "智能审批25",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-20 18:05"
            },
            {
                "username": "智能审批26",
                "shenpistatus": "审批已通过",
                "shenpicomments": "wedfqw",
                "time": "2017-07-20 15:50"
            },
            {
                "username": "智能审批27",
                "shenpistatus": "审批已通过",
                "shenpicomments": "wedfqw",
                "time": "2017-07-20 15:20"
            },
            {
                "username": "智能审批28",
                "shenpistatus": "审批被拒绝",
                "shenpicomments": "自动审批通过",
                "time": "2017-07-19 18:27"
            }
        ]
    }
    export default {
        data () {
            return {
                volumeTypes:[],
                ajaxHistoryData:[],
                // 初始化信息总条数
                dataCount:0,
                // 每页显示多少条
                pageSize:10,
                historyColumns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '人员',
                        key: 'username',
                        ellipsis:true
                    },
                    {
                        title: '操作',
                        key: 'shenpistatus',
                        ellipsis:true
                    },
                    {
                        title: '意见',
                        key: 'shenpicomments',
                        ellipsis:true
                    },
                    {
                        title: '时间',
                        key: 'time',
                        ellipsis:true
                    },
                    {
                        title: '上传文件',//纵列表头(类似于th)
                        width:120, //列表每一格的宽度
                        align: 'left', //ivew里面的写法,不用理会
                        key: 'region', //ivew里面的写法,不用理会
                        render: (h, params) => {
                            return h('Upload',{
                                props:{
                                    action:'//jsonplaceholder.typicode.com/posts/'
                                }
                            },[h('Button',{
                                props:{
                                    icon:'ios-cloud-upload-outline',
                                    size:'small'
                                },
                                style:{

                                },
                                on:{
                                    click:()=>{

                                    }
                                }
                            },'上传文件')]);
                        }
                    },
                    {
                        title: '下拉操作',
                        key: 'Operation',
                        width: '150',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Dropdown', {
                                    props: {
                                        trigger: "click"
                                    },
                                    on: {
                                        'on-click': (value) => {
                                            console.log(value) //此处的value和下面DropdownMenu选项的name对应
                                            if (value == "submit") {
                                                this.submit(params.index)
                                            } else if (value == 'revise') {
                                                this.revise(params.index)
                                            } else {
                                                this.delete(params.index)
                                            }
                                        }
                                    }
                                }, [
                                    h('Button', {
                                        props: {
                                            icon:'navicon-round',
                                            type: 'primary'
                                        }
                                    }, [
                                        h('span', '操作菜单'),//span中的内容
                                        h('Icon', {
                                            props: {
                                                type: 'md-arrow-dropdown'
                                            }
                                        })
                                    ]),
                                    h('DropdownMenu', {
                                        slot: 'list'
                                    }, [
                                        h('DropdownItem', {
                                            props: {
                                                name: 'submit',
                                            },
                                        }, '查看'),
                                        h('DropdownItem', {
                                            props: {
                                                name: 'revise',
                                                divided:true
                                            }
                                        }, '修改'),
                                        h('DropdownItem', {
                                            props: {
                                                name: 'delete',
                                                divided:true
                                            }
                                        }, '删除'),
                                    ])
                                ])
                            ])
                        }
                    }

                ],
                historyData: [],
                daochuData:[]
            }
        },
        methods:{
            // 获取历史记录信息
            handleListApproveHistory(){

                // 保存取到的所有数据
                this.ajaxHistoryData = testData.histories
                this.dataCount = testData.histories.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }


            },
            changepage(index){
                var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.historyData = this.ajaxHistoryData.slice(_start,_end);
            },
            exportData (type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: '原始数据'
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: '排序和过滤后的数据',
                        original: false
                    });
                } else if (type === 3) {
                    if(this.daochuData!=''){
                        this.$refs.table.exportCsv({
                            filename: '人员导出',
                            columns: this.historyColumns.filter((col, index) => 2<index < 4),
                            data: this.daochuData
                        });
                    }else{
                        this.$Modal.error({
                            title: '错误',
                            content: '请选择要导出的数据'
                        });
                    }

                }
            },selectOne(selection,row){
                this.daochuData=selection;
                console.log(selection)
                console.log(row.username)
            } ,selectAll(selection){
                this.daochuData=selection;
                console.log(selection)
            },
            submit(){
                this.$Modal.info({
                    title:'123',
                    content:'123'
                })
            },
            revise(){
                this.$Modal.warning({
                    title:'修改列表',
                    content:'123'
                })
            },
            delete(){
                this.$Modal.error({
                    title:'确认要删除么',
                    content:'123'
                })
            }
        },
        created(){
            this.handleListApproveHistory();
        }
    }
</script>
