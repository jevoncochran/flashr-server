/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  return knex("cards").insert([
    {
      front: "birth mark",
      back: "lunar",
      categoryId: "1",
      archived: false,
    },
    {
      front: "informant",
      back: "campanero/a",
      categoryId: "1",
      archived: false,
    },
    {
      front: "bluetooth speaker",
      back: "bafle o bocina",
      categoryId: "1",
      archived: false,
    },
    {
      front: "Give them an inch and they'll take a mile",
      back: "si le das un dedo, se toma la mano entera",
      categoryId: "1",
      archived: false,
    },
    {
      front: "no way no how",
      back: "ni por el putas/ni por qué me pagan",
      categoryId: "1",
      archived: false,
    },
    {
      front: "if it was up to me...",
      back: "Por mi fuera, todos los días [culiaba]",
      categoryId: "1",
      archived: false,
    },
    {
      front: "lingerie",
      back: "encaje",
      categoryId: 1,
      archived: false,
    },
    {
      front: "in NextJS, this is how we retrieve props at build time",
      back: "getStaticProps",
      categoryId: "2",
      archived: false,
    },
    {
      front: "in NextJS, this is how we retrieve props at run time",
      back: "getServerSideProps",
      categoryId: "2",
      archived: false,
    },
    {
      front:
        "in NextJS, this is how we control which pages get generated at build. getStaticProps has to be used here as well.",
      back: "getStaticPaths",
      categoryId: "2",
      archived: false,
    },
    {
      front: "In GraphQL, this is how you make changes to the data",
      back: "mutation",
      categoryId: "2",
      archived: false,
    },
    {
      front: "What are the benefits of NextJS?",
      back: "Where SPAs only serve blank templates, NextJS makes content available on the server that can be read by web crawlers and is really good for SEO",
      categoryId: "2",
      archived: false,
    },
    {
      front: "What are the benefits of GraphQL",
      back: "It allows the client to quickly retrieve the pieces of the data that it needs without overfetching or underfetching. This is it's main strength vis-a-vis REST api's",
      categoryId: "2",
      archived: false,
    },
  ]);
};
