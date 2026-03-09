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
      style={{
        animationDelay: `${delay}ms`,
        borderColor: "hsl(var(--border))",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "hsl(var(--neon-glow) / 0.5)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "var(--neon-shadow)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "hsl(var(--border))";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
      className={`group rounded-xl border bg-zinc-900 p-3 opacity-0 ${isVisible ? "animate-fade-up" : ""}`}
    >
      <div className="mb-3 aspect-square overflow-hidden rounded-lg bg-zinc-800">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-zinc-100">
        {item.name}
      </h3>
      <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
        {item.description}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span
          className="font-display text-lg font-bold text-primary"
          style={{ textShadow: "var(--neon-shadow)" }}
        >
          R$ {item.price.toFixed(2).replace(".", ",")}
        </span>
        <Button variant="neon" size="sm" onClick={() => onAdd(item)}>
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
    </div>
  );
};

export default MenuCard;
