import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Drawer.stylex';
import { Typography } from '../Typography';
import { IconButton } from '../IconButton';
import { mergeStyles } from '../../utils/mergeStyles';

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

export interface DrawerContentProps extends Dialog.DialogContentProps {
  /** The position the drawer slides in from. Defaults to 'right'. */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** The size (width for horizontal, height for vertical) of the drawer. Defaults to 'small'. */
  size?: 'small' | 'medium' | 'large';
  stylex?: stylex.StyleXStyles;
  overlayStylex?: stylex.StyleXStyles;
  /** @deprecated use overlayStylex */
  overlayStyle?: stylex.StyleXStyles;
}

export const DrawerContent = React.forwardRef<HTMLDivElement, DrawerContentProps>(
  ({ children, position = 'right', size = 'small', stylex: stylexProp, overlayStylex, overlayStyle, className, style, ...props }, ref) => {
    const isHorizontal = position === 'left' || position === 'right';
    const sizeStyle = isHorizontal
      ? (size === 'large' ? styles.sizeLargeHorizontal : size === 'medium' ? styles.sizeMediumHorizontal : styles.sizeSmallHorizontal)
      : (size === 'large' ? styles.sizeLargeVertical : size === 'medium' ? styles.sizeMediumVertical : styles.sizeSmallVertical);

    const positionStyle = 
      position === 'left' ? styles.positionLeft :
      position === 'right' ? styles.positionRight :
      position === 'top' ? styles.positionTop :
      styles.positionBottom;

    const finalOverlayStylex = overlayStylex ?? overlayStyle;

    return (
      <Dialog.Portal>
        <Dialog.Overlay {...stylex.props(styles.overlay, finalOverlayStylex)} />
        <Dialog.Content
          ref={ref}
          {...props}
          {...mergeStyles(
            stylex.props(
              styles.content,
              positionStyle,
              sizeStyle,
              stylexProp
            ),
            className,
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

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
}

export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.header, stylexProp), className, style)}
      >
        {children}
      </div>
    );
  }
);
DrawerHeader.displayName = 'Drawer.Header';

export interface DrawerTitleProps extends Dialog.DialogTitleProps {
  stylex?: stylex.StyleXStyles;
}

export const DrawerTitle = React.forwardRef<HTMLHeadingElement, DrawerTitleProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <Dialog.Title asChild ref={ref} {...props}>
        <Typography variant="h3" stylex={stylexProp} className={className} style={style}>
          {children}
        </Typography>
      </Dialog.Title>
    );
  }
);
DrawerTitle.displayName = 'Drawer.Title';

export interface DrawerDescriptionProps extends Dialog.DialogDescriptionProps {
  stylex?: stylex.StyleXStyles;
}

export const DrawerDescription = React.forwardRef<HTMLParagraphElement, DrawerDescriptionProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <Dialog.Description asChild ref={ref} {...props}>
        <Typography variant="bodyMd" color="weak" stylex={stylexProp} className={className} style={style}>
          {children}
        </Typography>
      </Dialog.Description>
    );
  }
);
DrawerDescription.displayName = 'Drawer.Description';

export interface DrawerCloseButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof IconButton>, 'children'> {
  children?: React.ReactNode;
  stylex?: stylex.StyleXStyles;
}

export const DrawerCloseButton = React.forwardRef<HTMLButtonElement, DrawerCloseButtonProps>(
  ({ 'aria-label': ariaLabel = "Close drawer", stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <Dialog.Close asChild>
        <IconButton 
          ref={ref} 
          type="button"
          aria-label={ariaLabel} 
          variant="tertiary" 
          tone="neutral" 
          size="small" 
          stylex={stylexProp} 
          className={className}
          style={style}
          {...props}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </IconButton>
      </Dialog.Close>
    );
  }
);
DrawerCloseButton.displayName = 'Drawer.CloseButton';

export interface DrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
}

export const DrawerBody = React.forwardRef<HTMLDivElement, DrawerBodyProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.body, stylexProp), className, style)}
      >
        {children}
      </div>
    );
  }
);
DrawerBody.displayName = 'Drawer.Body';

export interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
}

export const DrawerFooter = React.forwardRef<HTMLDivElement, DrawerFooterProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    return (
      <div 
        ref={ref} 
        {...props}
        {...mergeStyles(stylex.props(styles.footer, stylexProp), className, style)}
      >
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
