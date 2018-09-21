import React from 'react';
import { graphql } from 'gatsby';
import styled, { injectGlobal } from 'styled-components';

import theme from '../../config/Theme';

// Needed to show line numbers for code snippets.
import * as LineStyles from "prismjs/plugins/line-numbers/prism-line-numbers.css";

import { Content, Layout, Subline } from 'components';

injectGlobal`
  /**
   * Add back the container background-color, border-radius, padding, margin
   * and overflow that we removed from <pre>.
   */
  .gatsby-highlight {
    background-color: #fdf6e3;
    border-radius: 0.3em;
    margin: 0.5em 0;
    padding: 1em;
    overflow: auto;
  }

  /**
   * Remove the default PrismJS theme background-color, border-radius, margin,
   * padding and overflow.
   */
  .gatsby-highlight pre[class*="language-"] {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left;
    min-width: 100%;
  }
  .gatsby-highlight pre[class*="language-"].line-numbers {
    padding-left: 2.8em;
  }

  /**
   * Background color for inline code
   */
  code[class*="language-"] {
    background-color: #fdf6e3;
    padding: 0.3em;
    border-radius: 0.3em;
  }

  article p a {
    color: ${theme.colors.primary};
    :hover {
      opacity: 0.75;
    }
  }
`

const PostContent = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 2.3rem;
`;

const BlogPostTemplate = props => {
  const postNode = props.data.markdownRemark;
  const post = postNode.frontmatter;

  return (
    <Layout>
      <Content>
        <Title>{post.title}</Title>
        <Subline>
          {post.date}
        </Subline>
        <PostContent dangerouslySetInnerHTML={{ __html: postNode.html }} />
      </Content>
    </Layout>
  );
};

export default BlogPostTemplate;

export const postQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;