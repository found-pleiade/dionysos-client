import * as R from "ramda";

/**
 * Toggle 'visible' and 'hidden' classes based on the boolean value.
 */
export const visibility = (condition: boolean) =>
  condition ? "visible" : "hidden";

const gteTwo = (x: string) => R.gte(R.length(x), 2);

const lteTwenty = (x: string) => R.lte(R.length(x), 20);

/**
 * Check if the passed variable is not null or undefined.
 */
export const notNil = (x: any) => R.not(R.isNil(x));

/**
 * An object that contains tests for the isValid function.
 * Used for user and room name validations and inputs helpers.
 */
export const isValidConditions = { gteTwo, lteTwenty };

/**
 * Check the validity of the passed string, used for usernames and room names.
 */
export const isValid = R.allPass(Object.values(isValidConditions));

/**
 * Translate the element by applying a class to it, used for the panel.
 */
export const translate = (condition: boolean) =>
  condition ? "openSideMenus" : "closeSideMenus";

/**
 * Check if the passed string is the id of the active/focused element.
 */
export const testActiveElement = (element: HTMLElement) =>
  document.activeElement === element;

/**
 * Check if the input is focused, and the key pressed is enter.
 * The element needs an ID. Ignore clicks.
 */
export const invalidInput = (event: any) => {
  const isClick = event.type === "click";
  const isKeyDown = event.type === "keydown";
  const isEnter = event.code === "Enter";
  const isFocused = testActiveElement(event.target);
  return !(isClick || (isKeyDown && isEnter && isFocused));
};

export const isLenZero = (x: string) => R.equals(R.length(x), 0);

export const isRequestValid = (res: Response) =>
  res.status >= 200 && res.status < 300;

export const exportedForTesting = {
  gteTwo,
  lteTwenty,
};
