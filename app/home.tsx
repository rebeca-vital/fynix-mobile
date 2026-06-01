import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFynix, Movimentacao, Cobranca, Cofrinho } from "./context/fynixContext"; 

type TipoBloco = 'investimento' | 'cobranca' | 'pagamento' | 'registro' | null;

export default function Home() {
  const { 
    saldo, 
    movimentacoes, setMovimentacoes, 
    cobrancas, setCobrancas, 
    cofrinhos, setCofrinhos 
  } = useFynix();

  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [saldoVisivel, setSaldoVisivel] = useState(true);

  const [blocoAberto, setBlocoAberto] = useState<TipoBloco>(null);
  const [mostrarMenuMais, setMostrarMenuMais] = useState(false);
  const [modalCriarAberto, setModalCriarAberto] = useState(false);

  const [descricao, setDescricao] = useState("");
  const [valorInput, setValorInput] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  
  const [mostrarListaCategorias, setMostrarListaCategorias] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Selecionar Categoria");
  const [customCategoria, setCustomCategoria] = useState("");
  const [editandoOutros, setEditandoOutros] = useState(false);

  const router = useRouter();
  const params = useLocalSearchParams();
  const nomeUsuario = params.apelido ? String(params.apelido) : "Usuário";

  const listaDoBloco = () => {
    if (blocoAberto === 'pagamento') return movimentacoes.filter(m => m.tipo === 'despesa');
    if (blocoAberto === 'registro') return movimentacoes.filter(m => m.tipo === 'receita');
    if (blocoAberto === 'cobranca') return cobrancas;
    if (blocoAberto === 'investimento') return cofrinhos;
    return [];
  };

  const listaVazia = listaDoBloco().length === 0;

  const categoriasBase = ['Alimentação', 'Lazer', 'Contas', 'Transporte', 'Outros'];
  if (blocoAberto === 'investimento' && !categoriasBase.includes('Cofrinho')) {
    categoriasBase.unshift('Cofrinho');
  }

  const coresCategorias: { [key: string]: string } = {
    'Alimentação': '#FD3A2D',
    'Transporte': '#FE5F2F',
    'Lazer': '#FE8330',
    'Contas': '#FFA832',
    'Cofrinho': '#00C853',
    'Outros': '#FFC333',
  };

  const despesas = movimentacoes.filter(m => m.tipo === 'despesa');
  const gastosPorCategoria: { [key: string]: number } = {};
  despesas.forEach((d) => {
    const cat = d.categoria || 'Outros';
    gastosPorCategoria[cat] = (gastosPorCategoria[cat] || 0) + d.valor;
  });

  const listaGastosOrdenados = Object.keys(gastosPorCategoria)
    .map((chave) => ({
      categoria: chave,
      total: gastosPorCategoria[chave],
      cor: coresCategorias[chave] || '#FFC333'
    }))
    .sort((a, b) => b.total - a.total);

  const handleValorChange = (texto: string) => {
    const apenasNumeros = texto.replace(/\D/g, "");
    if (!apenasNumeros) {
      setValorInput("");
      return;
    }
    const valorCentavos = Number.parseInt(apenasNumeros, 10) / 100;
    setValorInput(valorCentavos.toLocaleString("pt-BR", { minimumFractionDigits: 2 }));
  };

  const abrirBloco = (tipo: TipoBloco) => {
    setBlocoAberto(tipo);
    setMostrarMenuMais(false);
  };

  const abrirFormularioCriar = () => {
    setModalCriarAberto(true);
    setMostrarMenuMais(false);
    setDescricao("");
    setValorInput("");
    setDataInicio("");
    setDataFim("");
    setCategoriaSelecionada("Selecionar Categoria");
    setCustomCategoria("");
    setEditandoOutros(false);
    setMostrarListaCategorias(false);
  };

  const salvarNovoItem = () => {
    const valorNumerico = valorInput ? Number.parseFloat(valorInput.replaceAll(".", "").replace(",", ".")) : 0;
    const categoriaFinal = categoriaSelecionada === 'Outros' ? customCategoria : categoriaSelecionada;

    if (blocoAberto === 'pagamento' || blocoAberto === 'registro') {
      const novaMov: Movimentacao = {
        id: String(Date.now()),
        descricao: descricao || `${blocoAberto === 'pagamento' ? 'Pagamento' : 'Registro'} - ${categoriaFinal}`,
        valor: valorNumerico,
        tipo: blocoAberto === 'pagamento' ? 'despesa' : 'receita',
        data: dataInicio || new Date().toLocaleDateString('pt-BR'),
        categoria: categoriaFinal
      };
      setMovimentacoes([...movimentacoes, novaMov]);
    } else if (blocoAberto === 'cobranca') {
      const novaCob: Cobranca = {
        id: String(Date.now()),
        descricao: descricao || `Cobrança - ${categoriaFinal}`,
        valor: valorNumerico,
        paga: false,
        data: dataInicio
      };
      setCobrancas([...cobrancas, novaCob]);
    } else if (blocoAberto === 'investimento') {
      const novoCof: Cofrinho = {
        id: String(Date.now()),
        nome: descricao || `Investimento - ${categoriaFinal}`,
        valorMeta: valorNumerico,
        valorAtual: valorNumerico,
      };
      setCofrinhos([...cofrinhos, novoCof]);
    }

    setModalCriarAberto(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.textoHeader}>
          <Text style={styles.bemVindo}>Olá, {nomeUsuario}! 👋</Text>
          <Text style={styles.subtitulo}>Bem-vindo(a) ao Fynix</Text>
        </View>
        <Image source={require("../assets/images/phoenix-mascot.png")} style={styles.mascote} />
      </View>

      <TouchableOpacity style={styles.saldoCard} onPress={() => router.push("/alterar-saldo")} activeOpacity={0.8}>
        <View style={styles.saldoHeaderRow}>
          <Text style={styles.saldoLabel}>Saldo disponível</Text>
          <TouchableOpacity onPress={(e) => { e.stopPropagation(); setSaldoVisivel(!saldoVisivel); }} style={styles.olhoBotao}>
            <Text style={{ fontSize: 18, color: '#FFF' }}>{saldoVisivel ? "👁️" : "🙈"}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.saldoValor}>
          {saldoVisivel ? `R$ ${saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "*****"}
        </Text>
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        <TouchableOpacity style={styles.smallCard} onPress={() => abrirBloco('investimento')}>
          <Text style={styles.smallTitle}>Investimentos</Text>
          <Text style={styles.smallValue}>{cofrinhos.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallCard} onPress={() => abrirBloco('cobranca')}>
          <Text style={styles.smallTitle}>Cobranças</Text>
          <Text style={styles.smallValue}>{cobrancas.length}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity style={styles.smallCard} onPress={() => abrirBloco('pagamento')}>
          <Text style={styles.smallTitle}>Pagamentos</Text>
          <Text style={styles.smallValue}>{movimentacoes.filter(m => m.tipo === 'despesa').length}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallCard} onPress={() => abrirBloco('registro')}>
          <Text style={styles.smallTitle}>Registros</Text>
          <Text style={styles.smallValue}>{movimentacoes.length}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Gastos do Mês</Text>
      <View style={styles.resumoCard}>
        {listaGastosOrdenados.length === 0 ? (
          <Text style={{ color: '#666', textAlign: 'center' }}>Nenhum gasto categorizado este mês.</Text>
        ) : (
          listaGastosOrdenados.map((item) => (
            <View key={item.categoria} style={styles.gastoLinhaHome}>
              <View style={[styles.indicadorCor, { backgroundColor: item.cor }]} />
              <Text style={styles.gastoTextoHome}>{item.categoria}:</Text>
              <Text style={styles.gastoValorHome}>R$ {item.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Text>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.botao} onPress={() => setMostrarDetalhes(!mostrarDetalhes)}>
        <Text style={styles.botaoTexto}>{mostrarDetalhes ? "Ocultar detalhes" : "Ver detalhes"}</Text>
      </TouchableOpacity>

      {mostrarDetalhes && (
        <View style={styles.detalhesListaContainer}>
          <Text style={styles.detalhesTituloInterno}>Histórico Detalhado de Gastos</Text>
          {listaGastosOrdenados.length === 0 ? (
            <Text style={{ color: 'gray', textAlign: 'center', padding: 10 }}>Sem dados para exibir.</Text>
          ) : (
            listaGastosOrdenados.map((item, index) => (
              <View key={item.categoria} style={[styles.itemGastoOrdenado, { borderColor: item.cor }]}>
                <Text style={[styles.itemGastoCategoria, { color: item.cor }]}>{index + 1}. {item.categoria}</Text>
                <Text style={styles.itemGastoValorText}>R$ {item.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</Text>
              </View>
            ))
          )}
        </View>
      )}

      <Modal visible={blocoAberto !== null} transparent={true} animationType="fade">
        <View style={styles.modalFundoEscuro}>
          <View style={styles.modalContainerLista}>
            <View style={styles.modalListaHeaderRow}>
              <Text style={styles.modalListaTitulo}>Lista de {blocoAberto}s</Text>
              <TouchableOpacity onPress={() => setBlocoAberto(null)}>
                <Text style={styles.botaoFecharLista}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.corpoListaContainer}>
              {listaVazia ? (
                <Text style={styles.textoListaEmBreve}>Em breve.</Text>
              ) : (
                <ScrollView style={{ width: '100%' }}>
                  {listaDoBloco().map((item: any) => (
                    <View key={item.id} style={styles.itemCardLista}>
                      <Text style={styles.itemCardTitulo}>{item.descricao || item.nome}</Text>
                      <Text style={styles.itemCardValor}>
                        R$ {(item.valor || item.valorAtual || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>

            {mostrarMenuMais && (
              <View style={styles.menuFlutuanteMais}>
                <TouchableOpacity style={styles.opcaoMenuMais} onPress={abrirFormularioCriar}>
                  <Text style={styles.textoOpcaoMenu}>Criar {blocoAberto}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.opcaoMenuMais, listaVazia && styles.opcaoMenuMaisDesativada]} 
                  disabled={listaVazia}
                  onPress={() => alert("Editar lista em breve!")}
                >
                  <Text style={[styles.textoOpcaoMenu, listaVazia && { color: '#AAA' }]}>Editar lista</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity style={styles.botaoMaisPrincipal} onPress={() => setMostrarMenuMais(!mostrarMenuMais)}>
              <Text style={styles.textoBotaoMais}>{mostrarMenuMais ? "✕" : "+"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={modalCriarAberto} transparent={true} animationType="fade">
        <View style={styles.modalFundoEscuro}>
          <View style={styles.modalContainerMaior}>
            <Text style={styles.modalTitulo}>Criar novo item</Text>

            <View style={styles.wrapperSeletorCategoria}>
              <TouchableOpacity style={styles.botaoSelectorCat} onPress={() => setMostrarListaCategorias(!mostrarListaCategorias)}>
                <Text style={styles.botaoSelectorCatTexto}>{categoriaSelecionada}</Text>
              </TouchableOpacity>

              {mostrarListaCategorias && (
                <View style={styles.dropdownCategoriasFlutuante}>
                  {categoriasBase.map((cat) => (
                    <TouchableOpacity key={cat} style={styles.opcaoCategoria} onPress={() => {
                      setCategoriaSelecionada(cat);
                      setMostrarListaCategorias(false);
                      if (cat === 'Outros') {
                        setEditandoOutros(true);
                      } else {
                        setEditandoOutros(false);
                      }
                    }}>
                      <Text style={{ color: '#333', fontSize: 15 }}>{cat}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {editandoOutros && (
              <View style={styles.containerOutrosInput}>
                <TextInput style={styles.inputForm} placeholder="Escreva a nova categoria" value={customCategoria} onChangeText={setCustomCategoria} />
                <View style={styles.rowOutrosBotoes}>
                  <TouchableOpacity style={styles.subBotaoConfirmar} onPress={() => {
                    if (customCategoria.trim()) setCategoriaSelecionada(customCategoria);
                    setEditandoOutros(false);
                  }}>
                    <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Confirmar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.subBotaoCancelar} onPress={() => { setCustomCategoria(""); setCategoriaSelecionada("Selecionar Categoria"); setEditandoOutros(false); }}>
                    <Text style={{ color: '#FF6B00', fontWeight: 'bold' }}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TextInput style={styles.inputForm} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
            <TextInput style={styles.inputForm} placeholder="Valor R$ 0,00" keyboardType="numeric" value={valorInput} onChangeText={handleValorChange} />
            <TextInput style={styles.inputForm} placeholder="Data de início" value={dataInicio} onChangeText={setDataInicio} />
            <TextInput style={styles.inputForm} placeholder="Data de finalização" value={dataFim} onChangeText={setDataFim} />

            <TouchableOpacity style={styles.modalBotaoConfirmar} onPress={salvarNovoItem}>
              <Text style={styles.modalTextoConfirmar}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalBotaoCancelar} onPress={() => setModalCriarAberto(false)}>
              <Text style={styles.modalTextoCancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF", padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10 },
  textoHeader: { flex: 1, marginRight: -40 },
  mascote: { width: 230, height: 230, resizeMode: "contain" },
  bemVindo: { fontSize: 24, fontWeight: "bold", marginBottom: 13 },
  subtitulo: { textAlign: "left", color: "#666", marginBottom: 25 },
  saldoCard: { backgroundColor: "#FF6B00", borderRadius: 15, padding: 25, marginBottom: 20, marginTop: -22 },
  saldoHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  olhoBotao: { padding: 5 },
  saldoLabel: { color: "#FFF", fontSize: 16 },
  saldoValor: { color: "#FFF", fontSize: 32, fontWeight: "bold", marginTop: 5 },
  cardsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  smallCard: { width: "48%", backgroundColor: "#FFF", borderRadius: 12, padding: 15, borderWidth: 1, borderColor: "#EAEAEA" },
  smallTitle: { color: "#666" },
  smallValue: { fontSize: 22, fontWeight: "bold", color: "#FF6B00", marginTop: 8 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginTop: 10, marginBottom: 15 },
  resumoCard: { backgroundColor: "#FFF8F2", padding: 20, borderRadius: 12, marginBottom: 10 },
  gastoLinhaHome: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  indicadorCor: { width: 14, height: 14, borderRadius: 7, marginRight: 10 },
  gastoTextoHome: { fontSize: 16, flex: 1, color: '#333' },
  gastoValorHome: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  botao: { backgroundColor: "#FF6B00", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 10, marginBottom: 15 },
  botaoTexto: { color: "#FFF", fontWeight: "bold" },
  
  detalhesListaContainer: { backgroundColor: '#FAF9F6', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#EAEAEA', marginBottom: 15 },
  detalhesTituloInterno: { fontSize: 16, fontWeight: 'bold', color: '#555', marginBottom: 15, textAlign: 'center' },
  itemGastoOrdenado: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, borderWidth: 1, borderRadius: 8, backgroundColor: '#FFF', marginBottom: 10 },
  itemGastoCategoria: { fontSize: 15, fontWeight: 'bold' },
  itemGastoValorText: { fontSize: 15, fontWeight: '700', color: '#333' },

  modalFundoEscuro: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  modalContainerLista: { width: '100%', height: '65%', backgroundColor: '#FFF', borderRadius: 16, padding: 20, justifyContent: 'space-between' },
  modalListaHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#EEE', paddingBottom: 10 },
  modalListaTitulo: { fontSize: 18, fontWeight: 'bold', color: '#333', textTransform: 'capitalize' },
  botaoFecharLista: { fontSize: 18, color: '#999', fontWeight: 'bold' },
  corpoListaContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', paddingVertical: 15 },
  textoListaEmBreve: { color: 'gray', fontSize: 16, fontWeight: '500' },
  
  botaoMaisPrincipal: { backgroundColor: '#FF6B00', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 10 },
  textoBotaoMais: { color: '#FFF', fontSize: 28, fontWeight: '300' },
  menuFlutuanteMais: { position: 'absolute', bottom: 80, alignSelf: 'center', backgroundColor: '#FFF', borderRadius: 12, borderWidth: 1, borderColor: '#EAEAEA', width: 180, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, zIndex: 999 },
  opcaoMenuMais: { paddingVertical: 14, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  opcaoMenuMaisDesativada: { backgroundColor: '#F9F9F9' },
  textoOpcaoMenu: { color: '#FF6B00', fontWeight: 'bold', fontSize: 14 },

  itemCardLista: { width: '100%', padding: 15, borderWidth: 1, borderColor: '#EEE', borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  itemCardTitulo: { fontSize: 15, color: '#333' },
  itemCardValor: { fontSize: 15, fontWeight: 'bold', color: '#FF6B00' },

  modalContainerMaior: { width: '100%', backgroundColor: '#FFF', borderRadius: 16, padding: 22, zIndex: 1 },
  modalTitulo: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  inputForm: { borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 10, padding: 12, marginBottom: 12, fontSize: 15, color: '#333', backgroundColor: '#FFF' },
  
  wrapperSeletorCategoria: { width: '100%', position: 'relative', zIndex: 999, marginBottom: 12 },
  botaoSelectorCat: { borderWidth: 1, borderColor: '#EAEAEA', backgroundColor: '#FAFAFA', borderRadius: 10, padding: 14 },
  botaoSelectorCatTexto: { color: '#FF6B00', fontWeight: 'bold', fontSize: 15 },
  
  dropdownCategoriasFlutuante: { 
    position: 'absolute', 
    top: 52, 
    left: 0, 
    right: 0, 
    backgroundColor: '#FFF', 
    borderWidth: 1, 
    borderColor: '#EAEAEA', 
    borderRadius: 10, 
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4,
    zIndex: 1000 
  },
  opcaoCategoria: { paddingVertical: 14, paddingHorizontal: 15, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  
  containerOutrosInput: { backgroundColor: '#FFF8F2', padding: 12, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#FFE0CC' },
  rowOutrosBotoes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  subBotaoConfirmar: { backgroundColor: '#FF6B00', padding: 10, borderRadius: 8, flex: 0.48, alignItems: 'center' },
  subBotaoCancelar: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#FF6B00', padding: 10, borderRadius: 8, flex: 0.48, alignItems: 'center' },
  modalBotaoConfirmar: { backgroundColor: "#FF6B00", padding: 15, borderRadius: 12, alignItems: "center", marginTop: 10, marginBottom: 12 },
  modalTextoConfirmar: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  modalBotaoCancelar: { backgroundColor: "#FFFFFF", padding: 15, borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: "#FF6B00" },
  modalTextoCancelar: { color: "#FF6B00", fontSize: 16, fontWeight: "bold" }
});