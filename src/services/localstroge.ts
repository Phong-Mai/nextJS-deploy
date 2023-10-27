export const getLocalBook = (book : any) => {
    if(localStorage.getItem(book) !== null) return localStorage.getItem(book)
    return null
}
export const setLocalBook = (book : any) => {
    localStorage.setItem("book", JSON.stringify(book))
} 
export const removeLocalBook = () => {
    localStorage.removeItem("book")
}
export const getUserLocal = (user : any) => {
     return localStorage.getItem(user)
    
}
export const setUserLocal = (user : any) => {
    localStorage.setItem("user", JSON.stringify(user))
}


