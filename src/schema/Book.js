import { 
GraphQLObjectType,
GraphQLString,
GraphQLNonNull,
GraphQLID,
GraphQLList,
} from 'graphql'
import { AuthorType }  from './Author'
import Author from '../models/author'
import Book from '../models/book'
import loGet from 'lodash/get'


export const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID)},
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author : {
            type : AuthorType,
            resolve : async (parent , args) =>{
               const author = await Author.findById(parent.authorId)
               return author
            }
        }
    })
});

export const addBook = {
   type: BookType,
   args: {
   name :{ type : GraphQLString},
   genre : { type : GraphQLString },
   authorId: { type: GraphQLID }
   },  
   resolve: ( parent,args ) => { 
      let book = new Book(Object.assign({} ,args))
      return book.save()    
   }
}

export const updateBook = {
   type : BookType,
   args : {
     id: { type : GraphQLID},  
     name: { type : GraphQLString},
     genre: { type : GraphQLString },
     authorId : { type : GraphQLID }
   },
   resolve: async ( parent, args ) =>{ 
   const book = await Book.findById(args.id).select('-__v -updatedAt').exec()
   const name = loGet(args , ['name'])
   const genre = loGet(args , ['genre'])
   const authorId = loGet(args , ['authorId'])
   Object.assign(book,{ name , genre,authorId})
   
   Object.keys(book).forEach(item => {
    if (book[item] === undefined || book[item] === null) delete book[item]
   })   
    return book.save() 
   } 
}

export const deleteBook = { 
    type: BookType,
    args: {
    id : { type: GraphQLID }
    },  
    resolve: async ( parent,args ) => { 
     const book = await Book.findById(args.id)   
     if(!book) return 'the book not exist'
     return book.remove()
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
