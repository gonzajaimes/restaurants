
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
              options={{ title:"Restaurantes", headerShown: false  }}
              
            />
            <Tab.Screen
              name="favourites-stack"
              component={FavouritesStack}
              options={{ title:"Favoritos", headerShown: false  }}
            />
            <Tab.Screen
              name="top-restaurants-stack"
              component={TopRestaurantsStack}
              options={{ title: "Top 5", headerShown: false }}
            />
            <Tab.Screen
              name="search-stack"
              component={SearchStack}
              options={{ title:"Buscar", headerShown: false  }}
            />
            <Tab.Screen
              name="account-stack"
              component={AccountStack}
              options={{ title:"Cuenta", headerShown: false  }}
            />

        </Tab.Navigator>

    </NavigationContainer>
  )
}