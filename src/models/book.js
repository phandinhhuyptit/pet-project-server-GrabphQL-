import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const bookSchema = new Schema({ 
  genre: { type: String,required : true},
  active: { type: Boolean, default: true },
  name : { type : String, required : true} 
})

bookSchema.plugin(uniqueValidator)
export default mongoose.model('Book',bookSchema)
