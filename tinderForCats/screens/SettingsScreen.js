import React from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Settings
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { withNavigation } from "react-navigation";
import NavigationService from "../navigation/NavigationService.js";

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

function ListItem({ pet }) {
  return (
    <TouchableOpacity
      onPress={() => NavigationService.navigate("Pet", { pet })}
      style={styles.ListItem}
    >
      <Image
        style={styles.ListItemImage}
        source={{
          uri: pet.imgUrl
        }}
      />
      <View>
        <Text style={styles.ListItemText}>Josh</Text>
        <Text>I miss u~~~~~</Text>
      </View>
    </TouchableOpacity>
  );
}

function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.HeaderView}>
        <Text style={{ color: "white", fontSize: 20 }}>Messages</Text>
      </View>
      {pets.map(pet => {
        return <ListItem key={pet.key} pet={pet} />;
      })}
    </ScrollView>
  );
}

SettingsScreen.navigationOptions = {
  title: "Messages"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  HeaderView: {
    backgroundColor: "#CB9696",
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
    color: "#D46F8A",
    paddingTop: 8
  }
});

export default withNavigation(SettingsScreen);
