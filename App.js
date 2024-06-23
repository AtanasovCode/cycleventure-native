import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { supabase } from "./supabase";
import { useStore } from "./useStore";

//importing routes
import Auth from "./src/routes/Auth";
import Home from "./src/routes/Home";
import Products from "./src/routes/Products";
import Product from "./src/routes/Product";


const App = () => {

  const Stack = createNativeStackNavigator();
  const navigationRef = useRef();
  
  const session = useStore((state) => state.session);
  const setSession = useStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    if(navigationRef.current) {
      if(session && session.user) {
        console.log(session.user);
        navigationRef.current.navigate("Products")
      } else {
        navigationRef.current.navigate("Home");
      }
    }
  }, [session])

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Products"
          component={Products}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Product"
          component={Product}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;