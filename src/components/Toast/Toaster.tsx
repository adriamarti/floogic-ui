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
} from './Toast';

import { Alert } from '../Alert';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, tone, ...props }) {
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
      <ToastViewport />
    </ToastProvider>
  );
}
