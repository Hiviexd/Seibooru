import { Request } from "express";
import "colors";

export class LoggerConsumer {
	private module: string;
	private request: Request | undefined;

	constructor(module: string, request?: Request) {
		this.module = module;
		this.request = request;
	}

	public printSuccess(message: string) {
		console.log(
			new Date().toLocaleTimeString() +
				" " +
				`[${this.module}]`.bgYellow.black +
				`${message}`.bgGreen.black
		);
	}

	public printError(message: string, error?: any) {
		console.log(
			new Date().toLocaleTimeString() +
				" " +
				`[${this.module}]`.bgYellow.black +
				`${message}`.bgRed.black
		);
		error ? console.error(error) : void {};
	}

	public printInfo(message: string) {
		console.log(
			new Date().toLocaleTimeString() +
				" " +
				`[${this.module}]`.bgYellow.black +
				`${message}`.bgGreen.black
		);
	}

	public printWarning(message: string) {
		console.log(
			new Date().toLocaleTimeString() +
				`[${this.module}]`.bgYellow.black +
				`${message}`.bgYellow.black
		);
	}
}
