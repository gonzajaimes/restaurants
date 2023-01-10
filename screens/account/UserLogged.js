import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { closeSession } from '../../utils/actions'

export default function UserLogged() {
  const navigation = useNavigation()
  return (
    <View>
      <Text>UserLogged...</Text>
      <Button
          title= "Cerrar Sesión"
          onPress={() => {
              closeSession()
              navigation.navigate("account")
          }}
          
      />
    </View>
  )
}

const styles = StyleSheet.create({})