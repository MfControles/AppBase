webpackJsonp([0],{

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_font_font__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_alert_alert__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_http_comunication_http_comunication__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_signalr_signalr__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_database_database__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_nfc_nfc__ = __webpack_require__(318);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var HomePage = (function () {
    function HomePage(navCtrl, navParams, signalR, httpClient, Post, Alert, Loading, Global, db, storage, settings, platform, menuCtrl, nfcService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.signalR = signalR;
        this.httpClient = httpClient;
        this.Post = Post;
        this.Alert = Alert;
        this.Loading = Loading;
        this.Global = Global;
        this.db = db;
        this.storage = storage;
        this.settings = settings;
        this.menuCtrl = menuCtrl;
        this.nfcService = nfcService;
        this.bannn = platform.is('android');
        this.menuCtrl.enable(true, 'leftMenu');
        platform.registerBackButtonAction(function () {
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__login_login__["a" /* LoginPage */]);
        }, 1);
        this.db.GetTokenType(function (err, data2) {
            console.warn('Consultando API');
            if (err == null) {
                console.log(data2);
                _this.Global.TokenTypeData = (data2);
            }
            else {
                console.error("ERR   =>   " + err);
            }
        });
        this.storage.get('ITEM').then(function (val) {
            if (val == '' || val == ' ' || val == null) {
                _this.Global.Item = 10;
                _this.storage.set('ITEM', 10);
            }
            else {
                _this.Global.Item = val;
            }
            console.log('ITEM', val);
        });
        this.storage.get('LETTER').then(function (val) {
            if (val == '' || val == ' ' || val == null) {
                _this.settings.setActiveTheme('dark-theme');
                _this.storage.set('LETTER', 'dark-theme');
            }
            else {
                _this.settings.setActiveTheme(val);
            }
            console.log('LETTER', val);
        });
        this.db.GetCompany(function (err, data) {
            console.warn('Consultando API');
            if (err == null) {
                console.log(data);
                _this.Global.CompanyData = (data);
                if (data.length == 0) {
                    _this.Global.Exist = false;
                    console.log('this.Global.Exist=false');
                }
                else {
                    _this.Global.Exist = true;
                    console.log('this.Global.Exist=true');
                }
                _this.Global.Id_Company = data.Id_Company;
            }
            else {
                console.error("ERR   =>   " + err);
            }
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log("Initializing MF Reading!");
        this.nfcService.Listen(function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(data);
            }
        });
        console.log('Home Page');
        this.db.GetCountry(function (err, data) {
            console.warn('Consultando API');
            if (err == null) {
                console.log(data);
                _this.Global.Countries = (data);
                _this.db.GetCity(function (err, data) {
                    console.warn('Consultando API');
                    if (err == null) {
                        console.log(data);
                        _this.Global.Cities = (data);
                        _this.db.GetNFCSettings(function (err, data) {
                            console.warn('Consultando API');
                            if (err == null) {
                                console.log(data);
                                _this.Global.DataNFC = (data);
                                for (var i = 0; i < _this.Global.DataNFC.length; i++) {
                                    if (_this.Global.DataNFC[i].Field === "ReaderKey") {
                                        _this.Global.AuthCard.Key = _this.Global.DataNFC[i].Value;
                                        var stringKey = _this.Global.DataNFC[i].Value;
                                        _this.Global.AuthCard.keyCardReader = ["0x" + stringKey[0] + stringKey[1], "0x" + stringKey[2] + stringKey[3], "0x" + stringKey[4] + stringKey[5], "0x" + stringKey[6] + stringKey[7], "0x" + stringKey[8] + stringKey[9], "0x" + stringKey[10] + stringKey[11]];
                                    }
                                    if (_this.Global.DataNFC[i].Field === "ReaderAddress") {
                                        _this.Global.AuthCard.Block = Number(_this.Global.DataNFC[i].Value);
                                    }
                                    if (_this.Global.DataNFC[i].Field === "ReaderSector") {
                                        _this.Global.AuthCard.Sector = Number(_this.Global.DataNFC[i].Value);
                                    }
                                }
                                _this.Loading.HideLoading();
                            }
                            else {
                                console.error("ERR   =>   " + err);
                            }
                        });
                    }
                    else {
                        console.error("ERR   =>   " + err);
                    }
                });
            }
            else {
                console.error("ERR   =>   " + err);
            }
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Desarrollo\Ion\AdminUsers - copia\src\pages\home\home.html"*/'<ion-header>\n  <ion-toolbar style="padding: 0!important;margin: 0!important" hideBackButton="true">\n      <button ion-button style="color: white" menuToggle><ion-icon md="md-menu"></ion-icon></button>\n      <ion-title >Administrador de personas CI24</ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\Desarrollo\Ion\AdminUsers - copia\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_9__providers_signalr_signalr__["a" /* SignalrProvider */],
            __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5__providers_http_comunication_http_comunication__["a" /* HttpComunicationProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_10__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1__providers_font_font__["a" /* FontProvider */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_12__providers_nfc_nfc__["a" /* NfcProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 175:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 175;

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AjustesVPageModule", function() { return AjustesVPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_pagination__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_filter_pipe__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ajustes_v__ = __webpack_require__(361);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AjustesVPageModule = (function () {
    function AjustesVPageModule() {
    }
    AjustesVPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__ajustes_v__["a" /* AjustesVPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ngx_pagination__["a" /* NgxPaginationModule */],
                __WEBPACK_IMPORTED_MODULE_3_ngx_filter_pipe__["a" /* FilterPipeModule */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__ajustes_v__["a" /* AjustesVPage */]),
            ],
        })
    ], AjustesVPageModule);
    return AjustesVPageModule;
}());

