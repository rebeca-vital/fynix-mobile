import { 
  Text, 
  View,
  StyleSheet,
  TouchableOpacity
 } from "react-native";
 import  { useState } from "react";
 import{ MaterialIcons } from "@expo/vector-icons";

 export default function Configuracoes() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={[styles.container, darkMode && { backgroundColor: "#111"}]}>
       <Text style={[styles.title, darkMode && { color: "#fff"}]}>
        Configurações
       </Text>
       {/* DARK MODE */}
       <TouchableOpacity
         style={styles.item}
          onPress={() => setDarkMode(!darkMode)}>
            <MaterialIcons name="dark-mode" size={24} color="#ff6b00" />
            <Text style={styles.text}> {darkMode ? "Desativar modo escuro" : "Ativar modo escuro"}
            </Text>
         </TouchableOpacity>

         {/* EDITAR PERFIL */}
          <TouchableOpacity style={styles.item}>
            <MaterialIcons name="person" size={24} color="#ff6b00" />
            <Text style={styles.text}>Editar Perfil</Text>
          </TouchableOpacity>

          {/* NOTIFICAÇÕES */}
          <TouchableOpacity style={styles.item}>
            <MaterialIcons name="notifications" size={24} color="#ff6b00" />
            <Text style={styles.text}>Notificações</Text>
          </TouchableOpacity>
    </View>   
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    marginBottom: 10,
    gap: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});

