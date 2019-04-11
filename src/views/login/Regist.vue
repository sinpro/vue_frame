<template>
    <div class="login-container" style="background-color: #141a48;margin: 0px;overflow: hidden;">
        <div id="canvascontainer" ref='can'></div>
        <Row class="loginwrap">
            <i-col :xs="3" :sm="5" :md="7" :lg="9">&nbsp;&nbsp;</i-col>
            <i-col :xs="18" :sm="14" :md="10" :lg="6" class="loginform">
                <i-form ref="form-validate" :model="formValidate" :label-width="80" :rules="ruleValidate">
                    <Form-item label="姓名" prop="name">
                        <i-input v-model="formValidate.name" placeholder="请输入姓名"></i-input>
                    </Form-item>
                    <Form-item label="邮箱" prop="mail">
                        <i-input v-model="formValidate.mail" placeholder="请输入邮箱"></i-input>
                    </Form-item>
                    <Form-item label="城市" prop="city">
                        <i-select v-model="formValidate.city" placeholder="请选择所在地">
                            <i-option value="beijing">北京市</i-option>
                            <i-option value="shanghai">上海市</i-option>
                            <i-option value="shenzhen">深圳市</i-option>
                        </i-select>
                    </Form-item>
                    <Form-item label="选择日期">
                        <Row>
                            <i-col span="11">
                                <Form-item prop="date">
                                    <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date"></Date-picker>
                                </Form-item>
                            </i-col>
                            <i-col span="2" style="text-align: center">-</i-col>
                            <i-col span="11">
                                <Form-item prop="time">
                                    <Time-picker type="time" placeholder="选择时间" v-model="formValidate.time"></Time-picker>
                                </Form-item>
                            </i-col>
                        </Row>
                    </Form-item>
                    <Form-item label="介绍" prop="desc">
                        <i-input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></i-input>
                    </Form-item>
                    <Form-item label="  ">
                        <Row>
                            <i-col span="11">
                                <Form-item>
                                    <i-button type="primary" long @click="handleSubmit('formValidate')">确认注册</i-button>
                                </Form-item>
                            </i-col>
                            <i-col span="2" style="text-align: center">-</i-col>
                            <i-col span="11">
                                <Form-item>
                                    <router-link tag="Button" to='/login' style="width: 100%;background: transparent;color: #fff;">
                                        已有账号,去登录
                                    </router-link>
                                </Form-item>
                            </i-col>
                        </Row>
                    </Form-item>
                </i-form>
            </i-col>
            <i-col :xs="3" :sm="5" :md="7" :lg="9">&nbsp;&nbsp;</i-col>
        </Row>
    </div>
</template>
<script>
import { isWscnEmail } from 'utils/validate';

export default {
    name: 'Regist',
    data() {
        return {
            formValidate: {
                name: 'xxx',
                mail: '1040680627@qq.com',
                city: 'beijing',
                gender: '',
                interest: [],
                date: '',
                time: '',
                desc: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
                ],
                city: [
                    { required: true, message: '请选择城市', trigger: 'change' }
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                interest: [
                    { required: true, type: 'array', min: 1, message: '至少选择一个爱好', trigger: 'change' },
                    { type: 'array', max: 2, message: '最多选择两个爱好', trigger: 'change' }
                ],
                date: [
                    { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
                ],
                time: [
                    { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请输入个人介绍', trigger: 'blur' },
                    { type: 'string', min: 20, message: '介绍不能少于20字', trigger: 'blur' }
                ]
            }
        }
    },
    created() {

    },
    mounted() {

        container = document.createElement('div');
        this.$refs.can.appendChild(container);

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 1000;

        scene = new THREE.Scene();

        particles = new Array();

        var PI2 = Math.PI * 2;
        var material = new THREE.ParticleCanvasMaterial({

            color: 0x0078de,
            program: function(context) {

                context.beginPath();
                context.arc(0, 0, 1, 0, PI2, true);
                context.fill();

            }

        });

        var i = 0;

        for (var ix = 0; ix < AMOUNTX; ix++) {

            for (var iy = 0; iy < AMOUNTY; iy++) {

                particle = particles[i++] = new THREE.Particle(material);
                particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                scene.add(particle);

            }

        }

        renderer = new THREE.CanvasRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        //

        window.addEventListener('resize', onWindowResize, false);

        animate();
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
}

var SEPARATION = 100,
    AMOUNTX = 50,
    AMOUNTY = 50;

var container;
var camera, scene, renderer;

var particles, particle, count = 0;

var mouseX = 0,
    mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


// animate();

function init() {


}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;

    }

}

function onDocumentTouchMove(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseX = event.touches[0].pageX - windowHalfX;
        mouseY = event.touches[0].pageY - windowHalfY;

    }

}

//

function animate() {

    requestAnimationFrame(animate);

    render();


}

function render() {

    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

        for (var iy = 0; iy < AMOUNTY; iy++) {

            particle = particles[i++];
            particle.position.y = (Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50);
            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;

        }

    }

    renderer.render(scene, camera);

    count += 0.1;

}
</script>
<style rel="stylesheet/scss" lang="scss">
@import '../../../static/scss/regist.scss';
</style>