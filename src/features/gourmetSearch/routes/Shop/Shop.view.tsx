import React from 'react';

import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Avatar, IconButton, Grid, Box, CardActions, Container } from '@mui/material';

import { SuspenseFallback } from '@/components/Elements/SuspenseFallback';
import { Head } from '@/components/Head';

import { ShopPlaceDetailsSupplier } from '../../components/ShopPlaceDetailsSupplier';
import { ShopPlacePhotoList } from '../../components/ShopPlacePhotoList';
import { ShopPlaceReviewList } from '../../components/ShopPlaceReviewList';
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
} from '../../components/shopDetailAssets';
import { FEATURE_CONSTANTS } from '../../constants';
import { isHotpepperGourmetSearchAPISuccessResponse } from '../../types';

import { useLogics } from './Shop.logics';
import {
  StyledShopCard,
  StyledShopCardContent,
  StyledShopCardContentLeft,
  StyledShopCardContentRight,
  StyledShopCardHeader,
  StyledShopCardMedia,
  StyledShopCardMediaCollapse,
  StyledShopCardMediaExpandButton,
  StyledShopCardMediaWrapper,
} from './Shop.styled';

export const ShopView = () => {
  const {
    renderKey,
    gourmetQuery,
    isCardMediaExpanded,
    handleClickToggleExpandCardMedia,
    handleFavoriteClick,
  } = useLogics();

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

  const isShopBudgetVisible =
    shop.budget.name.length > FEATURE_CONSTANTS.SHOP_DETAIL_HIDE_TARGET_STR_LENGTH;

  const isShopDetailMemoVisible =
    shop.shop_detail_memo.length > FEATURE_CONSTANTS.SHOP_DETAIL_HIDE_TARGET_STR_LENGTH;

  const isShopOtherMemoVisible =
    shop.other_memo.length > FEATURE_CONSTANTS.SHOP_DETAIL_HIDE_TARGET_STR_LENGTH &&
    shop.other_memo !== shop.shop_detail_memo;

  // success
  return (
    <React.Fragment key={renderKey}>
      <ShopPlaceDetailsSupplier shop={shop}>
        {(shopPlaceDetails) => (
          <>
            <Head title={shop.name} />
            <Container>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StyledShopCard>
                    <StyledShopCardHeader
                      title={shop.name}
                      subheader={shop.catch !== '' ? shop.catch : shop.genre.catch}
                      avatar={<Avatar alt={shop.name} src={shop.logo_image} />}
                      action={
                        <IconButton size="small" onClick={handleFavoriteClick}>
                          <FavoriteIcon />
                        </IconButton>
                      }
                    />
                    <StyledShopCardMediaWrapper>
                      <StyledShopCardMediaCollapse in={isCardMediaExpanded}>
                        <StyledShopCardMedia
                          src={shop.photo.pc.l}
                          alt={shop.name}
                          isExpanded={isCardMediaExpanded}
                        />
                      </StyledShopCardMediaCollapse>
                      <StyledShopCardMediaExpandButton onClick={handleClickToggleExpandCardMedia}>
                        {isCardMediaExpanded ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
                      </StyledShopCardMediaExpandButton>
                    </StyledShopCardMediaWrapper>
                    <StyledShopCardContent>
                      <Grid container spacing={0}>
                        {/* サムネと基本情報 */}
                        <Grid item xs={12}>
                          {/* Boxを横並びに */}
                          <Box sx={{ display: 'flex' }} gap={2}>
                            {/* Left */}
                            <StyledShopCardContentLeft>
                              <Grid item container xs={12} spacing={0}>
                                {/* サムネイル */}
                                <Grid item xs={12}>
                                  <ShopPhoto shop={shop} />
                                </Grid>
                              </Grid>
                            </StyledShopCardContentLeft>
                            {/* Right */}
                            <StyledShopCardContentRight>
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
                                {isShopBudgetVisible && (
                                  <Grid item xs={12}>
                                    <ShopBudget shop={shop} />
                                  </Grid>
                                )}
                                {/* メモ */}
                                {isShopDetailMemoVisible && (
                                  <Grid item xs={12}>
                                    <ShopDetailMemo shop={shop} />
                                  </Grid>
                                )}
                                {/* その他のメモ */}
                                {isShopOtherMemoVisible && (
                                  <Grid item xs={12}>
                                    <ShopOtherMemo shop={shop} />
                                  </Grid>
                                )}
                                {/* 禁煙 */}
                                <Grid item xs={12}>
                                  <ShopNonSmoking shop={shop} />
                                </Grid>
                              </Grid>
                            </StyledShopCardContentRight>
                          </Box>
                        </Grid>
                      </Grid>
                    </StyledShopCardContent>
                    <CardActions>
                      <NavigateShopUrlButton shop={shop} />
                      <NavigateShopCouponAndMapButton shop={shop} />
                      <Box sx={{ ml: 'auto' }}>
                        <NavigateShopHotpepperUrlButton shop={shop} />
                      </Box>
                    </CardActions>
                  </StyledShopCard>
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
    </React.Fragment>
  );
};
