import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Button, Icon, Input } from '@rneui/base'

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false)
  return (
    <View style={styles.form}>
      <Input
            style={styles.input}
            placeholder='Ingresa tu emai...'
        
      />
      <Input
            style={styles.input}
            placeholder='Ingresa tu contraseña...'
            password={true}
            secureTextEntry={!showPassword}
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
      />

    </View>
  )
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