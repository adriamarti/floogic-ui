import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { 
  Card, 
  Tabs, 
  Switch, 
  TextInput, 
  Avatar, 
  BadgeDot, 
  Button, 
  ButtonGroup, 
  Typography 
} from '../index';
import { colors } from '../tokens/colors.stylex';
import { spacing } from '../tokens/spacing.stylex';
import { shape } from '../tokens/shape.stylex';

const styles = stylex.create({
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: spacing.space6,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.space4,
    marginBottom: spacing.space6,
  },
  card: {
    backgroundColor: colors.backgroundRaised,
    borderRadius: shape.radiusLg,
    padding: spacing.space6,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.space4,
    marginTop: spacing.space4,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: spacing.space6,
  },
});

export function SettingsRecipe() {
  const [emailNotifs, setEmailNotifs] = React.useState(true);
  const [marketingNotifs, setMarketingNotifs] = React.useState(false);

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.header)}>
        <Avatar size="large">
          <Avatar.Fallback>AD</Avatar.Fallback>
          <Avatar.Badge>
            <BadgeDot status="online" />
          </Avatar.Badge>
        </Avatar>
        <div>
          <Typography variant="h2">Account Settings</Typography>
          <Typography variant="body" color="weak">
            Manage your personal details and notifications preferences.
          </Typography>
        </div>
      </div>

      <Card style={styles.card}>
        <Tabs defaultValue="profile">
          <Tabs.List>
            <Tabs.Item value="profile">Profile</Tabs.Item>
            <Tabs.Item value="notifications">Notifications</Tabs.Item>
          </Tabs.List>

          <Tabs.Panel value="profile">
            <div {...stylex.props(styles.section)}>
              <TextInput>
                <TextInput.Label>Display Name</TextInput.Label>
                <TextInput.Field defaultValue="Adria Marti" />
              </TextInput>
              <TextInput>
                <TextInput.Label>Email Address</TextInput.Label>
                <TextInput.Field defaultValue="adria@example.com" />
              </TextInput>
              <TextInput>
                <TextInput.Label>Job Title</TextInput.Label>
                <TextInput.Field defaultValue="Software Engineer" />
              </TextInput>
            </div>
            <div {...stylex.props(styles.actions)}>
              <ButtonGroup>
                <Button variant="secondary" tone="neutral">
                  <Button.Label>Cancel</Button.Label>
                </Button>
                <Button variant="primary" tone="brand">
                  <Button.Label>Save Changes</Button.Label>
                </Button>
              </ButtonGroup>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="notifications">
            <div {...stylex.props(styles.section)}>
              <div {...stylex.props(styles.row)}>
                <div>
                  <Typography variant="h4">Email Notifications</Typography>
                  <Typography variant="caption" color="weak">
                    Receive weekly update digests and alerts.
                  </Typography>
                </div>
                <Switch>
                  <Switch.Field checked={emailNotifs} onCheckedChange={setEmailNotifs} />
                </Switch>
              </div>

              <div {...stylex.props(styles.row)}>
                <div>
                  <Typography variant="h4">Marketing Communications</Typography>
                  <Typography variant="caption" color="weak">
                    Receive news about product releases and events.
                  </Typography>
                </div>
                <Switch>
                  <Switch.Field checked={marketingNotifs} onCheckedChange={setMarketingNotifs} />
                </Switch>
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>
      </Card>
    </div>
  );
}
