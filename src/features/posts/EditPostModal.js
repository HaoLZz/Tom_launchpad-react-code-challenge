import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from './postsSlice';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import EditIcon from '@mui/icons-material/Edit';

export default function EditPostModal({ post }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const [addRequestStatus, setAddRequestStatus] = useState('idle');
  const dispatch = useDispatch();

  const onSavePostClicked = async () => {
    if (title && content && addRequestStatus === 'idle') {
      try {
        setAddRequestStatus('pending');
        await dispatch(
          updatePost({
            id: post.id,
            userId: post.userId,
            title,
            body: content,
          }),
        ).unwrap();
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
      <Button onClick={handleClickOpen}>
        <EditIcon fontSize="small" />
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Edit Post</DialogTitle>
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
