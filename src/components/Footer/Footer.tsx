import { Box, Container, Link, Stack, Typography } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function Footer() {
  return (
    <Box py={2} component="footer" sx={{ backgroundColor: 'primary.main' }}>
      <Container maxWidth="md">
        <Stack spacing={1}>
          <Typography variant="subtitle2" color="common.white">
            Data sources:
          </Typography>

          <Link
            href="https://openweathermap.org/api"
            target="_blank"
            color="common.white"
            underline="hover">
            <Stack direction="row" spacing={1} alignItems="center">
              <OpenInNewIcon />
              <Typography>Openweathermap API</Typography>
            </Stack>
          </Link>

          <Link
            href="https://developer.nytimes.com/apis"
            target="_blank"
            color="common.white"
            underline="hover">
            <Stack direction="row" spacing={1} alignItems="center">
              <OpenInNewIcon />
              <Typography>NYT Article Search API</Typography>
            </Stack>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
