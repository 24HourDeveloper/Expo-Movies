import { View } from "react-native";

type ContainerTypes = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerTypes) {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        alignItems: "center",
        backgroundColor: "#1B1212",
      }}
    >
      {children}
    </View>
  );
}
