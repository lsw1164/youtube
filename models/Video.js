import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required"
  },
  title : {
      type:String,
      required: "Title is required"
  },
  description : String,
  views : {
      type: Number,
      defatul: 0
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
  comments :[
      {
          type: mongoose.Schema.Types.ObjectId,
          ref:"Coment"
      }
  ] 

});

const model = mongoose.model("Video", VideoSchema);
export default model;