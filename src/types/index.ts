import type { FieldValue } from 'firebase/firestore';
import type { FullMetadata } from 'firebase/storage';
import type { FieldValues, RegisterOptions, Path } from 'react-hook-form';

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

export type ReactHookFormValidationRules<T extends FieldValues> = Record<
  keyof T,
  Omit<RegisterOptions<T, Path<T>>, 'value'> | undefined
>;

export type LatLng = {
  lat: number;
  lng: number;
};
