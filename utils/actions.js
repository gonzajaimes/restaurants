import { createUserWithEmailAndPassword, initializeAuth, signOut } from "firebase/auth"
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
export const closeSession = () => {
    return signOut(getAuth())
}

export const registerUser = async(email,password) =>{
    const result = {statusresponse: true, error: null}
    try {
        await createUserWithEmailAndPassword(getAuth(),email, password)
        
    } catch (error) {
        result.error = "Este correo ya está registrado"
       
    }
    return result
}