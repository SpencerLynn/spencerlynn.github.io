import React from 'react';
import Helmet from 'react-helmet'
import { Link } from 'gatsby';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

import { Wrapper, Header } from 'components';

import theme from '../../config/Theme';
import config from '../../config/SiteConfig';
import { media } from '../utils/media';
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
    content: '';
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

const GitHubLink = () => (
  <a
    href={'https://github.com/SpencerLynn'}
    target={'_blank'}
    style={{ boxShadow: 'none', marginLeft: 5 }}
  >
    <img
      src={gitHubLogo}
      alt={'GitHub'}
      style={{ width: 24, height: 24, marginBottom: 0 }}
    />
  </a>
);

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const EmptySpace = styled.div`
  flex: 1 1 auto;
`;

const LinksContainer = styled.div`
  flex: 1 0 auto;
  display: flex;
`;

const NavigationLink = styled(Link)`
  font-size: 1rem;
  margin-left: 1rem;
`;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <Wrapper>
        <Helmet title={config.siteTitle} />
        <Header>
          <HeaderRow>
            <Link to={'/'}>{config.siteTitle}</Link>
            <GitHubLink />
            <LinksContainer>
              <EmptySpace />
              <NavigationLink to={'/'} >Home</NavigationLink>
              <NavigationLink to={'/about'} >About</NavigationLink>
            </LinksContainer>
          </HeaderRow>
        </Header>
        {children}
      </Wrapper>

      <Footer>
        &copy; 2024 by Spencer Lynn. All rights reserved. <br />
      </Footer>
    </React.Fragment>
  </ThemeProvider>
);

export default Layout;