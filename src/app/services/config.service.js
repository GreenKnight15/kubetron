"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
// const k8s = require('@kubernetes/client-node');
var api_1 = require("@kubernetes/client-node/dist/api");
var config_1 = require("@kubernetes/client-node/dist/config");
var ConfigService = /** @class */ (function () {
    function ConfigService() {
        this.kc = new config_1.KubeConfig();
        this.kc.loadFromDefault();
        this.k8sApi = this.kc.makeApiClient(api_1.CoreV1Api);
    }
    ConfigService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ConfigService);
    return ConfigService;
}());
exports.ConfigService = ConfigService;
