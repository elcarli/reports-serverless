const AWS = require('aws-sdk')
const { UpdateExpression, ExpressionAttributes } = require('@aws/dynamodb-expressions');
const { unmarshall } = AWS.DynamoDB.Converter;

const updateExpressionProps = (expression) => {
    attributes = new ExpressionAttributes();

    return {
        UpdateExpression: expression.serialize(attributes),
        ExpressionAttributeNames: attributes.names,
        ExpressionAttributeValues: unmarshall(attributes.values),
    };
};

const updateItem = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters

    const newData = JSON.parse(event.body)
    
    const updatedAt = new Date().toISOString()
    newData.updatedAt = updatedAt

    expression = new UpdateExpression();
    
    const keys = Object.keys(newData)

    for (const key of keys) {
        console.log(`${key}`, newData[key])
        expression.set(`${key}`, newData[key])
    }

    await dynamodb.update({
        TableName: 'ItemTable',
        Key: { id },
        ...updateExpressionProps(expression),
        ReturnValues: 'ALL_NEW'
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Item updated successfully"
        })
    }
}

module.exports = {
    updateItem
}