import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'
import * as Location from 'expo-location'


export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export const loadImageFromGallery = async(array) => {
   const response = { status: false, image: null }
   const resultPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync()
   if(resultPermissions.status === "denied"){
     Alert.alert("Debes conceder permiso para acceder a las imágenes del dispositivo.")
     return response
   }
   const result = await ImagePicker.launchImageLibraryAsync({
         allowsEditing: true,
         aspect: array
   })
   if (result.canceled){
      return response
   }
   response.status = true
   response.image = result.assets[0].uri
   return response
}

export const fileToBlob = async(path) => {
    const file = await fetch(path)
    const blob = await file.blob()
    return blob
}

export const getCurrentLocation = async() =>{
  const response = {status: false, location: null}
  const resultPermissions = await Location.requestForegroundPermissionsAsync()
  if (resultPermissions === "denied"){
    Alert.alert("Debes dar permisos para la localización")
    return response
  }
  const position = await Location.getCurrentPositionAsync({})
  const location = {
     latitude: position.coords.latitude,
     longitude: position.coords.longitude,
     latitudeDelta: 0.001,
     longitudeDelta: 0.001
  }
  response.status = true
  response.location = location
  return response

}