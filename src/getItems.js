const AWS = require('aws-sdk')


const getItems = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    
    const result = await dynamodb.scan({
        TableName: 'ItemTable'
    }).promise()

    const data = result.Items

    return {
        status: 200,
        body: data
    }

}

module.exports = {
    getItems
}