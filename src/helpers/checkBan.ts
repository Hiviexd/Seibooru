export default function (user: any): boolean {
    const perms = ["post:create"];
    return !user.permissions?.some((perm: string) => perms.includes(perm));
}
