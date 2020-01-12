import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import NavigationService from "./NavigationService";
import MainTabNavigator from "./MainTabNavigator";

const AppContainer = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator
  })
);

export default function AppNavigator() {
  return (
    <AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
}
