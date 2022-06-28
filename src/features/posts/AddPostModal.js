import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

export default function AddPostModal() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  return (
    <>
      <Button
        onClick={handleClickOpen}
        endIcon={<AddCircleIcon fontSize="large" />}
      >
        Add post
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add a New Post</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: '100%',
              p: 2,
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="postTitle">Post Title</InputLabel>
              <Input
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChanged}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="dense"
                id="postContent"
                label="Post Content"
                type="text"
                value={content}
                fullWidth
                variant="outlined"
                multiline
                rows={5}
                onChange={onContentChanged}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Save Post</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
