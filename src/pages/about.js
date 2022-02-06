import React from 'react';
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
  font-size: 2.3rem;
  margin-bottom: 1.25rem;
`;

const About = () => (
  <Layout>
    <Content>
      <Title>Hi.</Title>
      <Paragraph>
        My name is Spencer Lynn. I am a software engineer located in Kirkland, Washington. I am originally from Birmingham, Alabama. I graduated Auburn University with a degree in Wireless Software Engineering. War Eagle!
        I am the master of getting computers to do things, occasionally cool things. Well, except for when it doesn't work, which is more often than I'd like.
      </Paragraph>
    </Content>
  </Layout>
);

export default About;