
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import RestaurantsStack from './RestaurantsStack'
import FavouritesStack from './FavouritesStack'
import TopRestaurantsStack from './TopRestaurantsStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'

const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen
              name="restaurants-stack"
              component={RestaurantsStack}
              options={{ title:"Restaurantes" }}
            />
            <Tab.Screen
              name="favourites-stack"
              component={FavouritesStack}
              options={{ title:"Favoritos" }}
            />
            <Tab.Screen
              name="top-restaurants-stack"
              component={TopRestaurantsStack}
              options={{ title: "Top 5" }}
            />
            <Tab.Screen
              name="search-stack"
              component={SearchStack}
              options={{ title:"Buscar" }}
            />
            <Tab.Screen
              name="account-stack"
              component={AccountStack}
              options={{ title:"Cuenta" }}
            />

        </Tab.Navigator>

    </NavigationContainer>
  )
}