import { Route, Routes } from 'react-router-dom';

import { Gourmet } from './Gourmet';
import { Gourmets } from './Gourmets';

export const GourmetSearchRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Gourmets />} />
      <Route path="gourmets/:searchParams" element={<Gourmets />} />
      <Route path="gourmet/:shopId" element={<Gourmet />} />
    </Routes>
  );
};
