import { Route, Routes } from 'react-router-dom';

import { Gourmets } from './Gourmets';

export const GourmetSearchRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Gourmets />} />
      <Route path="gourmets" element={<Gourmets />} />
      {/* <Route path="gourmet/:gourmetId" element={<Gourmet />} /> */}
    </Routes>
  );
};
