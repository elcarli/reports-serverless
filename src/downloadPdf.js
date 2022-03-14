const AWS = require('aws-sdk')
const { Parser, transforms: { flatten } } = require('json2csv');
const PDFDocument = require("pdfkit-table");


const generatePdf = async (arrayOfArrays) => {

    return new Promise((resolve, reject) => {
        // create document
        let doc = new PDFDocument({ margin: 30, size: 'A4' });

        const headers = arrayOfArrays.shift()

        //{ label:"Name", property: 'name', width: 60}

        const myHeaders = headers.map(value => {
            const newHeader = {
                label: `"${value}"`,
                property: `'${value}'`,
                width: 65
            }
            if (value == "id") {
                console.log("WIDTH 400")
                newHeader.width = 140
            }

            return newHeader
        })

        // requires 
        const table = {
            title: "Title",
            headers: myHeaders,
            rows: arrayOfArrays,
        };
        doc.table(table, {
            // A4 595.28 x 841.89 (portrait) (about width sizes)
            width: 300,
            //columnsSize: [ 200, 100, 100 ],
        });
        // end code
        doc.end();

        const buffers = [];
        doc.on("data", buffers.push.bind(buffers));
        doc.on("end", () => {
            const pdfData = Buffer.concat(buffers);
            resolve(pdfData);
        });
    });
};

const downloadPdf = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const result = await dynamodb.scan({
            TableName: 'ItemTable'
        }).promise()

        const data = result.Items

        const json2csvParser = new Parser({
            quote: '',
            transforms: [flatten({
                objects: true,
                arrays: true,
                separator: '_'
            })]
        });
        const csvData = json2csvParser.parse(data);

        console.log('csvData');
        console.log(csvData);

        const arrayOfArrays = csvData
            .slice(0)
            .split('\n')
            .map(v => v.split(','));

        console.log('arrayOfArrays');
        console.log(arrayOfArrays);

        const stream = await generatePdf(arrayOfArrays);

        console.log('stream')
        console.log(stream)

        return {
            statusCode: 200,
            isBase64Encoded: true,
            headers: {
                "Content-type": "application/pdf",
                'Content-Disposition': 'attachment; filename="report.pdf"',
            },
            body: stream.toString("base64")
        };

    } catch (e) {
        console.log(e)
        return {
            status: 400,
            error: e
        }
    }

}

module.exports = {
    downloadPdf
}