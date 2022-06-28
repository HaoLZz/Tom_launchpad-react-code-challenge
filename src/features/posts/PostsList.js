import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, fetchPosts } from './postsSlice';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';

import AddPostModal from './AddPostModal';
import EditPostModal from './EditPostModal';
import { Spinner } from '../../components/Spinner';
import PostSearchBar from './PostSearchBar';

const PostControlsButtonGroup = ({ post }) => {
  return (
    <ButtonGroup
      variant="text"
      color="primary"
      aria-label="secondary text button group"
    >
      <EditPostModal post={post} />
      <Button>
        <DeleteIcon fontSize="small" />
      </Button>
    </ButtonGroup>
  );
};

export default function PostsList() {
  // Lifted searchInput state from PostSearchBar to parent
  const [searchInput, setSearchInput] = useState('');
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const renderedPosts = posts.map((post) => (
    <Grid item xs={12} md={4} flexShrink={1} key={post.id}>
      <Paper elevation={3} sx={{ paddingX: 2, paddingY: 1 }}>
        <Box
          marginBottom={2}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" component="h3" noWrap>
            {post.title}
          </Typography>
          <PostControlsButtonGroup post={post} />
        </Box>
        <Box marginBottom={1}>
          <Typography variant="subtitle1" component="span">
            Post ID#: {post.id}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" component="p" overflow="hidden">
            {post.body}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  ));

  let contentToRender;

  if (postStatus === 'loading') {
    contentToRender = <Spinner text="Loading ..." />;
  } else if (postStatus === 'failed') {
    contentToRender = <div>{error}</div>;
  } else if (postStatus === 'succeeded') {
    contentToRender = renderedPosts;
  }

  return (
    <>
      <Typography variant="h2" component="h2" marginY={5}>
        Posts
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '25px',
        }}
      >
        <PostSearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <AddPostModal />
      </Box>
      <Grid container spacing={5}>
        {contentToRender}
      </Grid>
    </>
  );
}
