require('dotenv').config();

const neo4j = require('neo4j-driver');
import { Neo4jGraphQL } from '@neo4j/graphql';
import {ApolloServer} from "apollo-server";
const { gql } = require('apollo-server');
import { typeDefs } from './schema'

const schema = new Neo4jGraphQL({
    typeDefs,
}).schema;

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

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});

process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    server.stop()
});
process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    server.stop()
});

process.on("STOP", function(){
    console.log("Exiting apollo server");
    server.stop()
})