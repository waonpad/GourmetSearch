import { ContentLayout } from '@/components/Layout';

import { usePosts } from '../api/getPosts';
import { CreatePost } from '../components/CreatePost';
import { PostsList } from '../components/PostsList';

export const Posts = () => {
  const { posts } = usePosts();

  return (
    <ContentLayout title="Posts">
      <CreatePost />
      <PostsList posts={posts} />
    </ContentLayout>
  );
};
