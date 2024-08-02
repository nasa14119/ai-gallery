import Images from "../models/images.model.js"

export const getImage = async (req, res) => {
    const post = await Images.findOne({user:req.user.id}, {
        images:{$elemMatch: {_id: req.params.id}}
    })
    if(!post) return res.status(404).json({message: "No post was found"}); 
    res.json(post.images[0]); 
}
export const getImages = async (req, res) => {
    const posts = await Images.findOne({user:req.user.id})
    res.json(posts.images); 
}
export const addImage = async (req, res) => {
    console.log("Image Added" , req.body)
    const {title, src, size} = req.body
    const id = req.user.id
    const newPost = { title, src, size }; 
    console.log(newPost)
    const savedPost = await Images.updateOne({user: id}, {$addToSet: { images: {...newPost}}})
    res.json(savedPost); 
}
export const updateImage = async (req, res) => {
  const id_image = req.params.id;
  const id_user = req.user.id;
  const post = await Images.updateOne(
    { user: id_user, images: { $elemMatch: { _id: id_image } } },
    {
      $set: {
        "images.$": { ...req.body },
      },
    }
  );
  if (!post) return res.status(404).json({ message: "No post was found" });
  return res.json(post);
};
export const deleteImage = async (req, res) => {
    const id_image = req.params.id
    const id_user = req.user.id 
    const post = await Images.updateOne({user:id_user}, {$pull :{
        images: {_id: id_image}
    }});
    if(!post) return res.status(404).json({message: "No post was found"}); 
    res.sendStatus(204); 
}