import React, { useEffect, useState } from "react";
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
import { FirebaseService } from "../services/FirebaseService.js";
import { UserProvider } from "../services/UserProvider.js";
import { groupBy } from "lodash"; 

function ChatModelListItem({ chats, posts }) {
  console.log("YA" + chats);
  console.log("YEET" + posts);
  const otherParticipant = chats.participants.filter(participant => participant !== UserProvider.instance.tinderForCatsUser.name)[0];
  let postPhotoToUse = "https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg"
  let petsDescriptor = "";
  if (posts && posts.length > 0) {
    postPhotoToUse = posts[0].photoUrls.length > 0 ? posts[0].photoUrls[0] : "https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg";
    petsDescriptor = `Pets: ${posts.map(post => post.petName).join(", ")}`
  }

  return (
    <TouchableOpacity
      onPress={() => NavigationService.navigate("Pet", { chats })}
      style={styles.ListItem}
    >
      <Image
        style={styles.ListItemImage}
        source={{
          uri: postPhotoToUse
        }}
      />
      <View>
        <Text style={styles.ListItemText}>{otherParticipant}</Text>
        <Text style={styles.ListItemText}>{petsDescriptor}</Text>
      </View>
    </TouchableOpacity>
  );
}

function ChatsScreen() {
  const [chatModels, setChatModels] = useState([]);
  const [postModels, setPosts] = useState(new Map());
  
  useEffect(() => {
    async function loadChats() {
      const chatsForUser = await FirebaseService.getChatsForUser();
      const newPostModels = [];
      for (let i = 0; i < chatsForUser.length; i++) {
        const participantToRetrieve = chatsForUser[i].participants.filter(participant => participant !== UserProvider.instance.tinderForCatsUser.name)[0];
        const postsForUser = await FirebaseService.getAllPostsByUser(participantToRetrieve);
        newPostModels.push(...postsForUser);
      }
      const postMap = groupBy(newPostModels, (post) => post.ownerUUID)
      setPosts(new Map(Object.entries(postMap)));
      setChatModels(chatsForUser);
    }

    loadChats();
  }, [])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.HeaderView}>
        <Text style={{ color: "white", fontSize: 20 }}>Messages</Text>
      </View>
      {chatModels.map(chatModel => {
        return <ChatModelListItem key={chatModel.key} chats={chatModel} posts={postModels.get(getOtherParticipant(chatModel))}/>;
      })}
    </ScrollView>
  );
}

function getOtherParticipant(chatModel) {
  return chatModel.participants.filter(participant => participant !== UserProvider.instance.tinderForCatsUser.name)[0];
}

ChatsScreen.navigationOptions = {
  title: "Chats"
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
    color: "#D46F8A",
    paddingTop: 8
  }
});

export default withNavigation(ChatsScreen);
