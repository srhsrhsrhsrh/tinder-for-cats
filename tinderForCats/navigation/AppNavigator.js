import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
  View,
  Button,
  StyleSheet,
  AsyncStorage,
  TextInput,
} from 'react-native'
import MainTabNavigator from './MainTabNavigator';
import { FirebaseService } from '../services/FirebaseService'
function AuthTextInput(props) {
  const [value, onChangeText] = React.useState('Useless Placeholder');
  return (
    <TextInput
      style={{ height: 40, borderColor: '#CB9696', borderWidth: 1, borderRadius: 12, width: 200, padding: 12, }}
      onChangeText={text => onChangeText(text)}
      placeholder={props.text}
      secureTextEntry={props.text === 'Password'}
    />
  );
}
class SignInScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AuthTextInput text="Email" />
        <AuthTextInput text="Password" />
        <Button title="Sign In!" onPress={this._signInAsync} />
        <Button title="Sign Up!" onPress={this._signInAsync} />
      </View>
    );
  }
  _signInAsync = async () => {
    // await AsyncStorage.setItem('userToken', 'abc');
    FirebaseService.createUser("foo@gmail.com", "b7?efefafEar")
    this.props.navigation.navigate('Main');
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    SignIn: SignInScreen,
    Main: MainTabNavigator,
  })
);