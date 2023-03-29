import type { ValidationRule } from 'react-hook-form';

type ValidMsg = {
  required: string | ValidationRule<boolean>;
  max: (max: number) => ValidationRule<number | string>;
  min: (min: number) => ValidationRule<number | string>;
  maxLength: (max: number) => ValidationRule<number | string>;
  minLength: (min: number) => ValidationRule<number | string>;
  pattern: (pattern: RegExp) => ValidationRule<RegExp>;
  email: ValidationRule<RegExp>;
};

export const validMsg: ValidMsg = {
  required: '必須項目です',
  max: (max: number) => {
    return {
      value: max,
      message: `${max}以下で入力してください`,
    };
  },
  min: (min: number) => {
    return {
      value: min,
      message: `${min}以上で入力してください`,
    };
  },
  maxLength: (max: number) => {
    return {
      value: max,
      message: `${max}文字以下で入力してください`,
    };
  },
  minLength: (min: number) => {
    return {
      value: min,
      message: `${min}文字以上で入力してください`,
    };
  },
  pattern: (pattern: RegExp) => {
    return {
      value: pattern,
      message: '正しい形式で入力してください',
    };
  },
  email: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: 'メールの形式で入力してください',
  },
};
