const utils = require('../src/utils');

const name = "Mario"
const phone = 123456

const body = JSON.stringify({
    "id": "123",
    "name": name,
    "phone": phone,
    "createdAt": "2022-03-15",
    "updatedAt": "2022-03-15"
})

test('correct item data is get from Create request', () => {

    const obj = utils.getItemData(body)

    expect(obj.name).toEqual(name);
    expect(obj.phone).toEqual(phone);
    expect(obj).toHaveProperty('id');
    expect(obj).toHaveProperty('createdAt');
    expect(obj).not.toHaveProperty('updatedAt');
});

test('correct item data is get from Update request', () => {

    const obj = utils.getNewData(body)

    expect(obj.name).toEqual(name);
    expect(obj.phone).toEqual(phone);
    expect(obj).toHaveProperty('updatedAt');
    expect(obj).not.toHaveProperty('id');
    expect(obj).not.toHaveProperty('createdAt');
});