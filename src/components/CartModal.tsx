import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, Trash2 } from "lucide-react";
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
}

const CartModal = ({ open, onClose, items, onUpdateQuantity, onRemove }: CartModalProps) => {
  const [name, setName] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);

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
    }
  };

  const handleWhatsApp = () => {
    if (!name.trim()) return;
    const orderLines = items.map(
      (i) => `• ${i.quantity}x ${i.name} — R$ ${(i.price * i.quantity).toFixed(2).replace(".", ",")}`
    );
    const address = street ? `${street}, ${neighborhood}, ${city}` : `CEP: ${cep}`;
    const msg = encodeURIComponent(
      `🍔 *Novo Pedido — Burger Arena*\n\n${orderLines.join("\n")}\n\n💰 *Total: R$ ${total.toFixed(2).replace(".", ",")}*\n\n👤 Nome: ${name}\n📍 Endereço: ${address}`
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-display text-lg font-bold uppercase tracking-wider text-primary">
            Seu Carrinho
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-8">Carrinho vazio</p>
          )}
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-lg bg-secondary p-3">
              <img src={item.image} alt={item.name} className="h-12 w-12 rounded-md object-cover bg-muted" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                <p className="text-xs text-primary font-display">
                  R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => onUpdateQuantity(item.id, -1)} className="rounded bg-muted p-1 text-foreground hover:bg-border">
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-foreground">{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, 1)} className="rounded bg-muted p-1 text-foreground hover:bg-border">
                  <Plus className="h-3 w-3" />
                </button>
                <button onClick={() => onRemove(item.id)} className="ml-1 rounded p-1 text-destructive hover:bg-destructive/20">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-3">
            <div className="flex justify-between font-display text-lg font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-primary">R$ {total.toFixed(2).replace(".", ",")}</span>
            </div>

            <input
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              placeholder="CEP (apenas números)"
              value={cep}
              onChange={(e) => handleCepChange(e.target.value)}
              maxLength={8}
              className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {loadingCep && <p className="text-xs text-primary animate-pulse">Buscando endereço...</p>}
            {street && (
              <p className="text-xs text-muted-foreground">
                📍 {street}, {neighborhood} — {city}
              </p>
            )}

            <Button variant="neon" className="w-full" onClick={handleWhatsApp}>
              Finalizar no WhatsApp
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
