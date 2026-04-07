"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUser = common_1.createParamDecorator((data, context) => {
    const request = context.switchToHttp().getRequest();
    console.log(request.session.userId);
    return request.currentUser;
});
//# sourceMappingURL=current-user.decorator.js.map