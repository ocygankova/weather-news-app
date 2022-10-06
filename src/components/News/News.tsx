import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getNews } from 'redux/actions/news';
import {
  Backdrop,
  Box,
  Chip,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography
} from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { v4 as uuidv4 } from 'uuid';

import { ResponsivePaper } from 'components/common';
import { nyTimesUrl } from 'utils/url';
import { IArticle } from 'models';

function News() {
  const dispatch = useAppDispatch();
  const { news, isLoading, errorMessage } = useAppSelector((state) => state.news);

  useEffect(() => {
    dispatch(getNews());
  }, []);

  const renderContent = () => {
    return errorMessage ? (
      <Typography>{errorMessage}</Typography>
    ) : (
      <Stack spacing={2} maxWidth="md" component="section" mx="auto" mb={4}>
        {news.map(({ headline, multimedia, web_url, section_name, abstract }: IArticle) => (
          <ResponsivePaper key={uuidv4()}>
            <Grid container spacing={2} p={2}>
              <Grid item md={3} sm={6} width="100%">
                <img
                  src={`${nyTimesUrl}${multimedia[1].url}`}
                  alt={headline.print_headline}
                  style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                />
              </Grid>
              <Grid item md={9} sm={6}>
                <Typography variant="subtitle1" mb={2}>
                  {headline.main}
                </Typography>
                <Typography mb={2}>{abstract}</Typography>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  maxWidth="400px">
                  <Chip label={section_name} variant="outlined" color="secondary" />
                  <Link href={web_url} target="_blank" underline="hover" color="primary.light">
                    <Stack direction="row" spacing={0.5}>
                      <NewspaperIcon />
                      <Typography variant="subtitle2" component="span">
                        Visit Web Source
                      </Typography>
                    </Stack>
                  </Link>
                </Stack>
              </Grid>
            </Grid>
          </ResponsivePaper>
        ))}
      </Stack>
    );
  };

  return (
    <Box pt={{ xs: 1, sm: 6 }}>
      {isLoading ? (
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        renderContent()
      )}
    </Box>
  );
}

export default News;
