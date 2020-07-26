const AWS = require("aws-sdk")

exports.handler = function(event, context, callback) {
  const s3 = s3Client()

  message = JSON.parse(JSON.parse(event.body).Message)
  message.rating = parseInt(message.rating)
  message.rrp = parseFloat(message.rrp).toFixed(2)

  if (message.type === "red" && message.rating >= 4) {
    message.price = (1.1 * message.rrp).toFixed(2)
    console.log("A great wine! Our price:", message.price)
    s3.upload(s3Payload(message), function(err, data) {
      if (err)  { return { statusCode: 500, body: JSON.stringify(error) } } 
      else      { return { statusCode: 200, body: JSON.stringify(message) } }
    })
  } else {
    console.log("Not good enough with a rating of", message.rating)
    return { statusCode: 200, body: "This wine is not good enough." }
  }
}

const s3Client = () => {
  return new AWS.S3({
    accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    region: "ap-southeast-2",
  })
}

const s3Payload = (message) => {
  return {
    Bucket: "poc-serverless-etl",
    Key: `${folderName()}/${message.id}.json`,
    Body: JSON.stringify(message),
    ACL: "private",
    ContentEncoding: "utf8",
    ContentType: `application/json`,
  }
}

const folderName = () => {
  d = new Date()
  return `${d.getFullYear()}${1 + d.getMonth()}${d.getDate()}${d.getHours()}${d.getMinutes()}`
}
