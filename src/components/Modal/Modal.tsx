import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as stylex from '@stylexjs/stylex';
import { styles } from './Modal.stylex';
import { Typography } from '../Typography';
import { IconButton } from '../IconButton';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Drawer } from '../Drawer';
import { mergeStyles } from '../../utils/mergeStyles';

export interface ModalProps extends Dialog.DialogProps {
  /** If true, the modal is rendered open. */
  open?: boolean;
  /** Callback when open state changes. */
  onOpenChange?: (open: boolean) => void;
}

const ModalRoot = ({ open, onOpenChange, children, ...props }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} {...props}>
      {children}
    </Dialog.Root>
  );
};
ModalRoot.displayName = 'Modal';

export const ModalTrigger = Dialog.Trigger;

export interface ModalContentProps extends Dialog.DialogContentProps {
  /** The size (width) of the modal on desktop. Defaults to 'medium'. */
  size?: 'small' | 'medium' | 'large';
  stylex?: stylex.StyleXStyles;
  overlayStylex?: stylex.StyleXStyles;
  /** @deprecated use overlayStylex */
  overlayStyle?: stylex.StyleXStyles;
}

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ children, size = 'medium', stylex: stylexProp, overlayStylex, overlayStyle, className, style, ...props }, ref) => {
    const isMobile = useMediaQuery('(max-width: 767px)');
    const finalOverlayStylex = overlayStylex ?? overlayStyle;

    if (isMobile) {
      return (
        <Drawer.Content 
          position="bottom" 
          size="small" 
          stylex={stylexProp} 
          overlayStylex={finalOverlayStylex} 
          className={className}
          style={style}
          {...props} 
          ref={ref}
        >
          {children}
        </Drawer.Content>
      );
    }
    
    const sizeStyle = 
      size === 'large' ? styles.sizeLarge :
      size === 'small' ? styles.sizeSmall :
      styles.sizeMedium;

    return (
      <Dialog.Portal>
        <Dialog.Overlay {...stylex.props(styles.overlay, finalOverlayStylex)} />
        <Dialog.Content
          ref={ref}
          {...props}
          {...mergeStyles(
            stylex.props(
              styles.content,
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
ModalContent.displayName = 'Modal.Content';

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const isMobile = useMediaQuery('(max-width: 767px)');
    
    if (isMobile) {
      return (
        <Drawer.Header stylex={stylexProp} className={className} style={style} {...props} ref={ref}>
          {children}
        </Drawer.Header>
      );
    }

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
ModalHeader.displayName = 'Modal.Header';

export interface ModalTitleProps extends Dialog.DialogTitleProps {
  stylex?: stylex.StyleXStyles;
}

export const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const isMobile = useMediaQuery('(max-width: 767px)');
    
    if (isMobile) {
      return (
        <Drawer.Title stylex={stylexProp} className={className} style={style} {...props} ref={ref}>
          {children}
        </Drawer.Title>
      );
    }

    return (
      <Dialog.Title asChild ref={ref} {...props}>
        <Typography variant="h3" stylex={stylexProp} className={className} style={style}>
          {children}
        </Typography>
      </Dialog.Title>
    );
  }
);
ModalTitle.displayName = 'Modal.Title';

export interface ModalDescriptionProps extends Dialog.DialogDescriptionProps {
  stylex?: stylex.StyleXStyles;
}

export const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const isMobile = useMediaQuery('(max-width: 767px)');

    if (isMobile) {
      return (
        <Drawer.Description stylex={stylexProp} className={className} style={style} {...props} ref={ref}>
          {children}
        </Drawer.Description>
      );
    }

    return (
      <Dialog.Description asChild ref={ref} {...props}>
        <Typography variant="bodyMd" color="weak" stylex={stylexProp} className={className} style={style}>
          {children}
        </Typography>
      </Dialog.Description>
    );
  }
);
ModalDescription.displayName = 'Modal.Description';

export interface ModalCloseButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof IconButton>, 'children'> {
  children?: React.ReactNode;
  stylex?: stylex.StyleXStyles;
}

export const ModalCloseButton = React.forwardRef<HTMLButtonElement, ModalCloseButtonProps>(
  ({ 'aria-label': ariaLabel = "Close modal", stylex: stylexProp, className, style, ...props }, ref) => {
    const isMobile = useMediaQuery('(max-width: 767px)');

    if (isMobile) {
      return (
        <Drawer.CloseButton 
          aria-label={ariaLabel} 
          stylex={stylexProp} 
          className={className}
          style={style}
          {...props} 
          ref={ref} 
        />
      );
    }

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
ModalCloseButton.displayName = 'Modal.CloseButton';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const isMobile = useMediaQuery('(max-width: 767px)');

    if (isMobile) {
      return (
        <Drawer.Body stylex={stylexProp} className={className} style={style} {...props} ref={ref}>
          {children}
        </Drawer.Body>
      );
    }

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
ModalBody.displayName = 'Modal.Body';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  stylex?: stylex.StyleXStyles;
}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, stylex: stylexProp, className, style, ...props }, ref) => {
    const isMobile = useMediaQuery('(max-width: 767px)');

    if (isMobile) {
      return (
        <Drawer.Footer stylex={stylexProp} className={className} style={style} {...props} ref={ref}>
          {children}
        </Drawer.Footer>
      );
    }

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
ModalFooter.displayName = 'Modal.Footer';

export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Header: ModalHeader,
  Title: ModalTitle,
  Description: ModalDescription,
  CloseButton: ModalCloseButton,
  Body: ModalBody,
  Footer: ModalFooter,
});
