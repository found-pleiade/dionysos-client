import * as R from 'ramda';

export const requestData = (code: string, data: {}) => JSON.stringify({ code, payload: data });

export const visibility = (condition: boolean) => (condition ? 'visible' : 'hidden');

const gtZero = (x: string) => R.gt(R.length(x), 0);

const ltFifty = (x: string) => R.lt(R.length(x), 50);

const notNil = (x: string) => R.not(R.isNil(x));

export const isValid = R.allPass([gtZero, ltFifty, notNil]);

export const translate = (condition: boolean) => (condition ? 'max-w-[650px] px-3 overflow-visible' : 'max-w-0 px-0 overflow-hidden');
