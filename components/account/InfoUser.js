import { Alert, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Avatar } from '@rneui/base'
import { loadImageFromGallery } from '../../utils/helpers'
import { updateTheProfile, uploadImage } from '../../utils/actions'

export default function InfoUser({ user, setLoading, setLoadingText }) {
    const [photoUrl, setPhotoUrl] = useState(user.photoURL)
  const changePhoto = async() => {
        const result = await loadImageFromGallery([1, 1])
        if (!result.status){
            return
        }
        setLoadingText("Actualizando Imagen")
        setLoading(true)
        const resultUploadImage = await uploadImage(result.image, "avatars", user.uid) 
        
        if (!resultUploadImage.statusResponse){
            setLoading(false)
            Alert.alert("Ha ocurrido un error al almacenar la foto de perfil.")
            return
        } 
        const resultUpdateProfile = await updateTheProfile({ photoURL: resultUploadImage.url })
        setLoading(false)
        if(resultUpdateProfile.statusResponse){
            setPhotoUrl(resultUploadImage.url)
        } else {
            Alert.alert("Ha ocurrido un error al actualizar la foto de perfil.")
        }    
  }

  return (
    <View style={styles.container}>
       <Avatar
         rounded
         size = "large"
         onPress={changePhoto}
         source= { 
            photoUrl
               ? ({uri: photoUrl})
               : require("../../assets/avatar-default.jpg")
         }
       />
       <View style={styles.infoUser}>
                <Text style={styles.displayName}>
                    {
                        user.displayName ? user.displayName : "Anónimo"
                    }
                </Text>
                <Text>{user.email}</Text>
        </View> 
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 30
    },
    infoUser: {
        marginLeft: 20
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5
    }
})