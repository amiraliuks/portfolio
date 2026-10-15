'use client';

import { motion } from 'framer-motion';

type Tech = {
  icon: React.ReactNode;
  name: string;
  description: string;
};

type TechStackProps = {
  techStack: Tech[];
};

export default function TechStack({ techStack }: TechStackProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {techStack.map((tech, index) => (
        <motion.div
          key={index}
          className="flex cursor-pointer items-center gap-4 rounded-md border border-border/70 bg-neutral-100 p-4 transition-colors duration-300 dark:bg-neutral-900"
          whileHover={{
            scale: 1.02,
            boxShadow:
              '0 8px 24px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(255, 255, 255, 0.08)',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          <div className="shrink-0">{tech.icon}</div>
          <div>
            <h4 className="font-semibold text-foreground">{tech.name}</h4>
            <p className="text-sm text-muted-foreground">
              {tech.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}