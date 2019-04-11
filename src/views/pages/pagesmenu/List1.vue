<template>
    <div class="animated fadeIn">
        <Row type="flex" justify="center" align="top" class="code-row-bg">
            <i-col span="4"><p style="height: 80px;background: #1e395b;">col-4</p></i-col>
            <i-col span="4"><p style="height: 30px;background: #1e395b;">col-4</p></i-col>
            <i-col span="4"><p style="height: 100px;background: #1e395b;">col-4</p></i-col>
            <i-col span="4"><p style="height: 60px;background: #1e395b;">col-4</p></i-col>
        </Row>

        <Row>
            <i-table border :columns="columns1" :data="data1" ref="table"  style="margin: 15px 0" @on-current-change="handleRowChange"></i-table>
            <i-button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> 导出原始数据</i-button>
            <Button type="success" size="large" @click="handleRowChange">
                <Icon type="ios-download-outline"></Icon> 点击
            </Button>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "List1",
        data () {
            return {
                volumeTypes:[{value:'01',label:'你好'},{value:'02',label:'不好'}],
                dropdownItems:[{name:'xxx'},{name:'yyy'}],
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {task_status: 1,title: '姓名',key: 'name',sortable: true},
                    {task_status: 1,title: '年龄',key: 'age', filters: [
                            {
                                label: '大于18岁',
                                value: 1
                            },
                            {
                                label: '小于25岁',
                                value: 2
                            }
                        ],filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.age >18;
                            } else if (value === 2) {
                                return row.age < 25;
                            }
                        }},
                    {task_status: 1,title: '身高',key: 'height',ellipsis:true},
                    {task_status: 1,title: '体重',key: 'weight',ellipsis:true},
                    {task_status: 1,title: '健康状况',key: 'health',ellipsis:true},
                    {task_status: 1,title: '地址',key: 'address',ellipsis:true},
                    {
                        title: '输入框',//纵列表头(类似于th)
                        width:120, //列表每一格的宽度
                        align: 'left', //ivew里面的写法,不用理会
                        key: 'region', //ivew里面的写法,不用理会
                        render: (h, params) => {
                            return h('div',[
                                h('Input',{
                                    props:{
                                        value:"",
                                        placeholder:'请输入'
                                    },
                                    on:{
                                        input: (val) => {
                                            t.data[params.index].actualTime = val
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '数字框',//纵列表头(类似于th)
                        width:120, //列表每一格的宽度
                        align: 'left', //ivew里面的写法,不用理会
                        key: 'roomNum', //ivew里面的写法,不用理会
                        render: (h, params) => {
                            return h('div',[
                                h('InputNumber',{
                                    props:{
                                        min:0,
                                        step:1,
                                        value:params.row.roomNum
                                    },
                                    on:{
                                        'on-change': (value) => {
                                            console.log(value);
                                            params.row.roomNum=event.target.value;
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '日期',//纵列表头(类似于th)
                        width:120, //列表每一格的宽度
                        align: 'left', //ivew里面的写法,不用理会
                        key: 'region', //ivew里面的写法,不用理会
                        render: (h, params) => {
                            return h('div',[
                                h('DatePicker',{
                                    props:{
                                        placeholder:'请选择日期'
                                    },
                                    on:{
                                        'on-change':function(date){
                                            console.log(date);
                                        }
                                    }
                                })
                            ]);
                        }
                    },
                   /* {
                        title: '下拉框',//纵列表头(类似于th)
                        width:120, //列表每一格的宽度
                        align: 'left', //ivew里面的写法,不用理会
                        key: 'region', //ivew里面的写法,不用理会
                        render: (h, params) => {
                            return h('Iselect', {
                                    on: {
                                        'onChange':(event) => {
                                            this.data[params.index].volumeTypes = event;
                                        }
                                    },
                                },
                                this.volumeTypes.map(function(type){//这个数组需要在data中定义,里面是一个个对象,每个对象里面应当包含value属性(因为要用到)
                                    return h('Option', {
                                        props:{
                                            value:type.value
                                        }
                                    }, type);
                                })
                            )
                        }
                    },*/
                    {
                        title: '下拉操作',
                        key: 'Operation',
                        width: 148,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Dropdown',{
                                    props:{
                                        trigger:"click"
                                    },
                                    on:{
                                        'on-click':(value)=>{
                                            console.log(value) //此处的value和下面DropdownMenu选项的name对应
                                            if(value == "submit"){
                                                //this.submit(params.index)
                                            }else if(value == 'revise' ){
                                                //this.show(params.index)
                                            } else {
                                                //this.remove(params.index)
                                            }
                                        }
                                    }
                                },[
                                    h('Button',{
                                        props:{
                                            type: 'primary'
                                        }
                                    },[
                                        h('span','操作菜单'),//span中的内容
                                        h('Icon',{
                                            props:{
                                                type: 'md-arrow-dropdown'
                                            }
                                        })
                                    ]),
                                    h('DropdownMenu',{
                                        slot:'list'
                                    },[
                                        h('DropdownItem',{
                                            props:{
                                                name: 'submit'
                                            }
                                        },'提交'),
                                        h('DropdownItem',{
                                            props:{
                                                name: 'revise'
                                            }
                                        },'修改'),
                                        h('DropdownItem',{
                                            props:{
                                                name: 'delete'
                                            }
                                        },'删除'),
                                    ])
                                ])
                            ])
                        }
                    }
                ],
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        height: '150cm',
                        weight: '120kg',
                        health: '健康',
                        address: '北京市朝阳区芍药居',_checked: true
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        height: '180cm',
                        weight: '150kg',
                        health: '不健康',
                        address: '北京市海淀区西二旗',_disabled: true
                    },
                    {
                        name: '李小红',
                        age: 30,
                        height: '140cm',
                        weight: '110kg',
                        health: '健康',
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        height: '160cm',
                        weight: '140kg',
                        health: '良好',
                        address: '深圳市南山区深南大道'
                    }
                ]
            }
        },
        methods: {
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
                    this.$refs.table.exportCsv({
                        filename: '自定义数据',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
            },
            handleRowChange(currentRow, oldCurrentRow){
                console.log(currentRow)
                console.log(oldCurrentRow)
            }
        },

    }
</script>

<style scoped>
    .code-row-bg{background: #d1d1d1;}
</style>
