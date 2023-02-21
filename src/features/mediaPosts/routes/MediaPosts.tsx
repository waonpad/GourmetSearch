import { ContentLayout } from '@/components/Layout';

import { useMediaPosts } from '../api/getMediaPosts';
import { CreateMediaPost } from '../components/CreateMediaPost';
import { MediaPostsList } from '../components/MediaPostsList';

export const MediaPosts = () => {
  const mediaPosts = useMediaPosts();

  return (
    <ContentLayout title="MediaMediaPosts">
      <CreateMediaPost />
      <MediaPostsList mediaPosts={mediaPosts.data} />
    </ContentLayout>
  );
};
