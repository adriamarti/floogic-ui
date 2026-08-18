import React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Toast.stylex';
import { Alert, AlertProps } from '../Alert';



export type ToastActionElement = React.ReactElement<typeof ToastPrimitive.Action>;

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>, 'className' | 'style'> & { style?: stylex.StyleXStyles }
>(({ style, ...props  }, ref) => {
  const resolved = stylex.props(styles.viewport, style);
  return (
    <ToastPrimitive.Viewport
      ref={ref}
      className={resolved.className}
      style={resolved.style}
      {...props}
    />
  );
});
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

export type ToastProps = Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>, 'className' | 'style'> & {
  tone?: AlertProps['tone'];
  style?: stylex.StyleXStyles;
};

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ style, tone = 'neutral', children, ...props  }, ref) => {
  const resolved = stylex.props(styles.root, style);
  return (
    <ToastPrimitive.Root
      ref={ref}
      className={resolved.className}
      style={resolved.style}
      {...props}
      asChild
    >
      <li className={stylex.props(styles.listItem).className} style={stylex.props(styles.listItem).style}>
        <Alert tone={tone} layout="horizontal" size="small">
          {children}
        </Alert>
      </li>
    </ToastPrimitive.Root>
  );
});
Toast.displayName = ToastPrimitive.Root.displayName;

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ children, ...props  }, ref) => (
  <ToastPrimitive.Title ref={ref} asChild {...props}>
    <Alert.Heading>{children}</Alert.Heading>
  </ToastPrimitive.Title>
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ children, ...props  }, ref) => (
  <ToastPrimitive.Description ref={ref} asChild {...props}>
    <Alert.Description>{children}</Alert.Description>
  </ToastPrimitive.Description>
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

export const ToastAction = ToastPrimitive.Action;

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ ...props  }, ref) => (
  <ToastPrimitive.Close ref={ref} asChild {...props}>
    <Alert.CloseButton aria-label="Dismiss toast" />
  </ToastPrimitive.Close>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;
