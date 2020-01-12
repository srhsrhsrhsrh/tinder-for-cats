import React, { Component } from "react";
import DaySelector from "./DaySelector";

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions,
  TextInput,
  KeyboardAvoidingView
} from "react-native";

export default function Profile({ pet }) {
  const [value, onChangeText] = React.useState(pet.name);
  const [value1, onChangeText1] = React.useState("aEz6liOy7c");
  const [value2, onChangeText2] = React.useState(
    "Lucky is ok, Aiko is much cuter"
  );
  const [value3, onChangeText3] = React.useState(
    "Someone who can wash a giant furry beast with their bare hands"
  );
  return (
    <ScrollView>
      <View style={{ paddingBottom: 100 }}>
        <View style={styles.Profile}>
          <Image
            style={styles.ProfileImages}
            source={{
              uri: pet.imgUrl
            }}
          />
          <View style={styles.ProfileID}>
            <Text style={{ fontSize: 20, color: "#828282" }}>Owner name</Text>
            <TextInput
              style={{
                fontSize: 20,
                textDecorationLine: "underline",
                marginBottom: 10
              }}
              onChangeText={text => onChangeText(text)}
              value={value}
            />
            <Text style={{ fontSize: 20, color: "#828282" }}>My Pets</Text>
            <Text
              style={{
                fontSize: 20,
                textDecorationLine: "underline",
                marginBottom: 10
              }}
            >
              Aiko, Ryker, Lucky
            </Text>
          </View>
        </View>
        <View style={styles.ProfileDescription}>
          <Text style={{ fontSize: 20, color: "#828282", marginLeft: 20 }}>
            Description of pets
          </Text>
          <TextInput
            style={{
              fontSize: 20,
              textDecorationLine: "underline",
              marginBottom: 10,
              marginLeft: 20
            }}
            onChangeText={text => onChangeText2(text)} //Placeholder for USER ID
            value={value2}
          />
        </View>
        <Text style={{ fontSize: 20, color: "#828282", marginLeft: 20 }}>
          What you're looking for in a caretaker
        </Text>
        <TextInput
          style={{
            fontSize: 20,
            textDecorationLine: "underline",
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 10
          }}
          onChangeText={text => onChangeText3(text)} //Placeholder for USER ID
          value={value3}
          multiline={true}
        />

        <DaySelector />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Profile: {
    display: "flex",
    flexDirection: "row"
  },
  ProfileImages: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 10
  },
  ProfileID: {
    display: "flex",
    padding: 25
  },
  ProfileDescription: {}
});
