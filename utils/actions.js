import { initializeAuth } from "firebase/auth"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from './firebase'

initializeAuth(firebaseApp)


export const isUserLogged = () => {
    let isLogged = false
    
    onAuthStateChanged(getAuth(),(user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
}  

export const getCurrentUser = () => {
    return getAuth().currentUser
}
