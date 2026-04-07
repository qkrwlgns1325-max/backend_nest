"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecryptModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const decrypt_controller_1 = require("./decrypt.controller");
const decrypt_service_1 = require("./decrypt.service");
const decrypt_entity_1 = require("./decrypt.entity");
let DecryptModule = class DecryptModule {
};
DecryptModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([decrypt_entity_1.Decrypt])],
        controllers: [decrypt_controller_1.DecryptController],
        providers: [decrypt_service_1.DecryptService],
    })
], DecryptModule);
exports.DecryptModule = DecryptModule;
//# sourceMappingURL=decrypt.module.js.map