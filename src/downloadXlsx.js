const AWS = require('aws-sdk')
const { Parser, transforms: { flatten } } = require('json2csv');
const XLSX = require("xlsx");

const downloadXlsx = async (event) => {
    //const dynamodb = new AWS.DynamoDB.DocumentClient();

    // const result = await dynamodb.scan({
    //     TableName: 'ItemTable'
    // }).promise()

    // const data = result.Items

    //------------

    try {
        const myCars = [
            {
                "car": { "make": "Audi", "model": "A3" },
                "price": 40000,
                "color": "blue"
            }, {
                "car": { "make": "BMW", "model": "F20" },
                "price": 35000,
                "color": "black"
            }, {
                "car": { "make": "Porsche", "model": "9PA AF1" },
                "price": 60000,
                "color": "green"
            }
        ];

        //const json2csvParser = new Parser({ excelStrings: true, transforms: [flatten('__')] });
        const json2csvParser = new Parser({
            quote: '',
            transforms: [flatten({
                objects: true,
                arrays: true,
                separator: '_'
            })]
        });
        const csvData = json2csvParser.parse(myCars);

        console.log('csvData');
        console.log(csvData);

        const arrayOfArrays = csvData
            .slice(0)
            .split('\n')
            .map(v => v.split(','));

        console.log('arrayOfArrays');
        console.log(arrayOfArrays);

        // initiate the workbook
        const wb = XLSX.utils.book_new();

        // add properties to the sheet
        wb.Props = {
            Title: 'Books Borrowed',
            Subject: 'Borrowed Books',
            Author: 'Admin',
            CreatedDate: '2022-03-13',
        };

        // add a sheet
        wb.SheetNames.push('Test');

        const ws = XLSX.utils.aoa_to_sheet(arrayOfArrays);
        wb.Sheets.Test = ws;

        // generate output as buffer
        const wbOut = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'base64',
        });

        return {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="hello.xlsx"',
            },
            statusCode: 200,
            body: wbOut,
            isBase64Encoded: true
        }
    } catch (e) {
        console.log(e)
        return {
            status: 400,
            error: e
        }
    }

}

module.exports = {
    downloadXlsx
}