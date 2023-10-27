export const getLocalBook = (book: string) => {
    if (localStorage.getItem(book) !== null) return localStorage.getItem(book)
    return null
}
export const setLocalBook = (book: string) => {
    localStorage.setItem("book", JSON.stringify(book))
}
export const removeLocalBook = () => {
    localStorage.removeItem("book")
}
export const getUserLocal = (user: string) => {
    if (localStorage.getItem(user) !== null) return localStorage.getItem(user)
    return null
}
export const setUserLocal = (user: string) => {
    localStorage.setItem("user", JSON.stringify(user))
}
export const getLocalSearch = (search: string) => {
    if (localStorage.getItem(search) !== null) return localStorage.getItem(search)
    return null
    
}


