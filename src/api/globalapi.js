import axios from 'axios';
import qs from 'qs';
import { Indicator }  from 'mint-ui';
import router from "../router";
axios.defaults.timeout = 5000; //超时终止请求
axios.defaults.baseURL ='http://120.76.123.231:9098/api/'; //配置请求地址

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');//注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = qs.stringify(config.data);
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
    };
    Indicator.open({
      text: '疯狂加载...',
      spinnerType: 'fading-circle'
    });
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    Indicator.close();
    if(response.data.errCode ==2){
      router.push({
        path:"/",
        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    setTimeout(()=>{
      Indicator.close();
    },500)
    return Promise.reject(error)
  }
)

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,data)
      .then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

