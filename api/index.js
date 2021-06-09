"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_cra_1 = require("dotenv-cra");
const path_1 = require("path");
const probot_1 = require("probot");
const App_1 = tslib_1.__importDefault(require("./lib/App"));
const constants_1 = require("./lib/constants");
dotenv_cra_1.config({
    path: path_1.join(constants_1.rootFolder, '.env')
});
const probot = probot_1.createProbot({
    defaults: {
        webhookPath: '/api'
    }
});
exports.default = probot_1.createNodeMiddleware(App_1.default, { probot });
//# sourceMappingURL=index.js.map