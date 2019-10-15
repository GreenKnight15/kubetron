var express = require('express');
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

var app = express();

var PORT = 3000;

app.get('/', function(req, res) {
    res.status(200).send('{"msg":"Hello World"}');
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});

app.get('/pod/:namespace', function(req, res) {
  var namespace = req.params.namespace
  k8sApi.listNamespacedPod(namespace).then((response) => {
    res.status(response.response.statusCode).send(response.body)
  });
});

app.get('/namespace', function(req, res) {
  k8sApi.listNamespace(true).then(response => {
    res.status(response.response.statusCode).send(response.body)
  })
});
