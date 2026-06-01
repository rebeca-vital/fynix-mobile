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
import { useTheme } from "./context/themeContext";


export default function Perfil() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { dark } = useTheme();

    const nomeInicial = params.apelido ? String(params.apelido) : "Usuário";
    const emailInicial = params.email ? String(params.email) : "";

    const [nome, setNome] = useState(nomeInicial);
    const [email, setEmail] = useState(emailInicial);
    const[editando, setEditando] = useState(false);

    function salvar(){
        setEditando(false);
    }
  return (
    <ScrollView style={[styles.container, dark &&{ backgroundColor: "#111"}]}>

        <View style={styles.header}>
            <Image
                source={require("../assets/images/perfil.png")}
                style={styles.avatar}
            />
            <Text style={[styles.nome, dark && { color:"#fff"}]}>{nome}</Text>
            <Text style={[styles.sub, dark && { color:"#fff"}]}>Perfil do usuário</Text>
        </View>

        
        <View style={[styles.card, dark && { backgroundColor: "#1e1e1e", borderColor: "#333"}
        ]}>
            <Text style={[styles.label, dark && { color: "#aaa"}]}>Nome</Text>

            {editando ? (
                <TextInput
                    style={[styles.input,
                        dark && {
                            backgroundColor: "#2a2a2a",
                            color: "#fff",
                            borderColor: "#444",
                        },
                   ]}
                    value={nome}
                    onChangeText={setNome}
                />
            ) : (
                <Text style={[styles.value, dark && { color: "#fff"}]}>{nome}</Text>
            )}

            <Text style={[styles.label, dark && { color: "#aaa"}]}>Email</Text>
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
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => router.back ()}>

                    <Text style={styles.outlineText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
   );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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