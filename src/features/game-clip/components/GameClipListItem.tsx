import type { User } from '@/features/users';
import { useAuthContext } from '@/lib/auth';
import { POLICIES, Authorization } from '@/lib/authorization';
import { formatDate } from '@/utils/format';

import { DeleteGameClip } from './DeleteGameClip';
import { SiteGameClipSource } from './SiteGameClipSource';

import type { GameClip as GameClipType } from '../types';

type GameClipListItemProps = {
  data: GameClipType;
};

export const GameClipListItem = ({ data }: GameClipListItemProps) => {
  const auth = useAuthContext();

  return (
    <div className="w-full bg-white shadow-sm p-4">
      {/* <Authorization policyCheck={POLICIES['gameClip:delete'](auth?.userDocData as User, data)}>
        <div className="flex justify-between">
          <span className="text-xs font-semibold">{formatDate(data.createdAt)}</span>
          <DeleteGameClip id={data.id} />
        </div>
      </Authorization> */}

      <div>
        <span>{data.title}</span>
        <br />
        <span>{data.body}</span>
        <br />
        <span>{data.type}</span>
        <br />
        <span>{formatDate(data.createdAt)}</span>
        <br />
        <span>{formatDate(data.updatedAt)}</span>
        <br />
        <span>{data.author.path}</span>
        <br />
        {data.type === 'site' && <SiteGameClipSource data={data} />}
        {/* {data.type === 'twitter' && <TwitterGameClipSource data={data} />}
        {data.type === 'youtube' && <YouTubeGameClipSource data={data} />} */}
      </div>
    </div>
  );
};
