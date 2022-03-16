const AWS = require('aws-sdk')


const getItems = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const result = await dynamodb.scan({
            TableName: 'ItemTable'
        }).promise()

        const data = result.Items

        return {
            status: 200,
            body: data
        }
    } catch (e) {
        return {
            status: 500,
            error: e
        }
    }

}

module.exports = {
    getItems
}