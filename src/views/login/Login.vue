<template>
    <div class="login-container" style="background-color: #141a48;margin: 0px;overflow: hidden;">
        <div id="canvascontainer" ref='can'></div>
        <Row class="loginwrap">
            <i-col :xs="3" :sm="5" :md="7" :lg="9">&nbsp;&nbsp;</i-col>
            <i-col :xs="18" :sm="14" :md="10" :lg="6" class="loginform">
                <Form ref="loginForm" autoComplete="on" :model="loginForm" :rules="loginRules" class="card-box login-form">
                    <Form-item  style="position: relative;">
                        <span style="position: absolute;left: 0;top:0;height: 40px;background: #fff;padding: 4px 7px;font-weight: 400;font-size: 20px;border-radius: 6px 0 0 6px;border: 1px solid #dddee1"><Icon type="ios-arrow-dropup-circle" /></span>
                        <Select v-model="loginForm.accttype" style="width:100%">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item prop="acctname">
                        <Input type="text"  placeholder="acctname" autoComplete="on" v-model="loginForm.acctname">
                            <Icon type="md-contact" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <!-- <Form-item prop="email">
                        <Input type="text" v-model="loginForm.email" placeholder="Username" autoComplete="on">
                            <Icon type="ios-mail" slot="prepend"></Icon>
                        </Input>
                    </Form-item> -->
                    <Form-item prop="password" style="margin-bottom: 0">
                        <Input type="password" v-model="loginForm.password" placeholder="Password"
                               @keyup.enter.native="handleLogin">
                            <Icon type="ios-lock" slot="prepend"></Icon>
                        </Input>
                    </Form-item>
                    <Row class="rempass">
                        <i-col span="12" style="text-align: left">
                            <Checkbox v-model="single">记住密码</Checkbox>
                        </i-col>
                        <i-col span="12"  style="text-align: right">
                            <router-link tag="span" to='/forgetword' style="cursor: pointer">
                                忘记密码
                            </router-link>
                        </i-col>
                    </Row>
                    <Row>
                        <i-col span="11">
                            <Form-item>
                                <Button type="success" @click="handleLogin('loginForm')" long>登录</Button>
                            </Form-item>
                        </i-col>
                        <i-col span="2">&nbsp;</i-col>
                        <i-col span="11">
                            <Form-item>
                                <router-link tag="Button" to='/regist' style="width: 100%;background: transparent;color: #fff;">
                                    注册
                                </router-link>
                            </Form-item>
                        </i-col>
                    </Row>
                    <div class='tips'>账号为:13145240506 密码123456</div>
                </Form>
            </i-col>
            <i-col :xs="3" :sm="5" :md="7" :lg="9">&nbsp;&nbsp;</i-col>
        </Row>
    </div>
</template>

<script>
import {isWscnEmail} from 'utils/validate';
import Cookies from 'js-cookie';
export default {
  name: 'login',
  data() {
      const validateAcctname = (rule, value, callback) => {
        if (value.length == 0) {
          callback(new Error('请输入账号'));
        } else if (value!= '13145240506') {
          callback(new Error('账号错误'));
        }else{
          callback();
        }
      };
      const validateEmail = (rule, value, callback) => {
        if (!isWscnEmail(value)) {
            callback(new Error('请输入正确的合法邮箱'));
        } else {
            callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不能小于6位'));
        } else if (value!= '123456') {
          callback(new Error('密码错误'));
        }else {
          callback();
        }
      };
      return {
        cityList: [
          {
            value: '1',
            label: '企业账户'
          },
          {
            value: '2',
            label: '个人账户'
          },

          {
            value: '3',
            label: '其他账户'
          }
        ],
        loginForm: {
          accttype:'2',
          acctname:'',
          email: 'admin@wz.com',
          password: ''
        },
        loginRules: {
          acctname:[
            {required: true, trigger: 'blur', validator: validateAcctname}
          ],
          email: [
              {required: true, trigger: 'blur', validator: validateEmail}
          ],
          password: [
              {required: true, trigger: 'blur', validator: validatePass}
          ]
        },
        loading: false,
        showDialog: false,
        single:true
      }
  },
  created(){

  },
  methods: {
    handleLogin(name) {
      this.$refs[name].validate((valid) => {
          if (valid) {
            Cookies.set('Admin-Token', 'doujiangdong');
            this.$store.commit('SET_TOKEN', 'doujiangdong');
            this.$router.push({ path: '/' });
            return false;
            let loginData = [];
            loginData.push({
                Role: this.loginForm.accttype,
                UsersName: this.loginForm.acctname,
                PassWord: this.loginForm.password,
            });
            let params = { loginData: JSON.stringify(loginData) }
            this.$post('Home/FirmLoginMobil', params)
                .then((res) => {
                    console.log(res)
                    if (res.Success) {
                      Cookies.set('Admin-Token', 'doujiangdong');
                      this.$store.commit('SET_TOKEN', 'doujiangdong');
                      this.$router.push({ path: '/' });
                    } else {
                        this.$layer.msg(res.Message)
                    }
                }).catch((err) => {
                    console.log(err);
                })  
          } else {
              this.$Message.error('Fail!');
          }
      }) 
    },
  },
  mounted() {
    container = document.createElement('div');
    this.$refs.can.appendChild(container);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    scene = new THREE.Scene();
    particles = new Array();
    let PI2 = Math.PI * 2;
    let material = new THREE.ParticleCanvasMaterial({
      color: 0x0078de,
      program: function (context) {
        context.beginPath();
        context.arc(0, 0, 1, 0, PI2, true);
        context.fill();
      }
    });
    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
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
    window.addEventListener('resize', onWindowResize, false);
    animate();
  },
}
let SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;
let container;
let camera, scene, renderer;
let particles, particle, count = 0;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
function init() {

}
function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
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
function animate() {
  requestAnimationFrame(animate);
  render();
}
function render() {
  camera.position.x += (mouseX - camera.position.x) * .05;
  camera.position.y += (-mouseY - camera.position.y) * .05;
  camera.lookAt(scene.position);
  let i = 0;
  for (let ix = 0; ix < AMOUNTX; ix++) {
    for (let iy = 0; iy < AMOUNTY; iy++) {
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
    @import '../../../static/scss/login.scss';
</style>
