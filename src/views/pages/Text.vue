<template>
    <div>
        <Row>
            <i-col span="12">
                <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
            </i-col>
        </Row>

        <Row>
            <i-col span="24">
                <Collapse active-key="1" accordion>
                    <Panel key="1">
                        史蒂夫·乔布斯
                        <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                    </Panel>
                    <Panel key="2">
                        斯蒂夫·盖瑞·沃兹尼亚克
                        <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
                    </Panel>
                    <Panel key="3">
                        乔纳森·伊夫
                        <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
                    </Panel>
                </Collapse>
            </i-col>
        </Row>

        <Row>
            <i-col span="4">
                <Timeline>
                    <Timeline-item>
                        <p class="time">1976年</p>
                        <p class="content">Apple I 问世</p>
                    </Timeline-item>
                    <Timeline-item>
                        <p class="time">1984年</p>
                        <p class="content">发布 Macintosh</p>
                    </Timeline-item>
                    <Timeline-item>
                        <p class="time">2007年</p>
                        <p class="content">发布 iPhone</p>
                    </Timeline-item>
                    <Timeline-item>
                        <p class="time">2010年</p>
                        <p class="content">发布 iPad</p>
                    </Timeline-item>
                    <Timeline-item>
                        <p class="time">2011年10月5日</p>
                        <p class="content">史蒂夫·乔布斯去世</p>
                    </Timeline-item>
                </Timeline>
            </i-col>
            <i-col span="12">
                <Transfer
                        :data="data2"
                        :target-keys="targetKeys2"
                        filterable
                        :filter-method="filterMethod"
                        @on-change="handleChange2"></Transfer>
            </i-col>
        </Row>

        <Row>
            <i-col span="8">
            <Cascader :data="data" :value.sync="value1"></Cascader>
            </i-col>
            <i-col span="8">
                <Dropdown>
                    <a href="javascript:void(0)">
                        下拉菜单
                        <Icon type="arrow-down-b"></Icon>
                    </a>
                    <Dropdown-menu slot="list">
                        <Dropdown-item>驴打滚</Dropdown-item>
                        <Dropdown-item>炸酱面</Dropdown-item>
                        <Dropdown-item disabled>豆汁儿</Dropdown-item>
                        <Dropdown-item>冰糖葫芦</Dropdown-item>
                        <Dropdown-item divided>北京烤鸭</Dropdown-item>
                    </Dropdown-menu>
                </Dropdown>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        name:'Text',
        data () {
            return {
                data2: this.getMockData(),
                targetKeys2: this.getTargetKeys(),
                value1: [],
                data: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }]
            }
        },
        methods: {
            getMockData () {
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: '内容' + i,
                        description: '内容' + i + '的描述信息',
                        disabled: Math.random() * 3 < 1
                    });
                }
                return mockData;
            },
            getTargetKeys () {
                return this.getMockData()
                    .filter(() => Math.random() * 2 > 1)
                    .map(item => item.key);
            },
            handleChange2 (newTargetKeys) {
                this.targetKeys2 = newTargetKeys;
            },
            filterMethod (data, query) {
                return data.label.indexOf(query) > -1;
            }
        }
    }
</script>


