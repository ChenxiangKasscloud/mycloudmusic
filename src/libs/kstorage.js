const OneSelectKey="mySelectOne";
const MultiSelectKey="mySelectMulti";

const kstorage = {	
	
	DialogSelect_Remove:()=>{
		kstorage.remove(OneSelectKey);
		kstorage.remove(MultiSelectKey);
	},
	DialogSelect_hasOne:()=>{
		return kstorage.has(OneSelectKey);
	},
	DialogSelect_hasMulti:()=>{
		return kstorage.has(MultiSelectKey);
	},
	DialogSelect_GetMulti:()=>{
		return kstorage.get(MultiSelectKey);
	},
	DialogSelect_GetOne:()=>{
		return kstorage.get(OneSelectKey);
	},
	set : (key, value) => {
		window.localStorage.setItem(key, value);
	},
	get : (key) => {
		return window.localStorage.getItem(key);
	},
	remove : (key) => {
		return window.localStorage.removeItem(key);
	},
	has:(key) =>{
		return window.localStorage.hasOwnProperty(key);
	}
}
export default kstorage