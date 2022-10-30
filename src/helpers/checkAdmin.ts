export default function (user: any): boolean {
    const perms = ["admin:user", "admin:post"];
    return user.permissions?.some((perm: string) => perms.includes(perm));
}
