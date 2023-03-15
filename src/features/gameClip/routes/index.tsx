import { Navigate, Route, Routes } from 'react-router-dom';

// import { GameClip } from './GameClip';
import { GameClips } from './GameClips';
import { LikedGameClips } from './LikedGameClips';

export const GameClipRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<GameClips />} />
      {/* 個別ページは未実装 */}
      {/* <Route path=":gameClipId" element={<GameClip />} /> */}
      <Route path="likes" element={<LikedGameClips />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
