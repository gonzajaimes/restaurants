import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from '@rneui/themed'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import Loading from '../../components/Loading'

export default function Restaurants({ navigation }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
      onAuthStateChanged(getAuth(), (userInfo) => {
                userInfo ? setUser(true) : setUser(false)
      })
  }, [])

  if (user === null){
    return <Loading isVisible={true} text="Cargando..."/>
  }
  
  return (
    <View style={styles.viewBody}>
      <Text>Restaurants...</Text>
      {
        user && (
          <Icon
              type="material-community"
              name="plus"
              color="#452783"
              reverse
              containerStyle={styles.btnContainer}
              onPress={() => navigation.navigate("add-restaurant")}
          />
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
   },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2},
    shadowOpacity: 0.5
  }
})