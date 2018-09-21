import React from 'react';
import { graphql } from 'gatsby';

import { Content, Layout, Article } from 'components';

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges: postEdges },
  },
}) => (
  <Layout>
      <Content>
        {postEdges.map(post => (
          <Article
            title={post.node.frontmatter.title}
            date={post.node.frontmatter.date}
            excerpt={post.node.excerpt}
            slug={post.node.fields.slug}
            key={post.node.fields.slug}
          />
        ))}
      </Content>
  </Layout>
);

export default IndexPage;

export const IndexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { glob: "**/blogs/**"} } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`;
