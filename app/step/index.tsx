import { View, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import { Header } from "../../components/header";

export default function Step() {
  return (
    <View style={styles.container}>
      <Header step="Passo 1" title="Vamos começar" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
