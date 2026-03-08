import { useState, useCallback } from "react";
import { ShoppingCart } from "lucide-react";
import { burgers, drinks, type MenuItem } from "@/lib/menu-data";
import MenuCard from "@/components/MenuCard";
import CartModal, { type CartItem } from "@/components/CartModal";

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev.map((c) => c.id === id ? { ...c, quantity: Math.max(1, c.quantity + delta) } : c)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Header */}
      <header className="flex flex-col items-center gap-3 py-10">
        {/* 🔄 Troque o logo: substitua /placeholder.svg pelo caminho da sua imagem */}
        <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-primary shadow-[var(--neon-shadow)]">
          <img src="/placeholder.svg" alt="Logo Burger Arena" className="h-full w-full object-cover" />
        </div>
        <h1 className="font-display text-3xl font-black uppercase tracking-widest text-primary md:text-4xl">
          Burger Arena
        </h1>
        <p className="text-sm text-muted-foreground">Level up no sabor 🎮</p>
      </header>

      {/* Menu Grid */}
      <main className="mx-auto max-w-5xl px-4 pb-24 space-y-12">
        {/* Seção Lanches */}
        <section>
          <h2 className="mb-6 text-center font-display text-xl font-bold uppercase tracking-wider text-foreground">
            🍔 Lanches
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {burgers.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
        </section>

        {/* Seção Bebidas */}
        <section>
          <h2 className="mb-6 text-center font-display text-xl font-bold uppercase tracking-wider text-foreground">
            🥤 Bebidas
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {drinks.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
        </section>
      </main>

      {/* Floating Cart Button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--neon-shadow-lg)] transition-transform hover:scale-110"
        aria-label="Abrir carrinho"
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </div>
  );
};

export default Index;
