import React from 'react';
import Helmet from 'react-helmet'
import { Link } from 'gatsby';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

import { Wrapper, Header } from 'components';

import theme from '../../config/Theme';
import config from '../../config/SiteConfig';
import { media } from '../utils/media';
import twitterLogo from '../assets/Twitter_Social_Icon_Circle_White.png'
import gitHubLogo from '../assets/GitHub-Mark-Light-120px-plus.png'

injectGlobal`
  ::selection {
    color: ${theme.colors.bg};
    background: ${theme.colors.primary};
  }
  body {
    background: ${theme.colors.bg};
    color: ${theme.default};
    @media ${media.phone} {
      font-size: 14px;
    }
  }
  a {
    color: ${theme.colors.grey.dark};
    text-decoration: none;
    transition: all ${theme.transitions.normal};
  }
  a:hover {
    color: ${theme.colors.primary};
  }
  h1, h2, h3, h4 {
    color: ${theme.colors.grey.dark};
  }
  blockquote {
    font-style: italic;
    position: relative;
  }

  blockquote:before {
    content: "";
    position: absolute;
    background: ${theme.colors.primary};
    height: 100%;
    width: 6px;
    margin-left: -1.6rem;
  }
  label {
    margin-bottom: .5rem;
    color: ${theme.colors.grey.dark};
  }
  input, textarea {
    border-radius: .5rem;
    border: none;
    background: rgba(0, 0, 0, 0.05);
    padding: .25rem 1rem;
    &:focus {
      outline: none;
    }
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 3rem 0;
  span {
    font-size: 0.75rem;
  }
`;

const TwitterLink = () => (
  <a
    href={"https://twitter.com/LSpencerLynn"}
    target={"_blank"}
    style={{ boxShadow: 'none', marginLeft: 20 }}
  >
    <img
      src={twitterLogo}
      alt={'Twitter'}
      style={{ width: 24, height: 24, marginBottom: 0 }}
    />
  </a>
);

const GitHubLink = () => (
  <a
    href={"https://github.com/SpencerLynn"}
    target={"_blank"}
    style={{ boxShadow: 'none', marginLeft: 5 }}
  >
    <img
      src={gitHubLogo}
      alt={'GitHub'}
      style={{ width: 24, height: 24, marginBottom: 0 }}
    />
  </a>
);

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <Wrapper>
        <Helmet title={config.siteTitle} />
        <Header>
          <Link to="/">{config.siteTitle}</Link>
          <TwitterLink />
          <GitHubLink />
        </Header>
        {children}
      </Wrapper>

      <Footer>
        &copy; 2018 by Spencer Lynn. All rights reserved. <br />
      </Footer>
    </React.Fragment>
  </ThemeProvider>
);

export default Layout;