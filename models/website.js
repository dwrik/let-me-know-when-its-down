import mongoose from 'mongoose'

const websiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  users: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    default: [],
  }
})

websiteSchema.set('toJSON', {
  transform: function (doc, retObj) {
    retObj.id = retObj._id
    delete retObj._id
    delete retObj.__v
  }
})

export default mongoose.models.Website || mongoose.model('Website', websiteSchema)