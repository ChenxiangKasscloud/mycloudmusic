/** Xhttp服务:
** get方法
** post方法
** author : cx
** time   : 2017/12/04
**/

'use strict'

import axios from 'axios'
import globalConfig from './globalConfig'

axios.defaults.timeout = 5000; // 默认5s超时
//axios手动配置项，给requestHeaders添加cookie
axios.defaults.withCredentials = true;

class Xhttp {
	get(url, params) {
		let param = {params}
		return new Promise ( (resolve,reject) => {
			globalConfig.headers.token= localStorage.getItem("prmManage_token") || "";
			axios.get(globalConfig.baseURL+ url, param, globalConfig).then((res) => {
				if (res.data.code == 500 ){
					console.log("服务器错误");
					reject("服务器错误");
				} else if (res.data.code== 523){
					this.$cookie.delete('username');
					window.location.href='#/login';
					reject("未登录");
				} else if (res.data.code> 400&&res.data.code<500){
					reject(res.data.code+":"+res.data.msg);
				} else if ( res.data.code == 200 ){
					resolve(res.data);
				}else {
					console.error(res.data.code+":"+res.data.msg);
					reject("未知错误")
				}
			}).catch((err) => {
				console.log(err);
			});
		})
	}
	post(url, param, callback) {
			globalConfig.headers.token=localStorage.getItem("prmManage_token")|| "token002";
			axios.post(globalConfig.baseURL+  url, param, globalConfig)
					.then((res) => {
			if (res.data.code == 500 ){
				console.log("服务器错误");
			}  else if (res.data.code== 523){
				this.$cookie.delete('username');
				window.location.href='#/login'
				console.log('未登录')
			} else if (res.data.code> 400&&res.data.code<500){
				console.log(res.data.code+":"+res.data.msg);
			} else {
				if (typeof callback == "function"){
					callback(res.data);
				}
			}
		})
		.catch((err) => {
				console.log(err);
		});
	}
}

export default Xhttp
