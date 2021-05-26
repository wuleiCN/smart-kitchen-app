const pendingRequest = new Map();
const Qs = require('min-qs');
const axios = require('axios');

 export const generateReqKey = (config) => {
	 // console.log(config);
 	const {
 		method,
 		url,
 		params,
 		data
 	} = config;
 	return [method, url, Qs.stringify(params), Qs.stringify(data)].join(
 		"&"
 	);
 }

  export const addPendingRequest = (config) => {
 	const requestKey = generateReqKey(config);
	// console.log('===>add',config);
 	config.cancelToken =
 		config.cancelToken ||
 		new axios.CancelToken((cancel) => {
 			if (!pendingRequest.has(requestKey)) {
 				pendingRequest.set(requestKey, cancel);
 			}
 		});
 }

  export const removePendingRequest = (config) => {
 	const requestKey = generateReqKey(config);
 	if (pendingRequest.has(requestKey)) {
 		const cancel = pendingRequest.get(requestKey);
		// console.log('===>rm',cancel);
 		cancel(requestKey);
 		pendingRequest.delete(requestKey);
 	}
 }
