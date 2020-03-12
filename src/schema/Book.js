import { 
GraphQLObjectType,
GraphQLString,
GraphQLNonNull,
GraphQLID,
GraphQLList,
} from 'graphql'
import { AuthorType }  from './Author'
// import { authors  } from '../utils/contants'
import Author from '../models/author'
import Book from '../models/book'


export const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID)},
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author : {
            type : AuthorType,
            resolve : (parent , args) =>{
                console.log(parent, "hellos")
                // return authors.find(author => author.id === parent.authorId)
            }
        }
    })
});

export const addBook = {
   type : BookType,
   args : {
     name : { type : GraphQLString},
     genre : { type : GraphQLString },
     authorId: { type: GraphQLID }
   },  
   resolve: ( parent , args) => { 
      console.log(args)
      let book = new Book(Object.assign({} ,args))
      console.log(book)
      return book.save()    
   }
}

export const book = {
   type: BookType,
   args : {id : { type: GraphQLID }},
   resolve : (parent, args) => { 
    return  Book.findById(args.id)
   }   
}

export const books = {
    type: new GraphQLList(BookType),
    resolve : (parent, args) => { 
     return  Book.find({})
    }
}
