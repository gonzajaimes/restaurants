import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Overlay } from '@rneui/base'

export default function Loading({isVisible, text }) {
  return (
    <Overlay
       isVisible = {isVisible}
       windowBackgroundColor="rgba(0,0,0,0.5)"
       overlayBackgroundColor="transparent"
       overlayStyle={styles.overlay}
    >
        <View style={styles.view}>
            <ActivityIndicator
               size="large"
               color="#452783"
            />
            {
                text && <Text style={styles.text}>{text}</Text>
            }
        </View>

    </Overlay>

  )
}

const styles = StyleSheet.create({
   overlay : {
       height: 100,
       width:  200,
       backgroundColor: "#fff",
       borderColor: "#452783",
       borderWidth: 2,
       borderRadius: 10
    },
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        color: "#452783",
        marginTop: 10
    }

})