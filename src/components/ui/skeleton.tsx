import { cn } from "@/lib/utils"

// Define the Skeleton component
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    // Render a div with a pulsing animation to indicate loading
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

// Export the Skeleton component
export { Skeleton }