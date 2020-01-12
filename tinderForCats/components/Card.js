import React, { useEffect, useState } from "react";

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function Card({ card }) {
  card = card || {};
  return (
    <View style={styles.card}>
      <Image
        style={styles.cardImage}
        source={{
          uri: card.photoUrls[0]
        }}
      />
      <Text style={[styles.details, {
        marginTop: -130,
        fontSize: 40
      }]}>{card.petName}</Text>
      <Text style={[styles.details, {
        marginTop: -5,
        fontSize: 14,
        height: 20
      }]}>{card.shortDescription}</Text>
      <TouchableHighlight
      style={{
        borderRadius:20,
        backgroundColor: 'black',
        padding: 10,
        marginLeft: 20,
        marginTop: 10
      }}>
        <Text
        style={{
          color: 'white',
          fontSize: 14,
          alignSelf: 'flex-start'
        }}>
          See details
        </Text>
      </TouchableHighlight>
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
    marginLeft: 20,
    alignItems: "flex-start",
    shadowColor: "black",
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 5,
  },
  details: {
    marginLeft: 20,
    width: width,
    color: 'white',
    justifyContent: 'flex-start',
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 8,
  }
});
