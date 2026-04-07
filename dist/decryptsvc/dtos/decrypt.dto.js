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
exports.DecryptDto = void 0;
const class_transformer_1 = require("class-transformer");
class DecryptDto {
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Number)
], DecryptDto.prototype, "id", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DecryptDto.prototype, "family", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DecryptDto.prototype, "description", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DecryptDto.prototype, "tool", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Boolean)
], DecryptDto.prototype, "approved", void 0);
__decorate([
    class_transformer_1.Transform(({ obj }) => obj.user.id),
    class_transformer_1.Expose(),
    __metadata("design:type", Number)
], DecryptDto.prototype, "userId", void 0);
exports.DecryptDto = DecryptDto;
//# sourceMappingURL=decrypt.dto.js.map