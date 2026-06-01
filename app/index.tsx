import React from 'react';
import { useRouter } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function validarEmail(email: string) {
  const regexGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return regexGmail.test(email);
}

export default function Login() {
  const router = useRouter();
  const [userInput, setUserInput] = React.useState("");
  const [senha, setSenha] = React.useState("");

  function handleLogin() {
    if (userInput.trim() === "" || senha === "") {
      alert("Preencha o usuário/e-mail e a senha");
      return;
    }

    if (userInput.includes("@") && !validarEmail(userInput)) {
      alert("Formato de e-mail inválido. Use um endereço @gmail.com");
      return;
    }

    const apelidoIdentificado = userInput.includes("@") ? userInput.split("@")[0] : userInput;

    router.push({
      pathname: "/home",
      params: { apelido: apelidoIdentificado }
    });
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/fynix.jpeg')}
        style={styles.logo}
      />
      
      <TextInput
        placeholder="Nome de usuário ou email"
        style={styles.input}
        value={userInput}
        onChangeText={setUserInput}
        autoCapitalize="none"
      />
      
      <TextInput
        placeholder="Digite sua senha"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
         style={styles.secondaryButton}
         onPress={() => router.push("/register")}>
        <Text style={styles.secondaryButtonText}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 280,
    height: 160,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B00',
  },
  secondaryButtonText: {
    color: '#FF6B00',
    fontSize: 16,
    fontWeight: 'bold',
  },
});