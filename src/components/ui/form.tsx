// 'use client';

// import * as React from 'react';
// import * as LabelPrimitive from '@radix-ui/react-label';
// import { useField, useFormikContext, Field } from 'formik';
// import { Slot } from '@radix-ui/react-slot';

// import { cn } from '@/lib/utils';
// import { Label } from '@/components/ui/label';

// // FormFieldContext to pass name to other components
// const FormFieldContext = React.createContext<{ name: string } | undefined>(
//   undefined
// );

// const FormField = ({
//   name,
//   children
// }: {
//   name: string;
//   children: React.ReactNode;
// }) => {
//   return (
//     <FormFieldContext.Provider value={{ name }}>
//       {children}
//     </FormFieldContext.Provider>
//   );
// };

// const useFormField = () => {
//   const fieldContext = React.useContext(FormFieldContext);
//   const itemContext = React.useContext(FormItemContext);
//   const [field, meta] = useField(fieldContext?.name || '');

//   if (!fieldContext) {
//     throw new Error('useFormField should be used within <FormField>');
//   }

//   const { id } = itemContext;

//   return {
//     id,
//     name: fieldContext.name,
//     formItemId: `${id}-form-item`,
//     formDescriptionId: `${id}-form-item-description`,
//     formMessageId: `${id}-form-item-message`,
//     error: meta.touched && meta.error ? meta.error : null,
//     ...field
//   };
// };

// type FormItemContextValue = {
//   id: string;
// };

// const FormItemContext = React.createContext<FormItemContextValue>(
//   {} as FormItemContextValue
// );

// const FormItem = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => {
//   const id = React.useId();

//   return (
//     <FormItemContext.Provider value={{ id }}>
//       <div ref={ref} className={cn('space-y-2', className)} {...props} />
//     </FormItemContext.Provider>
//   );
// });
// FormItem.displayName = 'FormItem';

// const FormLabel = React.forwardRef<
//   React.ElementRef<typeof LabelPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
// >(({ className, ...props }, ref) => {
//   const { error, formItemId } = useFormField();

//   return (
//     <Label
//       ref={ref}
//       className={cn(error && 'text-destructive', className)}
//       htmlFor={formItemId}
//       {...props}
//     />
//   );
// });
// FormLabel.displayName = 'FormLabel';

// const FormControl = React.forwardRef<
//   React.ElementRef<typeof Slot>,
//   React.ComponentPropsWithoutRef<typeof Slot>
// >(({ ...props }, ref) => {
//   const { error, formItemId, formDescriptionId, formMessageId } =
//     useFormField();

//   return (
//     <Slot
//       ref={ref}
//       id={formItemId}
//       aria-describedby={
//         !error
//           ? `${formDescriptionId}`
//           : `${formDescriptionId} ${formMessageId}`
//       }
//       aria-invalid={!!error}
//       {...props}
//     />
//   );
// });
// FormControl.displayName = 'FormControl';

// const FormDescription = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLAttributes<HTMLParagraphElement>
// >(({ className, ...props }, ref) => {
//   const { formDescriptionId } = useFormField();

//   return (
//     <p
//       ref={ref}
//       id={formDescriptionId}
//       className={cn('text-[0.8rem] text-muted-foreground', className)}
//       {...props}
//     />
//   );
// });
// FormDescription.displayName = 'FormDescription';

// const FormMessage = React.forwardRef<
//   HTMLParagraphElement,
//   React.HTMLAttributes<HTMLParagraphElement>
// >(({ className, children, ...props }, ref) => {
//   const { error, formMessageId } = useFormField();
//   const body = error ? String(error) : children;

//   if (!body) {
//     return null;
//   }

//   return (
//     <p
//       ref={ref}
//       id={formMessageId}
//       className={cn('text-[0.8rem] font-medium text-destructive', className)}
//       {...props}
//     >
//       {body}
//     </p>
//   );
// });
// FormMessage.displayName = 'FormMessage';

// export {
//   FormField,
//   useFormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormDescription,
//   FormMessage
// };
