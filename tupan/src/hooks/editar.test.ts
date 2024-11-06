import { renderHook, act } from '@testing-library/react-hooks';  // Funções para testar hooks
import { useEditable } from './editar';  // Caminho para o seu hook

describe("useEditable", () => {
  it("deve retornar um objeto com as propriedades corretas", () => {
    const { result } = renderHook(() => useEditable());
    
    // Verifica se o hook retorna o valor correto
    expect(result.current.isEditable).toBe(true);
    expect(result.current.toggleEdit).toBeInstanceOf(Function);
  });

  it("deve alternar o estado de edição corretamente", () => {
    const { result } = renderHook(() => useEditable());
    
    // Verifica o estado inicial
    expect(result.current.isEditable).toBe(true);

    // Ação: Alterna o estado
    act(() => {
      result.current.toggleEdit();
    });

    // Verifica o estado após a alternância
    expect(result.current.isEditable).toBe(false);

    // Outra ação: Alterna novamente
    act(() => {
      result.current.toggleEdit();
    });

    expect(result.current.isEditable).toBe(true);
  });

  it("deve iniciar com o estado de edição como verdadeiro", () => {
    const { result } = renderHook(() => useEditable());
    
    expect(result.current.isEditable).toBe(true);
  });
});
