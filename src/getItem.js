const AWS = require('aws-sdk')


const getItem = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters

    const data = await dynamodb.get({
        TableName: 'ItemTable',
        Key: {
            id
        }
    }).promise()

    const item = data.Item

    return {
        status: 200,
        body: item
    }
}

module.exports = {
    getItem
}