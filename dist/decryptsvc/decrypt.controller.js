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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecryptController = void 0;
const common_1 = require("@nestjs/common");
const create_decrypt_dto_1 = require("./dtos/create-decrypt.dto");
const decrypt_service_1 = require("./decrypt.service");
const auth_guard_1 = require("../guards/auth.guard");
const current_user_decorator_1 = require("../users/decorators/current-user.decorator");
const user_entity_1 = require("../users/user.entity");
const decrypt_dto_1 = require("./dtos/decrypt.dto");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const approve_decrypt_dto_1 = require("./dtos/approve-decrypt.dto");
const admin_guard_1 = require("../guards/admin.guard");
const get_estimate_dto_1 = require("./dtos/get-estimate.dto");
let DecryptController = class DecryptController {
    constructor(decryptService) {
        this.decryptService = decryptService;
    }
    getEstimate(query) {
        return this.decryptService.createEstimate(query);
    }
    findAllUnapproved() {
        return this.decryptService.findAllUnapproved();
    }
    findApproved() {
        return this.decryptService.findAllApproved();
    }
    findAllByUserId(userId) {
        return this.decryptService.findAllByUserId(parseInt(userId));
    }
    findApprovedById(id) {
        return this.decryptService.findApprovedById(parseInt(id));
    }
    createDecrypt(body, user) {
        return this.decryptService.create(body, user);
    }
    approveDecrypt(id, body) {
        return this.decryptService.changeApproval(id, body.approved);
    }
    deleteApproved(id) {
        return this.decryptService.remove(parseInt(id));
    }
    updateDecrypt(id, body) {
        return this.decryptService.update(parseInt(id), body);
    }
    deleteUnapproved(id) {
        return this.decryptService.remove(parseInt(id));
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_estimate_dto_1.GetEstimateDto]),
    __metadata("design:returntype", void 0)
], DecryptController.prototype, "getEstimate", null);
__decorate([
    common_1.Get('/unapproved'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DecryptController.prototype, "findAllUnapproved", null);
__decorate([
    common_1.Get('/approved'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DecryptController.prototype, "findApproved", null);
__decorate([
    common_1.Get('/approved/:userId'),
    __param(0, common_1.Param('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DecryptController.prototype, "findAllByUserId", null);
__decorate([
    common_1.Get('/approved/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DecryptController.prototype, "findApprovedById", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    serialize_interceptor_1.Serialize(decrypt_dto_1.DecryptDto),
    __param(0, common_1.Body()), __param(1, current_user_decorator_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_decrypt_dto_1.CreateDecryptDto, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], DecryptController.prototype, "createDecrypt", null);
__decorate([
    common_1.Patch('/:id'),
    common_1.UseGuards(admin_guard_1.AdminGuard),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_decrypt_dto_1.ApproveDecryptDto]),
    __metadata("design:returntype", void 0)
], DecryptController.prototype, "approveDecrypt", null);
__decorate([
    common_1.Delete('/approved/:id'),
    common_1.UseGuards(admin_guard_1.AdminGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DecryptController.prototype, "deleteApproved", null);
__decorate([
    common_1.Patch('/approved/:id'),
    common_1.UseGuards(admin_guard_1.AdminGuard),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DecryptController.prototype, "updateDecrypt", null);
__decorate([
    common_1.Delete('/unapproved/:id'),
    common_1.UseGuards(admin_guard_1.AdminGuard),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DecryptController.prototype, "deleteUnapproved", null);
DecryptController = __decorate([
    common_1.Controller('decrypt'),
    __metadata("design:paramtypes", [decrypt_service_1.DecryptService])
], DecryptController);
exports.DecryptController = DecryptController;
//# sourceMappingURL=decrypt.controller.js.map