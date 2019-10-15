"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var PodListComponent = /** @class */ (function () {
    function PodListComponent(configService) {
        this.configService = configService;
    }
    PodListComponent.prototype.ngOnInit = function () {
        this.k8s = this.configService.k8s;
        this.k8sApi = this.configService.k8sApi;
        this.pods = this.k8s.listNamespacedPod('default')
            .then(function (res) {
            // tslint:disable-next-line:no-console
            console.log(res.body);
        });
        this.pods = {};
    };
    PodListComponent = __decorate([
        core_1.Component({
            selector: 'app-pod-list',
            templateUrl: './PodList.component.html',
            styleUrls: ['./PodList.component.css']
        })
    ], PodListComponent);
    return PodListComponent;
}());
exports.PodListComponent = PodListComponent;
