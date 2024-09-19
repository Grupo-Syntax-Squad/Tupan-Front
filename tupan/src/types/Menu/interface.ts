export interface MenuItem {
    nome: string;
    path: string;
    icone: string;
  }
  
  // Props recebidas pelo MenuLateral
  export interface MenuLateralProps {
    menuData: MenuItem[]; // Lista de itens do menu
  }