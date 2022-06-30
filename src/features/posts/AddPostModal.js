import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost } from './postsSlice';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { nanoid } from '@reduxjs/toolkit';

export default function AddPostModal() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const dispatch = useDispatch();

  const onSavePostClicked = async () => {
    if (title && content && addRequestStatus === 'idle') {
      try {
        setAddRequestStatus('pending');
        await dispatch(
          addNewPost({ title, body: content, userId: nanoid() }),
        ).unwrap();
        setTitle('');
        setContent('');
        setOpen(false);
      } catch (err) {
        console.error('Failed to save the post: ', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <>
      <Fab
        color="secondary"
        aria-label="add"
        size="medium"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
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
          <Button onClick={onSavePostClicked}>Save Post</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
