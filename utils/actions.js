import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, initializeAuth, 
        signInWithEmailAndPassword, signOut, updateProfile, EmailAuthProvider, 
        reauthenticateWithCredential, updateEmail} from "firebase/auth"
import { firebaseApp } from './firebase'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { fileToBlob } from "./helpers"

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
    const result = {statusResponse: true, error: null}
    try {
        await createUserWithEmailAndPassword(getAuth(),email, password)
        
    } catch (error) {
        result.statusResponse = false
        result.error = "Este correo ya está registrado."
       
    }
    return result
}
export const loginWithEmailAndPasword = async(email,password) =>{
    const result = {statusResponse: true, error: null}
    try {
        await signInWithEmailAndPassword(getAuth(),email, password)
        
    } catch (error) {
        result.statusResponse= false
        result.error = "Usuario o contraseña no validos"
       
    }
    return result
}

export const uploadImage = async(image, path, name) => {
     const result = { statusResponse: false, error: null, url: null}
        
     const storage = getStorage()
     const folderRef = ref(storage,path)
     const imageRef = ref(folderRef,name)
     const blob = await fileToBlob(image)
         
     try {
        await uploadBytes(imageRef,blob)
        result.url =  await getDownloadURL(imageRef)
        result.statusResponse = true            
     } catch (error) {
        result.error = error
     }
     return result
}

export const updateTheProfile = async(data) => {
    const result = { statusResponse: true, error: null }
    try {
       await updateProfile(getAuth().currentUser,data)
        
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
} 

export const reAuthenticate = async(password) => {
    const result = { statusResponse: true, error: null }
    const user = getCurrentUser()
    const credentials = EmailAuthProvider.credential(user.email, password)

    try {
       await reauthenticateWithCredential(user,credentials)
        
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
} 

export const updateTheEmail = async(email) => {
    const result = { statusResponse: true, error: null }
    try {
       await updateEmail(getAuth().currentUser,email)
        
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
} 
