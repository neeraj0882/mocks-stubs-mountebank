function GetTemplateResponse (request, state, logger) {
response = JSON.parse("<%- stringify(filename, '../StubTemplate/Transactiondata.json') %>");
var ext =require('./extractrequest');
var reqdata = ext.extractor(request);
console.log(reqdata);
response.data.MemberNumber=reqdata.MemberNumber;
return {
statusCode : 200,
headers: {
'Content-Type': 'application/json; charset=utf-8'
},
body: response
};
}