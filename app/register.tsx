import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { useRouter } from "expo-router";
export default function Register() {
const router = useRouter();

const [email, setEmail] = React.useState("");
const [senha, setSenha] = React.useState("");
const [confirmarSenha, setConfirmarSenha] = React.useState("");

function handleRegister() {
    if(email ==="" || senha ==="" || confirmarSenha === "") {
        alert("Preencha todos os campos");
        return;
    }
    if(senha !== confirmarSenha) {
        alert("As senhas não coincidem");
        return;
    }
    alert("Cadastro realizado com sucesso!");
    router.push("/home");
}
return (
    <View style={styles.container}>
        <Image
        source= {require('../assets/images/fynix.jpeg')}
        style={styles.logo}
        />
        <TextInput
        placeholder="Digite seu email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
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
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#ffffff",
    },
    logo: {
        width: 220,
        height: 120,
        resizeMode: "contain",
        alignSelf: "center",
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    button:{
        backgroundColor: "#FF6B00",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
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