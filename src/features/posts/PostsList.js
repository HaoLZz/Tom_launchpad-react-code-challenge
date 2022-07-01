import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, fetchPosts, deletePostById } from './postsSlice';

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

export default function PostsList() {
  // Lifted searchInput state from PostSearchBar to parent
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const searchResult = useSelector((state) => state.posts.searchResult);
  const searchStatus = useSelector((state) => state.posts.searchStatus);
  const posts = useSelector(selectAllPosts);

  const deletePostHandler = (post) => {
    dispatch(deletePostById(post.id));
  };

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  //   If SearchBar is active, then display searchResult else all posts are shown on the home screen.
  const postsForRender =
    searchStatus === 'succeeded' && searchInput === String(searchResult.id)
      ? [searchResult]
      : posts;

  const renderedPosts = postsForRender.map((post) => (
    <Grid item xs={12} md={4} flexShrink={1} key={post.id}>
      <Paper elevation={3} sx={{ paddingX: 2, paddingY: 1 }}>
        <Box
          sx={{
            display: 'inline-block',
            backgroundColor: 'lightgray',
            marginY: '5px',
            padding: '0.35rem 0.5rem',
            borderRadius: '5px',
          }}
        >
          <Typography
            variant="subtitle2"
            component="span"
            sx={{ textTransform: 'uppercase' }}
          >
            ID#{post.id}
          </Typography>
        </Box>
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
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="secondary text button group"
          >
            <EditPostModal post={post} />
            <Button onClick={() => deletePostHandler(post)}>
              <DeleteIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </Box>
        <Box>
          <Typography
            variant="body1"
            component="p"
            overflow="hidden"
            marginY={1}
          >
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
      <Typography
        variant="h2"
        component="h2"
        marginY={5}
        textTransform="capitalize"
        sx={{
          fontSize: { xs: '1.5rem', md: '2.5rem' },
          fontWeight: '500',
          backgroundImage: 'linear-gradient(to left, #553c9a, #b393d3)',
          color: 'transparent',
          backgroundClip: 'text',
        }}
      >
        A penny for your post
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
