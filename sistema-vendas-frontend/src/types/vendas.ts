export interface Venda {
  id: number;
  clienteId: number;
  clienteNome: string;
  vendedorId: number;
  vendedorNome: string;
  produtos: { produtoId: number; quantidade: number }[];
  total: number;
  data: string;
}
