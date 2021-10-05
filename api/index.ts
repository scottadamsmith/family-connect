require('dotenv').config();

const neo4j = require('neo4j-driver');
import { Neo4jGraphQL } from '@neo4j/graphql';
import {ApolloServer} from "apollo-server";
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
`;

const schema = new Neo4jGraphQL({
    typeDefs,
}).schema;

console.log(process.env.DB_URI)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)


const driver = neo4j.driver(
    process.env.DB_URI,
    neo4j.auth.basic(
        process.env.DB_USER,
        process.env.DB_PASSWORD,
    )
);

function context({ event, context }: { event: any, context: any }): any {

    return ({
        event,
        context,
        driver,
    });
}

const server:ApolloServer = new ApolloServer(
    {
        schema,
        context,
    });


// @ts-ignore
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});