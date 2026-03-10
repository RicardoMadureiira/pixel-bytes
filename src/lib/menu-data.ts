import burger1 from "@/assets/BurgersWeb/burger1.webp";
import burger2 from "@/assets/BurgersWeb/burger2.webp";
import burger3 from "@/assets/BurgersWeb/burger3.webp";
import burger4 from "@/assets/BurgersWeb/burger4.webp";
import burger5 from "@/assets/BurgersWeb/burger5.webp";
import burger6 from "@/assets/BurgersWeb/burger6.webp";
import burger7 from "@/assets/BurgersWeb/burger7.webp";
import burger8 from "@/assets/BurgersWeb/burger8.webp";

import drink1 from "@/assets/RefrigerantesWEb/cocacola.webp";
import drink2 from "@/assets/RefrigerantesWEb/cocacola0.webp";
import drink3 from "@/assets/RefrigerantesWEb/guarana.webp";
import drink4 from "@/assets/RefrigerantesWEb/sprite.webp";

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
    name: "Power-Up Burger",
    description:
      "Burger artesanal 180g suculento com toque de páprica e pimenta. Molho XP de maionese caseira com alho, páprica, sriracha e limão. ",
    price: 28.9,
    image: burger1,
    category: "burger",
  },
  {
    id: "b2",
    name: "Critical Strike Burger",
    description:
      "O hambúrguer que causa dano massivo! Carne suculenta, queijo cheddar derretido e maionese de mostarda picante. Prepare-se para um ataque direto ao seu paladar!",
    price: 34.9,
    image: burger2,
    category: "burger",
  },
  {
    id: "b3",
    name: "Mage Melt",
    description:
      "Feitiçaria pura com burger 180g, cebola caramelizada, cheddar cremoso e molho secreto encantado.",
    price: 32.9,
    image: burger3,
    category: "burger",
  },
  {
    id: "b4",
    name: "Buff Burger",
    description:
      "+50 de força! Burger duplo, queijo prato, maionese de alho e molho dragão flamejante. Ideal para tanques!",
    price: 42.9,
    image: burger4,
    category: "burger",
  },
  {
    id: "b5",
    name: "XP Bacon",
    description:
      "Ganhe +100 de sabor com esse hambúrguer épico de bacon crocante, queijo prato e maionese da casa. Ideal pra upar seu humor na missão!",
    price: 29.9,
    image: burger5,
    category: "burger",
  },
  {
    id: "b6",
    name: "Mystic Burger",
    description:
      "+40 de inteligência! Receita secreta dos sábios: hambúrguer de grão de bico, tofu selado e molho verde místico. Buff perfeito para mentes brilhantes.",
    price: 30.9,
    image: burger6,
    category: "burger",
  },
  {
    id: "b7",
    name: "Final Boss",
    description:
      "Encare o desafio! Triplo burger, cheddar, bacon, cebola crispy e maionese infernal. Requer coragem (e apetite)!",
    price: 38.9,
    image: burger7,
    category: "burger",
  },
  {
    id: "b8",
    name: "Shadow Cheese",
    description:
      "Cheddar dark, carne defumada e molho sombrio com alho negro. Pra quem curte um mistério no sabor.",
    price: 35.9,
    image: burger8,
    category: "burger",
  },
];

export const drinks: MenuItem[] = [
  {
    id: "d1",
    name: "Coca-Cola - 350ml",
    description:
      "Bebida clássica dos heróis. Efeito imediato: +20 em velocidade e +15 em carisma.",
    price: 5.9,
    image: drink1,
    category: "drink",
  },
  {
    id: "d2",
    name: "Coca Cola - Zero",
    description: "Zero açúcar. Efeito: +10 em agilidade, -5 em culpa.",
    price: 5.9,
    image: drink2,
    category: "drink",
  },
  {
    id: "d3",
    name: "Guaraná - 350ml",
    description:
      "Direto da Amazônia digital. Efeito: +25 em stamina e +10 em vibe tropical.",
    price: 5.9,
    image: drink3,
    category: "drink",
  },
  {
    id: "d4",
    name: "Sprite - 350ml",
    description:
      "Refrescância elemental nível máximo. Efeito: +30 em frescor, chance de crítico contra calor.",
    price: 5.9,
    image: drink4,
    category: "drink",
  },
];
