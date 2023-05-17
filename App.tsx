import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
// @ts-ignore
import { IP } from "@env";
import { StartGame } from "./components/StartGame";
import { useEffect, useState } from "react";

export default function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios
      .get(`http://${IP}:8080/team`)
      .then((response) => {
        // La respuesta de la solicitud GET está en la propiedad 'data' del objeto 'response'
        console.log(response.data);
        setTeams(response.data);
      })
      .catch((error) => {
        // Si hay algún error, puedes manejarlo aquí
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StartGame teams={teams} />
      <Text>Hola</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
