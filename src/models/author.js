import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const authorSchema = new Schema({ 
  age: { type: Number },
  name : { type : String, required : true} 
})

authorSchema.plugin(uniqueValidator)
export default mongoose.model('Author',authorSchema)
