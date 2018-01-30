'use strict'

const URLencode = (url) => encodeURI(url).replace(/\//g,'%2F').replace(/\+/g,'%2B')
	.replace(/\'/g,'%27').replace(/\&/g,'%26').replace(/\=/g,'%3D').replace(/%20/g,'+')
	.replace(/\?/g,'%3F').replace(/\#/g,'%23')

export default {
	URLencode : URLencode
}