//# sourceMappingURL=ajustes-v.module.js.map

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/ajustes-v/ajustes-v.module": [
		176
	],
	"../pages/login/login.module": [
		221
	],
	"../pages/settings/settings.module": [
		321
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 220;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_pagination__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_filter_pipe__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login__ = __webpack_require__(78);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var LoginPageModule = (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ngx_pagination__["a" /* NgxPaginationModule */],
                __WEBPACK_IMPORTED_MODULE_3_ngx_filter_pipe__["a" /* FilterPipeModule */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__login__["a" /* LoginPage */]),
            ],
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__login_login__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_global_global__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_alert_alert__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_http_comunication_http_comunication__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_signalr_signalr__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var SettingsPage = (function () {
    function SettingsPage(navCtrl, menuCtrl, navParams, httpClient, Post, Alert, Loading, signalR, global, storage, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.Post = Post;
        this.Alert = Alert;
        this.Loading = Loading;
        this.signalR = signalR;
        this.global = global;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.storage.get('IP').then(function (val) {
            if (val == '' || val == ' ' || val == null) {
            }
            else {
                _this.global.Url = val;
                _this.Url = val;
            }
            console.log('Url', val);
        });
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.Guardar = function () {
        if (this.Url == '' || this.Url == ' ' || this.Url == null || this.Url == undefined) {
            this.Loading.LoadingNormal("Error, se encuentran campos vacios", 2);
        }
        else {
            this.storage.set('IP', this.Url);
            this.global.Url = this.Url;
            this.Loading.LoadingNormal("Cambios Guardados");
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__login_login__["a" /* LoginPage */]);
        }
    };
    SettingsPage.prototype.Cancel = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__login_login__["a" /* LoginPage */]);
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"C:\Desarrollo\Ion\AdminUsers - copia\src\pages\settings\settings.html"*/'<ion-header>\n    <ion-navbar hideBackButton="true">\n      <ion-title align=center>Ajustes</ion-title>\n      <ion-buttons end>\n          <button ion-fab mini style="border:2px solid red;color:red;background:#ffffff " (click)="Cancel()">\n              <ion-icon name="close"></ion-icon>\n          </button>\n        </ion-buttons>\n    </ion-navbar>  \n  </ion-header>\n  \n  <ion-content padding>\n      <ion-card>\n          <ion-card-content>\n            <ion-item>\n              <ion-label>Url Servidor: </ion-label>\n              <ion-input style="font-size:14px" type="text" [(ngModel)]="Url"></ion-input>\n              </ion-item>\n          </ion-card-content>\n        </ion-card>\n         <button ion-button style="font-size:18px;padding:18px 35px " (click)="Guardar()" block>\n          Guardar Ajustes\n         </button>\n  </ion-content>\n  \n\n  '/*ion-inline-end:"C:\Desarrollo\Ion\AdminUsers - copia\src\pages\settings\settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__providers_http_comunication_http_comunication__["a" /* HttpComunicationProvider */],
            __WEBPACK_IMPORTED_MODULE_2__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_loading_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_signalr_signalr__["a" /* SignalrProvider */],
            __WEBPACK_IMPORTED_MODULE_1__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_8_ionic_angular__["m" /* ViewController */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GlobalProvider = (function () {
    function GlobalProvider(http, storage) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.IsLoggin = false;
        this.Exist = false;
        this.TarifaVacio = false;
        this.Dispositivo = "Tablet";
        this.isInitialized = false;
        this.storage.get('IP').then(function (val) {
            if (val == '' || val == ' ' || val == null) {
                _this.Url = 'http://192.168.14.204:5000';
            }
            else {
                _this.Url = val;
            }
            console.log('Url', val);
        });
        console.log('Hello GlobalProvider Provider');
        this.Auth = {
            User: "Camilo@ci24.com",
            Password: "Controles1"
        };
        this.RestDefinitions = {
            Success: 100
        };
        this.AuthCard = {
            Sector: 0,
            Block: 0,
            Key: "FFFFFFFFFFFF",
            IdTerminal: "",
            IdDevice: 0,
            keyCardReader: [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]
        };
    }
    GlobalProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], GlobalProvider);
    return GlobalProvider;
}());

