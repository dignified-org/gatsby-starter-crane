import React from 'react'
import { graphql } from 'gatsby'
import { FormattedNumber } from 'react-intl';
import Layout from '../components/layout';

function ProductPage({ data }) {
  console.log(data);

  const product = data.shopifyProduct

  const { minVariantPrice, maxVariantPrice } = product.priceRange;
  const images = product.images.edges.map((edge) => edge.node);

  return (
    <Layout>
      <div className="container mx-auto bg-white py-8 border-t border-gray-400">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            {
              images.map((img) => (
                <div key={img.id} className="bg-white border rounded-lg overflow-hidden">
                  <div className="relative pb-2/3">
                    <img className="absolute h-full w-full object-cover" src={img.originalSrc} alt={img.altText} />
                  </div>
                </div>
              ))
            }
          </div>


          <div className="">
            <h2 className="text-5xl">{product.title}</h2>
            <p className="text-xl">
              {minVariantPrice.amount !== maxVariantPrice.amount && 'From '}
              <FormattedNumber
                value={Number.parseFloat(minVariantPrice.amount)}
                style="currency"
                currency={minVariantPrice.currencyCode}
                />
            </p>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
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
`

export default ProductPage