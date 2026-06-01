import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import api from "../services/api";
import { useTheme } from "./context/themeContext";
import { Background } from "@react-navigation/elements";

type Gasto = {
  id: string;
  title: string;
  value: number;
  icon: string;
  category: string;
};

export default function Home() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [saldoVisivel, setSaldoVisivel] = useState(true);
  const [menuAberto, setMenuAberto] = useState(false);

  const router = useRouter();
  const params = useLocalSearchParams();
  const { dark } = useTheme();
  const nomeUsuario = params.apelido ? String(params.apelido) : "Usuário";
  const colors = {
    background: dark ? "#111" : "#f5f5f5",
    card: dark ? "#1e1e1e" : "#fff",
    text: dark ? "#fff" : "#333",
    textSecondary: dark ? "#aaa" : "#666",
    border: dark ? "#2a2a2a" : "#eaeaea",
    primary: "#ff6b00",
  }
 

  const deparaGastos: Record<number, { title: string; category: string; icon: string; value: number }> = {
    1: { title: "Compra Shopee", category: "Lazer", icon: "shopping-bag", value: 143.20 },
    2: { title: "Compra iFood", category: "Alimentação", icon: "restaurant", value: 54.90 },
    3: { title: "Uber", category: "Transporte", icon: "directions-bus", value: 22.50 },
    4: { title: "Assinatura Netflix", category: "Entretenimento", icon: "tv", value: 55.90 },
  };

  useEffect(() => {
    async function carregarDados() {
      try {

        const response = await api.get("/todos?_limit=4");
        

        const dadosTratados = response.data.map((item: any) => {
          const dadosTraduzidos = deparaGastos[item.id] || {
            title: `Gasto Alternativo #${item.id}`,
            category: "Outros",
            icon: "attach-money",
            value: item.id * 10,
          };

          return {
            id: String(item.id),
            title: dadosTraduzidos.title, 
            value: dadosTraduzidos.value,
            category: dadosTraduzidos.category,
            icon: dadosTraduzidos.icon,
          };
        });

        setGastos(dadosTratados);
      } catch (error) {
        console.error("Erro ao conectar na API:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  if (carregando) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  const saldoDisponivel = gastos.reduce((acc, curr) => acc + curr.value, 1000);
  const objetivoAtual = gastos[0] ? gastos[0].value * 3 : 450;
  const objetivoTotal = 1500;
  const porcentagemMeta = (objetivoAtual / objetivoTotal) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background}}>
      <ScrollView style={styles.container}>

        <View style={styles.barraSuperior}>
          <TouchableOpacity onPress={() => router.back()} style={styles.botaoVoltar}>
            <MaterialIcons name="arrow-back" size={28} color="#FF6B00" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMenuAberto(true)} style={styles.botaoMenuHamburguer}>
            <MaterialIcons name="menu" size={28} color="#FF6B00" />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <View style={styles.textoHeader}>
            <Text style={[styles.bemVindo, dark && { color: colors.text}]}>Olá, {nomeUsuario}! 👋</Text>
            <Text style={[styles.subtitulo, dark && { color: colors.textSecondary}]}>Sua jornada financeira renasce aqui!</Text>
          </View>
          <Image source={require("../assets/images/phoenix-mascot.png")} style={styles.mascote} />
        </View>

        <View style={[styles.saldoCard,
          dark && { backgroundColor: "#ff6b00", borderColor: "#333"}
        ]}>
          <View style={styles.saldoHeaderRow}>
            <Text style={styles.saldoLabel}>Saldo disponível</Text>
            <TouchableOpacity onPress={() => setSaldoVisivel(!saldoVisivel)}>
              <MaterialIcons name={saldoVisivel ? "visibility" : "visibility-off"} size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.saldoValor}>
            {saldoVisivel 
              ? `R$ ${saldoDisponivel.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` 
              : "*****"}
          </Text>
        </View>

        <Text style={[styles.sectionTitle, dark && { color: "#fff"}]}>Objetivos</Text>
        <View style={[styles.investimentoCard,
          dark && { backgroundColor: colors.card, borderColor: colors.border}
        ]}>
          <Text style={[styles.metaTitulo, dark && { color: "#fff" }]}>Reserva de Emergência</Text>
          <View style={styles.barraProgressoFundo}>
            <View style={[styles.barraProgressoPreenchida, { width: `${porcentagemMeta}%` }]} />
          </View>
          <Text style={[styles.metaValores, dark && { color: colors.textSecondary}]}>
            R$ {objetivoAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} de R$ {objetivoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </Text>
        </View>

        <Text style={[styles.sectionTitle, dark && { color: "#fff"}]}>Histórico de gastos</Text>
        <View style={[styles.resumoCard,
          dark && { backgroundColor: colors.card, borderColor: colors.border}
        ]}>
          {gastos.map((item) => (
            <View key={item.id} style={styles.gastoLinhaHome}>
              <View style={styles.containerIconeCategoria}>
                <MaterialIcons name={item.icon as any} size={18} color="#FF6B00" />
              </View>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={[styles.gastoTextoHome, dark && { color: "#fff" }]} numberOfLines={1}>{item.title}</Text>
                <Text style={[styles.gastoCategoriaTag, dark && { color: "#aaa" }]}>{item.category}</Text>
              </View>
              <Text style={styles.gastoValorHome}>
                - R$ {item.value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

 
      <Modal visible={menuAberto} transparent={true} animationType="fade" onRequestClose={() => setMenuAberto(false)}>
        <View style={styles.fundoModalEscuro}>
          <TouchableOpacity style={styles.areaFecharExterna} activeOpacity={1} onPress={() => setMenuAberto(false)} />
          <View style={[styles.conteudoMenuLateral, dark && { backgroundColor: "#1a1a1a" }]}>
            <View style={styles.topoMenuLateral}>
              <TouchableOpacity onPress={() => setMenuAberto(false)}>
                <MaterialIcons name="menu-open" size={28} color="#FF6B00" />
              </TouchableOpacity>
            </View>

            <View style={styles.containerLinksMenu}>
              <TouchableOpacity style={[styles.itemMenuLateral, dark && { backgroundColor: "#1a1a1a" }]} onPress={() => { setMenuAberto(false); 
                router.push({ pathname: "/perfil",
                  params: { apelido: nomeUsuario, email: "" }
                 }); }}>
                <Text style={styles.textoItemMenu}>Perfil</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.itemMenuLateral, dark && { backgroundColor: "#1a1a1a"}]} onPress={() => { setMenuAberto(false); router.push("/configuracoes"); }}>
                <Text style={styles.textoItemMenu}>Configurações</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 20 
  },
  barraSuperior: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: 40, 
    marginBottom: 20,
  },
  botaoVoltar: { 
    padding: 5, 
    marginLeft: -5 
  },
  botaoMenuHamburguer: { 
    padding: 5, 
    marginRight: -5 
  },
  header: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: 5 
  },
  textoHeader: { 
    flex: 1, 
    marginRight: -40 
  },
  mascote: { 
    width: 145, 
    height: 145, 
    resizeMode: "contain" 
  },
  bemVindo: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 5 
  },
  subtitulo: { 
    textAlign: "left", 
    color: "#666", 
    marginBottom: 25, 
    fontSize: 14 
  },
  saldoCard: { 
    backgroundColor: "#d95c00", 
    borderRadius: 20, 
    padding: 25, 
    marginBottom: 5, 
    marginTop: -22 
  },
  saldoHeaderRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  saldoLabel: { 
    color: "#FFF", 
    fontSize: 16 
  },
  saldoValor: { 
    color: "#FFF", 
    fontSize: 32, 
    fontWeight: "bold", 
    marginTop: 5 
  },
  sectionTitle: { 
    fontSize: 22, 
    fontWeight: "700",
  },
  investimentoCard: { 
    backgroundColor: "#FFF", 
    borderWidth: 1, 
    borderColor: "#EAEAEA", 
    borderRadius: 16, 
    padding: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  metaTitulo: { 
    fontSize: 15, 
    fontWeight: "600", 
    color: "#333", 
    marginBottom: 8 
  },
  barraProgressoFundo: { 
    height: 8, 
    backgroundColor: "#F0F0F0", 
    borderRadius: 4, 
    marginBottom: 6, 
    overflow: "hidden" 
  },
  barraProgressoPreenchida: { 
    height: "100%", 
    backgroundColor: 
    "#FF6B00" 
  },
  metaValores: { 
    fontSize: 12, 
    color: "#666", 
    textAlign: "right" 
  },
  resumoCard: { 
    backgroundColor: "#FFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    },
  gastoLinhaHome: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: "#2a2a2a" 
  },
  containerIconeCategoria: { 
    width: 36, height: 36, 
    borderRadius: 18, 
    backgroundColor: "#FFF5EF", 
    justifyContent: "center", 
    alignItems: "center", 
    marginRight: 12, 
    borderWidth: 1, 
    borderColor: "#FFE2D1" 
  },
  gastoTextoHome: { 
    fontSize: 15, 
    color: '#333', 
    fontWeight: "500" 
  },
  gastoCategoriaTag: { 
    fontSize: 12, 
    color: "#999", 
    marginTop: 2 
  },
  gastoValorHome: { 
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#ff6b6b' 
  },
  fundoModalEscuro: { 
    flex: 1, 
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    flexDirection: "row" 
  },
  areaFecharExterna: { 
    flex: 1 
  },
  conteudoMenuLateral: { 
    width: "70%", 
    backgroundColor: "#FFFFFF", 
    height: "100%", 
    padding: 20, 
    elevation: 5 
  },
  topoMenuLateral: { 
    flexDirection: "row", 
    justifyContent: "flex-end", 
    marginTop: 40, 
    marginBottom: 15 
  },
  containerLinksMenu: { 
    width: "100%", 
    top: -50 
  },
  itemMenuLateral: { 
    backgroundColor: "#FFFFFF", 
    paddingVertical: 12, 
    paddingHorizontal: 5, 
    borderRadius: 8, 
    marginBottom: 10, 
    width: "65%", 
    alignItems: "flex-start" 
  },
  textoItemMenu: { 
    color: "#FF6B00", 
    fontWeight: "bold", 
    fontSize: 17 
  },
});