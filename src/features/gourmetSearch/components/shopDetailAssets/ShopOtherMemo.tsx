import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import { ShopDetailTempleteStack } from './ShopDetailTempleteStack';

import type { Shop } from '../../types';

export const ShopOtherMemo = ({ shop }: { shop: Shop }) => {
  return <ShopDetailTempleteStack icon={DriveFileRenameOutlineIcon} typography={shop.other_memo} />;
};
