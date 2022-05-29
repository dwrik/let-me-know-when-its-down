import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxlength: 60,
  },
  passwordHash: {
    type: String,
    required: true,
  },
})

userSchema.set('toJSON', {
  transform: function (doc, retObj) {
    retObj.id = retObj._id
    delete retObj._id
    delete retObj.__v
    delete retObj.passwordHash
  }
})

export default mongoose.models.User || mongoose.model('User', userSchema)