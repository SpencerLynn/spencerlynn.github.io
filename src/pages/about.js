import React from 'react';
import styled from 'styled-components';

import { Content, Layout } from 'components';
import { media } from '../utils/media';

import profilePic from '../assets/profile-pic.jpg';

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

const Image = styled.img`
  max-width: 200px;
  border-radius: 12px;
  box-shadow: 3px 3px 10px #00000077;
  display: block;
  margin-right: auto;
  margin-left: auto;
`

const About = () => (
  <Layout>
    <Content>
      <Image
        src={profilePic}
        alt={'Profile picture'}
        draggable={false}
      />
      <Paragraph>
        Hi, I'm Spencer Lynn. I am a software engineer working on mobile and web apps. I am currently located in Auburn, AL by way of Birmingham, AL, Huntsville, AL, and the Greater Seattle Area. I graduated Auburn University with a degree in Wireless Software Engineering. War Eagle!
        I am the master of getting computers to do things, occasionally cool things. Well, except for when it doesn't work, which is more often than I'd like.
      </Paragraph>
    </Content>
  </Layout>
);

export default About;