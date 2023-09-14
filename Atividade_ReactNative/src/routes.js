import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './pages/login';
import Register from "./pages/register";
import Main from "./pages/main";

const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="login" component={Login} options={{
                    title: 'LOGIN',
                    headerTitleAlign: 'center',
                    headerStyle:{
                        backgroundColor:'#3498db',
                    },
                    headerTitleStyle:{
                        fontWeight: 'bold',
                        color: '#fff'
                    }
                }}/>

            <Stack.Screen name="register" component={Register} options={{
                    title: 'CADASTRO',
                    headerTitleAlign: 'center',
                    headerStyle:{
                        backgroundColor:'#3498db',
                    },
                    headerTitleStyle:{
                        fontWeight: 'bold',
                        color: '#fff'
                    }
                }}/>

<           Stack.Screen name="main" component={Main} options={{
                    title: 'CARDS RICK e MORTY',
                    headerTitleAlign: 'center',
                    headerStyle:{
                        backgroundColor:'#3498db',
                    },
                    headerTitleStyle:{
                        fontWeight: 'bold',
                        color: '#fff'
                    }
                }}/>

            </Stack.Navigator>
        </NavigationContainer>
    )
}