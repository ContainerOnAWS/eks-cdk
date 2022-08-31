#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = __importStar(require("aws-cdk-lib"));
const cluster_stack_1 = require("../lib/cluster-stack");
const config_1 = require("../../config");
const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
};
const stage = app.node.tryGetContext('stage') || config_1.DEFAULT_STAGE;
new cluster_stack_1.EksClusterStack(app, `${config_1.CLUSTER_NAME}-${stage}`, {
    env,
    stage,
    description: `EKS cluster: ${config_1.CLUSTER_NAME}-${stage}`,
    terminationProtection: stage !== config_1.DEFAULT_STAGE
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8wMi1la3MtY2x1c3Rlci9iaW4vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGlEQUFtQztBQUVuQyx3REFBdUQ7QUFDdkQseUNBQTJEO0FBRTNELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLE1BQU0sR0FBRyxHQUFHO0lBQ1IsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CO0lBQ3hDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQjtDQUN6QyxDQUFDO0FBQ0YsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksc0JBQWEsQ0FBQztBQUUvRCxJQUFJLCtCQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcscUJBQVksSUFBSSxLQUFLLEVBQUUsRUFBRTtJQUNqRCxHQUFHO0lBQ0gsS0FBSztJQUNMLFdBQVcsRUFBRSxnQkFBZ0IscUJBQVksSUFBSSxLQUFLLEVBQUU7SUFDcEQscUJBQXFCLEVBQUUsS0FBSyxLQUFHLHNCQUFhO0NBQy9DLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5cbmltcG9ydCB7IEVrc0NsdXN0ZXJTdGFjayB9IGZyb20gJy4uL2xpYi9jbHVzdGVyLXN0YWNrJztcbmltcG9ydCB7IENMVVNURVJfTkFNRSwgREVGQVVMVF9TVEFHRSB9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5jb25zdCBlbnYgPSB7XG4gICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfQUNDT1VOVCxcbiAgICByZWdpb246IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX1JFR0lPTlxufTtcbmNvbnN0IHN0YWdlID0gYXBwLm5vZGUudHJ5R2V0Q29udGV4dCgnc3RhZ2UnKSB8fCBERUZBVUxUX1NUQUdFO1xuXG5uZXcgRWtzQ2x1c3RlclN0YWNrKGFwcCwgYCR7Q0xVU1RFUl9OQU1FfS0ke3N0YWdlfWAsIHtcbiAgICBlbnYsXG4gICAgc3RhZ2UsXG4gICAgZGVzY3JpcHRpb246IGBFS1MgY2x1c3RlcjogJHtDTFVTVEVSX05BTUV9LSR7c3RhZ2V9YCxcbiAgICB0ZXJtaW5hdGlvblByb3RlY3Rpb246IHN0YWdlIT09REVGQVVMVF9TVEFHRVxufSk7Il19