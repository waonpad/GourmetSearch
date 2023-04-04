import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ClearIcon from '@mui/icons-material/Clear';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SearchIcon from '@mui/icons-material/Search';
import {
  Stack,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Collapse,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from '@mui/material';
import _ from 'lodash';
import qs from 'qs';
import { useForm, Controller } from 'react-hook-form';

import { GoogleMap } from '@/components/GoogleMap';
import { useGeolocated } from '@/lib/react-geolocated';
import { GEOLOCATION_DISABLED } from '@/messages';
import { validMsg } from '@/messages/validation';
import { appTheme } from '@/styles/Theme';
import type { ReactHookFormValidationRules, LatLng } from '@/types';

import { defStart, defRange } from '../api/getShops';

import type { CustomizedHotpepperGourmetSearchAPIRequest } from '../types';
import type { SubmitHandler } from 'react-hook-form';

type SearchShopFormProps = {
  defaultValues?: CustomizedHotpepperGourmetSearchAPIRequest;
};

type SearchShopInput = {
  keyword?: CustomizedHotpepperGourmetSearchAPIRequest['keyword'];
  range?: CustomizedHotpepperGourmetSearchAPIRequest['range'] | 0;
};

const searchShopValidationRules: ReactHookFormValidationRules<SearchShopInput> = {
  keyword: {},
  range: {
    required: validMsg.required,
    min: validMsg.min(0),
    max: validMsg.max(5),
  },
};

const searchShopDefaultValues: {
  [K in NonNullable<keyof SearchShopInput>]: NonNullable<SearchShopInput[K]>;
} = {
  keyword: '',
  range: defRange,
};

const ranges: {
  value: SearchShopInput['range'] | 0;
  label: string;
  range: number;
}[] = [
  { value: 1, label: '300m', range: 300 },
  { value: 2, label: '500m', range: 500 },
  { value: 3, label: '1000m', range: 1000 },
  { value: 4, label: '2000m', range: 2000 },
  { value: 5, label: '3000m', range: 3000 },
  { value: 0, label: 'All Range', range: 0 }, // エリアで絞り込まないための設定
];

export const GourmetSearchAPIForm = ({ defaultValues }: SearchShopFormProps) => {
  const navigate = useNavigate();

  const geolocated = useGeolocated({
    config: {
      watchPosition: true,
    },
  });

  const [displayMap, setDisplayMap] = useState<boolean>(false);

  const [activeRange, setActiveRange] = useState<SearchShopInput['range']>(
    defaultValues?.allRange === 1
      ? undefined
      : defaultValues?.range ?? searchShopDefaultValues.range
  );

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
    setDisplayMap(!displayMap);
  };

  const handleClickRange = (event: React.MouseEvent<HTMLInputElement>) => {
    const value = parseInt((event.target as HTMLInputElement).value);

    setActiveRange(
      value == 0
        ? undefined
        : (parseInt((event.target as HTMLInputElement).value) as SearchShopInput['range'])
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
  } = useForm<SearchShopInput>({
    mode: 'onBlur',
    defaultValues: _.merge({}, searchShopDefaultValues, {
      ...defaultValues,
      range:
        defaultValues?.allRange === 1 ? 0 : defaultValues?.range ?? searchShopDefaultValues.range,
    }),
  });

  const onSubmit: SubmitHandler<SearchShopInput> = (data: SearchShopInput) => {
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
      start: defStart, // ページ繰りしたページから検索した時のために初期値をセット
      ...requestLatLng,
      range: data.range == 0 ? undefined : data.range,
      allRange: data.range == 0 ? 1 : undefined,
    };

    const searchParamsString = qs.stringify(customSearchParams);

    navigate(`/app/gourmet-search/shops/${searchParamsString}`);
  };

  const handleClickReset = () => {
    reset();
    setResetCenterTrigger(!resetCenterTrigger);
  };

  return (
    <Card
      sx={{
        [appTheme.breakpoints.down('md')]: {
          borderRadius: 0,
        },
      }}
    >
      <CardHeader
        title="Search Shop"
        titleTypographyProps={{ variant: 'h6' }}
        sx={{
          [appTheme.breakpoints.down('md')]: {
            padding: appTheme.spacing(1),
          },
        }}
      />
      <CardContent
        sx={{
          py: 0,
          [appTheme.breakpoints.down('md')]: {
            px: appTheme.spacing(1),
          },
        }}
      >
        <Stack
          component="form"
          noValidate
          spacing={2}
          // sx={{ m: 2, width: '25ch' }}
        >
          <Controller
            name="keyword"
            control={control}
            rules={searchShopValidationRules.keyword}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="Keyword"
                error={errors.keyword !== undefined}
                helperText={errors.keyword?.message}
              />
            )}
          />
          <Controller
            name="range"
            control={control}
            rules={searchShopValidationRules.range}
            render={({ field }) => (
              <FormControl error={errors.range !== undefined}>
                <FormLabel>Range</FormLabel>
                <RadioGroup {...field} onClick={handleClickRange} row>
                  {ranges.map((range) => (
                    <FormControlLabel
                      key={range.value}
                      value={range.value}
                      control={<Radio />}
                      label={range.label}
                    />
                  ))}
                </RadioGroup>
                <FormHelperText>{errors.range?.message}</FormHelperText>
              </FormControl>
            )}
          />
          <Collapse in={displayMap}>
            <GoogleMap
              sx={{
                width: '100%',
                height: 0,
                paddingBottom: { xs: '100%', sm: '50%', md: '33.3%' },
              }}
              defaultCenter={
                defaultValues?.lat && defaultValues?.lng
                  ? { lat: defaultValues.lat, lng: defaultValues.lng }
                  : geolocated?.coords
                  ? { lat: geolocated.coords.latitude, lng: geolocated.coords.longitude }
                  : undefined
              }
              defaultZoom={15}
              circleRadius={
                !activeRange
                  ? 0
                  : Number(ranges.find((range) => range.value === activeRange)?.range)
              }
              changeLatLng={changeLatLng}
              resetCenterTrigger={resetCenterTrigger}
            />
            <Button
              variant="text"
              onClick={handleClickResetCenterTrigger}
              disabled={!geolocated?.coords}
            >
              {!geolocated.isGeolocationAvailable || !geolocated.isGeolocationEnabled
                ? GEOLOCATION_DISABLED
                : 'Back to Current Location'}
            </Button>
          </Collapse>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          type="reset"
          onClick={handleClickReset}
          startIcon={<ClearIcon />}
        >
          Reset
        </Button>
        <Button
          variant="outlined"
          onClick={handleClickToggleDisplayMap}
          startIcon={<FmdGoodIcon />}
          // sx={{ width: '180px' }}
        >
          {displayMap ? 'Hide Map' : 'Search by map'}
        </Button>
        <Button
          variant="outlined"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </CardActions>
    </Card>
  );
};
