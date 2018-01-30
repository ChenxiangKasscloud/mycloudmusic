'use strict'

import regExp from './regExp'
import CryptoJS from './crypto'
import Map from './map'
import urlParse from './urlParse'

function getToken(){
	// var accessObj = JSON.parse(window.localStorage.getItem("kapp_usertoken"));
	// console.info("accessObj",accessObj);
	// console.info("accessObj.token",accessObj.token);
	// return accessObj==null ? "" : accessObj.token;
	return "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJrYXNzand0IiwiaWF0IjoxNTEyODEyMzY4LCJzdWIiOiJ7XCJ1c2VyaWRcIjpcImFkbWluXCIsXCJzZWNyZXRcIjpcInJ3c2plY3NoeG9kcndoZGJcIixcInNlc3Npb25pZFwiOlwiRTFCMTA5RjlDQjcxQTBGMTlDRTk2MjhERDVFNEExRkZcIn0ifQ.x7bcoeamt2F-PH11r-DS0USOy0-0IzJEGGYbjig7XM0"
}
function getSecret(){
	// var accessObj = JSON.parse(window.localStorage.getItem("kapp_usertoken"));
	// console.info("accessObj",accessObj);
	// console.info("accessObj.secret",accessObj.secret);
	// return accessObj==null ? "" : accessObj.secret;
	return "rwsjecshxodrwhdb";
}
function getCanonicalizedResource(url,params){
	if(url==null || url==undefined || url.length==0)
		return null

	//从url中截取出uri和search
	var uri = "";
	var search = null;
	var href = url.replace(regExp.DOMAIN,"/");

	if(href.indexOf('?')>0){
		uri = href.substring(0,href.indexOf('?'));
		search = href.substring(href.indexOf('?')+1);
	}else{
		uri = href;
	}

	//计算canonicalizedResource
	var canonicalizedResource = uri;
	var paramsMap = new Map();
	var param_keys = [];

	//先获取url中带的参数(不鼓励直接在url中带参)
	while(search!=null && search.length>0){
		var paramData = "";
		var queryindex = search.indexOf('&');
		if(queryindex>0){
			paramData = search.substring(0, queryindex);
			search = search.substring(queryindex+1);
		}else{
			paramData = search;
			search = "";
		}
		if(paramData==null || paramData.length==0)
			continue;
		var paramindex = paramData.indexOf('=');
		if(paramindex<=0)
			continue;

		var paramKey = paramData.substring(0, paramindex);
		var paramValue = paramData.substring(paramindex+1);

		if(paramValue==null || paramValue.length==0){
			//若参数值为空则忽略
			continue;
		}
		paramsMap.put(paramKey, paramValue);
		param_keys.push(paramKey);
	}
	//再获取手动传入的参数
	if(params!=null || params!=undefined){
		for(var key in params){
			if(params[key]!=null && (""+params[key]).length>0){
				paramsMap.put(key,params[key]);
				param_keys.push(key);
			}
		}
	}
	//拼接有效的search
	if(param_keys.length>0){
		param_keys.sort();
		for(var i=0; i<param_keys.length; i++){
			if(i==0)
    			canonicalizedResource += "?";
    		else
    			canonicalizedResource += "&";
    		canonicalizedResource += param_keys[i] + "=" + urlParse.URLencode(paramsMap.get(param_keys[i]));
		}
	}
    return canonicalizedResource
}
function getSignature(verb, date, canonicalizedResource){
	var secret = getSecret(),
		signature = CryptoJS.HmacSHA1(verb.toUpperCase() + "\n" + date + "\n" + canonicalizedResource, secret);
	return CryptoJS.Base64.stringify(signature)
}

const getHeader = function(verb,url,params){
	//GMT格式时间 (Thu, 17 Mar 2012 18:49:58 GMT)
	var gmtdate = (new Date()).toGMTString(),
		token = getToken(),
		//规范化的请求资源
		canonicalizedResource = getCanonicalizedResource(url,params),
		//签名字符串
		signature = getSignature(verb, gmtdate, canonicalizedResource);
	var headers = {
		'x-date' :gmtdate,
		'authorization' : "KASSCLOUD " + token + ":" + signature
	}
	return headers
}

export default {
	getHeader : getHeader
}
