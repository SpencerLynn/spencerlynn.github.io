import React from 'react';
import styled from 'styled-components';

import { media } from '../utils/media';

const Content = styled.article`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.colors.bg};

  z-index: 9000;
  margin-top: -3rem;

  @media ${media.tablet} {
    padding: 3rem 2rem;
    margin-top: -2.5rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
    margin-top: -2rem;
  }
`;

export default Content;