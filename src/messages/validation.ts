export const REQUIRED = '必須項目です';

export const MAX = (max: number) => {
  return {
    value: max,
    message: `${max}以下で入力してください`,
  };
};

export const MIN = (min: number) => {
  return {
    value: min,
    message: `${min}以上で入力してください`,
  };
};

export const MAX_LENGTH = (max: number) => {
  return {
    value: max,
    message: `${max}文字以下で入力してください`,
  };
};

export const MIN_LENGTH = (min: number) => {
  return {
    value: min,
    message: `${min}文字以上で入力してください`,
  };
};

export const PATTERN = (pattern: RegExp) => {
  return {
    value: pattern,
    message: '正しい形式で入力してください',
  };
};

export const EMAIL = PATTERN(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
