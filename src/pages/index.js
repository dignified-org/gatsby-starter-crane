import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const products = data.allShopifyProduct.edges.map(edge => edge.node);



  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      {products.map(product => (
        <div key={product.id}>
          <Link to={`/product/${product.handle}`}>
              <img src={product.images.edges[0].node.originalSrc} />
            </Link>
          <p>{product.title}</p>
        </div>
      ))}
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
}
  

export const query = graphql`
query MyQuery {
  allShopifyProduct (limit: 20, sort:{ fields:updatedAt, order: DESC }) {
    edges {
      node {
        id
        handle
        title
        images {
          edges {
            node {
              id
              originalSrc
            }
          }
        }
      }
    }
  }
}
`;

export default IndexPage
