import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Github, Linkedin, Mail } from "lucide-react";
import { burgers, drinks, type MenuItem } from "@/lib/menu-data";
import MenuCard from "@/components/MenuCard";
import CartModal, { type CartItem } from "@/components/CartModal";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import logoBurger from "@/assets/LogoBurger.png";
import bgRestaurant from "@/assets/bg-restaurant.png";

const STORAGE_KEY = "burger-arena-cart";

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [badgePulse, setBadgePulse] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing)
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      return [...prev, { ...item, quantity: 1 }];
    });
    setBadgePulse(true);
    setTimeout(() => setBadgePulse(false), 600);
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, quantity: Math.max(1, c.quantity + delta) } : c,
      ),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const burgersReveal = useScrollReveal(0.1);
  const drinksReveal = useScrollReveal(0.1);

  return (
    <div className="min-h-screen bg-zinc-950 font-body text-zinc-100">
      {/* Header */}
      <header
        className="relative flex flex-col items-center gap-3 py-28"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0.92) 100%), url(${bgRestaurant})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="h-40 w-40 overflow-hidden rounded-full border-2 border-primary"
          style={{ boxShadow: "var(--neon-shadow-lg)" }}
        >
          <img
            src={logoBurger}
            alt="Logo Burger Arena"
            className="h-full w-full object-cover"
          />
        </div>
        <h1
          className="font-display text-3xl font-black uppercase tracking-widest text-primary md:text-5xl"
          style={{ textShadow: "var(--neon-shadow)" }}
        >
          Pixel Bytes
        </h1>
        <p className="text-sm text-zinc-500 tracking-widest uppercase font-display">
          SUBA DE NÍVEL NO SABOR!
        </p>
        <div
          className="mt-4 h-px w-32"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--neon-glow) / 0.6), transparent)",
          }}
        />
      </header>

      {/* Menu Grid */}
      <main className="mx-auto max-w-5xl px-4 pb-28 space-y-14">
        {/* Seção Lanches */}
        <section
          ref={burgersReveal.ref}
          style={{
            opacity: burgersReveal.isVisible ? 1 : 0,
            transform: burgersReveal.isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
        >
          <div className="mb-8 flex flex-col items-center gap-2">
            <h2 className="text-center font-display text-xl font-bold uppercase tracking-widest text-zinc-100">
              🍔 Escolha seu Buff 🍔
            </h2>
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--neon-glow) / 0.5), transparent)",
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {burgers.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
        </section>

        {/* Seção Bebidas */}
        <section>
          <div className="mb-8 flex flex-col items-center gap-2">
            <h2 className="text-center font-display text-xl font-bold uppercase tracking-widest text-zinc-100">
              ⚗️ Poções 🧪
            </h2>
            <div
              className="h-px w-16"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(var(--neon-glow) / 0.5), transparent)",
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {drinks.map((item) => (
              <MenuCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="border-t py-12"
        style={{
          borderColor: "hsl(var(--neon-glow) / 0.15)",
          background: "hsl(0 0% 3%)",
        }}
      >
        <div className="mx-auto max-w-5xl px-4 flex flex-col items-center gap-5 text-center">
          <h3
            className="font-display text-lg font-black uppercase tracking-widest text-primary"
            style={{ textShadow: "var(--neon-shadow)" }}
          >
            Pixel Bytes
          </h3>
          <p className="text-sm text-zinc-600 max-w-md leading-relaxed">
            Projeto desenvolvido como parte do meu portfólio. Landing page de
            hamburgueria gamer com React, Tailwind CSS e TypeScript.
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/SEU-USUARIO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 transition-colors hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/SEU-USUARIO"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 transition-colors hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:seu@email.com"
              className="text-zinc-600 transition-colors hover:text-primary"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-zinc-700">
            © {new Date().getFullYear()} Ricardo Madureira. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>

      {/* Floating Cart Button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
        style={{ boxShadow: "var(--neon-shadow-lg)" }}
        aria-label="Abrir carrinho"
      >
        <ShoppingCart className="h-6 w-6" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0 }}
              animate={badgePulse ? { scale: [1, 1.4, 1] } : { scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground"
            >
              {totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Cart Modal */}
      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onClear={clearCart}
      />
    </div>
  );
};

export default Index;
