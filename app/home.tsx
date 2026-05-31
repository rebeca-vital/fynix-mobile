import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useEffect, useState } from "react";

import { buscarPosts } from "../services/api";

interface Post {
  id: number;
  title: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);

  async function carregarDados() {
    try {
      const dados = await buscarPosts();
      setPosts(dados);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  const saldo = 4870;
  const investimentos = 1250;
  const cobrancas = 12;
  const pagamentosPendentes = 3;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.textoHeader}>
          <Text style={styles.bemVindo}>Olá, Usuário! 👋</Text>

          <Text style={styles.subtitulo}>Bem-vindo(a) ao Fynix</Text>
        </View>

        <Image
          source={require("../assets/images/phoenix-mascot.png")}
          style={styles.mascote}
        />
      </View>

      <View style={styles.saldoCard}>
        <Text style={styles.saldoLabel}>Saldo disponível</Text>

        <Text style={styles.saldoValor}>
          R$ {saldo.toLocaleString("pt-BR")}
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.smallCard}>
          <Text style={styles.smallTitle}>Investimentos</Text>

          <Text style={styles.smallValue}>R$ {investimentos}</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.smallTitle}>Cobranças</Text>

          <Text style={styles.smallValue}>{cobrancas}</Text>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.smallCard}>
          <Text style={styles.smallTitle}>Pagamentos</Text>

          <Text style={styles.smallValue}>{pagamentosPendentes}</Text>
        </View>

        <View style={styles.smallCard}>
          <Text style={styles.smallTitle}>Registros</Text>

          <Text style={styles.smallValue}>{posts.length}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Resumo Financeiro</Text>

      <View style={styles.resumoCard}>
        <Text style={styles.resumoLinha}> Receitas: R$ 6.000,00</Text>

        <Text style={styles.resumoLinha}> Despesas: R$ 1.129,48</Text>

        <Text style={styles.resumoLinha}> Saldo Atual: R$ 4.870,52</Text>
      </View>

      <Text style={styles.sectionTitle}>Gastos do mês</Text>

      <View style={styles.resumoGastos}>
        <View style={styles.legendaItem}>
          <View style={[styles.legendaCor, { backgroundColor: "#FD3A2D" }]} />
          <Text style={styles.legendaTexto}>Alimentação • R$ 790,00</Text>
        </View>

        <View style={styles.legendaItem}>
          <View style={[styles.legendaCor, { backgroundColor: "#FE5F2F" }]} />
          <Text style={styles.legendaTexto}>Transporte • R$ 560,00</Text>
        </View>

        <View style={styles.legendaItem}>
          <View style={[styles.legendaCor, { backgroundColor: "#FE8330" }]} />
          <Text style={styles.legendaTexto}>Lazer • R$ 450,00</Text>
        </View>

        <View style={styles.legendaItem}>
          <View style={[styles.legendaCor, { backgroundColor: "#FFA832" }]} />
          <Text style={styles.legendaTexto}>Contas • R$ 330,00</Text>
        </View>

        <View style={styles.legendaItem}>
          <View style={[styles.legendaCor, { backgroundColor: "#FFC333" }]} />
          <Text style={styles.legendaTexto}>Outros • R$ 120,00</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => setMostrarDetalhes(!mostrarDetalhes)}
      >
        <Text style={styles.botaoTexto}>
          {mostrarDetalhes ? "Ocultar detalhes" : "Ver detalhes"}
        </Text>
      </TouchableOpacity>

      {mostrarDetalhes && (
        <View style={styles.detalhesContainer}>
          <View style={styles.detalheCard}>
            <Text style={styles.detalheTitulo}>Alimentação • R$ 790,00</Text>

            <Text style={styles.detalheItem}>Mercado São Luiz - R$ 220,00</Text>

            <Text style={styles.detalheItem}>Padaria Ideal - R$ 90,00</Text>

            <Text style={styles.detalheItem}>
              Restaurante Delícia - R$ 480,00
            </Text>
          </View>

          <View style={styles.detalheCard}>
            <Text style={styles.detalheTitulo}>Transporte • R$ 560,00</Text>

            <Text style={styles.detalheItem}>Uber - R$ 280,00</Text>

            <Text style={styles.detalheItem}>Combustível - R$ 180,00</Text>

            <Text style={styles.detalheItem}>Estacionamento - R$ 100,00</Text>
          </View>

          <View style={styles.detalheCard}>
            <Text style={styles.detalheTitulo}>Lazer • R$ 450,00</Text>

            <Text style={styles.detalheItem}>Netflix - R$ 39,90</Text>

            <Text style={styles.detalheItem}>Cinema - R$ 120,00</Text>

            <Text style={styles.detalheItem}>
              Streaming e jogos - R$ 290,10
            </Text>
          </View>

          <View style={styles.detalheCard}>
            <Text style={styles.detalheTitulo}>Contas • R$ 330,00</Text>

            <Text style={styles.detalheItem}>Energia - R$ 170,00</Text>

            <Text style={styles.detalheItem}>Internet - R$ 100,00</Text>

            <Text style={styles.detalheItem}>Água - R$ 60,00</Text>
          </View>

          <View style={styles.detalheCard}>
            <Text style={styles.detalheTitulo}>Outros • R$ 120,00</Text>

            <Text style={styles.detalheItem}>Shopee - R$ 80,00</Text>

            <Text style={styles.detalheItem}>Taxas bancárias - R$ 40,00</Text>
          </View>
        </View>
      )}

      <Text style={styles.sectionTitle}>Últimas movimentações</Text>

      <View style={styles.movimentacao}>
        <Text>Mercado São Luiz</Text>
        <Text>R$ 220,00</Text>
      </View>

      <View style={styles.movimentacao}>
        <Text>Netflix</Text>
        <Text>R$ 39,90</Text>
      </View>

      <View style={styles.movimentacao}>
        <Text>Uber</Text>
        <Text>R$ 28,00</Text>
      </View>

      <View style={styles.movimentacao}>
        <Text>Energia</Text>
        <Text>R$ 170,00</Text>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 0,
  },

  textoHeader: {
    flex: 1,
    marginRight: -40,
  },

  mascote: {
    width: 230,
    height: 230,
    resizeMode: "contain",
  },

  bemVindo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 13,
  },

  subtitulo: {
    textAlign: "center",
    color: "#666",
    marginBottom: 25,
  },

  saldoCard: {
    backgroundColor: "#FF6B00",
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    marginTop: -22,
  },

  saldoLabel: {
    color: "#FFF",
    fontSize: 16,
  },

  saldoValor: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 5,
  },

  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  smallCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#EAEAEA",
  },

  smallTitle: {
    color: "#666",
  },

  smallValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF6B00",
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
  },

  resumoCard: {
    backgroundColor: "#FFF8F2",
    padding: 20,
    borderRadius: 12,
  },

  resumoLinha: {
    fontSize: 16,
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#FF6B00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  botaoTexto: {
    color: "#FFF",
    fontWeight: "bold",
  },

  legendaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  legendaCor: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 10,
  },

  legendaTexto: {
    fontSize: 14,
    color: "#333",
  },

  movimentacao: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    marginBottom: 10,
  },

  detalhesContainer: {
    marginTop: 15,
  },

  detalheCard: {
    backgroundColor: "#FFF8F2",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  detalheTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B00",
    marginBottom: 10,
  },

  detalheItem: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  resumoGastos: {
    backgroundColor: "#FFF8F2",
    padding: 18,
    borderRadius: 12,
    marginTop: 5,
  },
});
