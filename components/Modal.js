import { StyleSheet} from 'react-native'
import React from 'react'
import { Overlay } from '@rneui/themed'

export default function Modal({ isVisible, setIsVisible, children}) {
  return (
    <Overlay
       isVisible={isVisible}
       overlayStyle={styles.overlay}
       onBackdropPress={() => setIsVisible(false)}
    >
        {
            children
        }

    </Overlay>
  )
}

const styles = StyleSheet.create({
    overlay: {
        width: "90%"
    }
})