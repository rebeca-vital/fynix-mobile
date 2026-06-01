import React, { useState } from "react";
import { 
    Text, 
    View,
    TextInput,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";


export default function Perfil() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const nomeInicial = params.apelido ? String(params.apelido) : "Usuário";
    const emailInicial = params.email ? String(params.email) : "";

    const [nome, setNome] = useState(nomeInicial);
    const [email, setEmail] = useState(emailInicial);
    const[editando, setEditando] = useState(false);

    function salvar(){
        setEditando(false);
    }
  return (
    <ScrollView style={styles.container}>

        <View style={styles.header}>
            <Image
                source={require("../assets/images/perfil.png")}
                style={styles.avatar}
            />
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.sub}>Perfil do usuário</Text>
        </View>

        
        <View style={styles.card}>
            <Text style={styles.label}>Nome</Text>

            {editando ? (
                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                />
            ) : (
                <Text style={styles.value}>{nome}</Text>
            )}

            <Text style={styles.label}>Email</Text>
            {editando ? (
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite seu email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            ) : (
                <Text style={styles.value}>{email || "Não informado"}
                </Text>
            )}
            </View>

            
            <View style={styles.buttons}>
                {!editando ? (
                    <TouchableOpacity style={styles.button} onPress={() => setEditando(true)}>
                        <Text style={styles.buttonText}>Editar Perfil</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.button} onPress={salvar}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.outlineButton} onPress={() => router.back ()}>

                    <Text style={styles.outlineText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
   );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 30,
        marginTop: 30,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginBottom: 10,
    },
    nome: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    sub: {
        color: "#888",
        marginTop: 5,
    },
    card: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#eee",
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        color: "#888",
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        color: "#333",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
    },
    buttons: {
        gap: 10,
    },
    button: {
        backgroundColor: "#ff6b00",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    outlineButton: {
        borderWidth: 1,
        borderColor: "#ff6b00",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    outlineText: {
        color: "#ff6b00",
        fontWeight: "bold",
    },
});