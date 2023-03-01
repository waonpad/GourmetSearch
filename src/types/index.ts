import type { FieldValue } from 'firebase/firestore';
import type { FullMetadata } from 'firebase/storage';

export type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TimeStampDTO = {
  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export type FullMetadataWithDownloadUrl = FullMetadata & {
  downloadUrl: string;
};
