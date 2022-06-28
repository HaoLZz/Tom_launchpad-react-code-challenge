import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Spinner = ({ text }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        minWidth: '300px',
        margin: '0 auto',
        height: '60vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress color="secondary" size="8rem" />
      {text}
    </Box>
  );
};
