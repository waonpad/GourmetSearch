import { useState } from 'react';
import { Link } from 'react-router-dom';

import EditIcon from '@heroicons/react/outline/PencilAltIcon';

import type { User } from '@/features/users';
import { useAuthContext } from '@/lib/auth';
import { POLICIES, Authorization } from '@/lib/authorization';
import { formatDate } from '@/utils/format';

import { DeleteGameClip } from './DeleteGameClip';
import { SiteGameClipSource } from './SiteGameClipSource';
import { TwitterGameClipSource } from './TwitterGameClipSource';
import { YoutubeGameClipSource } from './YoutubeGameClipSource';

import type { GameClip as GameClipType } from '../types';

type GameClipListItemProps = {
  data: GameClipType;
};

export const GameClipListItem = ({ data }: GameClipListItemProps) => {
  const auth = useAuthContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsMenuOpen(true);
  };

  const handleCloseMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full bg-white shadow-sm p-4 flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="text-xs font-semibold">{formatDate(data.createdAt)}</span>

        <div className="relative">
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={handleOpenMenu}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {isMenuOpen && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <div className="fixed inset-0 h-full w-full z-10" onClick={handleCloseMenu} />
          )}

          <div
            className={`absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1">
              <div className="py-1">
                <Authorization
                  policyCheck={POLICIES['gameClip:update'](auth?.userDocData as User, data)}
                >
                  <Link
                    to={`/game-clips/${data.id}/edit`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                    role="menuitem"
                  >
                    <EditIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    Edit
                  </Link>
                </Authorization>
                <Authorization
                  policyCheck={POLICIES['gameClip:delete'](auth?.userDocData as User, data)}
                >
                  <DeleteGameClip data={data} />
                </Authorization>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gap-2 flex flex-col">
        <h2 className="text-xl font-semibold">{data.title}</h2>
        <p className="text-sm">{data.body}</p>

        {data.type === 'site' && <SiteGameClipSource data={data} />}
        {data.type === 'twitter' && <TwitterGameClipSource data={data} />}
        {data.type === 'youtube' && <YoutubeGameClipSource data={data} />}
      </div>
    </div>
  );
};
