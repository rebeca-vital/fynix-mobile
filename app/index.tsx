import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
export default function Login() {
  const router = useRouter();
  const [login, setLogin] = React.useState("");
  const [senha, setSenha] = React.useState("");
  function handleLogin() {
    if(login === "" || senha === "") {
      alert("Prencha login e senha");
      return;
    }
    router.push("/home");

  }
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/fynix.jpeg')}
        style={styles.logo}
      />
      <TextInput
        placeholder="Digite seu email"
        style={styles.input}
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        placeholder="Digite sua senha"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 220,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
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
});
