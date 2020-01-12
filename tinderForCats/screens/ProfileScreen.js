import React from "react";
import Profile from "../components/Profile";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Button,
  Settings,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import { TouchableOpacity, TouchableHighlight } from "react-native-gesture-handler";
import { withNavigation } from "react-navigation";
import NavigationService from "../navigation/NavigationService.js";
import { TinderForCatsUser } from "../models/TinderForCatsUser";
import { FirebaseService } from "../services/FirebaseService";

const pets = [
  {
    key: "1",
    name: "aiko",
    species: "cat",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg"
  },
  {
    key: "2",
    name: "ryker",
    species: "dog",
    imgUrl:
      "https://www.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg"
  },
  {
    key: "3",
    name: "lucky",
    species: "dog",
    imgUrl:
      "https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg?quality=98&strip=all&w=782"
  }
];
// Profile screen will take in a userID that will indicate which profile it is
// For now I will pass in a JSON object
export default function ProfileScreen({ pet = pets[0] }) {
  console.log(pet);
  return (
    <View>
      <View style={styles.HeaderView}>
      <TouchableOpacity 
      onPress={() => {
        FirebaseService.insertIntoUsersTable(new TinderForCatsUser())
        NavigationService.navigate("Profile")
        }}
      style={{
        flex: 1
      }}>
        <Image style={{
          width: 25,
          height: 25,
        }}
        source={
                require('../assets/images/arrow.png')
              }>
        </Image>
      </TouchableOpacity>
      <View styles={{
        justifyContent: 'center',
      }}>
        <Text style={{ color: "white", fontSize: 20, marginLeft:20}}>
          Profile
        </Text>
      </View>
      </View>
      <Profile key={pet.key} pet={pet} />
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderView: {
    backgroundColor: "#CB9696",
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row'
  }
});
