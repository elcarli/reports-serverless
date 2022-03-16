const AWS = require('aws-sdk')
const { getItemData } = require('./utils')

const addItem = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const data = getItemData(event.body)

        await dynamodb.put({
            TableName: 'ItemTable',
            Item: data
        }).promise()

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (e) {
        return {
            statusCode: 500,
            error: e
        }
    }
}

module.exports = {
    addItem
}