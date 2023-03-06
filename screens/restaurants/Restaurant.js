import React, { useState, useEffect} from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, Text } from 'react-native'

import CarouselImages from '../../components/CarouselImages'
import Loading from '../../components/Loading'
import { getDocumentById } from '../../utils/actions'

const widthScreen = Dimensions.get("window").width

export default function Restaurant({navigation, route}) {
  const {id, name } = route.params
  const [restaurant, setRestaurant] = useState(null)

  useEffect(() => {
    (async() => {
      navigation.setOptions({title: name})
      const response = await getDocumentById("restaurants", id)
      if(response.statusResponse){
        setRestaurant(response.document)
      } else {
        setRestaurant({})
        Alert.alert("Ocurrió un problema cargando el restaurante, intente más tarde")
      }
    })()
  }, [])

  if (!restaurant){
    return <Loading isVisible={true} text="Cargando..."/>
  }
   
  
  return (
    <ScrollView style={styles.viewBody}>
      <CarouselImages
        images={restaurant.images}
        height={250}
        width={widthScreen}
        
      />
      <Text>{restaurant.description}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff"
  }
})