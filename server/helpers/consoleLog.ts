import "colors";
import { Request } from "express";

export function blue(
	module_name: string,
	message: string,
	req?: Request
) {
	console.log(
		`[${new Date().toLocaleString()}] ${
			req
				? `<${
						req.headers["x-forwarded-for"] ||
						req.connection.remoteAddress
				  }>`
				: ""
		} || ` + `[${module_name}]`.bgYellow.black.concat(message.bgBlue.black)
	);
}

export function red(
	module_name: string,
	message: string,
	req?: Request
) {
	console.log(
		`[${new Date().toLocaleString()}] ${
			req
				? `<${
						req.headers["x-forwarded-for"] ||
						req.connection.remoteAddress
				  }>`
				: ""
		} || ` + `[${module_name}]`.bgYellow.black.concat(message.bgRed.black)
	);
}

export function green(
	module_name: string,
	message: string,
	req?: Request
) {
	console.log(
		`[${new Date().toLocaleString()}] ${
			req
				? `<${
						req.headers["x-forwarded-for"] ||
						req.connection.remoteAddress
				  }>`
				: ""
		} || ` + `[${module_name}]`.bgYellow.black.concat(message.bgGreen.black)
	);
}
