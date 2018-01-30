/*org_arr = [
	{ deptid : 1,  name : '开始网络', parentid : 0  , perm:{create:true,update:true,delete:true}},
	{ deptid : 20, name : '技术部',   parentid : 1 },
	{ deptid : 30, name : '市场部',   parentid : 1 },
	{ deptid : 40, name : '销售部',   parentid : 1 },
]; */

'use strict';

var KTree = {
	toOrgTree : function(org_arr, pid){
		var tree = [];
		var _tempArr = {};
	    for (var i = 0; i < org_arr.length; i++) {
	    	//{ "deptid": org_arr[i].deptid, "name": org_arr[i].name , "parentid":org_arr[i].parentid};
	    	_tempArr = {
	    		name: org_arr[i].name,
	    		deptid: org_arr[i].deptid,
	    		parentid: org_arr[i].parentid,
	    		isProject: org_arr[i].isProject,
	    		isChecked: org_arr[i].isChecked,
	    		isOpened: org_arr[i].isOpened
	    	}
	        if (_tempArr.parentid == pid) {
	            var node = _tempArr;
	            var temp = KTree.toOrgTree(org_arr, _tempArr.deptid);
	            if(temp.length>0){
	            	node.children = temp;
	            }else{
	            	node.children = [];
	            }
	            tree.push(node);
	        }
	    }
	    return tree;
	},
	openParentDept (alldepts, parentid) {
		console.log(alldepts)
	}
}

module.exports = KTree;
