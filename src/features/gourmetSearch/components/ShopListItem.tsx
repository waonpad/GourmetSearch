import { useState } from 'react';

import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
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
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { appTheme } from '@/styles/Theme';

import { FEATURE_CONSTANTS } from '../constants';

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
} from './shopDetailAssets';
import { BookmarkShopButton } from './shopDetailAssets/BookmarkShopButton';

import type { Shop } from '../types';

type ShopListItemProps = {
  shop: Shop;
};

export const ShopListItem = ({ shop }: ShopListItemProps) => {
  const [cardMediaIsExpanded, setCardMediaIsExpanded] = useState(false);

  const handleClickToggleExpandCardMedia = () => {
    setCardMediaIsExpanded(!cardMediaIsExpanded);
  };

  return (
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
        action={<BookmarkShopButton shop={shop} />}
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
                  {shop.budget.name.length >
                    FEATURE_CONSTANTS.SHOP_DETAIL_HIDE_TARGET_STR_LENGTH && (
                    <Grid item xs={12}>
                      <ShopBudget shop={shop} />
                    </Grid>
                  )}
                  {/* メモ */}
                  {shop.shop_detail_memo.length >
                    FEATURE_CONSTANTS.SHOP_DETAIL_HIDE_TARGET_STR_LENGTH && (
                    <Grid item xs={12}>
                      <ShopDetailMemo shop={shop} />
                    </Grid>
                  )}
                  {/* その他のメモ */}
                  {shop.other_memo.length > FEATURE_CONSTANTS.SHOP_DETAIL_HIDE_TARGET_STR_LENGTH &&
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
          <NavigateShopDetailButton shop={shop} />
        </Box>
      </CardActions>
    </Card>
  );
};
