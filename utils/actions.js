import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, initializeAuth, 
        signInWithEmailAndPassword, signOut, updateProfile, EmailAuthProvider, 
        reauthenticateWithCredential, updateEmail, updatePassword} from "firebase/auth"
import { firebaseApp } from './firebase'
import { getFirestore, addDoc, collection, getDocs, query, 
         orderBy, limit, startAfter, doc, getDoc, updateDoc, where, deleteDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { fileToBlob } from "./helpers"
import { map } from "lodash"

initializeAuth(firebaseApp)
const db = getFirestore(firebaseApp)

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

export const updateThePassword = async(password) => {
    const result = { statusResponse: true, error: null }
    try {
       await updatePassword(getAuth().currentUser,password)
        
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
} 

export const addDocumentWithoutId = async(theCollection, data) => {
    const result = { statusResponse: true, error: null }
    
    try {            
        await addDoc(collection(db,theCollection),data) 
                     
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getRestaurants = async(limitRestaurants) => {
    const result = { statusResponse: true, error: null, restaurants: [], startRestaurant: null  }
    const restaurantsRef = collection(db,"restaurants")
    const q =   query(restaurantsRef,orderBy("createAt","desc"),limit(limitRestaurants))
    
    try {            
        const response = await getDocs(q)
        if (response.docs.length > 0) {
            result.startRestaurant = response.docs[response.docs.length - 1]
        } 
        response.forEach( (doc) => {
            const restaurant = doc.data()
            restaurant.id = doc.id
            result.restaurants.push(restaurant)
        })
                     
    } catch (error) {
        result.statusResponse = false
        result.error = error       
    }
    return result     
}

export const getMoreRestaurants = async(limitRestaurants, startRestaurant) => {
    const result = { statusResponse: true, error: null, restaurants: [], startRestaurant: null  }
    const restaurantsRef = collection(db,"restaurants")
    const q =   query(restaurantsRef,orderBy("createAt","desc"),limit(limitRestaurants), startAfter(startRestaurant.data().createAt))
    
    try {            
        const response = await getDocs(q)
        if (response.docs.length > 0) {
            result.startRestaurant = response.docs[response.docs.length - 1]
        } 
        response.forEach( (doc) => {
            const restaurant = doc.data()
            restaurant.id = doc.id
            result.restaurants.push(restaurant)
        })
                     
    } catch (error) {
        result.statusResponse = false
        result.error = error       
    }
    return result     
}

export const getDocumentById = async(theCollection, id) => {
    const result = { statusResponse: true, error: null, document: null }
    const restaurantsRef = collection(db,theCollection)
    const documment = doc(restaurantsRef,id)
    
    try {
        const response = await getDoc(documment)
        result.document = response.data()
        result.document.id = response.id
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updateDocument = async(theCollection, id, data) => {
    const result = { statusResponse: true, error: null }
    const collectionRef = collection(db,theCollection)
    const documment = doc(collectionRef,id)
    try {
        const response = updateDoc(documment,data)
      
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
} 

export const getRestaurantReviews = async(id) => {
    const result = { statusResponse: true, error: null, reviews: [] }
    const collectionRef = collection(db,"reviews")
    const q =   query(collectionRef,where("idRestaurant","==",id))
    
    try {            
        const response = await getDocs(q)
        
        response.forEach( (doc) => {
            const review = doc.data()
            review.id = doc.id
            result.reviews.push(review)
        })
                      
    } catch (error) {
        console.log(error)
        result.statusResponse = false
        result.error = error       
    }
    return result     
}

export const getIsFavorite = async(idRestaurant) => {
    const result = { statusResponse: true, error: null, isFavorite: false }
    const favoritesRef = collection(db,"favourites")
    const q = query(favoritesRef,where("idRestaurant","==",idRestaurant),where("idUser","==",getCurrentUser().uid))
    
    try {
        const response = await getDocs(q)
        result.isFavorite = response.docs.length > 0
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const deleteFavorite = async(idRestaurant) => {
    const result = { statusResponse: true, error: null}
    const favoritesRef = collection(db,"favourites")
    const q = query(favoritesRef,where("idRestaurant","==",idRestaurant),where("idUser","==",getCurrentUser().uid))
    
    try {
        const response = await getDocs(q)
        response.forEach(async(theDoc) =>{
            const favoriteRef = doc(favoritesRef,theDoc.id)
            await deleteDoc(favoriteRef)
        })
    } catch (error) { 
        result.statusResponse = false
        result.error = error
    }
    return result     
}
export const getFavorites = async() => {
    const result = { statusResponse: true, error: null, favorites: [] }
    const favoritesRef = collection(db,"favourites")
    const q = query(favoritesRef,where("idUser","==",getCurrentUser().uid))
    
    try {
        const response = await getDocs(q)        
        await Promise.all(
            map(response.docs,async(doc) => {
                const favorite = doc.data()
                const restaurant = await getDocumentById("restaurants", favorite.idRestaurant)
                if (restaurant.statusResponse) {
                    result.favorites.push(restaurant.document)
                }
            })
        )
    } catch (error) { 
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getTopRestaurants = async(limitRestaurants) => {
    const result = { statusResponse: true, error: null, restaurants: [] }
    const restaurantsRef = collection(db,"restaurants")
    const q = query(restaurantsRef,orderBy("rating","desc"),limit(limitRestaurants))
    
    try {
        const response = await getDocs(q)
        response.forEach(async(doc) =>{
            const restaurant = doc.data()
            restaurant.id = doc.id
            result.restaurants.push(restaurant)
         })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}
export const searchRestaurants = async(criteria) => {
    const result = { statusResponse: true, error: null, restaurants: [] }
    const restaurantsRef = collection(db,"restaurants")
    const q = query(restaurantsRef,where("name","==",criteria))
    

    try {
        const response = await getDocs(q)
       
        response.forEach(async(doc) =>{
            const restaurant = doc.data()
            restaurant.id = doc.id
            result.restaurants.push(restaurant)
         })
    } catch (error) {
       
        result.statusResponse = false
        result.error = error
    }
    return result    
}