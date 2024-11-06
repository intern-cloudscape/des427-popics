import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type SignupScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>;

const Signup = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const handleSignup = async () => {
    if (!email || !username || !password || !confirmPassword || !dateOfBirth) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully:', response.user);
      Alert.alert('Success', 'Account created successfully!', [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
    } catch (error: any) {
      console.log('Signup error', error);
      Alert.alert('Signup failed!', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        value={username}
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        secureTextEntry={true}
        value={password}
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
      />

      <TextInput
        secureTextEntry={true}
        value={confirmPassword}
        style={styles.input}
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPassword(text)}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <Text style={styles.dateText}>
          {dateOfBirth ? dateOfBirth.toDateString() : 'Select Date of Birth'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()} // Restrict to past dates only
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
        <Text style={styles.loginText}>Already have an account? <Text style={styles.boldText}>Log In</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  datePicker: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#555',
  },
  button: {
    backgroundColor: '#1c72c4',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#15518a',
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
