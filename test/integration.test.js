const axios = require("axios")

describe("Integration Test", () => {
    test("Get all items", async () => {
        const response = await axios.get("http://localhost:3000/items");

        expect(response.status).toEqual(200);
    });
});