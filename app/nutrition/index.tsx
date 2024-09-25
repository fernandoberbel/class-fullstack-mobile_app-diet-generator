import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { colors } from "../../constants/colors";
import { Header } from "../../components/header";
import { Button } from "../../components/button";
import { useDataStore } from "../../store/data";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Data } from "../../type/data";
import { Link } from "expo-router";

interface ResponseData {
  data: Data;
}

export default function Nutrition() {
  const user = useDataStore((state) => state.user);

  const { data, isFetching, error } = useQuery({
    queryKey: ["nutrition"],
    queryFn: async () => {
      try {
        if (!user) {
          throw new Error("Failed load nutrition");
        }

        const response = await api.get<ResponseData>("/teste");

        // const response = await api.post("/create", {
        //   name: user.name,
        //   weight: user.weight,
        //   height: user.height,
        //   age: user.age,
        //   gender: user.gender,
        //   goal: user.goal,
        //   level: user.level,
        // });

        return response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  if (isFetching) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Estamos gerando sua dieta!</Text>
        <Text style={styles.loadingText}>Consultando IA...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Falha ao gerar dieta!</Text>
        <Link href="/step">
          <Text style={styles.loadingText}>Tente novamente</Text>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.containerHeader}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>Minha dieta</Text>

          <Pressable style={styles.buttonShare}>
            <Text style={styles.buttonShareText}>Compartilhar</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  containerHeader: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    marginBottom: 14,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 34,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 18,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.background,
  },
  buttonShare: {
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 4,
  },
  buttonShareText: {
    color: colors.white,
    fontWeight: "500",
  },
  loading: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
