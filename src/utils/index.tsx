import * as R from 'ramda';

/**
 * Stringify json data to be sent to the server.
 */
export const requestData = (code: string, data: {}) => JSON.stringify({ code, payload: data });

/**
 * Toggle 'visible' and 'hidden' classes based on the boolean value.
 */
export const visibility = (condition: boolean) => (condition ? 'visible' : 'hidden');

const gteThree = (x: string) => R.gte(R.length(x), 3);

const lteTwenty = (x: string) => R.lte(R.length(x), 20);

export const equalsForty = (x: string) => R.equals(R.length(x), 40);

/**
 * Check if the passed variable is not null or undefined.
 */
export const notNil = (x: any) => R.not(R.isNil(x));

/**
 * Check the validity of the passed string, used for usernames and room names.
 */
export const isValid = R.allPass([gteThree, lteTwenty, notNil]);

/**
 * An object that contains tests for the isValid function.
 */
export const isValidConditions = { gteThree, lteTwenty, notNil };

/**
 * Translate the element by applying a class to it, used for the chat and the main panel.
 */
export const translate = (condition: boolean) => (condition ? 'openSideMenus' : 'closeSideMenus');

/**
 * Check if the passed string is the id of the active/focused element.
 */
export const testActiveElementById = (id: string) => document.activeElement?.id === id;

/**
 * Check if the input is focused, and the key pressed is enter.
 * The element needs an ID. Ignore clicks.
 */
export const invalidInput = (event: any) => {
  const isKeyPress = event.type === 'keypress';
  const isEnter = event.code === 'Enter';
  const isFocused = testActiveElementById(event.target.id);
  return isKeyPress && (!isEnter || !isFocused);
};

/**
 * Toggle the dialog element depending of the modal isOpen state.
 * Check if the dialog element is already open to prevent an app crash.
 */
export const toggleDialog = (condition: boolean, dialogRef: any) => {
  const dialogElement = dialogRef.current;
  if (!dialogElement.open && condition) dialogElement.showModal();
  if (dialogElement.open && !condition) dialogElement.close();
};

/**
 * Prevent the user from canceling the modal by pressing escape.
 */
export const preventDialogEscape = (dialogRef: any) => {
  const dialogElement = dialogRef.current;
  dialogElement.oncancel = (event: any) => {
    event.preventDefault();
  };
};

export const isLenZero = (x: string) => R.equals(R.length(x), 0);
