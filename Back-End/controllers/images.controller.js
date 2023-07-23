import Images from "../models/images.model.js"

export const getImage = async (req, res) => {
    const post = await Images.findById(req.params.id); 
    if(!post) return res.status(404).json({message: "No post was found"}); 
    res.json(post); 
}
export const getImages = async (req, res) => {
    const posts = await Images.find({user:req.user.id}).populate("user"); 
    res.json(posts); 
}
export const addImage = async (req, res) => {
    console.log("Image Added" , req.body)
    const {title, src, size} = req.body
    const newPost = new Images({
        title,
        src, 
        user: req.user.id, 
        size
    }); 
    const savedPost = await newPost.save(); 
    res.json(savedPost); 
}
export const updateImage = async (req, res) => {
    const post = await Images.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
    if(!post) return res.status(404).json({message: "No post was found"}); 
    res.json(post); 
}
export const deleteImage = async (req, res) => {
    const post = await Images.findByIdAndDelete(req.params.id); 
    if(!post) return res.status(404).json({message: "No post was found"}); 
    res.sendStatus(204); 
}