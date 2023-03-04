import type { BaseEntity, FullMetadataWithDownloadUrl } from '@/types';

import type { DocumentData, DocumentReference } from 'firebase/firestore';

export type FileData = Pick<
  FullMetadataWithDownloadUrl,
  'bucket' | 'contentType' | 'fullPath' | 'downloadUrl'
>;

export type GameClip = SiteGameClip | TwitterGameClip | YoutubeGameClip;

type GameInfo = {
  gameTitle: string;
};

type GameClipBaseEntity = {
  title: string;
  body: string;
  author: DocumentReference<DocumentData>;
} & BaseEntity &
  GameInfo;

export type SiteGameClip = {
  type: 'site';
  videoData: FileData;
  thumbnailData: FileData | null;
} & GameClipBaseEntity;

export type TwitterGameClip = {
  type: 'twitter';
  tweetId: string;
} & GameClipBaseEntity;

export type YoutubeGameClip = {
  type: 'youtube';
  videoId: string;
} & GameClipBaseEntity;
