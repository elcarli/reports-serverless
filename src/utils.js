const { v4 } = require('uuid')

function getItemData(body) {
    const createdAt = new Date().toISOString()
    const id = v4()

    const newItem = JSON.parse(body)
    newItem.id = id
    newItem.createdAt = createdAt

    delete (newItem.updatedAt)

    return newItem
}

function getNewData(body) {
    const newData = JSON.parse(body)
    newData.updatedAt = new Date().toISOString()

    delete (newData.id)
    delete (newData.createdAt)

    return newData
}

module.exports = {
    getItemData,
    getNewData
}