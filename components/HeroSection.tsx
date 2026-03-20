import React from "react";
import { Button } from "./Button";
import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaAction?: () => void;
}

export function HeroSection({ 
  title = "Welcome to EduFast",
  subtitle = "Your journey to quality education starts here",
  ctaText = "Get Started",
  ctaAction
}: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <Button onClick={ctaAction}>{ctaText}</Button>
      </div>
    </section>
  );
}
