import { View, StyleSheet, Text, ScrollView } from "react-native";
import { colors } from "../../constants/colors";
import { Header } from "../../components/header";
import { Select } from "../../components/input/select";
import { Button } from "../../components/button";
import { router } from "expo-router";
import { useDataStore } from "../../store/data";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  gender: z.string().min(1, { message: "O sexo é obrigatório" }),
  level: z.string().min(1, { message: "Selecione seu nível" }),
  goal: z.string().min(1, { message: "O objetivo é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export default function Create() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setPageTwo = useDataStore((state) => state.setPageTwo);

  const genderOptions = [
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
  ];

  const levelOptions = [
    {
      label: "Sedentário (pouco ou nenhuma atividade física)",
      value: "Sedentário",
    },
    {
      label: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
      value: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
    },
    {
      label: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
      value: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
    },
    {
      label: "Altamente ativo (exercícios 5 a 7 dia por semana)",
      value: "Altamente ativo (exercícios 5 a 7 dia por semana)",
    },
  ];

  const goalsOptions = [
    { label: "Emagrecer", value: "emagrecer" },
    { label: "Hipertrofia", value: "Hipertrofia" },
    { label: "Hipertrofia + Definição", value: "Hipertrofia e Definição" },
    { label: "Definição", value: "Definição" },
  ];

  function handleCreate(data: FormData) {
    console.log("Passando dados da pagina 1");

    setPageTwo({
      gender: data.gender,
      level: data.level,
      goal: data.goal,
    });

    router.push("/nutrition");
  }

  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Finalizando dieta" />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo:</Text>
        <Select
          control={control}
          name="gender"
          placeholder="Selecione o seu sexo..."
          error={errors.gender?.message}
          options={genderOptions}
        />

        <Text style={styles.label}>Selecione nível de atividade física:</Text>
        <Select
          control={control}
          name="level"
          placeholder="Selecione seu nível..."
          error={errors.level?.message}
          options={levelOptions}
        />

        <Text style={styles.label}>Selecione seu objetivo:</Text>
        <Select
          control={control}
          name="goal"
          placeholder="Selecione seu objetivo..."
          error={errors.goal?.message}
          options={goalsOptions}
        />

        <Button title="Gerar dieta" onPress={handleSubmit(handleCreate)} />
      </ScrollView>
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
