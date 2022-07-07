import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, describe, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Button from '../components/Button';

describe('Renders', () => {
  it('div', () => {
    render(<Button />);

    expect(screen.getByRole('none').tagName).toBe('DIV');
  });

  it('basic', () => {
    render(<Button>Hello World</Button>);

    expect(screen.getByText('Hello World').tagName).toBe('BUTTON');
    expect(screen.getByRole('button').classList.contains('bg-light-accent-500')).toBe(true);
  });

  it('disabled', () => {
    render(<Button disabled>Hello World</Button>);

    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(true);
    expect(screen.getByRole('button').classList.contains('bg-light-accent-500')).toBe(true);
    expect(screen.getByRole('button').classList.contains('cursor-not-allowed')).toBe(true);
  });

  it('colorless', () => {
    render(<Button colorless>Hello World</Button>);

    expect(screen.getByRole('button').classList.contains('bg-light-primary-300')).toBe(true);
  });

  it('colorless and disabled', () => {
    render(<Button colorless disabled>Hello World</Button>);

    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(true);
    expect(screen.getByRole('button').classList.contains('cursor-not-allowed')).toBe(true);
    expect(screen.getByRole('button').classList.contains('bg-light-primary-300')).toBe(true);
  });
});

describe('Router link', () => {
  it('button', () => {
    render(<Button>Hello World</Button>, { wrapper: MemoryRouter });

    expect(screen.getByText('Hello World').tagName).toBe('BUTTON');
  });

  it('link', () => {
    render(<Button to="test">Hello World</Button>, { wrapper: MemoryRouter });

    expect(screen.getByText('Hello World').tagName).toBe('A');
  });

  it('disabled link', () => {
    render(<Button disabled to="test">Hello World</Button>, { wrapper: MemoryRouter });

    expect(screen.getByText('Hello World').tagName).toBe('BUTTON');
    expect(screen.getByText('Hello World').hasAttribute('disabled')).toBe(true);
  });

  it('empty link', () => {
    render(<Button to="">Hello World</Button>, { wrapper: MemoryRouter });

    expect(screen.getByText('Hello World').tagName).toBe('BUTTON');
  });
});

describe('Events', () => {
  describe('Button', () => {
    it('click', () => {
      let clicked = false;
      const func = () => { clicked = true; };

      render(<Button onClick={func}>Hello World</Button>, { wrapper: MemoryRouter });

      screen.getByText('Hello World').click();
      expect(clicked).toBe(true);
    });
  });

  describe('Router link', () => {
    it('click', () => {
      let clicked = false;
      const func = () => { clicked = true; };

      render(<Button to="test" onClick={func}>Hello World</Button>, { wrapper: MemoryRouter });

      screen.getByText('Hello World').click();
      expect(clicked).toBe(true);
    });
  });
});
