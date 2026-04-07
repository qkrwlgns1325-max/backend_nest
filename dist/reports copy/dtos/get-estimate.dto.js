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
exports.GetEstimateDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class GetEstimateDto {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GetEstimateDto.prototype, "family", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GetEstimateDto.prototype, "region", void 0);
__decorate([
    class_transformer_1.Transform(({ value }) => parseFloat(value)),
    class_validator_1.IsLongitude(),
    __metadata("design:type", Number)
], GetEstimateDto.prototype, "lng", void 0);
__decorate([
    class_transformer_1.Transform(({ value }) => parseFloat(value)),
    class_validator_1.IsLatitude(),
    __metadata("design:type", Number)
], GetEstimateDto.prototype, "lat", void 0);
__decorate([
    class_transformer_1.Transform(({ value }) => parseInt(value)),
    class_validator_1.IsNumber(),
    class_validator_1.Min(1950),
    class_validator_1.Max(2050),
    __metadata("design:type", Number)
], GetEstimateDto.prototype, "year", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GetEstimateDto.prototype, "type", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GetEstimateDto.prototype, "hash", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GetEstimateDto.prototype, "ip", void 0);
exports.GetEstimateDto = GetEstimateDto;
//# sourceMappingURL=get-estimate.dto.js.map