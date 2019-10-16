var express = require('express');
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sBetaApi = kc.makeApiClient(k8s.AppsV1beta1Api);

var app = express();

var PORT = 3000;

app.get('/', function(req, res) {
    res.status(200).send('{"msg":"Hello World"}');
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});

app.get('/:namespace/list/pod/', function(req, res) {
  var namespace = req.params.namespace
  k8sApi.listNamespacedPod(namespace,'true').then((response) => {
    res.status(response.response.statusCode).send(response.body)
  });
});

app.get('/:namespace/list/deployment/', function(req, res) {
  var namespace = req.params.namespace
  k8sBetaApi.listNamespacedDeployment(namespace,'true').then((response) => {
    res.status(response.response.statusCode).send(response.body)
  });
});

app.get('/:namespace/deployment/:name', function(req, res) {
  var namespace = req.params.namespace
  var name = req.params.name
  k8sBetaApi.readNamespacedDeployment(name,namespace,'true').then((response) => {
    res.status(response.response.statusCode).send(response.body)
  });
});

app.get('/:namespace/deployment/status/:name', function(req, res) {
  var namespace = req.params.namespace
  var name = req.params.name
  k8sBetaApi.readNamespacedDeploymentStatus(name,namespace,'true').then((response) => {
    res.status(response.response.statusCode).send(response.body)
  });
});

app.get('/namespace/list', function(req, res) {
  k8sApi.listNamespace(true).then(response => {
    res.status(response.response.statusCode).send(response.body)
  })
});

