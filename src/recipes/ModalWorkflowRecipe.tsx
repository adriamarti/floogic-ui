import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { 
  Modal, 
  Button, 
  TextInput, 
  TextArea, 
  Toast 
} from '../index';
import { spacing } from '../tokens/spacing.stylex';

const styles = stylex.create({
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.space4,
    marginTop: spacing.space4,
  },
});

export function ModalWorkflowRecipe() {
  const [open, setOpen] = React.useState(false);
  const [toastOpen, setToastOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleSubmit = () => {
    setOpen(false);
    setToastOpen(true);
  };

  return (
    <>
      <Button variant="primary" tone="brand" onClick={() => setOpen(true)}>
        <Button.Label>Create New Project</Button.Label>
      </Button>

      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content size="medium">
          <Modal.Header>
            <Modal.Title>Create New Project</Modal.Title>
            <Modal.CloseButton aria-label="Close modal" />
          </Modal.Header>

          <Modal.Body>
            <Modal.Description>
              Provide the details below to create a new workspace project.
            </Modal.Description>
            <div {...stylex.props(styles.formGroup)}>
              <TextInput>
                <TextInput.Label>Project Title</TextInput.Label>
                <TextInput.Field 
                  placeholder="e.g. Floogic UI Redesign" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </TextInput>
              
              <TextArea>
                <TextArea.Label>Description</TextArea.Label>
                <TextArea.Field 
                  placeholder="Brief summary of project goals..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </TextArea>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" tone="neutral" onClick={() => setOpen(false)}>
              <Button.Label>Cancel</Button.Label>
            </Button>
            <Button variant="primary" tone="brand" onClick={handleSubmit}>
              <Button.Label>Confirm & Create</Button.Label>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Toast open={toastOpen} onOpenChange={setToastOpen}>
        <Toast.Title>Project Created</Toast.Title>
        <Toast.Description>Your new project has been successfully initialized.</Toast.Description>
        <Toast.Close />
      </Toast>
    </>
  );
}
