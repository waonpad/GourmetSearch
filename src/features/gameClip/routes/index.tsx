import { Navigate, Route, Routes } from 'react-router-dom';

import { GameClip } from './GameClip';
import { GameClips } from './GameClips';

export const GameClipRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<GameClips />} />
      <Route path=":gameClipId" element={<GameClip />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
