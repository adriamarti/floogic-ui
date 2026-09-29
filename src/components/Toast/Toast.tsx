import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import * as ToastPrimitive from '@radix-ui/react-toast';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Toast.stylex';
import { Alert, AlertProps } from '../Alert';

export type ToastActionElement = React.ReactElement<typeof ToastPrimitive.Action>;

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export const ToastProvider = ToastPrimitive.Provider;

export interface ToastViewportProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>, 'className' | 'style'> {
  position?: ToastPosition;
  style?: stylex.StyleXStyles;
}

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  ToastViewportProps
>(({ position = 'bottom-right', style, ...props }, ref) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const positionStyle =
    position === 'top-left' ? styles.positionTopLeft :
    position === 'top-center' ? styles.positionTopCenter :
    position === 'top-right' ? styles.positionTopRight :
    position === 'bottom-left' ? styles.positionBottomLeft :
    position === 'bottom-center' ? styles.positionBottomCenter :
    styles.positionBottomRight;

  const resolved = stylex.props(styles.viewport, positionStyle, style);

  const content = (
    <ToastPrimitive.Viewport
      ref={ref}
      className={resolved.className}
      style={resolved.style}
      {...props}
    />
  );

  if (!mounted) return null;

  return createPortal(content, document.body);
});
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

export interface ToastProps extends Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>, 'className' | 'style'> {
  tone?: AlertProps['tone'];
  style?: stylex.StyleXStyles;
}

const ToastRoot = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ style, tone = 'neutral', children, ...props }, ref) => {
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
        <Alert tone={tone} layout="horizontal">
          {children}
        </Alert>
      </li>
    </ToastPrimitive.Root>
  );
});
ToastRoot.displayName = ToastPrimitive.Root.displayName;

export interface ToastTitleProps extends Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>, 'style'> {
  style?: stylex.StyleXStyles;
}

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  ToastTitleProps
>(({ children, style, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} asChild {...props}>
    <Alert.Heading style={style}>{children}</Alert.Heading>
  </ToastPrimitive.Title>
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

export interface ToastDescriptionProps extends Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>, 'style'> {
  style?: stylex.StyleXStyles;
}

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  ToastDescriptionProps
>(({ children, style, ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} asChild {...props}>
    <Alert.Description style={style}>{children}</Alert.Description>
  </ToastPrimitive.Description>
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

export const ToastAction = ToastPrimitive.Action;

export interface ToastCloseProps extends Omit<React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>, 'style'> {
  style?: stylex.StyleXStyles;
}

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  ToastCloseProps
>(({ style, ...props }, ref) => (
  <ToastPrimitive.Close ref={ref} asChild {...props}>
    <Alert.CloseButton aria-label="Dismiss toast" style={style} />
  </ToastPrimitive.Close>
));
ToastClose.displayName = ToastPrimitive.Close.displayName;

export const Toast = Object.assign(ToastRoot, {
  Provider: ToastProvider,
  Viewport: ToastViewport,
  Title: ToastTitle,
  Description: ToastDescription,
  Action: ToastAction,
  Close: ToastClose,
});
