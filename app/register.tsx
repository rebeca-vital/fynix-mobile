import React from "react";
import { useRouter } from "expo-router";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

function validarEmail(email: string) {
  const regexGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return regexGmail.test(email);
}

export default function Register() {
  const router = useRouter();

  const [nomeCompleto, setNomeCompleto] = React.useState("");
  const [apelido, setApelido] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [senha, setSenha] = React.useState("");
  const [confirmarSenha, setConfirmarSenha] = React.useState("");

  function handleRegister() {
    if (nomeCompleto === "" || apelido === "" || email === "" || senha === "" || confirmarSenha === "") {
        alert("Preencha todos os campos");
        return;
    }

    if (!validarEmail(email)) {
        alert("Por favor, insira um e-mail válido do Gmail (exemplo@gmail.com)");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem");
        return;
    }

    alert("Cadastro realizado com sucesso!");
    
    router.push({
      pathname: "/home",
      params: { apelido: apelido }
    });
  }

  return (
    <View style={styles.container}>
        <Image
          source={require('../assets/images/fynix.jpeg')}
          style={styles.logo}
        />
        
        <TextInput
          placeholder="Nome completo"
          style={styles.input}
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
        />

        <TextInput
          placeholder="Apelido"
          style={styles.input}
          value={apelido}
          onChangeText={setApelido}
        />

        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />
        
        <TextInput
          placeholder="Confirme sua senha"
          style={styles.input}
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push("/")}>
            <Text style={styles.link}>Já tenho conta</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
    },
    logo: {
        width: 280,
        height: 120,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#FF6B00",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    link: {
        marginTop: 15,
        textAlign: "center",
        color: "#FF6B00",
        fontWeight: "bold",
    },
});