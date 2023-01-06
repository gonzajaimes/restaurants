import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { firebaseApp } from '../../utils/firebase'
import { initializeAuth } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import UserGuest from './UserGuest'
import UserLogged from './UserLogged'
import Loading from '../../components/Loading';



initializeAuth(firebaseApp)


export default function Account() {
  const [login, setLogin] = useState(null)

  onAuthStateChanged(getAuth(),(user) => {
      user !== null ? (setLogin(true)) : setLogin(false) 
  })

 if (login == null){
    return  <Loading isVisible={true} text ="Cargando..."/>
  }
  return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})