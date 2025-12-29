const postModel = require("../model/post.model")
const generateCaption = require("../service/ai.service")

async function createPostController(req, res){
    const file = req.file
    
    const base64image = new Buffer.from(file.buffer).toString("base64")

    const caption = await generateCaption(base64image)

    res.json({
        caption
    })
}

module.exports = {createPostController}