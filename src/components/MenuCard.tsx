import type { MenuItem } from "@/lib/menu-data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface MenuCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  delay?: number;
}

const MenuCard = ({ item, onAdd, delay = 0 }: MenuCardProps) => {
  const { ref, isVisible } = useScrollReveal(0.15);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`group rounded-xl border border-border bg-card p-3 transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--neon-shadow)] opacity-0 ${isVisible ? "animate-fade-up" : ""}`}
    >
      {/* 🔄 Troque a imagem editando menu-data.ts */}
      <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-secondary">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground">
        {item.name}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
        {item.description}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-display text-lg font-bold text-primary">
          R$ {item.price.toFixed(2).replace(".", ",")}
        </span>
        <Button variant="neon" size="sm" onClick={() => onAdd(item)}>
          <Plus className="h-4 w-4" />
          Adicionar
        </Button>
      </div>
    </div>
  );
};

export default MenuCard;
