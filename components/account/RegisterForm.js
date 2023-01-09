import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Button, Icon, Input } from '@rneui/base'

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setformData] = useState(defaultFormValues())

    const onChange = (e,type) => {
        setformData({...formData,[type]: e.nativeEvent.text})
    }

  return (
    <View style={styles.form}>
      <Input
            style={styles.input}
            placeholder='Ingresa tu emai...'
            onChange={(e) => onChange(e,"email")}
            keyboardType = "email-address"
      />
      <Input
            style={styles.input}
            placeholder='Ingresa tu contraseña...'
            password={true}
            secureTextEntry={!showPassword}
            onChange={(e) => onChange(e,"password")}
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
            onPress = {() => console.log(formData)}
      />

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