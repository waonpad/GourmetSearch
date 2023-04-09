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
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { Controller } from 'react-hook-form';

import { GoogleMap } from '@/components/GoogleMap';
import { GEOLOCATION_DISABLED } from '@/messages';

import { CONSTANTS } from './GourmetSearchAPIForm.constants';
import { useLogics } from './GourmetSearchAPIForm.logics';
import {
  StyledFormCard,
  StyledFormCardActions,
  StyledFormCardHeader,
  StyledFormCardContent,
  googleMapStyle,
} from './GourmetSearchAPIForm.styled';
import { validationSchema } from './GourmetSearchAPIForm.validationSchema';

import type { GourmetSearchAPIFormProps } from './GourmetSearchAPIForm.types';

export const GourmetSearchAPIFormView = ({ defaultValues }: GourmetSearchAPIFormProps) => {
  const {
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
  } = useLogics({ defaultValues });

  const isMapLabelVisible = useMediaQuery(
    `(min-width:${CONSTANTS.MAP.MAP_BUTTON_LABEL_HIDE_TAERGET_BREAKPOINT})`
  );

  const isGeolocationDisabled =
    !geolocated.isGeolocationAvailable || !geolocated.isGeolocationEnabled;

  return (
    <StyledFormCard>
      <StyledFormCardHeader title={CONSTANTS.GOURMET_SEARCH_API_FORM.TITLE} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <StyledFormCardContent>
          <Stack spacing={2}>
            <Controller
              name={CONSTANTS.GOURMET_SEARCH_API_FORM.KEYWORD_NAME}
              control={control}
              rules={validationSchema.keyword}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label={CONSTANTS.GOURMET_SEARCH_API_FORM.KEYWORD_LABEL}
                  error={!!errors.keyword}
                  helperText={errors.keyword?.message}
                />
              )}
            />
            <Controller
              name={CONSTANTS.GOURMET_SEARCH_API_FORM.RANGE_NAME}
              control={control}
              rules={validationSchema.range}
              render={({ field }) => (
                <FormControl error={!!errors.range}>
                  <FormLabel>{CONSTANTS.GOURMET_SEARCH_API_FORM.RANGE_LABEL}</FormLabel>
                  <RadioGroup {...field} onClick={handleClickRange} row>
                    {CONSTANTS.GOURMET_SEARCH_API_FORM.RANGES.map((range) => (
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
            <Collapse in={isDisplayMap}>
              <GoogleMap sx={googleMapStyle} {...mapProps} />
              <Button
                variant="text"
                onClick={handleClickResetCenterTrigger}
                disabled={!geolocated?.coords}
              >
                {isGeolocationDisabled
                  ? GEOLOCATION_DISABLED
                  : CONSTANTS.MAP.RESET_LOCATION_BUTTON_LABEL}
              </Button>
            </Collapse>
          </Stack>
        </StyledFormCardContent>
        <StyledFormCardActions>
          <Button
            variant="outlined"
            type="reset"
            onClick={handleClickReset}
            startIcon={<ClearIcon />}
          >
            {CONSTANTS.GOURMET_SEARCH_API_FORM.RESET_BUTTON_LABEL}
          </Button>
          {isMapLabelVisible ? (
            <Button
              variant="outlined"
              onClick={handleClickToggleDisplayMap}
              startIcon={<FmdGoodIcon />}
            >
              {isDisplayMap
                ? CONSTANTS.MAP.HIDE_MAP_BUTTON_LABEL
                : CONSTANTS.MAP.SHOW_MAP_BUTTON_LABEL}
            </Button>
          ) : (
            <IconButton onClick={handleClickToggleDisplayMap}>
              <FmdGoodIcon color="primary" />
            </IconButton>
          )}
          <Button variant="outlined" type="submit" startIcon={<SearchIcon />}>
            {CONSTANTS.GOURMET_SEARCH_API_FORM.SUBMIT_BUTTON_LABEL}
          </Button>
        </StyledFormCardActions>
      </form>
    </StyledFormCard>
  );
};
