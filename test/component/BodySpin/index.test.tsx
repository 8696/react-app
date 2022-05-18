import React from 'react';
import '@testing-library/jest-dom'

import BodySpin from '@/component/BodySpin/index';

import { render, screen } from '@testing-library/react';

test('test BodySpin component',  () => {
  const { container } = render(<BodySpin />);
  expect(container).toBeInTheDocument();
});
