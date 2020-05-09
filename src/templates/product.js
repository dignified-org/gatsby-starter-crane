import React from 'react'
import { graphql } from 'gatsby'

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  return (
    <pre>
      {JSON.stringify(product, null, 2)}
    </pre>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
    }
  }
`

export default ProductPage