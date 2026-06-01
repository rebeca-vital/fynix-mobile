import { Stack } from "expo-router";
import { FynixProvider } from "./context/fynixContext"; 

export default function RootLayout() {
  return (
    <FynixProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </FynixProvider>
  );
}