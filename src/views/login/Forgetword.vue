<template>
    <div class="login-container" style="background-color: #141a48;margin: 0px;overflow: hidden;">
        <div id="canvascontainer" ref='can'></div>
        <Row class="loginwrap">
            <i-col :xs="3" :sm="5" :md="7" :lg="9">&nbsp;&nbsp;</i-col>
            <i-col :xs="18" :sm="14" :md="10" :lg="6" class="loginform">
                <i-form ref="form-custom" :model="formCustom" :rules="ruleCustom" :label-width="80">
                    <Form-item label="密码" prop="passwd">
                        <i-input type="password" v-model="formCustom.passwd"></i-input>
                    </Form-item>
                    <Form-item label="确认密码" prop="passwdCheck">
                        <i-input type="password" v-model="formCustom.passwdCheck"></i-input>
                    </Form-item>
                    <Form-item label="年龄" prop="age">
                        <i-input type="text" v-model="formCustom.age" number></i-input>
                    </Form-item>
                    <Form-item label="  ">
                        <Row>
                            <i-col span="11">
                                <Form-item>
                                    <i-button type="primary" size="large" long @click="handleSubmit('formCustom')">确认提交</i-button>
                                </Form-item>
                            </i-col>
                            <i-col span="2" style="text-align: center">-</i-col>
                            <i-col span="11">
                                <Form-item>
                                    <router-link tag="Button" to='/login' style="width: 100%;background: transparent;color: #fff;">
                                        记得密码,去登录
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
    import {isWscnEmail} from 'utils/validate';

    export default {
        name: 'Regist',
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };

            return {
                formCustom: {
                    passwd: '',
                    passwdCheck: '',
                    age: ''
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    age: [
                        { validator: validateAge, trigger: 'blur' }
                    ]
                }
            }
        },
        created(){

        },
        methods: {
            handleSubmit (name) {
                this.$Message.success('提交成功!');
                // this.$refs[name].validate((valid) => {
                //     if (valid) {
                //         this.$Message.success('提交成功!');
                //     } else {
                //         this.$Message.error('表单验证失败!');
                //     }
                // })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
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
                program: function (context) {

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
    }

    var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

    var container;
    var camera, scene, renderer;

    var particles, particle, count = 0;

    var mouseX = 0, mouseY = 0;

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
    @import '../../../static/scss/forgetword.scss';
</style>
