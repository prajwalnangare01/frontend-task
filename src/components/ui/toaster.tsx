"use client"

// Import necessary components from the UI library.
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
// Import the custom hook to manage toasts.
import { useToast } from "@/hooks/use-toast"

// Define the Toaster component.
export function Toaster() {
  // Retrieve the list of toasts from the useToast hook.
  const { toasts } = useToast()

  return (
    // The ToastProvider manages the lifecycle of the toasts.
    <ToastProvider>
      {/* Map over the toasts array to render each toast. */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          // Each Toast component is uniquely identified by its id.
          <Toast key={id} {...props}>
            {/* The main content of the toast is organized in a grid. */}
            <div className="grid gap-1">
              {/* If a title is provided, it is rendered in a ToastTitle component. */}
              {title && <ToastTitle>{title}</ToastTitle>}
              {/* If a description is provided, it is rendered in a ToastDescription component. */}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {/* Any additional action (e.g., a button) is rendered here. */}
            {action}
            {/* The ToastClose component provides a button to dismiss the toast. */}
            <ToastClose />
          </Toast>
        )
      })}
      {/* The ToastViewport determines where the toasts will be rendered on the screen. */}
      <ToastViewport />
    </ToastProvider>
  )
}