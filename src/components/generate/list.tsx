"use client";

import { motion } from "framer-motion";

const expertise = [
  {
    name: "React",
    description: "Build modern UIs with component-based architecture",
  },
  {
    name: "TypeScript",
    description: "Type-safe JavaScript for scalable applications",
  },
  {
    name: "Next.js",
    description: "Full-stack React framework with SSR and routing",
  },
  {
    name: "Node.js",
    description: "Server-side JavaScript runtime environment",
  },
  {
    name: "Python",
    description: "Versatile language for web, data, and AI",
  },
  {
    name: "FastAPI",
    description: "Modern Python web framework for APIs",
  },
  {
    name: "Vue.js",
    description: "Progressive framework for building UIs",
  },
  {
    name: "Go",
    description: "Efficient compiled language for backends",
  },
  {
    name: "Rust",
    description: "Memory-safe systems programming language",
  },
  {
    name: "PostgreSQL",
    description: "Advanced open source relational database",
  },
];

export function GenerateList() {
  const itemWidth = 200 + 16;
  const itemCount = expertise.length;
  const animationDistance = -(itemWidth * itemCount);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative mt-8 overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4 py-2"
        animate={{
          x: [0, animationDistance],
        }}
        transition={{
          duration: 70,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...expertise, ...expertise, ...expertise].map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex-shrink-0 px-4 py-3 border border-border rounded-lg bg-card/50 min-w-[200px]"
          >
            <p className="text-sm font-medium mb-1">{item.name}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
