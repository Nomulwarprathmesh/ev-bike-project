import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-2xl border border-gray-200 bg-white/90 px-3 py-1 text-base transition-all outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-900 placeholder:text-gray-400 focus-visible:border-gray-300 focus-visible:ring-2 focus-visible:ring-gray-200/50 focus-visible:bg-white disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50 aria-invalid:border-gray-300 aria-invalid:ring-2 aria-invalid:ring-gray-200/50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Input }
