import React, { useState, useRef, useEffect } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const tooltipVariants = cva(
  "absolute z-50 px-3 py-1.5 text-xs font-medium rounded-md shadow-md transition-all duration-200 pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        dark: "bg-slate-900 text-white border border-slate-700",
        light: "bg-white text-gray-900 border border-gray-200 shadow-lg",
        primary: "bg-indigo-600 text-white",
        outline: "bg-slate-900/90 text-white backdrop-blur-sm border border-slate-700",
      },
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
    },
    defaultVariants: {
      variant: "dark",
      position: "top",
    },
  }
);

const arrowVariants = cva("absolute w-0 h-0 border-4 border-transparent", {
  variants: {
    position: {
      top: "top-full left-1/2 -translate-x-1/2",
      bottom: "bottom-full left-1/2 -translate-x-1/2",
      left: "left-full top-1/2 -translate-y-1/2",
      right: "right-full top-1/2 -translate-y-1/2",
    },
  },
  defaultVariants: {
    position: "top",
  },
});

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
  VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  delay?: number;
  showArrow?: boolean;
  isVisible?: boolean;
  children: React.ReactNode;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      variant = "dark",
      position = "top",
      delay = 0,
      showArrow = true,
      isVisible: controlledIsVisible,
      className,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showTooltip = () => {
      if (delay > 0) {
        timeoutRef.current = setTimeout(() => {
          setVisible(true);
        }, delay);
      } else {
        setVisible(true);
      }
    };

    const hideTooltip = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setVisible(false);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const isShown = controlledIsVisible !== undefined ? controlledIsVisible : visible;

    const getArrowClass = () => {
      if (position === "top") {
        if (variant === "light") return "border-t-white";
        if (variant === "primary") return "border-t-indigo-600";
        return "border-t-slate-900";
      }
      if (position === "bottom") {
        if (variant === "light") return "border-b-white";
        if (variant === "primary") return "border-b-indigo-600";
        return "border-b-slate-900";
      }
      if (position === "left") {
        if (variant === "light") return "border-l-white";
        if (variant === "primary") return "border-l-indigo-600";
        return "border-l-slate-900";
      }
      if (position === "right") {
        if (variant === "light") return "border-r-white";
        if (variant === "primary") return "border-r-indigo-600";
        return "border-r-slate-900";
      }
      return "";
    };

    return (
      <div
        className="relative inline-flex items-center justify-center"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
      >
        {children}
        {isShown && (
          <div
            ref={ref}
            role="tooltip"
            className={cn(
              tooltipVariants({ variant, position }),
              "animate-fadeIn opacity-100 scale-100 transition-all duration-150",
              className
            )}
            {...props}
          >
            {content}
            {showArrow && (
              <span
                className={cn(
                  arrowVariants({ position }),
                  getArrowClass()
                )}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip, tooltipVariants };
