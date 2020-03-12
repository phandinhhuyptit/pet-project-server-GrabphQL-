import { addAuthor } from './Author'
import { addBook } from './Book'
import { GraphQLObjectType } from 'graphql'


 const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields : {
        addAuthor,
        addBook,
    }  
 })

 export default Mutation 