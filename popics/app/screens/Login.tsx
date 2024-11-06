import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const isEmail = (input: string) => /\S+@\S+\.\S+/.test(input);

  const signIn = async () => {
    setLoading(true);
    try {
      let emailToUse = usernameOrEmail;

      // Check if input is not an email and resolve it if your app supports username-to-email conversion
      if (!isEmail(usernameOrEmail)) {
        // Convert username to email or notify user if no such conversion exists
        // Assuming username-to-email resolution:
        // emailToUse = await resolveUsernameToEmail(usernameOrEmail);
        Alert.alert("Feature not available", "Logging in with username is not implemented. Use email instead.");
        setLoading(false);
        return;
      }

      const response = await signInWithEmailAndPassword(auth, emailToUse, password);
      console.log(response);
      Alert.alert('Login successful!', 'Welcome to Popics!', [{ text: 'OK', onPress: () => navigation.navigate('Tabs') }]);
    } catch (error: any) {
      console.log(error);
      Alert.alert('Login failed!', 'Please try again.', [{ text: 'OK' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.title}>Popics</Text>
        <TextInput
          value={usernameOrEmail}
          style={styles.input}
          placeholder="Username or Email"
          autoCapitalize="none"
          onChangeText={(text) => setUsernameOrEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={signIn}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPass')}
              style={styles.signupButton}
            >
              <Text style={styles.forgetText}>Forget Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              style={styles.signupButton}
            >
              <Text style={styles.signupText}>
                Don't have an account? <Text style={styles.boldText}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 80,
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderRadius: 10,
    padding: 5,
    paddingHorizontal: 20,
    backgroundColor: "#ececec",
  },
  button: {
    backgroundColor: "#1c72c4",
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: "center",
    marginTop: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButton: {
    marginTop: 20,
    alignItems: "center",
  },
  signupText: {
    color: "#15518a",
    fontSize: 16,
    marginBottom: 20,
  },
  forgetText: {
    color: "#15518a",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
});
