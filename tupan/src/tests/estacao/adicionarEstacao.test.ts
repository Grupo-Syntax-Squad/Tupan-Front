import { renderHook, act } from "@testing-library/react";
import { useCreateEstacao } from "../../hooks/estacoes/adicionarEstacao";
import { criarEstacao } from "../../app/_api/post/estacoes";
import { criarEndereco } from "../../app/_api/post/enderecos";
import { useToken } from "../../hooks/token";

jest.mock("../../app/_api/post/estacoes");
jest.mock("../../app/_api/post/enderecos");
jest.mock("../../hooks/token");

describe("useCreateEstacao", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve criar uma estação com sucesso", async () => {
    const mockToken = "token123";
    const mockEndereco = { id: 1 };
    const mockEstacaoCriada = { id: 2, nome: "Estação Teste" };

    (useToken as jest.Mock).mockReturnValue(mockToken);
    (criarEndereco as jest.Mock).mockResolvedValue(mockEndereco);
    (criarEstacao as jest.Mock).mockResolvedValue(mockEstacaoCriada);

    const { result } = renderHook(() => useCreateEstacao());

    await act(async () => {
      const retorno = await result.current.submitEstacao(
        {
          nome: "Estação Teste",
          topico: "topico/teste",
          ativo: true,
          parametros: [1, 2],
        },
        {
          logradouro: "Rua Teste",
          bairro: "Bairro Teste",
          cidade: "Cidade Teste",
          estado: "Estado Teste",
          numero: "123",
          complemento: "Apto 1",
          cep: "12345-678",
          latitude: "10.0000",
          longitude: "20.0000",
        }
      );

      expect(retorno).toEqual(mockEstacaoCriada);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.success).toBe("Estação criada com sucesso!");
    expect(criarEndereco).toHaveBeenCalledWith(expect.any(Object), mockToken);
    expect(criarEstacao).toHaveBeenCalledWith(
      expect.objectContaining({ endereco: mockEndereco.id }),
      mockToken
    );
  });

  it("deve tratar erro ao criar endereço", async () => {
    const mockToken = "token123";
    const mockError = new Error("Erro ao criar endereço");

    (useToken as jest.Mock).mockReturnValue(mockToken);
    (criarEndereco as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useCreateEstacao());

    await act(async () => {
      await result.current.submitEstacao(
        {
          nome: "Estação Teste",
          topico: "topico/teste",
          ativo: true,
          parametros: [1, 2],
        },
        {
          logradouro: "Rua Teste",
          bairro: "Bairro Teste",
          cidade: "Cidade Teste",
          estado: "Estado Teste",
          numero: "123",
          complemento: "Apto 1",
          cep: "12345-678",
          latitude: "10.0000",
          longitude: "20.0000",
        }
      );
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Erro ao criar endereço");
    expect(result.current.success).toBe(null);
    expect(criarEndereco).toHaveBeenCalledWith(expect.any(Object), mockToken);
    expect(criarEstacao).not.toHaveBeenCalled();
  });

  it("deve tratar erro ao criar estação", async () => {
    const mockToken = "token123";
    const mockEndereco = { id: 1 };
    const mockError = new Error("Erro ao criar estação");

    (useToken as jest.Mock).mockReturnValue(mockToken);
    (criarEndereco as jest.Mock).mockResolvedValue(mockEndereco);
    (criarEstacao as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useCreateEstacao());

    await act(async () => {
      await result.current.submitEstacao(
        {
          nome: "Estação Teste",
          topico: "topico/teste",
          ativo: true,
          parametros: [1, 2],
        },
        {
          logradouro: "Rua Teste",
          bairro: "Bairro Teste",
          cidade: "Cidade Teste",
          estado: "Estado Teste",
          numero: "123",
          complemento: "Apto 1",
          cep: "12345-678",
          latitude: "10.0000",
          longitude: "20.0000",
        }
      );
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Erro ao criar estação");
    expect(result.current.success).toBe(null);
    expect(criarEndereco).toHaveBeenCalledWith(expect.any(Object), mockToken);
    expect(criarEstacao).toHaveBeenCalledWith(
      expect.objectContaining({ endereco: mockEndereco.id }),
      mockToken
    );
  });
});
