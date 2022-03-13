const AWS = require('aws-sdk')

const deleteItem = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    await dynamodb.delete({
        TableName: 'ItemTable',
        Key: { id }
    }).promise()

    return {
        status: 200,
        body: {
            message: `Item with ID: ${id} was deleted`
        }
    }
}

module.exports = {
    deleteItem
}