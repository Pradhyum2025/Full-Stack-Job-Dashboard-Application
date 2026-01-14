import * as React from "react"
import { useFormContext } from "react-hook-form"
import { cn } from "../../lib/utils"
import { Label } from "./label"

const Form = ({ ...props }) => <form {...props} />

const FormField = ({ name, render }) => {
  const { register, formState: { errors } } = useFormContext()
  return render({ field: { ...register(name) }, fieldState: { error: errors[name] } })
}

const FormItem = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
))
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ className, ...props }, ref) => (
  <Label ref={ref} className={cn("", className)} {...props} />
))
FormLabel.displayName = "FormLabel"

const FormControl = ({ ...props }) => <div {...props} />

const FormDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(({ className, children, ...props }, ref) => {
  if (!children) return null
  return (
    <p ref={ref} className={cn("text-sm font-medium text-destructive", className)} {...props}>
      {children}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage }

