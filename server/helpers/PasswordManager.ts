import bcrypt from "bcrypt";

export class PasswordManager {
	public hash = "";
	public password = "";

	constructor(password: string, hash?: string) {
		this.password = password;
		this.hash = hash || "";
	}

	public isValid() {
		return bcrypt.compare(this.password, this.hash);
	}

	public async generateHash() {
		const salt = await bcrypt.genSalt(10);
		const generatedHash = await bcrypt.hash(this.password, salt);

		return generatedHash;
	}
}
