import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import NavigationService from "./NavigationService";
import {
  View,
  Button,
  StyleSheet,
  AsyncStorage,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from "react-native";
import MainTabNavigator from "./MainTabNavigator";
import { FirebaseService } from "../services/FirebaseService";
import { UserProvider } from "../services/UserProvider";
import { TinderForCatsUser } from "../models/TinderForCatsUser";

const WIDTH = 300
const HEIGHT = 40
const FONT_SIZE = 16

function AuthTextInput(props) {
  return (
    <TextInput
      style={{
        height: HEIGHT,
        borderColor: "#CB9696",
        borderWidth: 1,
        borderRadius: 12,
        width: WIDTH,
        padding: 12,
        margin: 8,
        backgroundColor: "white",
      }}
      onChangeText={text => props.onChangeText(text)}
      placeholder={props.text}
      secureTextEntry={props.text === "Password"}
    />
  );
}

function AuthButton(props) {
  return (
    <Text
      style={{
        height: HEIGHT,
        width: WIDTH,
        backgroundColor: "black",
        textAlign: "center",
        color: "white",
        margin: 8,
        borderRadius: 12,
        textAlignVertical: "center"
      }}>
      {props.text}
    </Text>
  )
}

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' enabled>
        <ImageBackground source={require('../assets/images/splash_screen-small.png')} style={{ width: '100%', height: '100%' }}>
          <View style={styles.container}>
            <AuthTextInput
              onChangeText={email => (this.state.email = email)}
              text="Email"
            />
            <AuthTextInput
              onChangeText={password => (this.state.password = password)}
              text="Password"
            />
            {/* <Button
              color="black"
              title="Sign In!"
              onPress={() =>
                this._signInAsync(this.state.email, this.state.password)
              }
            />
            <Button
              title="Sign Up!"
              onPress={() =>
                this._signUpAsync(this.state.email, this.state.password)
              }
            /> */}
            <TouchableOpacity
              onPress={() =>
                this._signInAsync(this.state.email, this.state.password)}>
                  <AuthButton text="SIGN IN" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this._signUpAsync(this.state.email, this.state.password)}>
                  <AuthButton text="SIGN UP" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>

    );
  }

  _signUpAsync = async (email, password) => {
    if (email.length > 0 && password.length > 0) {
      try {
        const userId = await FirebaseService.createUser(email, password);
        const userProvider = new UserProvider(
          new TinderForCatsUser("xd", userId)
        );
        this.props.navigation.navigate("Main");
      } catch (error) {
        console.log(error);
      }
    }
  };

  _signInAsync = async (email, password) => {
    if (email.length > 0 && password.length > 0) {
      try {
        const userId = await FirebaseService.signIntoUser(email, password);
        const userProvider = new UserProvider(
          new TinderForCatsUser("xxx", userId)
        );
        this.props.navigation.navigate("Main");
      } catch (error) {
        console.log(error);
      }
    }
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  button: {
    width: WIDTH,
    backgroundColor: "white",
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