//# sourceMappingURL=global.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NfcProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__global_global__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__alert_alert__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(264);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_nfc__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loading_loading__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__database_database__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var NfcProvider = (function () {
    function NfcProvider(nfc, Alert, Loading, Global, DataBaseService) {
        this.nfc = nfc;
        this.Alert = Alert;
        this.Loading = Loading;
        this.Global = Global;
        this.DataBaseService = DataBaseService;
        this.boolean = false;
        this.Interval = null;
        this.readSubject = new __WEBPACK_IMPORTED_MODULE_6_rxjs__["Subject"]();
        this.readObserver = null;
        this.writeValidation = false;
        this.intervalCheckingCard = null;
        this.readyToNewEvent = true;
        this.writeReadPromise = null;
    }
    ///// News Functions
    NfcProvider.prototype.InitCardReader = function () {
        console.log("Init Reader");
        if (this.Global.Dispositivo == "Tablet") {
            console.log('Ignoring checking reader');
        }
        else if (this.Global.Dispositivo == "Emulador") {
            /*
            this.sdk.CheckReader((err) => {
              console.log("Chequeando Lectora");
              if (err) {
                this.AlertService.AlertOneButton("Error", "Parece que la lectora SL025 no está conectada al equipo. Por favor conectar y reiniciar.");
              } else {
                console.log("CheckDevice reader OK");
              }
            });
            */
        }
    };
    NfcProvider.prototype.CardReaderListener = function (callback) {
        /*
      try{
        this.sdk.SendGetIdCard((err, data) => {
          if (err != null) {
            callback(err)
          } else if(err==null){
            console.log("Card Reader in Emulator!");
            callback(err)
          }
        });
      }catch (e) {
        console.log(e)
      }
*/
    };
    NfcProvider.prototype.ListenAndReadMF = function () {
        var _this = this;
        if (this.Global.Dispositivo == "Tablet") {
            console.log("Init Read Nfc");
            this.readObserver = new __WEBPACK_IMPORTED_MODULE_6_rxjs__["Subject"]();
            this.Listen().subscribe(function () {
                _this.ReadMF(_this.nfc, JSON.stringify(_this.Global.AuthCard), function (readData) {
                    _this.readObserver.next(readData);
                });
            });
            return this.readObserver;
        }
    };
    NfcProvider.prototype.ReadFromCardReaderEmulator = function (callback) {
        var dataToSend = {
            sector: this.Global.AuthCard.Sector,
            block: this.Global.AuthCard.Block,
            key: this.Global.AuthCard.keyCardReader,
            numBlocks: 1
        };
        console.log(JSON.stringify(dataToSend));
        /*
        this.sdk.ReadCard(dataToSend, (err, success) => {
          console.log(err);
          if (err) {
            callback(err);
          } else {
            console.log("ReadCard", success);
            callback(null, {
              TagData: this.toHexString(success.data),
              Id: this.decIdToHex(success.idCard),
              Token:success.idCard
            });
          }
        });
        */
    };
    /*
            public ReadMifareCard (callback:Function) {
              if(this.Global.Dispositivo=="Emulador") {
                console.log('Reading card from reader in Emulador');
                let message=""
                this.ReadFromCardReaderEmulator((err, cardData)=> {
                  if (err) {
    
                    switch (err){
                      case 4:
                        console.log("NO_CARD");
                        message="NO_CARD";
                        break;
                      case 5:
                        console.log("LOGIN FAIL");
                        message="LOGIN FAIL";
                        break;
                      default:
                        console.log(err);
                        message="UNDEFINED ERROR";
                        break;
                    }
                    this.LoadingService.LoadingNormal("Error Lectura  " +message,2);
                    callback(err);
                  } else {
                    console.log("cardData", JSON.stringify(cardData));
                    callback(null, cardData);
                  }
                });
              }
    
            }
    
              private WriteCardEmulator(dataToWrite, callback) {
                let deviceData={
                  sector: this.settings.auth.Sector,
                  block: this.settings.auth.Block,
                  key: this.settings.auth.keyCardReader,
                  data: dataToWrite.DataReaderCard
                };
                this.sdk.Write(deviceData, (err,data)=>{
                  if(err)
                  {
                    callback(err);
                  }
                  else{
                    console.log("Success Write ",JSON.stringify(data));
                    this.writeValidation = false;
                    callback(null);
                  }
                });
              }
    */
    /// End New Functions
    NfcProvider.prototype.NFCHAndler = function (success) {
        var _this = this;
        this.nfc.enabled().then(function () {
            success();
        }, function (error) {
            _this.Alert.AlertTowButtons("NFC", "Nfc desactivado, Desea activarlo?", "Sí", function () {
                _this.nfc.showSettings().then(function () { return console.log("Abriendo Settings"); }, function (err) { return console.log(err); });
            });
        });
    };
    NfcProvider.prototype.Listen = function (callback) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_6_rxjs__["Observable"].create(function (observer) {
            _this.nfc.enabled().then(function (success) {
                _this.tagDiscoveryPromise = _this.nfc.addTagDiscoveredListener(function (success) {
                    if (callback !== undefined) {
                        callback();
                    }
                    console.log("LISTENING");
                }, function (err) {
                    _this.Alert.AlertOneButton("NFC", "Parece ser que el NFC esta deshabilitado en el equipo");
                }).subscribe(function (event) {
                    //  this.LoadingService.LoadingNormal("leyendo tarjeta");
                    console.log('event', event);
                    if (_this.readyToNewEvent) {
                        _this.readyToNewEvent = false;
                        console.log("CARD DETECTED");
                        observer.next();
                    }
                    setTimeout(function () {
                        _this.readyToNewEvent = true;
                    }, 2000);
                });
            }, function (error) {
                _this.Alert.AlertOneButton("NFC", "Parece ser que el NFC esta deshabilitado en el equipo");
            }).catch(function (catch_e) { return console.log("NFC catch error => ", catch_e); });
        });
    };
    NfcProvider.prototype.decIdToHex = function (number) {
        //    console.log("decimal",number, typeof number);
        var hex = number.toString(16);
        //  console.log("hexa",hex, typeof hex);
        var prueba = "";
        switch (hex.length) {
            case 7:
                prueba = hex[5] + hex[6] + hex[3] + hex[4] + hex[1] + hex[2] + "0" + hex[0];
                break;
            case 8:
                prueba = hex[6] + hex[7] + hex[4] + hex[5] + hex[2] + hex[3] + hex[0] + hex[1];
                break;
            case 9:
                prueba = hex[7] + hex[8] + hex[5] + hex[6] + hex[3] + hex[4] + hex[1] + hex[2] + "0" + hex[0];
            case 6:
                prueba = hex[4] + hex[5] + hex[2] + hex[3] + hex[0] + hex[1] + "0" + "0";
            default:
        }
        //    console.log(prueba);
        return prueba;
    };
    NfcProvider.prototype.toHexString = function (byteArray) {
        return Array.from(byteArray, function (byte) {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    };
    NfcProvider.prototype.ListenAndWrite = function (dataToWrite, callback) {
        var _this = this;
        if (this.Global.Dispositivo == "Emulador") {
            /*
          this.ReadMifareCard((err, dataEvent)=> {
            if (err) {
              this.LoadingService.LoadingNormal(err, 2, _=> {
                this.LoadingService.LoadingNormal("Error de lectura",2)
                this.ListenAndWrite(dataToWrite, callback);
              });
            } else {
              let idCard = dataEvent.Id;
              let data = dataEvent.TagData;
              let originalId = dataToWrite.Id;
  
              console.log("NEW idCard: ", idCard);
              console.log("OLD idCard: ", originalId);
  
              if (idCard != originalId) {
                let err = "La tarjeta no corresponde a la lectura inicial";
                this.LoadingService.LoadingNormal(err, 2, _=> {
                  this.ListenAndWrite(dataToWrite, callback);
                });
              } else {
                this.WriteCard(dataToWrite,(err)=>{
                  if(err==null){
                    callback(null);
                  }else{
                    this.LoadingService.LoadingNormal("Error en la escritura de la tarjeta", 2, _=> {
                      this.ListenAndWrite(dataToWrite, callback);
                    });
                  }
                });
              }
            }
          });
  */
        }
        else if (this.Global.Dispositivo == "Tablet") {
            console.log('Listeninggggggggggg Tablet');
            return __WEBPACK_IMPORTED_MODULE_6_rxjs__["Observable"].create(function (observer) {
                _this.Listen(function () {
                    console.log('Listeninggggggggggg');
                    _this.Loading.LoadingNormal("Acerque la tarjeta para finalizar la transacción");
                })
                    .subscribe(function (id) {
                    console.log(id);
                    _this.WriteCardMF(dataToWrite, function () { return observer.next(); });
                });
            });
        }
    };
    NfcProvider.prototype.WriteCard = function (datatoWrite, cb) {
        var _this = this;
        console.log(this.Global.Dispositivo);
        switch (this.Global.Dispositivo) {
            case "Emulador":
                /*
                  this.WriteCardEmulator(datatoWrite,(err,data)=>{
                    console.log(err + "+++++++++++++++++++++")
                    if(err===null){
                      cb(err)
                    }else{
                      this.ListenAndWrite(datatoWrite,()=>{
                      }).subscribe(() => {
                        cb(null)
                      })
                    }
                  });
                  */
                break;
            case "Tablet":
                this.WriteCardMF(datatoWrite, function () {
                    cb(null);
                }, function () {
                    _this.ListenAndWrite(datatoWrite, function () {
                    }).subscribe(function () {
                        cb(null);
                    });
                });
                break;
            default:
                break;
        }
    };
    NfcProvider.prototype.hexStringToByte = function (str) {
        var a = [];
        for (var i = 0, len = str.length; i < len; i += 2) {
            a.push(parseInt(str.substr(i, 2), 16));
        }
        return new Array(a);
    };
    NfcProvider.prototype.removeTagDiscovery = function () {
        if (this.tagDiscoveryPromise !== null) {
            // this.nfc.removeTagDiscoveredListener();
            /*  document.removeEventListener("tag",this.listener1,false);
              document.removeEventListener("tag",this.listener2,false);
              this.tagDiscoveryPromise.remove(this.writeReadPromise);*/
            this.tagDiscoveryPromise.unsubscribe();
            this.tagDiscoveryPromise = null;
            this.writeReadPromise = null;
            console.log("TAG IS REMOVED");
        }
    };
    NfcProvider.prototype.WriteCardMF = function (cardData, callback, fail) {
        var _this = this;
        console.log("TRYING TO WRITE ", cardData);
        this.nfc.writeMF(JSON.stringify(cardData)).then(function (data) {
            console.log("WRITING CARD", cardData);
            _this.removeTagDiscovery();
            callback();
        }, function () {
            if (fail != undefined) {
                fail();
            }
            else {
                _this.Loading.LoadingNormal("Error en tarjeta vuelva a intentarlo", 2);
            }
        });
    };
    /**
     * Try login in the card
     * @param nfc
     * @param auth
     * @param callback
     */
    NfcProvider.prototype.ReadMF = function (nfc, auth, callback) {
        var _this = this;
        console.log(nfc, auth);
        this.writeReadPromise = nfc.readMF(auth, function (success) {
            console.log("READ ON MF", success);
            if (success.tag.TagData != "" && success.tag.Id != "" && success.tag.TagData != "Login Fail") {
                callback(success.tag);
            }
            else if (success.tag.TagData == "Login Fail") {
                _this.Loading.HideLoading();
                _this.Alert.AlertOneButton("Error Nfc", "Settings de lectura de tarjeta Incorrectos.");
            }
            else {
                _this.Loading.LoadingNormal("Lectura incorrecta vuelva a intentarlo", 2);
            }
        }, function (win) {
            console.log("_loginCard _win {win} => " + JSON.stringify(win, null, 1));
        }, function (failReason) {
            _this.Alert.AlertOneButton("NFC", JSON.stringify(failReason, null, 1));
        });
    };
    NfcProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_nfc__["a" /* NFC */],
            __WEBPACK_IMPORTED_MODULE_1__alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_5__loading_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_0__global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_7__database_database__["a" /* DatabaseProvider */]])
    ], NfcProvider);
    return NfcProvider;
}());

