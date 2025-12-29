const ImageKit = require("imagekit")

const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URL_ENDPOINT
})

async function uploadFile(file, fileName){

    const responce = await imagekit.upload({
        file: file,
        fileName: fileName,
        folder: "ai-social"
    })

    return responce
}

module.exports = uploadFile