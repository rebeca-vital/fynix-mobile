import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useFynix } from "./context/fynixContext";

export default function AlterarSaldo() {
  const { saldo, setSaldo } = useFynix();
  const [novoSaldoInput, setNovoSaldoInput] = useState(
    saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
  );
  const router = useRouter();

  const handleSaldoChange = (texto: string) => {
    const apenasNumeros = texto.replace(/\D/g, "");
    if (!apenasNumeros) {
      setNovoSaldoInput("");
      return;
    }
    const valorCentavos = Number.parseInt(apenasNumeros, 10) / 100;
    setNovoSaldoInput(valorCentavos.toLocaleString("pt-BR", { minimumFractionDigits: 2 }));
  };

  const salvarSaldo = () => {
    const valorNumerico = novoSaldoInput
      ? Number.parseFloat(novoSaldoInput.replaceAll(".", "").replace(",", "."))
      : 0;
    setSaldo(valorNumerico);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alterar Saldo</Text>
      
      <View style={styles.caixaValor}>
        <TextInput
          style={styles.textoValor}
          keyboardType="numeric"
          value={novoSaldoInput}
          onChangeText={handleSaldoChange}
          placeholder="R$ 0,00"
        />
      </View>

      <View style={styles.containerBotoes}>
        <TouchableOpacity style={styles.botaoConfirmar} onPress={salvarSaldo}>
          <Text style={styles.textoConfirmar}>Confirmar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCancelar} onPress={() => router.back()}>
          <Text style={styles.textoCancelar}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 40,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  caixaValor: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#FAFAFA',
  },
  textoValor: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  containerBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botaoConfirmar: {
    backgroundColor: '#FF6B00',
    padding: 15,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center',
  },
  textoConfirmar: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoCancelar: {
    borderWidth: 1,
    borderColor: '#FF6B00',
    padding: 15,
    borderRadius: 10,
    flex: 0.48,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  textoCancelar: {
    color: '#FF6B00',
    fontWeight: 'bold',
    fontSize: 16,
  },
});