//# sourceMappingURL=nfc.js.map

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingsPageModule", function() { return SettingsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_pagination__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_filter_pipe__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings__ = __webpack_require__(222);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var SettingsPageModule = (function () {
    function SettingsPageModule() {
    }
    SettingsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__settings__["a" /* SettingsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2_ngx_pagination__["a" /* NgxPaginationModule */],
                __WEBPACK_IMPORTED_MODULE_3_ngx_filter_pipe__["a" /* FilterPipeModule */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_4__settings__["a" /* SettingsPage */]),
            ],
        })
    ], SettingsPageModule);
    return SettingsPageModule;
}());

//# sourceMappingURL=settings.module.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AjustesVPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_font_font__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_database_database__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_loading_loading__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AjustesVPage = (function () {
    function AjustesVPage(settings, navCtrl, storage, Loadingservice, navParams, db, alertCtrl, cdr, global, toastCtrl) {
        var _this = this;
        this.settings = settings;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.Loadingservice = Loadingservice;
        this.navParams = navParams;
        this.db = db;
        this.alertCtrl = alertCtrl;
        this.cdr = cdr;
        this.global = global;
        this.toastCtrl = toastCtrl;
        this.settings.getActiveTheme().subscribe(function (val) { return _this.selectedTheme = val; });
        this.Item = this.global.Item;
        if (this.selectedTheme == 'light-theme') {
            this.Tam = 1000;
        }
        else if (this.selectedTheme == 'dark-theme') {
            this.Tam = 1500;
        }
        else if (this.selectedTheme == 'blue-theme') {
            this.Tam = 2000;
        }
    }
    AjustesVPage.prototype.ionViewDidLoad = function () {
        this.Loadingservice.HideLoading();
        console.log('ionViewDidLoad VistaPage');
    };
    AjustesVPage.prototype.toggleAppTheme = function () {
        if (this.Tam == 1000) {
            this.settings.setActiveTheme('light-theme');
            this.storage.set('LETTER', 'light-theme');
            console.log("Pequeña");
        }
        else if (this.Tam == 1500) {
            this.settings.setActiveTheme('dark-theme');
            this.storage.set('LETTER', 'dark-theme');
            console.log("Mediana");
        }
        else if (this.Tam == 2000) {
            this.settings.setActiveTheme('blue-theme');
            this.storage.set('LETTER', 'blue-theme');
            console.log("Grande");
        }
    };
    AjustesVPage.prototype.ActItems = function () {
        this.global.Item = this.Item;
        console.log('ITEM ' + this.Item);
        this.storage.set('ITEM', this.Item);
    };
    AjustesVPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-ajustes-v',template:/*ion-inline-start:"C:\Desarrollo\Ion\AdminUsers - copia\src\pages\ajustes-v\ajustes-v.html"*/'<ion-header>\n  <ion-toolbar style="padding: 0!important;margin: 0!important" hideBackButton="true">\n    <button ion-button menuToggle><ion-icon md="md-menu"></ion-icon></button>\n    <ion-title>Ajustes</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content>\n  <div *ngIf="false">\n      <ion-label align=center style="color:#434549">Tamaño de letra</ion-label>\n      <ion-card> \n    <ion-item>\n      <ion-range min="1000" max="2000" step="500" snaps="true" color="secondary" [(ngModel)]="Tam" (ionChange)=toggleAppTheme()>\n      <ion-label range-left style="font-size: 0.4cm">A</ion-label>\n      <ion-label range-middle style="font-size: 0.5cm">A</ion-label>\n      <ion-label range-right style="font-size: 0.6cm">A</ion-label>\n    </ion-range>\n    </ion-item>\n  </ion-card>   \n  </div>\n<ion-card>  \n<ion-card-header>\n    Items por página: {{Item}}\n</ion-card-header>\n<ion-card-content>\n    <ion-item>\n        <ion-range min="5" max="100" step="5" snaps="true" color="secondary" [(ngModel)]="Item" (ionChange)=ActItems()>\n        <ion-label range-left>5</ion-label>\n        <ion-label range-right>100</ion-label>\n        </ion-range>\n        </ion-item>\n</ion-card-content>\n</ion-card>\n</ion-content>\n'/*ion-inline-end:"C:\Desarrollo\Ion\AdminUsers - copia\src\pages\ajustes-v\ajustes-v.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__providers_font_font__["a" /* FontProvider */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__providers_loading_loading__["a" /* LoadingProvider */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* ToastController */]])
    ], AjustesVPage);
    return AjustesVPage;
}());

