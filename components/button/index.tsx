import { Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../../constants/colors";
import { Link } from "expo-router";

interface ButtonProps {
  title: string;
  href: string;
}

export function Button({ title, href }: ButtonProps) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    width: "100%",
    height: 40,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 34,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
});
