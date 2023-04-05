import { Route, Routes } from 'react-router-dom';

// import { BookmarkedShops } from './BookmarkedShops';
import { Shop } from './Shop';
import { Shops } from './Shops';

export const GourmetSearchRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Shops />} />
      <Route path="shops" element={<Shops />} />
      <Route path="shops/:searchParams" element={<Shops />} />
      <Route path="shop/:shopId" element={<Shop />} />
      {/* <Route path="bookmarks/:searhParams" element={<BookmarkedShops />} /> */}
    </Routes>
  );
};
