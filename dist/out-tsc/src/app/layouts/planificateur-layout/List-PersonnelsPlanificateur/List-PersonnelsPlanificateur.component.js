"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ListPersonnelsComponent = /** @class */ (function () {
    function ListPersonnelsComponent() {
        this.columnDefs = [
            { headerName: 'Make', field: 'make', sortable: true, filter: true },
            { headerName: 'Model', field: 'model', sortable: true, filter: true },
            { headerName: 'Price', field: 'price', sortable: true, filter: true }
        ];
        this.rowData = [
            { make: 'Toyota', model: 'Celica', price: 35000 },
            { make: 'Ford', model: 'Mondeo', price: 32000 },
            { make: 'Porsche', model: 'Boxter', price: 72000 }
        ];
    }
    ListPersonnelsComponent.prototype.ngOnInit = function () {
    };
    ListPersonnelsComponent = __decorate([
        core_1.Component({
            selector: 'app-list-personnels',
            templateUrl: './List-PersonnelsPlanificateur.component.html',
            styleUrls: ['./List-PersonnelsPlanificateur.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ListPersonnelsComponent);
    return ListPersonnelsComponent;
}());
exports.ListPersonnelsComponent = ListPersonnelsComponent;
//# sourceMappingURL=List-PersonnelsPlanificateur.component.js.map