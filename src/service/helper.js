export function filterData(users, id) {
    console.log(id, "m:::")
    const user = users.filter((user) => user[`${id}`] !== id.toLowerCase())
    console.log(user, "::::")
    return user
}
