import { addAuthor , updateAuthor } from './Author'
import { addBook, updateBook,deleteBook } from './Book'
import { GraphQLObjectType } from 'graphql'

 const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields : {
        addAuthor,
        addBook,
        updateBook,
        deleteBook,
        updateAuthor,
    }  
 })

 export default Mutation 