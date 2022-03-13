const { v4 } = require('uuid')
const AWS = require('aws-sdk')


const addItem = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    
    const createdAt = new Date().toISOString()
    const id = v4()

    const newItem = JSON.parse(event.body)
    newItem.id = id
    newItem.createdAt = createdAt

    await dynamodb.put({
        TableName: 'ItemTable',
        Item: newItem
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    }
}

module.exports = {
    addItem
}