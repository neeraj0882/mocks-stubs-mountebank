module.exports = {extractor:function extractCIFAndPackageID (request) {
if(request && request.path) {
var req = request.path.split('/');
if(req.length >2 && req[1]) {
    console.log(req.length);
return { MemberNumber: req[req.length-1] }
}
}
return null;
}}