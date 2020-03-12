import { 
GraphQLObjectType,
GraphQLString,
GraphQLNonNull,
GraphQLID,
GraphQLInt,
GraphQLList,
}
 from 'graphql'
import { 
    books 
} from '../utils/contants'
import Author from '../models/author'


export const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ( ) => ({
        id: { type: GraphQLNonNull(GraphQLID)},
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    })
});

export const addAuthor = {
    type : AuthorType,
    args : {
      name : { type : GraphQLString},
      age  : { type : GraphQLInt}
    },  
    resolve: ( parent , args) => { 
       let author = new Author(Object.assign({} ,args))
       return author.save()
    }
 }

 export const author = {
    type : AuthorType,
    args : {
      id : { type : GraphQLID},
    },  
    resolve: ( parent , args) => { 
       return Author.findById(args.id)
    }
 }
  
 export const authors = {
    type: new GraphQLList(AuthorType),
    resolve : () => Author.find({})  
 } 


