const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const productsResult = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
    }
  `)


  productsResult.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `/products/${node.handle}`,
      component: path.resolve(`./src/templates/product.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        handle: node.handle,
      },
    })
  });

  const collectionsResult = await graphql(`
    {
      allShopifyCollection {
        edges {
          node {
            handle
            products {
              handle
            }
          }
        }
      }
    }
  `)


  collectionsResult.data.allShopifyCollection.edges.forEach(({ node }) => {
    node.products.forEach((product) => {
      createPage({
        path: `/collections/${node.handle}/products/${product.handle}`,
        component: path.resolve(`./src/templates/product.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: product.handle,
          collectionHandle: node.handle,
        },
      })
    })

    createPage({
      path: `/collections/${node.handle}`,
      component: path.resolve(`./src/templates/collection.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        handle: node.handle,
      },
    })
  });
}