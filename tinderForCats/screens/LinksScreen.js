import React from "react";
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image
} from "react-native";
import { ExpoLinksView } from "@expo/samples";

const pets = [
  {
    name: "aiko",
    species: "cat",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg"
  },
  {
    name: "ryker",
    species: "dog",
    imgUrl:
      "https://www.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg"
  },
  {
    name: "lucky",
    species: "dog",
    imgUrl:
      "https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg?quality=98&strip=all&w=782"
  }
];

function ListItem({ pet }) {
  return (
    <View style={styles.ListItem}>
      <Image
        style={styles.ListItemImage}
        source={{
          uri: pet.imgUrl
        }}
      />
      <View>
        <Text style={styles.ListItemText}>{pet.name}</Text>
        <Text>{pet.species}</Text>
        <Text>Address</Text>
      </View>
    </View>
  );
}

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.HeaderView}>
        <Text style={{ color: "white", fontSize: 20 }}>Saved</Text>
      </View>
      {pets.map(pet => {
        return <ListItem pet={pet} />;
      })}
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: "Saved"
};

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
