import axios from "axios";

const request = axios.create({
  timeout: 50000,
});

function getFile(url) {
  return request.get(url, {
    responseType: "bolb",
  });
}

// 配置axios前置拦截器，作用是让所有axios请求携带token，后台需要token校验是否登录
request.interceptors.request.use(
  (config) => {
    // 1.从缓存中获取到token,这里的Authorization时登录时你给用户设置token的键值
    let token = localStorage.getItem("token");
    // 2.如果token不为null，那么设置到请求头中，此处哪怕为null，我们也不进行处理，因为后台会进行拦截
    if (token) {
      //后台给登录用户设置的token的键时什么，headers['''']里的键也应该保持一致
      config.headers["MspToken"] = token;
    }
    // 3.放行
    return config;
  },
  (error) => {
    //失败后抛出错误
    Promise.reject(error);
  }
);

request.interceptors.response.use(
  //请求成功
  (response) => {
    const res = response.data;
    if (res.code === 200) {
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message);
    }
    return response;
  },
  //请求失败
  (error) => {
    console.log("bbb");
    //可根据不同的状态去区分不同的错误，达到不同效果
    if (error.response.code === 400 || error.response.status === 500) {
      ElMessage.error(error.response.message);
    }
    return Promise.reject(error);
  }
);

export default request;
