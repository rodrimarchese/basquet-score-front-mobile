import DatePicker from "react-native-date-picker";
import React, { useEffect, useState } from "react";
import { Button, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import { Team } from "../App";
// @ts-ignore
import { IP } from "@env";
import {ActiveGames} from "./ActiveGames";

// @ts-ignore
export const EndedGames = ({navigation}) => {
  return (
      <ActiveGames ended={true} navigation={navigation}/>
  )
};
