import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import _ from 'lodash';
import qs from 'qs';
import { useForm } from 'react-hook-form';

import type { GoogleMapProps } from '@/components/GoogleMap';
import { useGeolocated } from '@/lib/react-geolocated';
import type { LatLng } from '@/types';

import { FEATURE_CONSTANTS } from '../../constants';

import { CONSTANTS } from './GourmetSearchAPIForm.constants';

import type { CustomizedHotpepperGourmetSearchAPIRequest } from '../../types';
import type {
  GourmetSearchAPIFormInput,
  GourmetSearchAPIFormProps,
} from './GourmetSearchAPIForm.types';
import type { SubmitHandler } from 'react-hook-form';

export const useLogics = ({ defaultValues }: GourmetSearchAPIFormProps) => {
  const navigate = useNavigate();

  const geolocated = useGeolocated({
    config: {
      watchPosition: true,
    },
  });

  const [isDisplayMap, setIsDisplayMap] = useState<boolean>(false);

  const defaultActiveRange =
    defaultValues?.allRange === 1
      ? undefined
      : defaultValues?.range ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_RANGE;

  const [activeRange, setActiveRange] =
    useState<GourmetSearchAPIFormInput['range']>(defaultActiveRange);

  const [latLng, setLatLng] = useState<LatLng | undefined>(
    defaultValues?.lat && defaultValues?.lng
      ? { lat: defaultValues.lat, lng: defaultValues.lng }
      : undefined
  );

  const [resetCenterTrigger, setResetCenterTrigger] = useState<boolean>(false);

  const changeLatLng = (latLng: LatLng | undefined) => {
    setLatLng(latLng);
  };

  const handleClickToggleDisplayMap = () => {
    setIsDisplayMap(!isDisplayMap);
  };

  const handleClickRange = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = parseInt((event.target as HTMLInputElement).value);

    setActiveRange(
      value == 0
        ? undefined
        : (parseInt((event.target as HTMLInputElement).value) as GourmetSearchAPIFormInput['range'])
    );
  };

  const handleClickResetCenterTrigger = () => {
    setResetCenterTrigger(!resetCenterTrigger);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GourmetSearchAPIFormInput>({
    mode: 'onBlur',
    defaultValues: _.merge({}, CONSTANTS.GOURMET_SEARCH_API_FORM.DEFAULT_VALUES, {
      ...defaultValues,
      range:
        defaultValues?.allRange === 1
          ? 0
          : defaultValues?.range ?? FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_RANGE,
    }),
  });

  const onSubmit: SubmitHandler<GourmetSearchAPIFormInput> = (data: GourmetSearchAPIFormInput) => {
    const requestLatLng =
      data.range == 0
        ? undefined
        : latLng
        ? { ...latLng }
        : geolocated?.coords
        ? { lat: geolocated.coords.latitude, lng: geolocated.coords.longitude }
        : undefined;

    const customSearchParams: CustomizedHotpepperGourmetSearchAPIRequest = {
      ...data,
      start: FEATURE_CONSTANTS.GET_SHOPS_DEFAULT_REQUEST_START, // ページ繰りしたページから検索した時のために初期値をセット
      ...requestLatLng,
      range: data.range == 0 ? undefined : data.range,
      allRange: data.range == 0 ? 1 : undefined,
    };

    const searchParamsString = qs.stringify(customSearchParams);

    navigate(`${FEATURE_CONSTANTS.SHOPS_PATH}/${searchParamsString}`);
  };

  const handleClickReset = () => {
    reset();
    setActiveRange(defaultActiveRange);
    setResetCenterTrigger(!resetCenterTrigger);
  };

  const mapProps: GoogleMapProps = {
    defaultCenter:
      defaultValues?.lat && defaultValues?.lng
        ? { lat: defaultValues.lat, lng: defaultValues.lng }
        : geolocated?.coords
        ? { lat: geolocated.coords.latitude, lng: geolocated.coords.longitude }
        : undefined,
    defaultZoom: 15,
    circleRadius: !activeRange
      ? 0
      : Number(
          CONSTANTS.GOURMET_SEARCH_API_FORM.RANGES.find((range) => range.value === activeRange)
            ?.range
        ),
    changeLatLng: changeLatLng,
    resetCenterTrigger: resetCenterTrigger,
  };

  return {
    geolocated,
    isDisplayMap,
    handleClickToggleDisplayMap,
    handleClickRange,
    handleClickResetCenterTrigger,
    control,
    handleSubmit,
    onSubmit,
    errors,
    handleClickReset,
    mapProps,
  };
};
