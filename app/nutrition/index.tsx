import { View, StyleSheet, Text, ScrollView } from "react-native";
import { colors } from "../../constants/colors";
import { Header } from "../../components/header";
import { Select } from "../../components/input/select";
import { Button } from "../../components/button";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

import { useDataStore } from "../../store/data";

export default function Nutrition() {
  const user = useDataStore((state) => state.user);
  console.log(user);

  return (
    <View style={styles.container}>
      <Header title="Minha dieta" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 8,
  },
});
