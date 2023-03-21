import { Navigate, Route, Routes } from 'react-router-dom';

// import { GameClip } from './GameClip';
import { GameClips } from './GameClips';
import { LikedGameClips } from './LikedGameClips';
import { UsersGameClips } from './UsersGameClips';

export const GameClipRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<GameClips />} />
      <Route path="search/:query" element={<GameClips />} />
      <Route path="likes/:userId" element={<LikedGameClips />} />
      <Route path="users/:userId" element={<UsersGameClips />} />
      {/* 個別ページは未実装 */}
      {/* <Route path=":gameClipId" element={<GameClip />} /> */}
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
