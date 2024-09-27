import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  Share,
} from "react-native";
import { colors } from "../../constants/colors";
import { useDataStore } from "../../store/data";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Data } from "../../types/data";
import { Link, router } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Button } from "@/components/button";

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

        const response = await api.post<ResponseData>("/create", {
          name: user.name,
          weight: user.weight,
          height: user.height,
          age: user.age,
          gender: user.gender,
          goal: user.goal,
          level: user.level,
        });

        console.log(response.data);

        return response.data.data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  async function handleShare() {
    try {
      if (data && Object.keys(data).length === 0) return;

      const foods = `${data?.refeicoes.map(
        (item) =>
          `\n- Nome: ${item.nome}\n- Horário: ${
            item.horario
          }\n- Alimentos: ${item.alimentos.map((alimento) => `${alimento}`)}`
      )}`;

      const supplements = `${data?.suplementos.map((item) => `${item}`)}`;

      const message = `Dieta\n\nNome: ${data?.nome}\nObjetivo: ${data?.objetivo}\n\n ${foods}\n\nDica de Suplemento:\n${supplements}`;

      await Share.share({
        message: message,
      });
    } catch (err) {
      console.log(err);
    }
  }

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
        <Link href="/">
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

          <Pressable style={styles.buttonShare} onPress={handleShare}>
            <Text style={styles.buttonShareText}>Compartilhar</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <View style={{ paddingHorizontal: 16, flex: 1 }}>
        {data && Object.keys(data).length > 0 && (
          <>
            <Text style={styles.name}>{data.nome}</Text>
            <Text style={styles.goals}>Foco: {data.objetivo}</Text>

            <Text style={styles.label}>Refeições:</Text>
            <ScrollView>
              <View style={styles.foods}>
                {data.refeicoes.map((refeicao) => (
                  <View key={refeicao.nome} style={styles.food}>
                    <View style={styles.foodHeader}>
                      <Text style={styles.foodName}>{refeicao.nome}</Text>
                      <Ionicons name="restaurant" size={16} color="#000" />
                    </View>

                    <View style={styles.foodContent}>
                      <Feather name="clock" size={14} color="#000" />
                      <Text>Horário: {refeicao.horario}</Text>
                    </View>

                    <Text style={styles.foodText}>Alimentos:</Text>
                    {refeicao.alimentos.map((alimento) => (
                      <Text key={alimento}>{alimento}</Text>
                    ))}
                  </View>
                ))}
              </View>

              <View style={styles.supplements}>
                <Text style={styles.foodName}>Dica de suplementos:</Text>
                {data.suplementos.map((item) => (
                  <Text key={item}>{item}</Text>
                ))}
              </View>

              <View style={styles.button}>
                <Button
                  title="Gerar nova dieta"
                  onPress={() => router.replace("/")}
                />
              </View>
            </ScrollView>
          </>
        )}
      </View>
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
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold",
  },
  goals: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
  foods: {
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  food: {
    backgroundColor: "rgba(208, 208, 208, 0.4)",
    padding: 8,
    borderRadius: 4,
  },
  foodHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  foodContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  foodText: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 4,
  },
  supplements: {
    backgroundColor: colors.white,
    marginTop: 14,
    padding: 14,
    borderRadius: 8,
    gap: 4,
  },
  button: {
    marginTop: 0,
    marginBottom: 34,
  },
});
