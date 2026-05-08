"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // 组件挂载后立即更新状态，避免 hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted || !resolvedTheme) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 text-foreground/60 hover:text-foreground hover:bg-secondary/50"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="h-9 w-9 text-foreground/60 hover:text-foreground hover:bg-secondary/50"
          >
            {isDark ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isDark ? "深色模式" : "浅色模式"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
