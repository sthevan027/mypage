import {
  ArrowRight,
  ClipboardList,
  ExternalLink,
  FileText,
  Github,
  Globe,
  Instagram,
  Linkedin,
  LucideIcon,
  MessageCircle
} from "lucide-react";

import { IconX } from "@/components/social-brand-icons";
import { LinkCard, LinkCardIconKey } from "@/data/site";
import styles from "@/styles/link-grid.module.css";

const iconMap: Partial<Record<LinkCardIconKey, LucideIcon>> = {
  github: Github,
  fileText: FileText,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: ExternalLink,
  portfolio: Globe,
  whatsapp: MessageCircle,
  form: ClipboardList,
  threads: Globe
};

type LinkGridProps = {
  links: LinkCard[];
};

export function LinkGrid({ links }: LinkGridProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.grid}>
        {links.map((link) => {
          const LeadingIcon = iconMap[link.icon] ?? Globe;
          const isPrimary = link.variant === "primary";
          const isFeatured = link.variant === "featured";
          const cardClass = [styles.card, isPrimary ? styles.cardPrimary : isFeatured ? styles.cardFeatured : styles.cardDefault]
            .filter(Boolean)
            .join(" ");

          return (
            <a key={link.title} className={cardClass} href={link.url} target="_blank" rel="noreferrer">
              <div className={styles.leading}>
                {link.icon === "x" ? (
                  <IconX size={22} />
                ) : link.icon === "threads" ? (
                  <span className={styles.threadsMark} aria-hidden>
                    @
                  </span>
                ) : (
                  <LeadingIcon size={22} strokeWidth={2} aria-hidden />
                )}
              </div>
              <div className={styles.copy}>
                <h3>{link.title}</h3>
                <p>{link.description}</p>
              </div>
              {isPrimary ? (
                <ExternalLink className={styles.trailing} size={18} aria-hidden />
              ) : (
                <ArrowRight className={styles.trailing} size={18} aria-hidden />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
