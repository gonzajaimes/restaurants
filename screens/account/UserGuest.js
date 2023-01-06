import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button } from '@rneui/base'


export default function UserGuest() {
  return (
    <ScrollView
      centerContent
      style={styles.viewBody}
    >
       <Image
         source={ require ("../../assets/restaurant-logo.png")}
         resizeMode="contain"
         style={styles.image} 
       />
       <Text style={styles.title}>Consulta tu perfil en Restaurants</Text>
       <Text style={styles.description}> 
        Cómo describirias tu mejor restaurante? Busca y visualiza los mejores restaurantes de una forma sencilla, vota cual te ha gustado más y comenta como ha sido tu experiencia. 
        </Text>
        <Button
          buttonStyle={styles.button}
          title="Ver tu perfil"
          onPress={() => console.log("Click!!")}
        />
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
     viewBody:{
        marginHorizontal: 30
     },
     image:{
        height: 300,
        width: "100%",
        marginBottom: 10,
        textAlign: "center"
     },
     title:{
        fontWeight: "bold",
        fontSize: 19,
        marginVertical: 10,
        textAlign: "center"
     },
     description:{
        textAlign:"justify",
        marginBottom:20,
        color:"#a17dc3"
     },
     button:{
        backgroundColor:"#452783"
     }

})