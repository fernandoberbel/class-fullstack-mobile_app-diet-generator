import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { colors } from "../constants/colors";
import { Button } from "../components/button";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logo.png")} />

      <Text style={styles.title}>
        Dieta<Text style={{ color: colors.white }}>.IA</Text>
      </Text>

      <Text style={styles.text}>
        Sua dieta personalizada com inteligência artificial
      </Text>

      <Button title="Gerar dieta" href="/step" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.green,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    width: 240,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
});
