const postModel = require("../model/post.model")
const generateCaption = require("../service/ai.service")
const uploadFile = require("../service/storage.service")
const {v4: uuidv4} = require("uuid")

async function createPostController(req, res){
    const file = req.file
    
    const base64image = new Buffer.from(file.buffer).toString("base64")

    // const caption = await generateCaption(base64image)
    // const result = await uploadFile(file.buffer, `${uuidv4()}`)

    const [ caption, result ] = await Promise.all([
        generateCaption(base64image),
        uploadFile(file.buffer, `${uuidv4()}`)
    ])

    const post = await postModel.create({
        caption: caption,
        image: result.url,
        user: req.user._id
    })

    res.status(201).json({
        message: "post created",
        post
    })
}

module.exports = {createPostController}