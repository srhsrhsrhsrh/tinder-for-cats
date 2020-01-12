import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import NavigationService from "./NavigationService";
import {
  View,
  Button,
  StyleSheet,
  AsyncStorage,
<<<<<<< HEAD
  TextInput,
} from 'react-native'
import MainTabNavigator from './MainTabNavigator';
import { FirebaseService } from '../services/FirebaseService'

=======
  TextInput
} from "react-native";
import MainTabNavigator from "./MainTabNavigator";
import { FirebaseService } from "../services/FirebaseService";
>>>>>>> 758e785b78805d49ab25e28ccba57923f59db3fa
function AuthTextInput(props) {
  const [value, onChangeText] = React.useState("Useless Placeholder");
  return (
    <TextInput
<<<<<<< HEAD
      style={{ height: 40, borderColor: '#CB9696', borderWidth: 1, borderRadius: 12, width: 200, padding: 12, }}
      onChangeText={text => props.onChangeText(text)}
=======
      style={{
        height: 40,
        borderColor: "#CB9696",
        borderWidth: 1,
        borderRadius: 12,
        width: 200,
        padding: 12
      }}
      onChangeText={text => onChangeText(text)}
>>>>>>> 758e785b78805d49ab25e28ccba57923f59db3fa
      placeholder={props.text}
      secureTextEntry={props.text === "Password"}
    />
  );
}

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <AuthTextInput onChangeText = {(email) => this.state.email = email} text="Email" />
        <AuthTextInput onChangeText = {(password) => this.state.password = password} text="Password" />
        <Button title="Sign In!" onPress={() => this._signInAsync(this.state.email, this.state.password)} />
        <Button title="Sign Up!" onPress={() => this._signUpAsync(this.state.email, this.state.password)} />
      </View>
    );
  }
<<<<<<< HEAD

  _signUpAsync = async(email, password) => {
    if (email.length > 0 && password.length > 0) {
      try {
        const userId = await FirebaseService.createUser(email, password);
        this.props.navigation.navigate('Main');
      } catch (error) {
        console.log(error);
      }
    }
=======
  _signInAsync = async () => {
    // await AsyncStorage.setItem('userToken', 'abc');
    FirebaseService.createUser("foo@gmail.com", "b7?efefafEar");
    this.props.navigation.navigate("Main");
>>>>>>> 758e785b78805d49ab25e28ccba57923f59db3fa
  };

  _signUpAsync = async(email, password) => {
    if (email.length > 0 && password.length > 0) {
      try {
        const userId = await FirebaseService.signIntoUser(email, password);
        this.props.navigation.navigate('Main');
      } catch (error) {
        console.log(error);
      }
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
const AppContainer = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    SignIn: SignInScreen,
    Main: MainTabNavigator
  })
);

export default function AppNavigator() {
  return (
    <AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
}
