// qualquer coisa dentro da pasta folders/api vai ser mapeado para /api/* e vai ser tratado como um endpoint API ao invéz de uma pagina
import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCS_TOKEN;

export default async function comentarios(req, res) {
  // const { nome, email, slug, comment } = req.body;

  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  });
  const query = gql`
    mutation CreateComentario(
      $nome: String!
      $email: String!
      $comentario: String!
      $slug: String!
    ) {
      createComentario(
        data: {
          nome: $nome
          email: $email
          comentario: $comentario
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;
  const result = await graphQLClient.request(query, {
    nome: req.body.nome,
    email: req.body.email,
    comentario: req.body.comentario,
    slug: req.body.slug,
  });
  console.log(result, "resultado api");
  return res.status(200).send(result);
}
