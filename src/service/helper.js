export function filterData(users, id) {
    const user = users.filter((user) => user[`${id}`] !== id.toLowerCase())
    return user;


}