//# sourceMappingURL=ajustes-v.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(369);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ngx_pagination__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_ajustes_v_ajustes_v_module__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_login_login_module__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(692);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_http_comunication_http_comunication__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_loading_loading__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_alert_alert__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__angular_common_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_global_global__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_database_database__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_font_font__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_vibration__ = __webpack_require__(693);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_signalr_signalr__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_nfc_nfc__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_nfc__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_settings_settings_module__ = __webpack_require__(321);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/ajustes-v/ajustes-v.module#AjustesVPageModule', name: 'AjustesVPage', segment: 'ajustes-v', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_14__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2__pages_login_login_module__["LoginPageModule"],
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_1__pages_ajustes_v_ajustes_v_module__["AjustesVPageModule"],
                __WEBPACK_IMPORTED_MODULE_22__pages_settings_settings_module__["SettingsPageModule"],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_4__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_12__providers_loading_loading__["a" /* LoadingProvider */],
                __WEBPACK_IMPORTED_MODULE_15__providers_global_global__["a" /* GlobalProvider */],
                __WEBPACK_IMPORTED_MODULE_13__providers_alert_alert__["a" /* AlertProvider */],
                __WEBPACK_IMPORTED_MODULE_11__providers_http_comunication_http_comunication__["a" /* HttpComunicationProvider */],
                __WEBPACK_IMPORTED_MODULE_16__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_17__providers_font_font__["a" /* FontProvider */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_vibration__["a" /* Vibration */],
                __WEBPACK_IMPORTED_MODULE_19__providers_signalr_signalr__["a" /* SignalrProvider */],
                __WEBPACK_IMPORTED_MODULE_20__providers_nfc_nfc__["a" /* NfcProvider */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_nfc__["a" /* NFC */]
            ], exports: [
                __WEBPACK_IMPORTED_MODULE_0_ngx_pagination__["a" /* NgxPaginationModule */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoadingProvider = (function () {
    function LoadingProvider(loading) {
        this.loading = loading;
        console.log('Hello LoadingProvider Provider');
    }
    LoadingProvider.prototype.LoadingNormal = function (Message, SecondsToDismiss, callback) {
        var _this = this;
        this.HideLoading();
        var template = Message;
        if (Message === undefined) {
            template = "";
        }
        clearTimeout(this.timeOutInstance);
        this.loader = this.loading.create({
            spinner: 'ios',
            cssClass: "background: transparent",
            content: template,
        });
        this.loader.present().then(function () {
            if (SecondsToDismiss === undefined) {
            }
            else {
                setTimeout(function () {
                    _this.HideLoading();
                    if (callback !== undefined) {
                        callback();
                    }
                }, SecondsToDismiss * 1000);
            }
        });
    };
    LoadingProvider.prototype.HideLoading = function (SecondsToDismiss, callback) {
        var _this = this;
        if (SecondsToDismiss === undefined) {
            if (this.loader !== undefined) {
                try {
                    this.loader.dismiss();
                    this.loader = undefined;
                }
                catch (e) {
                    console.log('err ', e);
                }
            }
        }
        else {
            this.timeOutInstance = setTimeout(function () {
                if (callback !== undefined) {
                    callback();
                }
                if (_this.loader !== undefined) {
                    try {
                        _this.loader.dismiss();
                        _this.loader = undefined;
                    }
                    catch (e) {
                        console.log('err 1', e);
                    }
                }
            }, SecondsToDismiss * 1000);
        }
    };
    LoadingProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], LoadingProvider);
    return LoadingProvider;
}());

//# sourceMappingURL=loading.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlertProvider = (function () {
    function AlertProvider(http, Alert) {
        this.http = http;
        this.Alert = Alert;
        console.log('Hello AlertProvider Provider');
    }
    AlertProvider.prototype.AlertOnebutton = function (tittle, message, textbutton) {
        if (textbutton == undefined) {
            textbutton = "Aceptar";
        }
        var Popup = this.Alert.create();
        Popup.setTitle(tittle);
        Popup.setMessage(message);
        Popup.addButton({
            text: textbutton,
            handler: function () {
                Popup.dismiss();
            }
        });
        Popup.present();
    };
    AlertProvider.prototype.AlertTwobutton = function (tittle, message, textbutton, textbutton1) {
        if (textbutton == undefined) {
            textbutton = "Cancelar";
        }
        if (textbutton1 == undefined) {
            textbutton1 = "Aceptar";
        }
        var Popup = this.Alert.create();
        Popup.setTitle(tittle);
        Popup.setMessage(message);
        Popup.addButton({
            text: textbutton,
            role: 'cancel',
            handler: function () {
                Popup.dismiss();
            }
        });
        Popup.addButton({
            text: textbutton1,
            role: 'cancel',
            handler: function () {
                Popup.dismiss();
            }
        });
        Popup.present();
    };
    AlertProvider.prototype.AlertOneButton = function (title, template, buttonText, callback) {
        var textButton = "OK";
        if (buttonText != undefined) {
            textButton = buttonText;
        }
        var alert = this.Alert.create({
            enableBackdropDismiss: false,
            title: title,
            subTitle: template,
            buttons: [{
                    text: textButton,
                    role: 'cancel',
                    handler: function () {
                        if (callback !== undefined) {
                            callback();
                        }
                    }
                }]
        });
        alert.present();
    };
    AlertProvider.prototype.AlertTowButtons = function (title, template, buttonText, callback, fail) {
        var alert = this.Alert.create({
            title: title,
            message: template,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function () {
                        if (fail !== undefined) {
                            fail();
                        }
                    }
                },
                {
                    text: buttonText,
                    handler: function () {
                        callback();
                    }
                }
            ]
        });
        alert.present();
    };
    AlertProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
    ], AlertProvider);
    return AlertProvider;
}());

//# sourceMappingURL=alert.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpComunicationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_global__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HttpComunicationProvider = (function () {
    function HttpComunicationProvider(http, Global, storage) {
        var _this = this;
        this.http = http;
        this.Global = Global;
        this.storage = storage;
        this.storage.get('IP').then(function (val) {
            if (val == '' || val == ' ' || val == null) {
            }
            else {
                _this.Url = val;
            }
            _this.ControllersAPI = {
                Login: val + "/LoginController",
                UpdateIdConection: val + "/UpdateUserController",
                Prueba: val + "/Prueba",
                Company: val + "/Company",
                Sites: val + "/Sites",
                Zone: val + "/Zone",
                Rate: val + "/Rate",
                People: val + "/People",
                Token: val + "/Token",
                GroupsAndPlaces: val + "/GroupsAndPlaces",
                Enterprice: val + "/Enterprice",
                Optionality: val + "/Optionality",
                Profile: val + "/Profile",
                ProfileRules: val + "/ProfileRules",
                Agreement: val + "/Agreement",
                ReadCard: val + "/ReadCard"
            };
        });
        console.log('Hello HttpComunicationProvider Provider');
    }
    HttpComunicationProvider.prototype.Login = function (data, callback) {
        this.http.post(this.ControllersAPI.Login, data).subscribe(function (res) {
            callback(null, res);
        }, function (err) {
            callback(err);
        });
    };
    HttpComunicationProvider.prototype.UpdateIdConecction = function (data, callback) {
        this.http.post(this.ControllersAPI.UpdateIdConection, data).subscribe(function (res) {
            callback(null, res);
        }, function (err) {
            callback(err);
        });
    };
    HttpComunicationProvider.prototype.Prueba = function (Query, callback) {
        var data = {
            Query: Query,
        };
        this.http.post(this.ControllersAPI.Prueba, data).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider.prototype.Company = function (datos, callback) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        console.log(headers);
        console.log(datos);
        this.http.post(this.ControllersAPI.Company, datos, { headers: headers }).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider.prototype.Sites = function (datos, callback) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        console.log(headers);
        console.log(datos);
        this.http.post(this.ControllersAPI.Sites, datos, { headers: headers }).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider.prototype.Zone = function (datos, callback) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        console.log(headers);
        console.log(datos);
        this.http.post(this.ControllersAPI.Zone, datos, { headers: headers }).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider.prototype.Optionality = function (datos, callback) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        console.log(headers);
        console.log(datos);
        this.http.post(this.ControllersAPI.Optionality, datos, { headers: headers }).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider.prototype.Rate = function (datos, callback) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        console.log(headers);
        console.log(datos);
        this.http.post(this.ControllersAPI.Rate, datos, { headers: headers }).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider.prototype.People = function (datos, callback) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        console.log(headers);
        console.log(datos);
        this.http.post(this.ControllersAPI.People, datos, { headers: headers }).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider.prototype.Token = function (datos, callback) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        console.log(headers);
        console.log(datos);
        this.http.post(this.ControllersAPI.Token, datos, { headers: headers }).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider.prototype.GroupsAndPlaces = function (datos, callback) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        console.log(headers);
        console.log(datos);
        this.http.post(this.ControllersAPI.GroupsAndPlaces, datos, { headers: headers }).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider.prototype.Enterprice = function (datos, callback) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        console.log(headers);
        console.log(datos);
        this.http.post(this.ControllersAPI.Enterprice, datos, { headers: headers }).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider.prototype.Profile = function (datos, callback) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        console.log(headers);
        console.log(datos);
        this.http.post(this.ControllersAPI.Profile, datos, { headers: headers }).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider.prototype.ProfileRules = function (datos, callback) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        console.log(headers);
        console.log(datos);
        this.http.post(this.ControllersAPI.ProfileRules, datos, { headers: headers }).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider.prototype.Agreement = function (datos, callback) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        console.log(headers);
        console.log(datos);
        this.http.post(this.ControllersAPI.Agreement, datos, { headers: headers }).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider.prototype.ReadCard = function (datos, callback) {
        var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        console.log(headers);
        console.log(datos);
        this.http.post(this.ControllersAPI.ReadCard, datos, { headers: headers }).subscribe(function (res) {
            callback(null, res);
            console.log(res);
        }, function (err) {
            callback(err);
            console.error(err);
        });
    };
    HttpComunicationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], HttpComunicationProvider);
    return HttpComunicationProvider;
}());

