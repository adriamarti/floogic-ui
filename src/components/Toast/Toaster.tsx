import React from 'react';
import { useToast } from './useToast';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastPosition,
} from './Toast';

import { Alert } from '../Alert';

export interface ToasterProps {
  position?: ToastPosition;
}

export function Toaster({ position: positionProp }: ToasterProps = {}) {
  const { toasts } = useToast();
  const position = positionProp || toasts[0]?.position || 'bottom-right';

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, tone, position: _pos, ...props }) {
        return (
          <Toast key={id} {...props} tone={tone}>
            <Alert.Content>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
              {action && (
                <Alert.Actions>
                  <ToastAction asChild altText="Goto action">{action}</ToastAction>
                </Alert.Actions>
              )}
            </Alert.Content>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport position={position} />
    </ToastProvider>
  );
}
