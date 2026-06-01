import React, { createContext, useContext, useMemo, useState } from "react";

export type Movimentacao = {
  id: string;
  descricao: string;
  valor: number;
  tipo: "despesa" | "receita";
  data: string;
  categoria: string;
};

export type Cobranca = {
  id: string;
  descricao: string;
  valor: number;
  paga: boolean;
  data: string;
};

export type Cofrinho = {
  id: string;
  nome: string;
  valorMeta: number;
  valorAtual: number;
};

type FynixContextType = {
  saldo: number;
  setSaldo: (valor: number) => void;
  movimentacoes: Movimentacao[];
  setMovimentacoes: React.Dispatch<React.SetStateAction<Movimentacao[]>>;
  cobrancas: Cobranca[];
  setCobrancas: React.Dispatch<React.SetStateAction<Cobranca[]>>;
  cofrinhos: Cofrinho[];
  setCofrinhos: React.Dispatch<React.SetStateAction<Cofrinho[]>>;
};

const FynixContext = createContext<FynixContextType | undefined>(undefined);

export const FynixProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [saldo, setSaldo] = useState<number>(0);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [cobrancas, setCobrancas] = useState<Cobranca[]>([]);
  const [cofrinhos, setCofrinhos] = useState<Cofrinho[]>([]);

  const value = useMemo(
    () => ({
      saldo,
      setSaldo,
      movimentacoes,
      setMovimentacoes,
      cobrancas,
      setCobrancas,
      cofrinhos,
      setCofrinhos,
    }),
    [saldo, movimentacoes, cobrancas, cofrinhos],
  );

  return (
    <FynixContext.Provider value={value}>{children}</FynixContext.Provider>
  );
};

export const useFynix = () => {
  const context = useContext(FynixContext);
  if (!context) {
    throw new Error("useFynix deve ser usado dentro de um FynixProvider");
  }
  return context;
};
