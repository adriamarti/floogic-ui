import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { 
  Card, 
  TextInput, 
  Button, 
  Alert, 
  Typography 
} from '../index';
import { colors } from '../tokens/colors.stylex';
import { spacing } from '../tokens/spacing.stylex';
import { shape } from '../tokens/shape.stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: colors.backgroundBase,
    padding: spacing.space4,
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: colors.backgroundRaised,
    borderRadius: shape.radiusLg,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.space4,
    marginTop: spacing.space4,
  },
  footerText: {
    textAlign: 'center',
    marginTop: spacing.space4,
  },
  alert: {
    marginTop: spacing.space4,
  },
});

export interface AuthRecipeProps {
  onLogin?: (email: string) => void;
}

/**
 * AuthRecipe
 *
 * A pre-assembled Authentication Form recipe using Floogic UI components.
 */
export function AuthRecipe({ onLogin }: AuthRecipeProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    onLogin?.(email);
  };

  return (
    <div {...stylex.props(styles.container)}>
      <Card style={styles.card}>
        <Card.Content>
          <Card.Heading>
            <Typography variant="h2">Sign in to Floogic</Typography>
          </Card.Heading>
          <Card.Description>
            Enter your email and password to access your account.
          </Card.Description>

          {error && (
            <Alert tone="error" style={styles.alert}>
              <Alert.Icon />
              <Alert.Heading>Authentication Error</Alert.Heading>
              <Alert.Description>{error}</Alert.Description>
            </Alert>
          )}

          <form onSubmit={handleSubmit} {...stylex.props(styles.form)}>
            <TextInput required>
              <TextInput.Label>Email Address</TextInput.Label>
              <TextInput.Field 
                type="email" 
                placeholder="user@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </TextInput>

            <TextInput required>
              <TextInput.Label>Password</TextInput.Label>
              <TextInput.Field 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </TextInput>

            <Button variant="primary" tone="brand" size="large" type="submit">
              <Button.Label>Sign In</Button.Label>
            </Button>
          </form>

          <div {...stylex.props(styles.footerText)}>
            <Typography variant="captionMd" color="weak">
              Don't have an account? Contact your administrator.
            </Typography>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
