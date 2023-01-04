
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import RestaurantsStack from './RestaurantsStack'
import FavouritesStack from './FavouritesStack'
import TopRestaurantsStack from './TopRestaurantsStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'
import { Icon } from '@rneui/base'

const Tab = createBottomTabNavigator()

export default function Navigation() {
  const screenOptions = (route, color) => {
     let iconName
     switch (route.name) {
          case "restaurants-stack":
            iconName = "compass-outline"
            break;
          case "search-stack":
            iconName = "magnify"
            break;
          case "favourites-stack":
            iconName = "heart-outline"
            break;
          case "top-restaurants-stack":
            iconName = "star-outline"
            break;
          case "account-stack":
            iconName = "home-outline"
            break;
     }
     return(
      <Icon
          type="material-community"
          name={iconName}
          size={22}
          color={color} 
      />
     )
  }

  return (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName="restaurants-stack"
            screenOptions={({route}) => ({
                tabBarIcon: ({color}) => screenOptions(route, color),
                tabBarActiveTintColor: "#452783",
                tabBarInactiveTintColor: "#a17dc3"
                
            })}       
        >
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