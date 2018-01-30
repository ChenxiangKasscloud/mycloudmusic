/**
 *  实现对kpath的路径解析,提供函数：
 *	1) getName 获取文件/文件夹名
 *    @param kpath
 *		@return name
 *  2) getExt 获取后缀名
 *		@param kpath
 *		@return ext
 *
 * author: cx 2017-11-30
 */

"use strict";

const KpathTool = {
  getName(kpath){
  	if(!kpath) return "";
  	return kpath.split("/").pop();
  },
  getExt(kpath){
  	let arr = getName(kpath).split(".");
  	return arr.length>1 ? arr.pop() : "";
  }
}

export default KpathTool;
