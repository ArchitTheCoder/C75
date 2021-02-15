import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import firebase from 'firebase'
import db from '../config'

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
    };
  }

  login = async (email, password) => {
    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        if (response) {
          this.props.navigation.navigate('Transaction');
        }
      } catch (e) {
        console.log(e);
        switch (e.code) {
          case 'auth/user-not-found':
            Alert.alert('User does not exist');

            break;
          case 'auth/invalid-email':
            Alert.alert('Incorrect email or password');
            break;
        }
      }
    } else {
      Alert.alert('Enter email and password');
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ alignItems: 'center', marginTop: 20 }}>
        <View>
          <Image
            source={require('../assets/booklogo.jpg')}
            style={{ width: 200, height: 200 }}
          />

          <Text style={{ textAlign: 'center', fontSize: 30 }}>Wily</Text>
        </View>
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="abc@example.com"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({ emailId: text });
            }}></TextInput>

          <TextInput
            style={styles.loginBox}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}></TextInput>

          <TouchableOpacity
            style={{
              height: 40,
              width: 90,
              borderWidth: 2,
              marginTop: 20,
              backgroundColor: '#99a5ff',
              borderRadius: 7,
              alignSelf: 'center',
            }}
            onPress={() => {
              this.login(this.state.emailId, this.state.password);
            }}>
            <Text style={{ textAlign: 'center', marginTop: 3, fontSize: 20 }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  loginBox: {
    height: 40,
    width: 280,
    borderWidth: 1.5,
    fontSize: 20,
    margin: 10,
  },
});
