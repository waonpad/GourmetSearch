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
import { useGeolocated } from 'react-geolocated';
import { useForm, Controller } from 'react-hook-form';

import { GoogleMap } from '@/components/GoogleMap';
import { GEOLOCATION_DISABLED } from '@/messages';
import { validMsg } from '@/messages/validation';
import { appTheme } from '@/styles/Theme';
import type { ReactHookFormValidationRules, LatLng } from '@/types';

import { defStart, defRange } from '../api/getGourmets';

import type { CustomizedHotpepperGourmetRequest } from '../types';
import type { SubmitHandler } from 'react-hook-form';

type SearchGourmetFormProps = {
  defaultValues?: CustomizedHotpepperGourmetRequest;
};

type SearchGourmetInput = {
  keyword?: CustomizedHotpepperGourmetRequest['keyword'];
  range?: CustomizedHotpepperGourmetRequest['range'] | 0;
};

const searchGourmetValidationRules: ReactHookFormValidationRules<SearchGourmetInput> = {
  keyword: {},
  range: {
    required: validMsg.required,
    min: validMsg.min(0),
    max: validMsg.max(5),
  },
};

const searchGourmetDefaultValues: {
  [K in NonNullable<keyof SearchGourmetInput>]: NonNullable<SearchGourmetInput[K]>;
} = {
  keyword: '',
  range: defRange,
};

const ranges: {
  value: SearchGourmetInput['range'] | 0;
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

export const SearchGourmetForm = ({ defaultValues }: SearchGourmetFormProps) => {
  const navigate = useNavigate();

  const geolocated = useGeolocated({
    watchPosition: true,
  });

  const [displayMap, setDisplayMap] = useState<boolean>(false);

  const [activeRange, setActiveRange] = useState<SearchGourmetInput['range']>(
    defaultValues?.allRange === 1
      ? undefined
      : defaultValues?.range ?? searchGourmetDefaultValues.range
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
        : (parseInt((event.target as HTMLInputElement).value) as SearchGourmetInput['range'])
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
  } = useForm<SearchGourmetInput>({
    mode: 'onBlur',
    defaultValues: _.merge({}, searchGourmetDefaultValues, {
      ...defaultValues,
      range:
        defaultValues?.allRange === 1
          ? 0
          : defaultValues?.range ?? searchGourmetDefaultValues.range,
    }),
  });

  const onSubmit: SubmitHandler<SearchGourmetInput> = (data: SearchGourmetInput) => {
    const requestLatLng =
      data.range == 0
        ? undefined
        : latLng
        ? { ...latLng }
        : geolocated?.coords
        ? { lat: geolocated.coords.latitude, lng: geolocated.coords.longitude }
        : undefined;

    const customSearchParams: CustomizedHotpepperGourmetRequest = {
      ...data,
      start: defStart, // ページ繰りしたページから検索した時のために初期値をセット
      ...requestLatLng,
      range: data.range == 0 ? undefined : data.range,
      allRange: data.range == 0 ? 1 : undefined,
    };

    const searchParamsString = qs.stringify(customSearchParams);

    navigate(`/app/gourmet-search/gourmets/${searchParamsString}`);
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
      <CardHeader title="Search Gourmet" titleTypographyProps={{ variant: 'h6' }} />
      <CardContent sx={{ py: 0 }}>
        <Stack
          component="form"
          noValidate
          spacing={2}
          // sx={{ m: 2, width: '25ch' }}
        >
          <Controller
            name="keyword"
            control={control}
            rules={searchGourmetValidationRules.keyword}
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
            rules={searchGourmetValidationRules.range}
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
