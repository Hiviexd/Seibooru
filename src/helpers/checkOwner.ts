import config from "../../config.json";

export default function (user: any): boolean {
    return user.safeUsername === config.ownerUsername;
}
