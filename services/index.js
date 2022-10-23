import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              nome
              id
              foto {
                url
              }
            }
            createdAt
            slug
            titulo
            excerpt
            featuredImage {
              url
            }
            categorias {
              nome
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.postsConnection.edges;
};

export const getCategories = async () => {
  const query = gql`
    query GetGategories {
      categorias {
        nome
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);

  return result.categorias;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        titulo
        excerpt
        featuredImage {
          url
        }
        author {
          nome
          bio
          foto {
            url
          }
        }
        createdAt
        slug
        conteudo {
          raw
        }
        categorias {
          nome
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getSimilarPosts = async (categorias, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categorias: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categorias_some: { slug_in: $categorias } }
        }
        last: 3
      ) {
        titulo
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug, categorias });

  return result.posts;
};

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        titulo
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        titulo
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categorias_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              nome
              id
              foto {
                url
              }
            }
            createdAt
            slug
            titulo
            excerpt
            featuredImage {
              url
            }
            categorias {
              nome
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          nome
          foto {
            url
          }
        }
        featuredImage {
          url
        }
        titulo
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comentarios(where: { post: { slug: $slug } }) {
        nome
        createdAt
        comentario
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.comentarios;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        titulo
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};
