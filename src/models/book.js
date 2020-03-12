import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const bookSchema = new Schema({ 
  genre: { type: String,default : null},
  active: { type: Boolean, default: true },
  name : { type : String},
  authorId : {type : String, default : null} 
})

bookSchema.plugin(uniqueValidator)
export default mongoose.model('Book',bookSchema)
