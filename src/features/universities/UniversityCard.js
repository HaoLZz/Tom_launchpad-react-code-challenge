import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import DomainIcon from '@mui/icons-material/Domain';
import { blue } from '@mui/material/colors';

export default function UniversityCard({ university }) {
  return (
    <Card
      sx={{
        position: 'relative',
        minWidth: 275,
        gridColumn: 'span 4',
        marginBottom: { xs: '15px', md: '0' },
      }}
      raised
    >
      <CardContent>
        <Typography
          sx={{ fontSize: '1.25rem' }}
          color="text.secondary"
          gutterBottom
          noWrap
        >
          {university.name}
        </Typography>
        <Avatar
          sx={{
            bgcolor: blue[400],
            width: 35,
            height: 35,
            position: 'absolute',
            bottom: 5,
            right: 5,
          }}
        >
          {university.alpha_two_code}
        </Avatar>
        <Typography variant="h5" component="div" gutterBottom>
          <Box
            sx={{
              display: 'inline-flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: '5px', sm: '12px' },
              flexWrap: 'wrap',
            }}
          >
            {university.web_pages.map((page) => {
              return (
                <Chip
                  key={page}
                  label={page.slice(page.indexOf('.') + 1)}
                  component="a"
                  href={page}
                  size="small"
                  clickable
                />
              );
            })}
          </Box>
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {university['state-province'] || <br />}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {university.country}
        </Typography>
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: '5px', sm: '12px' },
            flexWrap: 'wrap',
          }}
        >
          {university.domains.map((domain) => {
            return (
              <Chip
                key={domain}
                label={domain}
                variant="outlined"
                size="small"
                color="info"
                icon={<DomainIcon />}
              />
            );
          })}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Rate this university</Button>
      </CardActions>
    </Card>
  );
}
