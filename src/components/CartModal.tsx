import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Minus, Plus, Trash2, ShoppingBag, Zap, MapPin } from "lucide-react";
import type { MenuItem } from "@/lib/menu-data";

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

const CartModal = ({
  open,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onClear,
}: CartModalProps) => {
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [number, setNumber] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCepChange = async (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    setCep(cleaned);
    if (cleaned.length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setStreet(data.logradouro || "");
          setNeighborhood(data.bairro || "");
          setCity(`${data.localidade} - ${data.uf}`);
        }
      } catch {
        // silently fail
      } finally {
        setLoadingCep(false);
      }
    } else {
      setStreet("");
      setNeighborhood("");
      setCity("");
    }
  };

  const handleFinalize = () => {
    if (!name.trim() || !cep || !number.trim()) return;
    setSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    onClear();
    onClose();
    setName("");
    setCep("");
    setStreet("");
    setNeighborhood("");
    setCity("");
    setNumber("");
  };

  const canFinalize =
    name.trim() && cep.length === 8 && number.trim() && street;

  const addressLine = street
    ? `${street}, ${number} — ${neighborhood}, ${city}`
    : "";

  return (
    <>
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent
          side="right"
          className="flex w-full max-w-md flex-col gap-0 border-l border-border bg-zinc-950 p-0 text-foreground"
          style={{
            borderLeft: "1px solid hsl(var(--neon-glow) / 0.3)",
            boxShadow: "-4px 0 40px hsl(var(--neon-glow) / 0.08)",
          }}
        >
          {/* Header */}
          <SheetHeader className="border-b border-zinc-800 px-5 py-4">
            <SheetTitle className="flex items-center gap-2 font-display text-lg font-black uppercase tracking-widest text-primary">
              <ShoppingBag className="h-5 w-5" />
              Seu Carrinho
            </SheetTitle>
          </SheetHeader>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
            {items.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-zinc-600">
                <ShoppingBag className="h-12 w-12 opacity-30" />
                <p className="font-display text-sm uppercase tracking-wider">
                  Carrinho vazio
                </p>
              </div>
            )}
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40, height: 0, marginBottom: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded-lg object-cover bg-zinc-800"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-100 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs font-display font-bold text-primary">
                      R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="rounded-md bg-zinc-800 p-1.5 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-zinc-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="rounded-md bg-zinc-800 p-1.5 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100 transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-1 rounded-md p-1.5 text-destructive hover:bg-destructive/20 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout */}
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t border-zinc-800 px-4 py-4 space-y-3"
            >
              {/* Total */}
              <div className="flex justify-between items-center font-display">
                <span className="text-sm uppercase tracking-wider text-zinc-400">
                  Total
                </span>
                <span
                  className="text-xl font-black text-primary"
                  style={{ textShadow: "var(--neon-shadow)" }}
                >
                  R$ {total.toFixed(2).replace(".", ",")}
                </span>
              </div>

              {/* Form */}
              <div className="space-y-2">
                <input
                  placeholder="Jogador                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
                <input
                  placeholder="CEP 
value={cep}
                  onChange={(e) => handleCepChange(e.target.value)}
                  maxLength={8}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                />
                {loadingCep && (
                  <p className="text-xs text-primary animate-pulse flex items-center gap-1">
                    <Zap className="h-3 w-3" /> Buscando endereço...
                  </p>
                )}
                {street && (
                  <>
                    <div className="flex items-start gap-1.5 text-xs text-zinc-400">
                      <MapPin className="h-3 w-3 mt-0.5 shrink-0 text-primary" />
                      <span>
                        {street}, {neighborhood} — {city}
                      </span>
                    </div>
                    <input
                      placeholder="Número"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </>
                )}
              </div>

              <Button
                variant="neon"
                className="w-full"
                disabled={!canFinalize}
                onClick={handleFinalize}
              >
                Finalizar Pedido
              </Button>
            </motion.div>
          )}
        </SheetContent>
      </Sheet>

      {/* Level Up Success Dialog */}
      <Dialog open={successOpen} onOpenChange={(v) => !v && handleSuccessClose()}>
        <DialogContent
          className="max-w-sm border-2 bg-zinc-950 text-center"
          style={{
            borderColor: "hsl(var(--neon-glow) / 0.5)",
            boxShadow:
              "0 0 30px hsl(var(--neon-glow) / 0.2), 0 0 80px hsl(var(--neon-glow) / 0.08)",
          }}
        >
          <DialogHeader className="items-center gap-3">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="text-5xl"
            >
              🏆
            </motion.div>
            <DialogTitle className="font-display text-xl font-black uppercase tracking-widest text-primary">
              Level Up!
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-sm leading-relaxed">
              Missão iniciada! Seus burgers serão dropados em:
            </DialogDescription>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-semibold text-zinc-100 text-center"
          >
            <MapPin className="inline h-4 w-4 text-primary mr-1 -mt-0.5" />
            {addressLine}
          </motion.div>

          <div className="text-xs text-zinc-600">
            Nome: <span classNaJogadortext-zinc-400 font-semibold">{name}</span>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-400/80">
            ⚠️ Esta compra é apenas uma demonstração. Projeto de portfólio.
          </div>

          <Button variant="neon" className="w-full mt-1" onClick={handleSuccessClose}>
            ✓ Confirmar Missão
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartModal;
