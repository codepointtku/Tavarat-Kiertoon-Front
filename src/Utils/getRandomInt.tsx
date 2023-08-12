// Generate random numberset. Used in /admin/storage deletion component. Called in routes-file.

export function getRandomInt() {
    return Math.floor(Math.random() * (999999 - 100000) + 100000).toString();
}
