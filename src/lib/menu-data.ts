// =============================================
// 🍔 DADOS DO CARDÁPIO — EDITE AQUI!
// Para trocar as imagens, substitua os caminhos
// abaixo por suas próprias imagens em src/assets/
// Exemplo: import burger1 from "@/assets/burger1.png"
// =============================================

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // Troque por import de imagem local se preferir
}

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Smash Classic",
    description: "Blend bovino, cheddar, bacon crocante e molho da casa",
    price: 28.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
  },
  {
    id: "2",
    name: "Double Kill",
    description: "Dois blends, queijo duplo, cebola caramelizada",
    price: 34.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
  },
  {
    id: "3",
    name: "Headshot Bacon",
    description: "Blend artesanal, bacon defumado, alface e tomate",
    price: 32.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
  },
  {
    id: "4",
    name: "Combo GG",
    description: "Triple smash, 3 queijos, molho especial e picles",
    price: 42.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
  },
  {
    id: "5",
    name: "Veggie Quest",
    description: "Hambúrguer de grão-de-bico, rúcula e molho tahine",
    price: 29.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
  },
  {
    id: "6",
    name: "Chicken Winner",
    description: "Frango crocante, coleslaw e maionese sriracha",
    price: 30.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
  },
];
