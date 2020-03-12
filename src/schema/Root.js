import { GraphQLObjectType, GraphQLString ,GraphQLSchema , GraphQLList , GraphQLID }  from 'graphql'
// import { BookType } from './Book'
// import { AuthorType } from './Author'
import { BookType,book,books }  from './Book'
import { AuthorType,author,authors}  from './Author'
import Mutation from './Mutation'


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book,
        books,
        author,
        authors

    }
});

const graphQLSchema = new GraphQLSchema({
    query: RootQuery,
    mutation : Mutation
});

export default  graphQLSchema 


