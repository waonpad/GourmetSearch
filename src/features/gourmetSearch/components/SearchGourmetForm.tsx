import { useEffect, useState } from 'react';
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
import { REQUIRED, MIN_LENGTH, MIN, MAX } from '@/messages/validation';
import type { ReactHookFormValidationRules, LatLng } from '@/types';

import type { UseGourmetsOptions } from '../api/getGourmets';
import type { HotpepperGourmetRequest } from '../types';
import type { SubmitHandler } from 'react-hook-form';

type SearchGourmetFormProps = {
  defaultValues?: SearchGourmetInput;
};

type SearchGourmetInput = Pick<HotpepperGourmetRequest, 'keyword' | 'range'>;

const searchGourmetValidationRules: ReactHookFormValidationRules<SearchGourmetInput> = {
  keyword: {
    required: REQUIRED,
    minLength: MIN_LENGTH(1),
  },
  range: {
    required: REQUIRED,
    min: MIN(1),
    max: MAX(5),
  },
};

const searchGourmetDefaultValues: SearchGourmetInput = {
  keyword: '',
  range: 1,
};

const ranges = [
  { value: 1, label: '300m' },
  { value: 2, label: '500m' },
  { value: 3, label: '1000m' },
  { value: 4, label: '2000m' },
  { value: 5, label: '3000m' },
];

export const SearchGourmetForm = ({ defaultValues }: SearchGourmetFormProps) => {
  const navigate = useNavigate();

  const geolocated = useGeolocated({
    watchPosition: true,
    suppressLocationOnMount: true,
  });

  const [displayMap, setDisplayMap] = useState<boolean>(false);

  const handleDisplayMap = () => {
    setDisplayMap(!displayMap);
  };

  const [activeRange, setActiveRange] = useState<number>(
    defaultValues?.range ?? searchGourmetDefaultValues.range ?? 1
  );

  const handleClickRange = (event: React.MouseEvent<HTMLInputElement>) => {
    setActiveRange(parseInt((event.target as HTMLInputElement).value));
  };

  const [latLng, setLatLng] = useState<LatLng | undefined>(undefined);

  const changeLatLng = (latLng: LatLng | undefined) => {
    setLatLng(latLng);
  };

  const [resetCenterTrigger, setResetCenterTrigger] = useState<boolean>(false);

  const handleResetCenterTrigger = () => {
    setResetCenterTrigger(!resetCenterTrigger);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SearchGourmetInput>({
    mode: 'onBlur',
    defaultValues: _.merge({}, searchGourmetDefaultValues, defaultValues),
  });

  const onSubmit: SubmitHandler<SearchGourmetInput> = (data: SearchGourmetInput) => {
    console.log('onSubmit', data);

    console.log(latLng);

    const requestLatLng = latLng
      ? { ...latLng }
      : geolocated?.coords
      ? { lat: geolocated.coords.latitude, lng: geolocated.coords.longitude }
      : undefined;

    console.log('requestLatLng', requestLatLng);

    const query: UseGourmetsOptions['requestParams'] = {
      ...data,
      ...requestLatLng,
    };

    console.log('query', query);

    const queryString = qs.stringify(query);

    navigate(`/app/gourmet-search/gourmets/${queryString}`);
  };

  useEffect(() => {
    geolocated.getPosition();
  }, [geolocated]);

  return (
    <Card>
      <CardHeader title="Search Gourmet" />
      <CardContent sx={{ py: 0 }}>
        <Stack
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
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
                geolocated?.coords
                  ? { lat: geolocated.coords.latitude, lng: geolocated.coords.longitude }
                  : undefined
              }
              defaultZoom={15}
              circleRadius={Number(
                ranges.find((range) => range.value === activeRange)?.label.replace('m', '') ?? 0
              )}
              changeLatLng={changeLatLng}
              resetCenterTrigger={resetCenterTrigger}
            />
            <Button variant="text" onClick={handleResetCenterTrigger}>
              Back to Current Location
            </Button>
          </Collapse>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        {/* reset時にmapも初期状態にする？ */}
        <Button variant="outlined" type="reset" onClick={() => reset()} startIcon={<ClearIcon />}>
          Reset
        </Button>
        <Button
          variant="outlined"
          onClick={handleDisplayMap}
          startIcon={<FmdGoodIcon />}
          sx={{ width: '170px' }}
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
