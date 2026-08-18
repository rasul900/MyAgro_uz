"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { easeOut } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
  delay?: number;
};

/** Scroll reveal — visible on first paint; animates only after mount */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
}: RevealProps) {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  const Comp = motion[as];

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: reduce ? 0.2 : 0.55,
        ease: easeOut,
        delay: reduce ? 0 : delay,
      }}
    >
      {children}
    </Comp>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function Stagger({ children, className, stagger = 0.08 }: StaggerProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.04 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      variants={{
        hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{
        duration: reduce ? 0.2 : 0.5,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}