//# sourceMappingURL=http-comunication.js.map

/***/ }),

/***/ 692:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_font_font__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_ajustes_v_ajustes_v__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_login_login__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_global_global__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading_loading__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(128);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = (function () {
    function MyApp(Alert, Loading, Global, platform, statusBar, splashScreen, settings) {
        var _this = this;
        this.Alert = Alert;
        this.Loading = Loading;
        this.Global = Global;
        this.settings = settings;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_2__pages_login_login__["a" /* LoginPage */];
        this.Set = false;
        this.settings.getActiveTheme().subscribe(function (val) { return _this.selectedTheme = val; });
        this.Global.Item = 10;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.bann = platform.is('android');
        console.log('Annnnnnnnnnnnnnnnnnnndrooooooooooooooooooooooooooooidddddddddddddddddddddddddddddddddddddddddddddddddddddd' + this.bann);
        this.p2 = { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */] };
        this.p6 = { title: 'Ajustes Visuales', component: __WEBPACK_IMPORTED_MODULE_1__pages_ajustes_v_ajustes_v__["a" /* AjustesVPage */] };
    }
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        this.Loading.LoadingNormal("Abriendo Página");
        setTimeout(function () { _this.nav.setRoot(page); }, 500);
    };
    MyApp.prototype.CerrarSesion = function () {
        var _this = this;
        this.Loading.LoadingNormal("Cerrando Sesion");
        setTimeout(function () { _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_login_login__["a" /* LoginPage */]); }, 1000);
    };
    MyApp.prototype.toogleSettings = function () {
        if (this.Set == false) {
            this.Set = true;
        }
        else {
            this.Set = false;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Desarrollo\Ion\AdminUsers - copia\src\app\app.html"*/'<ion-menu id="leftMenu" [content]="content" type="overlay">\n<link href="https://unpkg.com/ionicons@4.5.5/dist/css/ionicons.min.css" rel="stylesheet">\n<ion-header>\n    <ion-toolbar>\n      <ion-title><ion-icon style="font-size:20px" name="md-copy"></ion-icon> Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content style="background-color: #fff!important;" class=menucolor>\n    <ion-list style="padding: 0 0 0 2%"> \n      <ion-label menuClose (click)="openPage(p2.component)"><ion-icon class="icontitle2" style="color: #1a1a1a;font-size: 22px;padding: 0 0 0 4%" name="md-home"> Home</ion-icon></ion-label>\n        <ion-label *ngIf="Set==false"  class="Menu" (click)="toogleSettings()"><ion-icon class="icontitle" name="md-arrow-dropright"> <ion-icon class="icontitle2" name="md-build"> Ajustes</ion-icon></ion-icon></ion-label>\n        <ion-label *ngIf="Set==true" class="Menu" (click)="toogleSettings()"><ion-icon class="icontitle" name="md-arrow-dropdown"> <ion-icon class="icontitle2" name="md-build"> Ajustes</ion-icon></ion-icon></ion-label>\n        <div *ngIf="Set==true">\n          <button menuClose ion-item (click)="openPage(p6.component)"><ion-icon class="iconsubmenu" name="options"> {{p6.title}}</ion-icon></button>\n          </div>\n    </ion-list> \n  <button ion-button menuClose style="text-align: left!important;background-color: red" (click)="CerrarSesion()"  full>\n      Cerrar Sesion\n    </button> \n  </ion-content>  \n</ion-menu>\n<ion-nav [root]="rootPage" #content ></ion-nav>\n'/*ion-inline-end:"C:\Desarrollo\Ion\AdminUsers - copia\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_loading_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_0__providers_font_font__["a" /* FontProvider */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__settings_settings__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_global_global__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_alert_alert__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_loading_loading__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_http_comunication_http_comunication__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_signalr_signalr__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var LoginPage = (function () {
    function LoginPage(navCtrl, menuCtrl, navParams, httpClient, Post, Alert, Loading, signalR, global, storage, viewCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.navParams = navParams;
        this.httpClient = httpClient;
        this.Post = Post;
        this.Alert = Alert;
        this.Loading = Loading;
        this.signalR = signalR;
        this.global = global;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.Auth = {
            User: '',
            Password: ''
        };
        this.storage.get('IP').then(function (val) {
            if (val == '' || val == ' ' || val == null) {
            }
            else {
                _this.global.Url = val;
            }
            console.log('Url', val);
        });
        this.storage.get('Usuario').then(function (val) {
            if (val == '' || val == ' ' || val == null) {
            }
            else {
                _this.Auth.User = val;
            }
            console.log('User', val);
        });
        this.storage.get('Contraseña').then(function (val) {
            if (val == '' || val == ' ' || val == null) {
            }
            else {
                _this.Auth.Password = val;
            }
            console.log('Pass', val);
        });
        this.menuCtrl.enable(false, 'leftMenu');
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
        this.Loading.HideLoading();
    };
    LoginPage.prototype.handleKeyboardEvent = function (event) {
        this.key = event.key;
        console.log(this.key);
        if (this.key == 'Enter') {
            this.Login();
        }
    };
    LoginPage.prototype.Login = function () {
        var _this = this;
        if (this.global.Url == '' || this.global.Url == ' ' || this.global.Url == null || this.global.Url == undefined) {
            this.Loading.LoadingNormal("Dirigase al Boton de Ajustes para configurar la Url del servidor", 4);
        }
        else {
            if (this.Auth.Password != "" && this.Auth.User != "") {
                this.Loading.LoadingNormal("Autenticando");
                var data = {
                    idConnection: 1,
                    userName: this.Auth.User,
                    password: this.Auth.Password
                };
                this.Post.Login(data, function (err, data) {
                    console.log(data);
                    if (err == null) {
                        if (data.status == 1) {
                            if (data.message == _this.global.RestDefinitions.Success) {
                                _this.global.Auth.User = _this.Auth.User;
                                _this.global.Auth.Password = _this.Auth.Password;
                                _this.storage.set('Usuario', _this.Auth.User);
                                _this.storage.set('Contraseña', _this.Auth.Password);
                                _this.Loading.LoadingNormal("Autenticacion Exitosa", 2);
                                _this.global.IsLoggin = true;
                                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                            }
                            else {
                                _this.Loading.LoadingNormal("Error en la Autenticacion", 2);
                            }
                        }
                        else {
                            if (data.message == 900) {
                                _this.Loading.LoadingNormal("Contraseña Incorrecta", 2);
                                console.error('Contraseña Incorrecta');
                            }
                            else if (data.message == 700) {
                                _this.Loading.LoadingNormal("Usuario No Existe", 2);
                                console.error('Usuario No Existe');
                            }
                            else {
                                _this.Loading.LoadingNormal("Error de Conexion", 2);
                            }
                        }
                    }
                    else {
                        _this.Loading.HideLoading();
                        _this.Alert.AlertOnebutton('Error', JSON.stringify(err.message));
                    }
                });
            }
            else {
                this.Loading.LoadingNormal("Error se encuentran campos vacios", 2);
            }
        }
    };
    LoginPage.prototype.Pushhh = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.Settings = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__settings_settings__["a" /* SettingsPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["y" /* HostListener */])('document:keypress', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], LoginPage.prototype, "handleKeyboardEvent", null);
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Desarrollo\Ion\AdminUsers - copia\src\pages\login\login.html"*/'<ion-content align="center" padding class=Login >\n  <div  style="margin-top:10%;" (press)="Pushhh()">\n    <img width="200px" src="assets/imgs/Controles.png"/>\n  </div>\n  <ion-item>\n      <ion-label >Usuario:</ion-label>\n      <ion-input type="text" placeholder="Usuario"[(ngModel)]="Auth.User" block></ion-input>\n  </ion-item>\n    <ion-item>\n        <ion-label >Contraseña:</ion-label>\n        <ion-input  type="password" placeholder="Password"  [(ngModel)]="Auth.Password" block></ion-input>\n    </ion-item>\n    <button ion-button style="margin-top:30px;font-size:18px;padding:18px 35px;border: 1px solid white;border-radius: 5px" (click)=\'Login()\' block>Login</button>\n    <ion-fab bottom right >\n        <button ion-fab (click)="Settings()" style="border: 1px solid white;"><ion-icon name="settings"></ion-icon></button>\n    </ion-fab>\n</ion-content>\n<ion-footer style="text-align:start;color: white;;background: #434549;font-size: 11px;">\n  Versión 1.0.0\n </ion-footer>\n'/*ion-inline-end:"C:\Desarrollo\Ion\AdminUsers - copia\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_9_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_5__providers_http_comunication_http_comunication__["a" /* HttpComunicationProvider */],
            __WEBPACK_IMPORTED_MODULE_3__providers_alert_alert__["a" /* AlertProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_loading_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_signalr_signalr__["a" /* SignalrProvider */],
            __WEBPACK_IMPORTED_MODULE_1__providers_global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_9_ionic_angular__["m" /* ViewController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignalrProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__global_global__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__http_comunication_http_comunication__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loading_loading__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SignalrProvider = (function () {
    function SignalrProvider(http, PopUp, Global, Post, Loading, storage) {
        this.http = http;
        this.PopUp = PopUp;
        this.Global = Global;
        this.Post = Post;
        this.Loading = Loading;
        this.storage = storage;
        console.log('Hello SignalrProvider Provider');
    }
    SignalrProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__global_global__["a" /* GlobalProvider */],
            __WEBPACK_IMPORTED_MODULE_4__http_comunication_http_comunication__["a" /* HttpComunicationProvider */],
            __WEBPACK_IMPORTED_MODULE_5__loading_loading__["a" /* LoadingProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
    ], SignalrProvider);
    return SignalrProvider;
}());

//# sourceMappingURL=signalr.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FontProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FontProvider = (function () {
    function FontProvider() {
        this.theme = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["BehaviorSubject"]('dark-theme');
    }
    FontProvider.prototype.setActiveTheme = function (val) {
        this.theme.next(val);
    };
    FontProvider.prototype.getActiveTheme = function () {
        return this.theme.asObservable();
    };
    FontProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], FontProvider);
    return FontProvider;
}());

//# sourceMappingURL=font.js.map

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__http_comunication_http_comunication__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__global_global__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DatabaseProvider = (function () {
    function DatabaseProvider(Post, Global) {
        this.Post = Post;
        this.Global = Global;
        console.log('Hello DatabaseProvider Provider');
    }
    DatabaseProvider.prototype.GetCompany = function (cb) {
        console.log("Get Company");
        var Option = {
            Option: 'Select',
            Name: null,
            OID: null,
            Address: null,
            Phone: null,
            Email: null,
            Note: null,
            Id_Country: null,
            Id_City: null,
            IsDelete: null
        };
        this.Post.Company(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Compañias", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data)[0]);
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetCompany = function (obj, cb) {
        console.log("Set Company");
        this.Post.Company(obj, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Compañias", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data)[0]);
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetSites = function (cb) {
        console.log("Get Sites");
        var Option = {
            Option: 'Select',
            Name: null,
            Id_Company: null,
            Address: null,
            Phone: null,
            Email: null,
            Note: null,
            Id_Country: null,
            Id_City: null,
            IsDelete: null,
            Id_Site: null
        };
        this.Post.Sites(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Sitios", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetAgreementatri = function (ID, cb) {
        console.log("Get Sites");
        var Option = {
            Option: 'SelectAgreementsAttribute',
            Id_Agreement: ID,
        };
        this.Post.Agreement(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Sitios", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetAtributes = function (cb) {
        console.log("Get Atributes");
        var Option = {
            Option: 'SelectAgreementsAttributeAll',
        };
        this.Post.Agreement(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Atributes", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetSite = function (obj, cb) {
        console.log("Set Site");
        this.Post.Sites(obj, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("SitiosT", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetRelation = function (obj, cb) {
        console.log("Set Relation");
        this.Post.Agreement(obj, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("SitiosT", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetAtribute = function (obj, cb) {
        console.log("Set Atribute");
        this.Post.Agreement(obj, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Atribute", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetAgreement = function (obj, cb) {
        console.log("Set Agreement");
        this.Post.Agreement(obj, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Agreement: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetCountry = function (cb) {
        console.log("Get Country");
        var Option = {
            Options: 'Country',
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Paises", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetCity = function (cb) {
        console.log("Get City");
        var Option = {
            Options: 'City',
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Ciudades: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetNFCSettings = function (cb) {
        console.log("Get NFCSettings");
        var Option = {
            Options: 'FirstCompanySettings',
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("NFCSettings: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetPeopleGroup = function (cb) {
        console.log("Get People Group");
        var Option = {
            Options: 'PeopleGroup',
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Groups: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetGroupToken = function (cb) {
        console.log("Get Group Token");
        var Option = {
            Options: 'GroupToken',
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Empresa: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetProfile = function (cb) {
        console.log("Get Profile");
        var Option = {
            Options: 'Profile',
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Perfiles: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetAgreementType = function (cb) {
        console.log("Get AgreementType");
        var Option = {
            Options: 'AgreementType',
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("AgreementType: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetZones = function (Id_site, cb) {
        console.log("Get Zones");
        var Option = {
            Option: 'Select',
            Name: null,
            Description: null,
            Id_Zone: null,
            IsDelete: null,
            Id_Site: Id_site
        };
        this.Post.Zone(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Zonas", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetZones = function (Option, cb) {
        console.log("Set Zones");
        this.Post.Zone(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Zonas", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetEnterprice = function (Option, cb) {
        console.log("Set Enterprice");
        this.Post.Enterprice(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Enterprice", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetPerfiles = function (Option, cb) {
        console.log("Set Perfiles");
        this.Post.Profile(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Perfiles", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetRules = function (Option, cb) {
        console.log("Set Rules");
        this.Post.ProfileRules(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("RUles", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetPerfilesRules = function (Option, cb) {
        console.log("Set Perfiles Rules");
        this.Post.ProfileRules(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Perfiles Rules", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetTarifas = function (Id_site, cb) {
        console.log("Get Rate");
        var Option = {
            Option: 'Select',
            Id_Site: Id_site
        };
        this.Post.Rate(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Tarifas: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetAgreement = function (Id_site, cb) {
        console.log("Get Agreement");
        var Option = {
            Option: 'Select',
            Id_Site: Id_site
        };
        this.Post.Agreement(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Tarifas: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetAgreement2 = function (cb) {
        console.log("Get Agreement2");
        var Option = {
            Option: 'Select2',
        };
        this.Post.Agreement(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Agreement: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetTokens = function (cb) {
        console.log("Get Tokens");
        var Option = {
            Option: 'Select',
        };
        this.Post.Token(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Token: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetRate = function (Option, cb) {
        console.log("Set Rate");
        this.Post.Rate(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Tarifas", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.DescargarTarjeta = function (Option, cb) {
        console.log("DescargarTarjeta");
        this.Post.ReadCard(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Tarjeta", JSON.stringify(data.data));
                cb(null, data.data);
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetRateType = function (cb) {
        console.log("Get RateType");
        var Option = {
            Options: 'RateType',
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("RateTypes: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetTokenNull = function (cb) {
        console.log("Get TokenNull");
        var Option = {
            Options: 'TokenNull',
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("TokenNull: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetTokenType = function (cb) {
        console.log("Get TokenType");
        var Option = {
            Options: 'TokenType',
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("TokenTypes: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetSiteGroup = function (cb) {
        console.log("SiteGroup");
        var Option = {
            Options: 'Site',
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("SiteGroup: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetRateGroup = function (cb) {
        console.log("RateGroup");
        var Option = {
            Options: 'Rate',
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("RateGroup: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetAgreementGroup = function (cb) {
        console.log("AgreementGroup");
        var Option = {
            Options: 'Agreement',
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("AgreementGroup: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetGroupAndPlacePeople = function (Id_P, cb) {
        console.log("Get GroupAndPlacePeople");
        var Option = {
            Option: 'SelectGroupAndPlace',
            Id_People: Id_P,
        };
        this.Post.People(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("GroupAndPlacePeople: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetGroupAndPlace = function (cb) {
        console.log("Get GroupAndPlace");
        var Option = {
            Option: 'Select'
        };
        this.Post.GroupsAndPlaces(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("GroupAndPlace: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetEnterprice = function (cb) {
        console.log("Get Enterprice");
        var Option = {
            Option: 'Select'
        };
        this.Post.Enterprice(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Enterprice: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetProfiles = function (cb) {
        console.log("Get Profiles");
        var Option = {
            Option: 'Select'
        };
        this.Post.Profile(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Profiles: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetGroupAndPlacePeopleNull = function (cb) {
        console.log("Get GroupAndPlacePeopleNull");
        var Option = {
            Option: 'Relation'
        };
        this.Post.GroupsAndPlaces(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("GroupAndPlacePeopleNull: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetGroupAndPlacePeopleData = function (Id, cb) {
        console.log("Get GroupAndPlacePeopleData");
        var Option = {
            Option: 'SelectRelation',
            Id_GroupsAndPlaces: Id
        };
        this.Post.GroupsAndPlaces(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("GroupAndPlacePeopleData: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetGroupAndPlacePeople = function (Option, cb) {
        console.log("Get GroupAndPlacePeopleNull");
        this.Post.GroupsAndPlaces(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("GroupAndPlacePeopleNull: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetGroupAndPlace = function (Option, cb) {
        console.log("Get GroupAndPlace");
        this.Post.GroupsAndPlaces(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("GroupAndPlace: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetTax = function (cb) {
        console.log("Get Tax");
        this.query = "SELECT [Id_Tax],[Id_Site],(SELECT [Name] FROM [dbo].[Tb_Site] a where a.Id_Site=b.Id_Site) as Sitio,[TaxName],[Value] FROM [dbo].[Tb_Tax] b";
        this.Post.Prueba(this.query, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Impuestos: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetTaxDetail = function (Id_Tax, cb) {
        console.log("Get Tax Detail");
        this.query = "SELECT [Id_RateTax],[Id_Rate],(SELECT [RateName] FROM [dbo].[Tb_Rate] a where a.Id_Rate=b.Id_Rate) as RateName,[Id_Tax],(SELECT [TaxName] FROM [dbo].[Tb_Tax] c where c.Id_Tax=b.Id_Tax) as TaxName FROM [dbo].[Tb_RateTax] b where Id_Tax=" + Id_Tax;
        this.Post.Prueba(this.query, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Detalle Impuestos: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetRateDetail = function (Id_Rate, cb) {
        console.log("Get Rate Detail");
        this.query = "SELECT [Id_RateTax],[Id_Rate],(SELECT [RateName] FROM [dbo].[Tb_Rate] a where a.Id_Rate=b.Id_Rate) as RateName,[Id_Tax],(SELECT [TaxName] FROM [dbo].[Tb_Tax] c where c.Id_Tax=b.Id_Tax) as TaxName FROM [dbo].[Tb_RateTax] b where Id_Rate=" + Id_Rate;
        this.Post.Prueba(this.query, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Detalle Tarifas: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetRuleDetail = function (Id_Rate, cb) {
        console.log("Get Rule Detail");
        this.query = "SELECT [Id_RateTax],[Id_Rate],(SELECT [RateName] FROM [dbo].[Tb_Rate] a where a.Id_Rate=b.Id_Rate) as RateName,[Id_Tax],(SELECT [TaxName] FROM [dbo].[Tb_Tax] c where c.Id_Tax=b.Id_Tax) as TaxName FROM [dbo].[Tb_RateTax] b where Id_Rate=" + Id_Rate;
        this.Post.Prueba(this.query, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Detalle Reglas: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetPeople = function (cb) {
        console.log("Get People");
        var Option = {
            Option: 'Select',
        };
        this.Post.People(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Personas: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetHistory = function (Token, cb) {
        console.log("Get History");
        var Option = {
            Option: 'History',
            Token: Token
        };
        this.Post.ReadCard(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("History: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.SetPeople = function (Option, cb) {
        console.log("Get People");
        this.Post.People(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Personas: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.AsociateToken = function (Option, cb) {
        console.log("AsociateToken");
        this.Post.Token(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("AsociateToken: ", JSON.stringify(data.data));
                if (data.data == 'Token ya Asociado') {
                    console.log('Ya esta asociado no chingue');
                    cb(err, data.data);
                }
                else {
                    console.log('NO esta asociado no chingue');
                    cb(null, JSON.parse(data.data));
                }
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.DeleteToken = function (Option, cb) {
        console.log("DeleteToken");
        this.Post.Token(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Token: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetPeopleToken = function (Id_P, cb) {
        console.log("Get People");
        var Option = {
            Option: 'SelectToken',
            Id_People: Id_P
        };
        this.Post.People(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Token: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetPeopleType = function (cb) {
        console.log("Get PeopleType");
        var Option = {
            Options: 'PeopleType'
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("PeopleType: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetZoneOpt = function (cb) {
        console.log("Get Zone");
        var Option = {
            Options: 'Zone'
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Zones: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider.prototype.GetReglas = function (cb) {
        console.log("Get Zone");
        var Option = {
            Options: 'ProfileRules'
        };
        this.Post.Optionality(Option, function (err, data) {
            if (err == null) {
                console.log(data.data);
                console.log("Zones: ", JSON.stringify(data.data));
                cb(null, JSON.parse(data.data));
            }
            else {
                console.log(err);
                cb(err);
            }
        });
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__http_comunication_http_comunication__["a" /* HttpComunicationProvider */], __WEBPACK_IMPORTED_MODULE_2__global_global__["a" /* GlobalProvider */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ })

},[364]);
//# sourceMappingURL=main.js.map