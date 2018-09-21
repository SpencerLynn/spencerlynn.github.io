import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { Content, Layout, Subline } from 'components';

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
        date(formatString: "DD.MM.YYYY")
      }
    }
  }
`;