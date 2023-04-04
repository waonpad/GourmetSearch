import { useState } from 'react';
import { useParams } from 'react-router-dom';

import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Grid,
  Box,
  CardActions,
  CardMedia,
  Collapse,
  Container,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { SuspenseFallback } from '@/components/Elements/SuspenseFallback';
import { Head } from '@/components/Head';
import { appTheme } from '@/styles/Theme';

import { useShop } from '../api/getShop';
import { ShopPlaceDetailsSupplier } from '../components/ShopPlaceDetailsSupplier';
import { ShopPlacePhotoList } from '../components/ShopPlacePhotoList';
import { ShopPlaceReviewList } from '../components/ShopPlaceReviewList';
import {
  ShopGenre,
  ShopAccess,
  ShopAddress,
  ShopBudget,
  ShopDetailMemo,
  ShopOtherMemo,
  ShopPhoto,
  ShopOpen,
  ShopNonSmoking,
  ShopClose,
  NavigateShopUrlButton,
  NavigateShopCouponAndMapButton,
  NavigateShopHotpepperUrlButton,
} from '../components/shopDetailAssets';
import { shopDetailHideTargetStrLength } from '../config';
import { isHotpepperGourmetSearchAPISuccessResponse } from '../types';

export const Shop = () => {
  const { shopId } = useParams();

  const gourmetQuery = useShop({ shopId });

  const [cardMediaIsExpanded, setCardMediaIsExpanded] = useState(false);

  const handleFavoriteClick = () => {
    console.log('handleFavoriteClick', shop.id);
  };

  const handleClickToggleExpandCardMedia = () => {
    setCardMediaIsExpanded(!cardMediaIsExpanded);
  };

  // loading
  if (gourmetQuery.isLoading) {
    return <SuspenseFallback />;
  }

  // error
  if (!gourmetQuery.data || !isHotpepperGourmetSearchAPISuccessResponse(gourmetQuery.data)) {
    return <div>error</div>;
  }

  // cant find shop
  if (!gourmetQuery.data.results.shop[0]) {
    return <div>error</div>;
  }

  const shop = gourmetQuery.data.results.shop[0];

  // success
  return (
    <>
      <ShopPlaceDetailsSupplier shop={shop}>
        {(shopPlaceDetails) => (
          <>
            <Head title={shop.name} />
            <Container>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      [appTheme.breakpoints.down('md')]: {
                        borderRadius: 0,
                      },
                    }}
                  >
                    <CardHeader
                      title={shop.name}
                      titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
                      subheader={shop.catch !== '' ? shop.catch : shop.genre.catch}
                      avatar={<Avatar alt={shop.name} src={shop.logo_image} />}
                      action={
                        <IconButton size="small" onClick={handleFavoriteClick}>
                          <FavoriteIcon />
                        </IconButton>
                      }
                      sx={{
                        [appTheme.breakpoints.down('md')]: {
                          padding: appTheme.spacing(1),
                        },
                      }}
                    />
                    <Box position={'relative'}>
                      <Collapse
                        in={cardMediaIsExpanded}
                        collapsedSize={150}
                        sx={{
                          [appTheme.breakpoints.up('sm')]: {
                            display: 'none',
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={shop.photo.pc.l}
                          alt={shop.name}
                          sx={{
                            [appTheme.breakpoints.up('sm')]: {
                              display: 'none',
                            },
                            transform: cardMediaIsExpanded ? 'translateY(0)' : 'translateY(-50%)',
                            transition: appTheme.transitions.create('transform', {
                              easing: appTheme.transitions.easing.easeInOut,
                              duration: appTheme.transitions.duration.enteringScreen,
                            }),
                          }}
                        />
                      </Collapse>
                      <IconButton
                        size="small"
                        sx={{
                          [appTheme.breakpoints.up('sm')]: {
                            display: 'none',
                          },
                          position: 'absolute',
                          top: appTheme.spacing(1),
                          right: appTheme.spacing(1),
                          color: grey[200],
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          },
                        }}
                        onClick={handleClickToggleExpandCardMedia}
                      >
                        {cardMediaIsExpanded ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
                      </IconButton>
                    </Box>
                    <CardContent sx={{ py: 0, [appTheme.breakpoints.down('md')]: { px: 1 } }}>
                      <Grid container spacing={0}>
                        {/* サムネと基本情報 */}
                        <Grid item xs={12}>
                          {/* Boxを横並びに */}
                          <Box sx={{ display: 'flex' }} gap={2}>
                            {/* Left */}
                            <Box
                              sx={{
                                width: 'fit-content',
                                [appTheme.breakpoints.down('sm')]: { display: 'none' },
                              }}
                            >
                              <Grid item container xs={12} spacing={0}>
                                {/* サムネイル */}
                                <Grid item xs={12}>
                                  <ShopPhoto shop={shop} />
                                </Grid>
                              </Grid>
                            </Box>
                            {/* Right */}
                            <Box sx={{ [appTheme.breakpoints.down('sm')]: { pt: 2 } }}>
                              <Grid item container xs={12} spacing={1.5}>
                                {/* ジャンル */}
                                <Grid item xs={12}>
                                  <ShopGenre shop={shop} />
                                </Grid>
                                {/* 住所 */}
                                <Grid item xs={12}>
                                  <ShopAddress shop={shop} />
                                </Grid>
                                {/* アクセス */}
                                <Grid item xs={12}>
                                  <ShopAccess shop={shop} />
                                </Grid>
                                {/* 営業日 */}
                                <Grid item xs={12}>
                                  <ShopOpen shop={shop} />
                                </Grid>
                                {/* 休業日 */}
                                <Grid item xs={12}>
                                  <ShopClose shop={shop} />
                                </Grid>
                                {/* 予算 */}
                                {shop.budget.name.length > shopDetailHideTargetStrLength && (
                                  <Grid item xs={12}>
                                    <ShopBudget shop={shop} />
                                  </Grid>
                                )}
                                {/* メモ */}
                                {shop.shop_detail_memo.length > shopDetailHideTargetStrLength && (
                                  <Grid item xs={12}>
                                    <ShopDetailMemo shop={shop} />
                                  </Grid>
                                )}
                                {/* その他のメモ */}
                                {shop.other_memo.length > shopDetailHideTargetStrLength &&
                                  shop.other_memo !== shop.shop_detail_memo && (
                                    <Grid item xs={12}>
                                      <ShopOtherMemo shop={shop} />
                                    </Grid>
                                  )}
                                {/* 禁煙 */}
                                <Grid item xs={12}>
                                  <ShopNonSmoking shop={shop} />
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <NavigateShopUrlButton shop={shop} />
                      <NavigateShopCouponAndMapButton shop={shop} />
                      <Box sx={{ ml: 'auto' }}>
                        <NavigateShopHotpepperUrlButton shop={shop} />
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12}>
                  <ShopPlacePhotoList
                    photos={shopPlaceDetails?.placeDetails.data?.photos}
                    queryStatus={shopPlaceDetails}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ShopPlaceReviewList
                    // shop={shop}
                    reviews={shopPlaceDetails?.placeDetails.data?.reviews}
                    queryStatus={shopPlaceDetails}
                  />
                </Grid>
              </Grid>
            </Container>
          </>
        )}
      </ShopPlaceDetailsSupplier>
    </>
  );
};
