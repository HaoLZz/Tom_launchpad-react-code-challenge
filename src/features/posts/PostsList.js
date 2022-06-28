import React from 'react';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const PostsList = () => {
  const posts = useSelector((state) => state.posts);

  const renderedPosts = posts.map((post) => (
    <Grid item xs={12} md={4} key={post.id}>
      <Paper elevation={3} sx={{ paddingX: 2, paddingY: 1 }}>
        <Box marginBottom={2}>
          <Typography variant="h5" component="h3">
            {post.title}
          </Typography>
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
      <Grid container spacing={5}>
        {renderedPosts}
      </Grid>
    </>
  );
};
