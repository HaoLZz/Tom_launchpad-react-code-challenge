import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPostModal from './AddPostModal';

const PostControlsButtonGroup = () => {
  return (
    <ButtonGroup
      variant="text"
      color="secondary"
      aria-label="secondary text button group"
    >
      <Button>
        <EditIcon fontSize="small" />
      </Button>
      <Button>
        <DeleteIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
};

export const PostsList = () => {
  const posts = useSelector((state) => state.posts);

  const renderedPosts = posts.map((post) => (
    <Grid item xs={12} md={4} key={post.id}>
      <Paper elevation={3} sx={{ paddingX: 2, paddingY: 1 }}>
        <Box
          marginBottom={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" component="h3">
            {post.title}
          </Typography>
          <PostControlsButtonGroup />
        </Box>
        <Box marginBottom={1}>
          <Typography variant="subtitle1" component="span">
            Post ID#: {post.id}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" component="p">
            {/* Show an excerpt of the post's content */}
            {post.body.substring(0, 100)}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  ));

  return (
    <>
      <Typography variant="h2" component="h2" marginY={5}>
        Posts
      </Typography>
      <Box textAlign="right" marginBottom={2}>
        <AddPostModal />
      </Box>
      <Grid container spacing={5}>
        {renderedPosts}
      </Grid>
    </>
  );
};
