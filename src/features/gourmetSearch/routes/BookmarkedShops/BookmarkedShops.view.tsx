import { useParams } from 'react-router-dom';

import { Container, Grid } from '@mui/material';
import qs from 'qs';

import { Head } from '@/components/Head';

import { BookmarkedShopList } from '../../components/BookmarkedShopList';
import { bookmarkShopsRequestConverter } from '../../types';

import type { GetBookmarkedShopsRequest } from '../../types';

export const BookmarkedShopsView = () => {
  const { userId, searchParams } = useParams();

  const parsedSearchParams: GetBookmarkedShopsRequest | undefined = bookmarkShopsRequestConverter(
    qs.parse(searchParams)
  );

  return (
    <>
      <Head title="Bookmarked Shops" />
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <BookmarkedShopList userId={userId} {...parsedSearchParams} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
