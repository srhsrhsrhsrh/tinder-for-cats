import React from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image
} from "react-native";
import Card from "../components/Card";
import { ExpoLinksView } from "@expo/samples";

export default function PetScreen(props) {
  const pet = props.navigation.state.params.pet;
  console.log(props);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.HeaderView}>
        <Text style={{ color: "white", fontSize: 20 }}>Saved</Text>
      </View>
      <Card card={pet} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  HeaderView: {
    backgroundColor: "#D46F8A",
    padding: 20,
    paddingTop: 50
  },
  ListItem: {
    padding: 25,
    backgroundColor: "white",
    borderColor: "#EEEEEE",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row"
  },
  ListItemImage: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 10
  },
  ListItemText: {
    fontSize: 18,
    color: "#D46F8A"
  }
});
