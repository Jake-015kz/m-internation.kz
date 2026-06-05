import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Accordion.module.scss";

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
    <div className={`${styles.accordion} ${className}`}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <button
            className={styles.header}
            onClick={() => toggleItem(item.id)}
            aria-expanded={openId === item.id}
          >
            <span className={styles.title}>{item.title}</span>
            <ChevronDown
              size={18}
              className={`${styles.icon} ${openId === item.id ? styles.iconOpen : ""}`}
            />
          </button>
          <div
            className={`${styles.content} ${openId === item.id ? styles.contentOpen : ""}`}
          >
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
}
