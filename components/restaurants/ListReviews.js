import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, {useCallback, useState} from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Avatar, Button } from '@rneui/themed'
import moment from 'moment/min/moment-with-locales'
import { useFocusEffect } from '@react-navigation/native'
import { map, size } from 'lodash'
import StarRating from 'react-native-star-rating-widget'

import { getRestaurantReviews } from '../../utils/actions'
moment.locale("es")

export default function ListReviews({ navigation, idRestaurant }) {
    const [userLogged, setUserLogged] = useState(false)
    const [reviews, setReviews] = useState([])

    onAuthStateChanged(getAuth(), (userInfo) => {
        userInfo ? setUserLogged(true) : setUserLogged(false)
    })

    useFocusEffect( 
        useCallback(() => {
            (async() => {
                const response = await getRestaurantReviews(idRestaurant)
                if (response.statusResponse) {
                    setReviews(response.reviews)
                }
            })()
        }, [])
    )
   return (
   <View>
        {
            userLogged ? (
                <Button
                    buttonStyle={styles.btnAddReview}
                    title="Escribe una opinión"
                    titleStyle={styles.btnTitleAddReview}
                    onPress={() => navigation.navigate("add-review-restaurant", {idRestaurant})}
                    icon={{
                        type: "material-community",
                        name: "square-edit-outline",
                        color: "#a376c7"
                    }}
                />
            ):(
                <Text 
                    style={styles.mustLoginText}
                    onPress={() => navigation.navigate("account-stack",{screen:"login"})}
                >
                    Para escribir una opinión es necesario estar logueado.{" "}
                    <Text style={styles.loginText}>
                        Pulsa aquí para iniciar sesión.
                    </Text>
                </Text>
            )
        }
        {
                size(reviews) > 0 && (
                    map(reviews, (reviewDocument,index) => (
                        <Review key={index} reviewDocument={reviewDocument}/>
                    ))
                )
        }
   </View>
  )
}

function Review({ reviewDocument }) {
    const {title, review, createAt, avatarUser, rating} = reviewDocument
    const createReview = new Date(createAt.seconds * 1000)
    return(
        <View style={styles.viewReview}>
            <View style={styles.imageAvatar}>
                <Avatar 
                    renderPlaceholderContent={<ActivityIndicator color="#fff"/>}
                    size="large"
                    rounded
                    constainerStyle={styles.imageAvatarUser}
                    source={
                        avatarUser
                            ? { uri: avatarUser}
                            : require("../../assets/avatar-default.jpg")
                    }
                />
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.reviewTitle}>{title}</Text>
                <Text style={styles.reviewText}>{review}</Text>
                <StarRating
                    starSize={15}
                    rating={rating}
                />
                <Text style={styles.reviewDate}>{moment(createReview).format("LLL")}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent"
    },
    btnTitleAddReview: {
        color: "#a376c7"
    },
    mustLoginText: {
        textAlign: "center",
        color: "#a376c7",
        padding: 20,
    },
    loginText: {
        fontWeight: "bold"
    },
    viewReview: {
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
    imageAvatar: {
        marginRight: 15
    },
    imageAvatarUser: {
        width: 50,
        height: 50
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start"
    },
    reviewTitle: {
        fontWeight: "bold"
    },
    reviewText: {
        paddingTop: 2,
        color: "gray",
        marginBottom: 5
    },
    reviewDate: {
        marginTop: 5,
        color: "gray",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0
    }
})