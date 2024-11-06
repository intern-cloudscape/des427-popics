import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Login from './app/screens/Login';
import Signup from './app/screens/Signup';
import Profile from './app/screens/Profile';
import Feed from './app/screens/Feed';
import TabNavigation from './app/navigation/TabNavigation'; // Assuming TabNavigation is set up for your Home, Feed, etc.
import { LogBox } from 'react-native';

// Ignore non-serializable navigation warnings
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  Feed: undefined;
  Tabs: undefined; // Tabs might contain Home and Feed, etc.
  ForgetPass: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          // Show TabNavigation if user is authenticated
          <Stack.Screen
            name="Tabs"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
        ) : (
          // Show Login and Signup screens if not authenticated
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
