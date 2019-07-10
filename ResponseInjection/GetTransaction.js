function GetResponse (request, state, logger) {
response = JSON.parse("<%- stringify(filename, '../StubTemplate/Transactiondata.json') %>");
return {
statusCode : 200,
headers: {
'Content-Type': 'application/json; charset=utf-8'
},
body: response
};
}