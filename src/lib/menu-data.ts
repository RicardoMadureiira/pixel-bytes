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
  image: string;
  category: "burger" | "drink";
}

export const burgers: MenuItem[] = [
  {
    id: "b1",
    name: "Smash Classic",
    description: "Blend bovino, cheddar, bacon crocante e molho da casa",
    price: 28.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
    category: "burger",
  },
  {
    id: "b2",
    name: "Double Kill",
    description: "Dois blends, queijo duplo, cebola caramelizada",
    price: 34.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
    category: "burger",
  },
  {
    id: "b3",
    name: "Headshot Bacon",
    description: "Blend artesanal, bacon defumado, alface e tomate",
    price: 32.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
    category: "burger",
  },
  {
    id: "b4",
    name: "Combo GG",
    description: "Triple smash, 3 queijos, molho especial e picles",
    price: 42.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
    category: "burger",
  },
  {
    id: "b5",
    name: "Veggie Quest",
    description: "Hambúrguer de grão-de-bico, rúcula e molho tahine",
    price: 29.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
    category: "burger",
  },
  {
    id: "b6",
    name: "Chicken Winner",
    description: "Frango crocante, coleslaw e maionese sriracha",
    price: 30.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
    category: "burger",
  },
  {
    id: "b7",
    name: "Boss Burger",
    description: "Blend angus, queijo brie, cebola roxa e rúcula",
    price: 38.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
    category: "burger",
  },
  {
    id: "b8",
    name: "Rage Quit",
    description: "Blend picante, pimenta jalapeño, pepper jack e sriracha",
    price: 35.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
    category: "burger",
  },
];

export const drinks: MenuItem[] = [
  {
    id: "d1",
    name: "Coca-Cola",
    description: "Lata 350ml gelada",
    price: 7.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
    category: "drink",
  },
  {
    id: "d2",
    name: "Guaraná",
    description: "Lata 350ml gelada",
    price: 7.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
    category: "drink",
  },
  {
    id: "d3",
    name: "Sprite",
    description: "Lata 350ml gelada",
    price: 7.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
    category: "drink",
  },
  {
    id: "d4",
    name: "Suco Natural",
    description: "Laranja ou limão — 300ml",
    price: 9.9,
    image: "/placeholder.svg", // 🔄 Troque pela sua imagem
    category: "drink",
  },
];
