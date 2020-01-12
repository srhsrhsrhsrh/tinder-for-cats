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
  Dimensions,
  TextInput
} from "react-native";

export default function DaySelector() {
  const [valueMonday, setMonday] = React.useState(false);
  const [valueTuesday, setTuesday] = React.useState(false);
  const [valueWednesday, setWednesday] = React.useState(false);
  const [valueThursday, setThursday] = React.useState(false);
  const [valueFriday, setFriday] = React.useState(false);
  return (
    <View>
      <Text style={{ fontSize: 20, color: "#828282", marginLeft: 20 }}>
        Days requested
      </Text>
      <TouchableOpacity onPress={() => setMonday(!valueMonday)}>
        <View
          style={
            valueMonday
              ? styles.DaySelectorButtonTrue
              : styles.DaySelectorButtonFalse
          }
        >
          <Text style={{ fontSize: 17 }}>Monday</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTuesday(!valueTuesday)}>
        <View
          style={
            valueTuesday
              ? styles.DaySelectorButtonTrue
              : styles.DaySelectorButtonFalse
          }
        >
          <Text style={{ fontSize: 17 }}>Tuesday</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setWednesday(!valueWednesday)}>
        <View
          style={
            valueWednesday
              ? styles.DaySelectorButtonTrue
              : styles.DaySelectorButtonFalse
          }
        >
          <Text style={{ fontSize: 17 }}>Wednesday</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setThursday(!valueThursday)}>
        <View
          style={
            valueThursday
              ? styles.DaySelectorButtonTrue
              : styles.DaySelectorButtonFalse
          }
        >
          <Text style={{ fontSize: 17 }}>Thursday</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setFriday(!valueFriday)}>
        <View
          style={
            valueFriday
              ? styles.DaySelectorButtonTrue
              : styles.DaySelectorButtonFalse
          }
        >
          <Text style={{ fontSize: 17 }}>Friday</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  DaySelectorButtonFalse: {
    borderRadius: 20,
    margin: 10,
    padding: 20,
    backgroundColor: "lightgrey"
  },
  DaySelectorButtonTrue: {
    borderRadius: 20,
    margin: 10,
    padding: 20,
    backgroundColor: "grey"
  }
});
