import * as R from 'ramda';

export const requestData = (code: string, data: {}) => JSON.stringify({ code, payload: data });

export const visibility = (condition: boolean) => (condition ? 'visible' : 'hidden');

const gteThree = (x: string) => R.gte(R.length(x), 3);

const lteTwenty = (x: string) => R.lte(R.length(x), 20);

const notNil = (x: string) => R.not(R.isNil(x));

export const isValid = R.allPass([gteThree, lteTwenty, notNil]);

export const isValidConditions = { gteThree, lteTwenty, notNil };

export const translate = (condition: boolean) => (condition ? 'openSideMenus' : 'closeSideMenus');

export const testActiveElementById = (id: string) => document.activeElement?.id === id;
