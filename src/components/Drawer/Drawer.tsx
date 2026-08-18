import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Drawer.stylex';
import { Typography } from '../Typography';
import { IconButton } from '../IconButton';

export interface DrawerProps extends Dialog.DialogProps {
  /** If true, the drawer is rendered open. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
}

const DrawerRoot = ({ open, onOpenChange, children, ...props }: DrawerProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} {...props}>
      {children}
    </Dialog.Root>
  );
};
DrawerRoot.displayName = 'Drawer';

export const DrawerTrigger = Dialog.Trigger;

export interface DrawerContentProps extends Omit<Dialog.DialogContentProps, 'style'> {
  /** The position the drawer slides in from. Defaults to 'right'. */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** The size (width for horizontal, height for vertical) of the drawer. Defaults to 'small'. */
  size?: 'small' | 'medium' | 'large';
  style?: stylex.StyleXStyles;
  overlayStyle?: stylex.StyleXStyles;
}

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ children, position = 'right', size = 'small', style, overlayStyle, ...props }, ref) => {
    
    const isHorizontal = position === 'left' || position === 'right';
    const sizeStyle = isHorizontal
      ? (size === 'large' ? styles.sizeLargeHorizontal : size === 'medium' ? styles.sizeMediumHorizontal : styles.sizeSmallHorizontal)
      : (size === 'large' ? styles.sizeLargeVertical : size === 'medium' ? styles.sizeMediumVertical : styles.sizeSmallVertical);

    const positionStyle = 
      position === 'left' ? styles.positionLeft :
      position === 'right' ? styles.positionRight :
      position === 'top' ? styles.positionTop :
      styles.positionBottom;

    return (
      <Dialog.Portal>
        <Dialog.Overlay {...stylex.props(styles.overlay, overlayStyle)} />
        <Dialog.Content
          ref={ref}
          {...props}
          {...stylex.props(
            styles.content,
            positionStyle,
            sizeStyle,
            style
          )}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    );
  }
);
DrawerContent.displayName = 'Drawer.Content';

export interface DrawerHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  style?: stylex.StyleXStyles;
}

export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <div ref={ref} {...props} {...stylex.props(styles.header, style)}>
        {children}
      </div>
    );
  }
);
DrawerHeader.displayName = 'Drawer.Header';

export interface DrawerTitleProps extends Omit<Dialog.DialogTitleProps, 'style'> {
  style?: stylex.StyleXStyles;
}

export const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <Dialog.Title asChild ref={ref} {...props}>
        <Typography variant="h3" style={style}>
          {children}
        </Typography>
      </Dialog.Title>
    );
  }
);
DrawerTitle.displayName = 'Drawer.Title';

export interface DrawerDescriptionProps extends Omit<Dialog.DialogDescriptionProps, 'style'> {
  style?: stylex.StyleXStyles;
}

export const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <Dialog.Description asChild ref={ref} {...props}>
        <Typography variant="body" color="weak" style={style}>
          {children}
        </Typography>
      </Dialog.Description>
    );
  }
);
DrawerDescription.displayName = 'Drawer.Description';

export interface DrawerCloseButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof IconButton>, 'style' | 'children'> {
  children?: React.ReactNode;
  style?: stylex.StyleXStyles;
}


export const DrawerCloseButton = React.forwardRef<HTMLButtonElement, DrawerCloseButtonProps>(
  ({ 'aria-label': ariaLabel = "Close drawer", style, ...props }, ref) => {
    return (
      <Dialog.Close asChild>
        <IconButton ref={ref} aria-label={ariaLabel} variant="tertiary" tone="neutral" size="small" style={style} {...props}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </IconButton>
      </Dialog.Close>
    );
  }
);
DrawerCloseButton.displayName = 'Drawer.CloseButton';

export interface DrawerBodyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  style?: stylex.StyleXStyles;
}

export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <div ref={ref} {...props} {...stylex.props(styles.body, style)}>
        {children}
      </div>
    );
  }
);
DrawerBody.displayName = 'Drawer.Body';

export interface DrawerFooterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  style?: stylex.StyleXStyles;
}

export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <div ref={ref} {...props} {...stylex.props(styles.footer, style)}>
        {children}
      </div>
    );
  }
);
DrawerFooter.displayName = 'Drawer.Footer';

export const Drawer = Object.assign(DrawerRoot, {
  Trigger: DrawerTrigger,
  Content: DrawerContent,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  CloseButton: DrawerCloseButton,
  Body: DrawerBody,
  Footer: DrawerFooter,
});
