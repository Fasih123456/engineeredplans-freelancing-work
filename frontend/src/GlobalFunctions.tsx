//This file will be used to store global functions that can be used throughout the application
import axios from "axios";

interface RequestOptions {
	method: "get" | "post" | "put" | "delete";
	url: string;
	data?: any;
	params?: any;
}

const serverRequest = async (options: RequestOptions) => {
	console.log(options);
	const token = localStorage.getItem("token");
	const response = await axios({
		method: options.method,
		url: `http://localhost:3001/${options.url}`,
		data: options.data,
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			...options.params,
		},
	});

	return response;
};

export { serverRequest };
