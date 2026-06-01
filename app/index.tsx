import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Validação genérica que aceita qualquer tipo de e-mail
    if (!email.includes("@") || !email.includes(".")) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
    if (!senha.trim()) {
      alert("Por favor, insira a sua senha.");
      return;
    }

    // Navega para a home passando um apelido padrão ou extraído do e-mail
    const apelidoUsuario = email.split("@")[0];
    router.replace({
      pathname: "/home",
      params: { apelido: apelidoUsuario }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Fynix</Text>
      <Text style={styles.subtitulo}>Faça login para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
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

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoCriarConta} onPress={() => router.push("/register")}>
        <Text style={styles.textoCriarConta}>Não tem uma conta? Cadastre-se</Text>
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
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    color: "#FF6B00",
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    color: "#333",
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
  botaoCriarConta: {
    marginTop: 20,
    alignItems: "center",
  },
  textoCriarConta: {
    color: "#FF6B00",
    fontSize: 14,
    fontWeight: "600",
  },
});