import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, describe, it } from 'vitest';
import Help from '../components/Help';

describe('Renders', () => {
  it('visible', () => {
    render(<Help visible />);

    expect(screen.getByRole('tooltip').tagName).toBe('DIV');
    expect(screen.getByRole('tooltip').classList.contains('visible')).toBe(true);
    expect(screen.getByRole('tooltip').classList.contains('hidden')).toBe(false);
  });

  it('hidden', () => {
    render(<Help visible={false} />);

    expect(screen.getByRole('tooltip').tagName).toBe('DIV');
    expect(screen.getByRole('tooltip').classList.contains('hidden')).toBe(true);
    expect(screen.getByRole('tooltip').classList.contains('visible')).toBe(false);
  });
});
