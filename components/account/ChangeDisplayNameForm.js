import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Button, Input } from '@rneui/themed'
import { isEmpty } from 'lodash'

import { updateTheProfile } from '../../utils/actions'

export default function ChangeDisplayNameForm({displayName, setShowModal, toastRef, setReloadUser}) {
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
           if(!validateForm()){
            return
           } 
           setLoading(true)
           const result = await updateTheProfile({ displayName: newDisplayName })
           setLoading(false)

           if(!result.statusResponse){
             setError( " Error al actualizar nombres y apellidos, intenta mas tarde.")
           }

           setReloadUser(true)
           toastRef.current.show("Se han actualizado nombres y apellidos", 3000)
           setShowModal(false)
           
    }

    const validateForm = () => {
        setError(null)
        if (isEmpty(newDisplayName)){
            setError("Debes ingresar nombres y apellidos.")
            return false
        }
        if (newDisplayName === displayName){
            setError("Debes ingresar nombres y apellidos diferentes a los actuales.")
            return false
        } 
        return true
    }

  return (
    <View style={styles.view}>
        <Input 
            placeholder="Ingresa nombres y apellidos"
            containerStyle={styles.input}
            defaultValue={displayName}
            onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
            errorMessage={error}
            rightIcon={{
                type: "material-community",
                name: "account-circle-outline",
                color: "#c2c2c2"
            }}
        />
        <Button
            title= "Cambiar nombres y apellidos"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress={onSubmit}
            loading={loading}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        width: "95%"
    },  
    btn: {
        backgroundColor: "#452783"
    }
})