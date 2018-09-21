import React from 'react'
import styled from 'styled-components';

import { Content, Layout } from 'components';
import { media } from '../utils/media';

const Paragraph = styled.p`
  font-size: 1.2rem;
  margin-top: -0.5rem;
  @media ${media.phone} {
    font-size: 0.75rem;
  }
  @media ${media.tablet} {
    font-size: 1rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const NotFoundPage = () => (
    <Layout>
        <Content>
            <Title>Oops... That is embarrassing...</Title>
            <Paragraph>
                I&#39;m blaming you for typing that URL incorrectly...
            </Paragraph>
        </Content>
    </Layout>
);

export default NotFoundPage