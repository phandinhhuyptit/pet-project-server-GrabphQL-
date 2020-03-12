import { 
GraphQLObjectType,
GraphQLString,
GraphQLNonNull,
GraphQLID,
GraphQLInt,
GraphQLList,
}
 from 'graphql'
import Author from '../models/author'


export const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    })
});

export const addAuthor = {
    type : AuthorType,
    args : {
      name: { type : GraphQLString},
      age: { type : GraphQLInt}
    },  
    resolve: ( parent,args ) => { 
       let author = new Author(Object.assign({} ,args))
       return author.save()
    }
 }

export const updateAuthor = {
   type: AuthorType,
   args: {
     id : { type: GraphQLID }, 
     name: { type: GraphQLString},
     age: { type: GraphQLInt}
   },  
   resolve: async ( parent,args ) => {
      const name = loGet(args , ['name'])
      const age = loGet(args , ['age'])
      const author = await findById(args.id).select('__v')
      Object.assign(author,{ name , age})
      Object.keys(author).forEach(item =>{
        if(author[item] === undefined || author[item] === null) delete author[item]
      })       
      await author.save()
      return author
   }
}

export const author = {
    type: AuthorType,
    args: {
      id: { type : GraphQLID },
    },  
    resolve: ( parent , args) => { 
       return Author.findById(args.id)
    }
 }
  
 export const authors = {
    type: new GraphQLList(AuthorType),
    resolve : () => Author.find({})  
 } 


