# Mountebank Setup for creating Stubs:
1. Clone the reporsitory.
All node modules are already part of the package
2. Run RunMB.bat file or `mb --configfile Configs/Imposter.ejs ` from command prompt to start up mountebank server.The following messages appear on the command window if everything has gone well.
info: [mb:2525] mountebank v1.10.0 now taking orders - point your browser to http://localhost:2525 for help
warn: [mb:2525] Running with --allowInjection set. See http://localhost:2525/docs/security for security info
info: [mb:2525] PUT /imposters
info: [https:443] Open for business...
info: [https:4333] Open for business...
Go to   http://localhost:2525 to verify if mountebank has started

## Following use cases/examples are covered as part of this repo:

**Replay already created  responses:**
1. Create a config with details with port and protocol for the stub and the response file
2. Create a response file with predicates(condition for matching a request) ex- Transaction.json
3. Write the javascript function ex. GetTransaction.js (optional-if you need to create dynamic responses)
4. Create the stub template with expected response ex. Transactiondata.json
5. Include the config in the imposter.ejs file
6. Go to command prompt and run the file RunMB.bat
7. Navigate  to http://localhost:2525/imposters to see the imposter created

**Testing the above created stub:**
Launch postman and  create a new GET request with the following url: http://localhost:2001/Transactions
If everything has worked, a stubbed response with status code 200 and body as defined in the Transactiondata.json would be returned.

**Modifying Responses at Runtime through Javascript Injection**

1. Create another javascript function which extracts member number in the url and sends it back in the saved response.
ie, GetMemberTransaction.js
2. Configure a response template which injects the above created function
3. Run the following command using --allowInjection
`mb --configfile Configs/Imposter.ejs  --allowInjection`

**Test Javascript Injection:**

Launch postman and  create a new GET request with the following url: http://localhost:2001/Transactions/2222
It should now return the stubbed response – Transactiondata.json but this time the member number would be 2222 in the response body instead of the pre-saved response

**Mimicking existing services through proxying:**

Mountebank offers 3 proxy modes:
1. proxyOnce - ensures that the same request (defined by the predicates) is never proxied twice. mountebank only records one response for each request, and automatically replays that response the next time the request predicates match.
2. proxyAlways - All calls will be proxied, allowing multiple responses to be saved for the same logical request. You have to explicitly tell mountebank to replay those responses.
3. proxyTransparent - All calls will be proxied, but will not be recorded

**Mimic a biztalk service:**
1. Create a config file with port and protocol and the response config eg. - server1.json
2. Create a response config and provide a suitable mode. Add predicate generators to it.
3. Add this to imposter.ejs

**Recording a request/response:**

Open SOAP UI and modify the service endpoint by replacing the server to which mountebank is going to proxy by mountebank server details as defined in the config
https://<mountebankserver>/enpoint
example:
https://localhost:2526/endpoint.svc

Stat mb by- `mb --configfile Configs/Imposter.ejs`

When you make the first request,the request gets to the actual server ie medbztci01 and actual response is received.

**Replaying the response:**

**For mode proxyAlways:**
There are 2 ways of replaying the response
From terminal:
Open another cmd prompt and provide command `mb replay`

By a saved stub file:
1. The response can be saved in a file using -
`mb save --savefile stubFilename.json –removeProxies`
2. Now replay the stub file using mb restart `--configfile stubFilename.json`.
Once the above command is executed mountebank switches over to replay mode

In both cases, when the same endpoint is hit a ,saved/recorded response would be returned from mountebank.

**For mode proxyOnce:**
After the request/response has been recorded ,next time the endpoint is hit, the response returned is from mountebank.No explicit switch is required.

**Mode can be chosen based on the stub requirement.**















