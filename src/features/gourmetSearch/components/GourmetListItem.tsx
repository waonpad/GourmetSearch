import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Grid,
  Box,
  CardActions,
} from '@mui/material';

import { appTheme } from '@/styles/Theme';

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

import type { Shop } from '../types';

type GourmetListItemProps = {
  shop: Shop;
};

const shopDetailHideTargetStrLength = 1;

export const GourmetListItem = ({ shop }: GourmetListItemProps) => {
  const handleFavoriteClick = () => {
    console.log('handleFavoriteClick', shop.id);
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
        titleTypographyProps={{ variant: 'h6' }}
        subheader={shop.catch !== '' ? shop.catch : shop.genre.catch}
        avatar={<Avatar alt={shop.name} src={shop.logo_image} />}
        action={
          <IconButton size="small" onClick={handleFavoriteClick}>
            <FavoriteIcon />
          </IconButton>
        }
      />
      <CardContent sx={{ py: 0, [appTheme.breakpoints.down('md')]: { px: 1 } }}>
        <Grid container spacing={0}>
          {/* サムネと基本情報 */}
          <Grid item xs={12}>
            {/* Boxを横並びに */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }} gap={2}>
              {/* Left */}
              <Box sx={{ width: 'fit-content' }}>
                <Grid item container xs={12} spacing={0}>
                  {/* サムネイル */}
                  <Grid item xs={12}>
                    <ShopPhoto shop={shop} />
                  </Grid>
                </Grid>
              </Box>
              {/* Right */}
              <Box>
                <Grid item container xs={12} spacing={1.5}>
                  {/* ジャンル */}
                  <Grid item xs={12}>
                    <ShopGenre shop={shop} />
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
          <NavigateShopDetailButton shop={shop} />
        </Box>
      </CardActions>
    </Card>
  );
};
