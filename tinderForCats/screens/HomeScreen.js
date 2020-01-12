import * as WebBrowser from "expo-web-browser";
import React, { setState, useEffect , useState} from "react";
import Card from "../components/Card";
import Swiper from "react-native-swiper";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions
} from "react-native";
import { FirebaseService } from "../services/FirebaseService";
import { Post } from "../models/Post";
import { TinderForCatsUser } from "../models/TinderForCatsUser";
import uuid from "uuid";
import { UserProvider } from "../services/UserProvider";
import { MatchingService } from "../services/MatchingService";
import NavigationService from "../navigation/NavigationService.js";

// const posts = [
//   new Post(
//     new TinderForCatsUser(
//       "josh misses u", // owner name
//       "josh misses u~" // owner uuid
//     ),
//     uuid(), // pet uuid (use as key)
//     "aiko", // pet name
//     "1 year old, domestic shorthair", // short description
//     "i miss u~\n why won't you reply to me\n i know u have a fat crush on me", // long description
//     -2, // average rating [0-5]
//     1000, // total reviews
//     ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], // available dates
//     ["https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg"],
//     []
//   )
// ]

var posts;

const animals = [
  {
    key: "1",
    name: "Aiko",
    species: "cat",
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg"
  },
  {
    key: "2",
    name: "Ryker",
    species: "dog",
    imgUrl:
      "https://www.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg"
  },
  {
    key: "3",
    name: "Lucky",
    species: "dog",
    imgUrl:
      "https://boygeniusreport.files.wordpress.com/2016/11/puppy-dog.jpg?quality=98&strip=all&w=782"
  }
];

export default function HomeScreen() {
  const [postModels, setPosts] = useState([]);

  const swipeRight = post => {
    MatchingService.match(post);
  };

  useEffect(() => {
    async function loadPosts() {
      const posts = await FirebaseService.getPosts();
      setPosts(posts);
    }

    loadPosts();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Swiper style={styles.wrapper}>
          {postModels.map(postModel => {
            return <Card card={postModel} key={postModel.key} />;
          })}
        </Swiper>
      </View>

      <View style={styles.tabBarInfoContainer}>
        <View style={styles.tabBarButton}>
          <TouchableOpacity
            backgroundColor="transparent"
            style={{
              alignItems: "center"
            }}
          >
            <Text
              style={{
                color: "#CB9696"
              }}
            >
              BOOKMARK
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={styles.tabBarButton}>
          <Button style={styles.tabBarButton} title="Block" />
        </View> */}

        <View style={styles.tabBarButton}>
          <TouchableOpacity
            backgroundColor="transparent"
            style={{
              alignItems: "center"
            }}
            onPress={() => NavigationService.navigate("Profile")}
          >
            <Text
              style={{
                color: "#CB9696"
              }}
            >
              PROFILE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20
  },

  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  tabBarButton: {
    flex: 1
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#CB9696"
  }
});
