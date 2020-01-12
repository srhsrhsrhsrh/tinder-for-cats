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
  Image,
} from "react-native";
import MainTabNavigator from "./MainTabNavigator";
import { FirebaseService } from "../services/FirebaseService";
import { UserProvider } from "../services/UserProvider";
import { TinderForCatsUser } from "../models/TinderForCatsUser";

const WIDTH = 300
const HEIGHT = 40
const BORDER_RADIUS = 12

function AuthTextInput(props) {
  return (
    <TextInput
      style={{
        height: HEIGHT,
        borderColor: "#CB9696",
        borderWidth: 1,
        borderRadius: BORDER_RADIUS,
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
        borderRadius: BORDER_RADIUS,
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
      password: "",
      name: "",
      nameVisibility: false,
      authVisibility: false,
      signInVisibility: true,
      signUpVisibility: true,
      backVisibility: false,
      errorText: "",
    };
  }

  _handleSignInClick() {
    if (this.state.authVisibility) {
      this._signInAsync(this.state.name, this.state.email, this.state.password)
    } else {
      this.setState({
        nameVisibility: false,
        authVisibility: true,
        signInVisibility: true,
        signUpVisibility: false,
        backVisibility: true,
      })
    }
  }

  _handleSignUpClick() {
    if (this.state.nameVisibility) {
      this._signUpAsync(this.state.name, this.state.email, this.state.password)
    } else {
      this.setState({
        nameVisibility: true,
        authVisibility: true,
        signInVisibility: false,
        signUpVisibility: true,
        backVisibility: true,
      })
    }
  }

  _handleBackClick() {
    this.setState({
      nameVisibility: false,
      authVisibility: false,
      signInVisibility: true,
      signUpVisibility: true,
      backVisibility: false,
    })
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' enabled>
        <View style={{ width: '100%', height: '100%', backgroundColor: "#CB9696" }}>
          <View style={styles.container}>
            <Image
              source={require('../assets/images/cinder-logo.png')}
              style={{ width: WIDTH, height: WIDTH, marginTop: 128, }}
            ></Image>
            <View style={{ flex: 1 }}></View>
            <Text style={styles.errorText} >{this.state.errorText}</Text>
            {this.state.nameVisibility && <AuthTextInput
              onChangeText={name => (this.state.name = name)}
              text="Name"
            />}
            {this.state.authVisibility && <AuthTextInput
              onChangeText={email => (this.state.email = email)}
              text="Email"
            />}
            {this.state.authVisibility && <AuthTextInput
              onChangeText={password => (this.state.password = password)}
              text="Password"
            />}
            {this.state.signInVisibility && <TouchableOpacity
              onPress={() =>
                this._handleSignInClick()}>
              <AuthButton text="SIGN IN" />
            </TouchableOpacity>}
            {this.state.signUpVisibility && <TouchableOpacity
              onPress={() =>
                this._handleSignUpClick()}>
              <AuthButton text="SIGN UP" />
            </TouchableOpacity>}
            {this.state.backVisibility && <TouchableOpacity
              onPress={() =>
                this._handleBackClick()}>
              <AuthButton text="BACK" />
            </TouchableOpacity>}
            <View style={{ marginBottom: 48 }}></View>
          </View>
        </View>
      </KeyboardAvoidingView>

    );
  }

  _signUpAsync = async (name, email, password) => {
    if (email.length > 0 && password.length > 0) {
      try {
        const userId = await FirebaseService.createUser(email, password);
        const userProvider = new UserProvider(
          new TinderForCatsUser(name, userId)
        );
        this.props.navigation.navigate("Main");
      } catch (error) {
        console.log(error);
      }
    }
  };

  _signInAsync = async (name, email, password) => {
    if (email.length > 0 && password.length > 0) {
      try {
        const userId = await FirebaseService.signIntoUser(email, password);
        const userProvider = new UserProvider(
          new TinderForCatsUser(name, userId)
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
  errorText: {
    marginBottom: 8,
    marginTop: 16,
    width: WIDTH,
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
