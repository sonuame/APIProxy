import json
import falcon
import requests

from wsgiref import simple_server

API_FORWARDER_HOST = "127.0.0.1"
API_FORWARDER_PORT = 8888
API_FORWARDER_RECEIVER = "https://dev.tripsaathi.com"

class APIForwarderResource(object):

    def on_get(self, req, res, action):
        res.body = self.build_response(req, res, action, False)

    def on_post(self, req, res, action):
        res.body = self.build_response(req, res, action)

    def build_response(self, req, res, action, isPost=True):
        ret = {}
        res.set_header("Content-type", "application/json")
        res.status = falcon.HTTP_200

        if isPost:

            try:
                json_post = json.load(req.stream)
                py_request = requests.post("%s%s" % (API_FORWARDER_RECEIVER, action), json.dumps(json_post), headers={'content-type': 'application/json'})
                ret = py_request.json()
            except Exception as e:
                print (f"The error is: {str(e)}")
                res.status = falcon.HTTP_500
                ret = {}

        return json.dumps(ret)

class APIForwarderServer(object):

    def __init__(self, host=API_FORWARDER_HOST, port=API_FORWARDER_PORT):
        self.host = host
        self.port = port
        self.falcon_app = falcon.API()
        self.forwarder_resource = APIForwarderResource()
        self.falcon_app.add_route("/forwards/{action}", self.forwarder_resource)

    def runTestServer(self):

        test_server = simple_server.make_server(self.host, self.port,self.falcon_app)
        try:
            print (f"Running test server at: http://{self.host}:{self.port}")
            test_server.serve_forever()
        except KeyboardInterrupt:
            print ("\nServer terminated...\n")

if __name__ == "__main__":

    forwarder_server = APIForwarderServer()
    forwarder_server.runTestServer()