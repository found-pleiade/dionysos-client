import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, describe, it } from 'vitest';
import * as utils from '../utils';

describe('requestData', () => {
  it('Passed code and payload is actually stringified', () => {
    expect(utils.requestData('CODE', {})).toBe('{"code":"CODE","payload":{}}');

    expect(utils.requestData('CODE', {
      id: 4,
      name: 'Albert',
      gay: true,
      family: {
        dad: undefined, // don't pass
        mom: null, // pass
        sister: 'Jeanne',
      },
    })).toBe('{"code":"CODE","payload":{"id":4,"name":"Albert","gay":true,"family":{"mom":null,"sister":"Jeanne"}}}');
  });
});

describe('visibility', () => {
  it('Output visible or hidden if true or false', () => {
    expect(utils.visibility(true)).toBe('visible');
    expect(utils.visibility(false)).toBe('hidden');
  });
});

describe('gteThree', () => {
  it('True if x >= 3', () => {
    expect(utils.exportedForTesting.gteThree('')).toBe(false);
    expect(utils.exportedForTesting.gteThree('ab')).toBe(false);
    expect(utils.exportedForTesting.gteThree('abc')).toBe(true);
  });
});

describe('lteTwenty', () => {
  it('True if x <= 20', () => {
    expect(utils.exportedForTesting.lteTwenty('')).toBe(true);
    expect(utils.exportedForTesting.lteTwenty('abcdefghijklmnopqrst')).toBe(true);
    expect(utils.exportedForTesting.lteTwenty('abcdefghijklmnopqrstu')).toBe(false);
  });
});

describe('equalsForty', () => {
  it('True if x === 40', () => {
    expect(utils.equalsForty('')).toBe(false);
    expect(utils.equalsForty('abcdefghijklmnopqrstuvwxyzabcdefghijklm')).toBe(false);
    expect(utils.equalsForty('abcdefghijklmnopqrstuvwxyzabcdefghijklmn')).toBe(true);
    expect(utils.equalsForty('abcdefghijklmnopqrstuvwxyzabcdefghijklmno')).toBe(false);
  });
});

describe('notNil', () => {
  it('False if null or undefined', () => {
    expect(utils.notNil('')).toBe(true);
    expect(utils.notNil(0)).toBe(true);
    expect(utils.notNil(1)).toBe(true);
    expect(utils.notNil({})).toBe(true);
    expect(utils.notNil([])).toBe(true);
    expect(utils.notNil(null)).toBe(false);
    expect(utils.notNil(undefined)).toBe(false);
  });
});

describe('isValidConditions', () => {
  it('Contains conditions for user and room names', () => {
    expect(utils.isValidConditions.gteThree).not.toBe(undefined);
    expect(utils.isValidConditions.lteTwenty).not.toBe(undefined);
  });
});

describe('isValid', () => {
  it('True if x >= 3, x <= 20', () => {
    expect(utils.isValid('')).toBe(false);
    expect(utils.isValid('ab')).toBe(false);
    expect(utils.isValid('abc')).toBe(true);
    expect(utils.isValid('abcdefghijklmnopqrst')).toBe(true);
    expect(utils.isValid('abcdefghijklmnopqrstu')).toBe(false);
  });
});

describe('translate', () => {
  it('Output openSideMenus or closeSideMenus if true or false', () => {
    expect(utils.translate(true)).toBe('openSideMenus');
    expect(utils.translate(false)).toBe('closeSideMenus');
  });
});

describe('testActiveElement', () => {
  it('Check if a focusable element is focused or not', () => {
    render(<button type="button">Click</button>);
    const node = screen.getByText('Click');

    expect(utils.testActiveElement(node)).toBe(false);
    node.focus();
    expect(utils.testActiveElement(node)).toBe(true);
  });

  it('Check if an unfocusable element can be focused', () => {
    render(<div id="test">Click</div>);
    const node = screen.getByText('Click');

    expect(utils.testActiveElement(node)).toBe(false);
    node.focus();
    expect(utils.testActiveElement(node)).toBe(false);
  });
});

describe('invalidInput', () => {
  it('Check if you press enter on an active button element', () => {
    const func = (event: Event) => {
      expect(utils.invalidInput(event)).toBe(false);
    };

    render(
      <button type="button">Click</button>,
    );

    const node = screen.getByText('Click');
    node.onkeydown = func;
    node.focus();
    fireEvent.keyDown(node, { code: 'Enter', charCode: 13 });
  });

  it('Check if you click on an active button element', () => {
    const func = (event: Event) => {
      expect(utils.invalidInput(event)).toBe(true);
    };

    render(
      <button type="button">Click</button>,
    );

    const node = screen.getByText('Click');
    node.onclick = func;
    node.focus();
    node.click();
  });

  it('Check if you press enter on an inactive button element', () => {
    const func = (event: Event) => {
      expect(utils.invalidInput(event)).toBe(true);
    };

    render(
      <button type="button">Click</button>,
    );

    const node = screen.getByText('Click');
    node.onkeydown = func;
    fireEvent.keyDown(node, { code: 'Enter', charCode: 13 });
  });

  it('Check if you press space on an active button element', () => {
    const func = (event: Event) => {
      expect(utils.invalidInput(event)).toBe(true);
    };

    render(
      <button type="button">Click</button>,
    );

    const node = screen.getByText('Click');
    node.onkeydown = func;
    node.focus();
    fireEvent.keyDown(node, { code: 'Space', charCode: 32 });
  });
});

describe('isLenZero', () => {
  it('True if length of string === 0', () => {
    expect(utils.isLenZero('')).toBe(true);
    expect(utils.isLenZero('abc')).toBe(false);
    expect(utils.isLenZero(`
    `)).toBe(false);
    expect(utils.isLenZero(' ')).toBe(false);
  });
});
