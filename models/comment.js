import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const commentSchema = new mongoose.Schema({
  content: {
    type: String
  },

  blogs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('Comment', commentSchema)
