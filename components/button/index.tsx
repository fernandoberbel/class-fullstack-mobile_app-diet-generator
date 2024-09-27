import { Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../../constants/colors";
import React from "react";

interface ButtonProps {
  title: string;
  onPress?: () => void;
}

export const Button = React.forwardRef(
  ({ title, onPress }: ButtonProps, ref: any) => {
    return (
      <Pressable style={styles.button} onPress={onPress} ref={ref}>
        <Text style={styles.buttonText}>{title}</Text>
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    width: "100%",
    height: 40,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.white,
  },
});
