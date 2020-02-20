const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const NewsSchema = new Schema({
  heading: {
    type: String
  },
  mainDetail: {
    type: String
  },
  newHeading: {
    type: String
  },
  paragraphs: [
    {
      heading: {
        type: String
      },
      paragraph: {
        type: String
      },
      isPic: {
        type: Boolean
      }
    }
  ]
    
  
  
});

module.exports = News = mongoose.model('News', NewsSchema);