import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [apelido, setApelido] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    if (!email.includes("@") || !email.includes(".")) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
    if (!apelido.trim() || !senha.trim()) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    router.replace({
      pathname: "/home",
      params: { apelido, email },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Apelido"
        value={apelido}
        onChangeText={setApelido}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail (Qualquer domínio)"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.botao} onPress={handleRegister}>
        <Text style={styles.botaoTexto}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },
  botao: {
    backgroundColor: "#FF6B00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  botaoTexto: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});