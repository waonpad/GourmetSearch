import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Avatar, Grid, Box, CardActions, useMediaQuery } from '@mui/material';

import { FEATURE_CONSTANTS } from '../../constants';
import {
  ShopGenre,
  ShopAccess,
  ShopBudget,
  ShopDetailMemo,
  ShopOtherMemo,
  ShopPhoto,
  ShopOpen,
  ShopNonSmoking,
  ShopClose,
  NavigateShopUrlButton,
  NavigateShopCouponAndMapButton,
  NavigateShopDetailButton,
  BookmarkShopButton,
} from '../shopDetailAssets';

import { CONSTANTS } from './ShopListItem.constants';
import { useLogics } from './ShopListItem.logics';
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
} from './ShopListItem.styled';

import type { ShopListItemProps } from './ShopListItem.types';

export const ShopListItemView = ({ shop }: ShopListItemProps) => {
  const { isCardMediaExpanded, handleClickToggleExpandCardMedia } = useLogics();

  const isActionButtonLabelShort = useMediaQuery(
    `(min-width:${CONSTANTS.ACTION_BUTTON_LABEL_SHORTEN_TARGET_BREAKPOINT})`
  );

  const isShopBudgetVisible =
    shop.budget.name.length > FEATURE_CONSTANTS.SHOP_DETAIL_HIDE_TARGET_STR_LENGTH;

  const isShopDetailMemoVisible =
    shop.shop_detail_memo.length > FEATURE_CONSTANTS.SHOP_DETAIL_HIDE_TARGET_STR_LENGTH;

  const isShopOtherMemoVisible =
    shop.other_memo.length > FEATURE_CONSTANTS.SHOP_DETAIL_HIDE_TARGET_STR_LENGTH &&
    shop.other_memo !== shop.shop_detail_memo;

  return (
    <StyledShopCard>
      <StyledShopCardHeader
        title={shop.name}
        subheader={shop.catch !== '' ? shop.catch : shop.genre.catch}
        avatar={<Avatar alt={shop.name} src={shop.logo_image} />}
        action={<BookmarkShopButton shop={shop} />}
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
                  {/* 住所も表示する? */}
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
        <NavigateShopUrlButton shop={shop} shortLabel={!isActionButtonLabelShort} />
        <NavigateShopCouponAndMapButton shop={shop} shortLabel={!isActionButtonLabelShort} />
        <Box sx={{ ml: 'auto' }}>
          <NavigateShopDetailButton shop={shop} />
        </Box>
      </CardActions>
    </StyledShopCard>
  );
};
