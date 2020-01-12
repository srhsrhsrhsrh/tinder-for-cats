import React from "react";

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

const { width, height } = Dimensions.get("window");

export default function Card({ card }) {
  card = card || {};
  return (
    <View style={styles.card}>
      <Text>{card.name}</Text>
      <Image
        style={styles.cardImage}
        source={{
          uri: card.imgUrl
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    width: width * 0.9,
    height: height * 0.75,
    borderRadius: 20
  },
  card: {
    flex: 1,
    borderColor: "#E8E8E8",
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5
  }
});
