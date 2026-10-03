import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import * as ToastPrimitive from '@radix-ui/react-toast';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Toast.stylex';
import { Alert, AlertProps } from '../Alert';
import { mergeStyles } from '../../utils/mergeStyles';

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
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {
  position?: ToastPosition;
  stylex?: stylex.StyleXStyles;
}

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  ToastViewportProps
>(({ position = 'bottom-right', stylex: stylexProp, className, style, ...props }, ref) => {
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

  const content = (
    <ToastPrimitive.Viewport
      ref={ref}
      {...props}
      {...mergeStyles(stylex.props(styles.viewport, positionStyle, stylexProp), className, style)}
    />
  );

  if (!mounted) return null;

  return createPortal(content, document.body);
});
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

export interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  tone?: AlertProps['tone'];
  stylex?: stylex.StyleXStyles;
}

const ToastRoot = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ stylex: stylexProp, className, style, tone = 'neutral', children, ...props }, ref) => {
  return (
    <ToastPrimitive.Root
      ref={ref}
      asChild
      {...props}
      {...mergeStyles(stylex.props(styles.root, stylexProp), className, style)}
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

export interface ToastTitleProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title> {
  stylex?: stylex.StyleXStyles;
}

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  ToastTitleProps
>(({ children, stylex: stylexProp, className, style, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} asChild {...props}>
    <Alert.Heading stylex={stylexProp} className={className} style={style}>{children}</Alert.Heading>
  </ToastPrimitive.Title>
));
ToastTitle.displayName = ToastPrimitive.Title.displayName;

export interface ToastDescriptionProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description> {
  stylex?: stylex.StyleXStyles;
}

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  ToastDescriptionProps
>(({ children, stylex: stylexProp, className, style, ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} asChild {...props}>
    <Alert.Description stylex={stylexProp} className={className} style={style}>{children}</Alert.Description>
  </ToastPrimitive.Description>
));
ToastDescription.displayName = ToastPrimitive.Description.displayName;

export const ToastAction = ToastPrimitive.Action;

export interface ToastCloseProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close> {
  stylex?: stylex.StyleXStyles;
}

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  ToastCloseProps
>(({ stylex: stylexProp, className, style, ...props }, ref) => (
  <ToastPrimitive.Close ref={ref} asChild {...props}>
    <Alert.CloseButton aria-label="Dismiss toast" stylex={stylexProp} className={className} style={style} />
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
