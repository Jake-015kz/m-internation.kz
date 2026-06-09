import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = "" }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={cn("flex flex-col gap-0", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="border-b border-[var(--border-subtle)] md:border-b-0"
        >
          <button
            className="flex items-center justify-between w-full py-4 cursor-pointer select-none md:pb-3 md:cursor-default md:mb-3"
            onClick={() => toggleItem(item.id)}
            aria-expanded={openId === item.id}
          >
            <span className="font-body font-semibold text-sm text-[var(--fg-primary)] uppercase tracking-[0.04em] md:mb-2">
              {item.title}
            </span>
            <ChevronDown
              size={18}
              className={cn(
                "w-6 h-6 text-[var(--fg-muted)] transition-transform duration-250 md:hidden",
                openId === item.id && "rotate-180",
              )}
            />
          </button>
          <div
            className={cn(
              "hidden flex-col gap-2 pb-4 md:flex md:pb-0",
              openId === item.id && "flex",
            )}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
