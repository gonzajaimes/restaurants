import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Button, Icon, Input } from '@rneui/base'
import { size } from 'lodash'
import { useNavigation } from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers'
import { registerUser } from '../../utils/actions'
import Loading from '../Loading'


export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setformData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [loading, setLoading] = useState(false)
    
    const navigation = useNavigation()
    
    const onChange = (e,type) => {
        setformData({...formData,[type]: e.nativeEvent.text})
        
    }
    const doregisterUser = async() => {
        if(!validateData()){
            return;
        }
        setLoading(true)    
        const result = await registerUser(formData.email, formData.password)
        setLoading(false)
        
        if (!result.statusresponse) {
            setErrorEmail(result.error)
            return
        }

        navigation.navigate("account")
    }
    const validateData = () => {
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true  

        if (!validateEmail(formData.email)){
            setErrorEmail("Debes ingresar un email valido.")
            isValid = false
        }

        if (size(formData.password)  < 6 ){
            setErrorPassword("Debes ingresar un password de al menos seis caracteres")
            isValid = false
        }

        if (size(formData.confirm) < 6){
            setErrorConfirm("Debes ingresar una confirmación de contraseña de al menos seis caracteres")
            isValid = false
        }

        if (formData.password !== formData.confirm){
            setErrorPassword("La contraseña y la confirmación no son iguales")
            setErrorPassword("La contraseña y la confirmación no son iguales")
            isValid = false
        }
        return isValid   
    }
 
  return (
    <View style={styles.form}>
      <Input
            style={styles.input}
            placeholder='Ingresa tu emai...'
            onChange={(e) => onChange(e,"email")}
            keyboardType = "email-address"
            errorMessage = {errorEmail}
            defaultValue = {formData.email}
      />
      <Input
            style={styles.input}
            placeholder='Ingresa tu contraseña...'
            password={true}
            secureTextEntry={!showPassword}
            onChange={(e) => onChange(e,"password")}
            errorMessage = {errorPassword}
            defaultValue = {formData.password}
            rightIcon={
                <Icon
                   type="material-community"
                   name={showPassword ? "eye-off-outline" : "eye-outline"}
                   iconStyle={styles.icon}
                   onPress={() => setShowPassword(!showPassword)}
                />
            }
      />
       <Input
            style={styles.input}
            placeholder='Confirma tu contraseña...'
            password={true}
            secureTextEntry={!showPassword}
            onChange={(e) => onChange(e,"confirm")}
            errorMessage = {errorConfirm}
            defaultValue = {formData.confirm}
            rightIcon={
                <Icon
                   type="material-community"
                   name={showPassword ? "eye-off-outline" : "eye-outline"}
                   iconStyle={styles.icon}
                   onPress={() => setShowPassword(!showPassword)}
                />
            }
            
      />
      <Button
            title="Registrar Nuevo Usuario"
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btn}
            onPress = {() => doregisterUser()}
      />
      <Loading isVisible={loading} text="Creando cuenta..."/>

    </View>
  )
}
const defaultFormValues = () => {
    return {email: "", password: "", confirm: ""} 
}

const styles = StyleSheet.create({
    form:{
        marginTop: 30,
    },
    input:{
        width: 100
    },
    btnContainer:{
        marginTop: 20,
        width:  "95%",
        alignSelf: "center"
    },
    btn:{
        backgroundColor: "#452783"
    },
    icon:{
        color: "#c1c1c1"
    }

})