import React, { useState, useEffect, useCallback} from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem, Rating } from '@rneui/themed'
import { useFocusEffect } from '@react-navigation/native'
import { map } from 'lodash'
import StarRating from 'react-native-star-rating-widget'

import CarouselImages from '../../components/CarouselImages'
import Loading from '../../components/Loading'
import { getDocumentById } from '../../utils/actions'
import { formatPhone } from '../../utils/helpers'
import MapRestaurant from '../../components/restaurants/MapRestaurant'
import ListReviews from '../../components/restaurants/ListReviews'

const widthScreen = Dimensions.get("window").width

export default function Restaurant({navigation, route}) {
  const {id, name } = route.params
  const [restaurant, setRestaurant] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)

  useFocusEffect(
    useCallback(() => {
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
  )


  if (!restaurant){
    return <Loading isVisible={true} text="Cargando..."/>
  }
   
  
  return (
    <ScrollView style={styles.viewBody}>
      <CarouselImages
        images={restaurant.images}
        height={250}
        width={widthScreen}
        activeSlide={activeSlide}
        setActiveSlide={setActiveSlide}
      />
      <TitleRestaurant
                name={restaurant.name}
                description={restaurant.description}
                rating={restaurant.rating}
      />
      <RestaurantInfo
        name={restaurant.name}
        location={restaurant.location}
        address={restaurant.address}
        email={restaurant.email}
        phone={formatPhone(restaurant.callingCode, restaurant.phone)}
      />
      <ListReviews
        navigation={navigation}
        idRestaurant={restaurant.id}
      />
    </ScrollView>
  )
}

function RestaurantInfo({name, location, address, email, phone}){
  const listInfo = [
    {text: address, iconName: "map-marker"},
    {text: phone, iconName: "phone"},
    {text: email, iconName: "at"}
  ]
  return(
    <View style={styles.viewRestaurantInfo}>
        <Text style={styles.restaurantInfoTitle}>
          Información sobre el restaurante
        </Text>
        <MapRestaurant
          location={location}
          name={name}
          height={150}
        />
        {
          map(listInfo, (item, index) => (
            <ListItem
              key={index}
              style={styles.containerListItem}
            >
              <Icon
                type="material-community"
                name={item.iconName}
                color="#452783"
              />
              <ListItem.Content>
                <ListItem.Title>{item.text}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))
        }
    </View>
  )

}
function TitleRestaurant({ name, description, rating }) {
  
  return (
      <View style={styles.viewRestaurantTitle}>
          <View style={styles.viewRestaurantContainer}>
              <Text style={styles.nameRestaurant}>
                  {name}
              </Text>
              <StarRating
                style={styles.rating}
                rating={parseFloat(rating)}
                starSize={30}
              />
       
          </View>
          <Text style={styles.descriptionRestaurant}>{description}</Text>
      </View>
  )
}


const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff"
  },
  viewRestaurantTitle: {
      padding: 15,
  },
  viewRestaurantContainer: {
      flexDirection: "row"
  },
  descriptionRestaurant: {
      marginTop: 8,
      color: "gray",
      textAlign: "justify"
  },
  rating: {
      position: "absolute",
      right: 0
  },
  nameRestaurant: {
      fontWeight: "bold"
  },
  viewRestaurantInfo: {
    margin: 15,
    marginTop: 25
  },
  restaurantInfoTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15
  },
  containerListItem: {
      borderBottomColor: "#a376c7",
      borderBottomWidth: 1
  }

})