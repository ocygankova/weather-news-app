import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getNews, updatePageNumber } from 'redux/actions/news';
import {
  Backdrop,
  Box,
  Chip,
  CircularProgress,
  Grid,
  Link,
  Pagination,
  Stack,
  Typography
} from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { v4 as uuidv4 } from 'uuid';

import { MainContextPaper } from 'components';
import { nyTimesUrl } from 'utils/url';
import { IArticle } from 'models';

function News() {
  const dispatch = useAppDispatch();
  const { news, isLoading, errorMessage, page, pagesQuantity } = useAppSelector(
    (state) => state.news
  );

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  useEffect(() => {
    dispatch(updatePageNumber(1));
  }, []);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    dispatch(updatePageNumber(value));
    dispatch(getNews(value));
  };

  const renderContent = () => {
    return errorMessage ? (
      <Typography>{errorMessage}</Typography>
    ) : (
      <>
        <Stack spacing={2} component="section" mb={4}>
          {news.map(({ headline, multimedia, web_url, section_name, abstract }: IArticle) => (
            <MainContextPaper key={uuidv4()}>
              <Grid container spacing={2} p={2}>
                <Grid item md={3} sm={4} width="100%" container justifyContent="center">
                  {multimedia[1]?.url && (
                    <img
                      src={`${nyTimesUrl}${multimedia[41].url}`}
                      alt={headline.print_headline}
                      style={{
                        width: '100%',
                        maxWidth: '380px',
                        height: '180px',
                        objectFit: 'cover'
                      }}
                    />
                  )}
                </Grid>
                <Grid item md={9} sm={8}>
                  <Typography variant="subtitle1" mb={2}>
                    {headline.main}
                  </Typography>
                  <Typography mb={2}>{abstract}</Typography>

                  <Stack
                    direction="row"
                    spacing={1}
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
            </MainContextPaper>
          ))}
        </Stack>

        <Stack justifyContent="center">
          <Pagination
            count={pagesQuantity}
            page={page}
            onChange={handleChange}
            color="primary"
            sx={{ mx: 'auto' }}
            hidePrevButton
            hideNextButton
          />
        </Stack>
      </>
    );
  };

  return (
    <Box pt={6}>
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
