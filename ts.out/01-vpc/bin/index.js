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
const vpc_stack_1 = require("../lib/vpc-stack");
const config_1 = require("../../config");
const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};
const stage = app.node.tryGetContext('stage') || config_1.DEFAULT_STAGE;
new vpc_stack_1.VpcStack(app, `vpc-eks-${stage}`, {
    env,
    stage,
    description: `EKS VPC`,
    terminationProtection: stage !== config_1.DEFAULT_STAGE
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8wMS12cGMvYmluL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpREFBbUM7QUFDbkMsZ0RBQTRDO0FBRTVDLHlDQUE2QztBQUU3QyxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixNQUFNLEdBQUcsR0FBRztJQUNSLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQjtJQUN4QyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0I7Q0FDekMsQ0FBQztBQUNGLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHNCQUFhLENBQUM7QUFFL0QsSUFBSSxvQkFBUSxDQUFDLEdBQUcsRUFBRSxXQUFXLEtBQUssRUFBRSxFQUFFO0lBQ2xDLEdBQUc7SUFDSCxLQUFLO0lBQ0wsV0FBVyxFQUFFLFNBQVM7SUFDdEIscUJBQXFCLEVBQUUsS0FBSyxLQUFHLHNCQUFhO0NBQy9DLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcclxuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0IHsgVnBjU3RhY2sgfSBmcm9tICcuLi9saWIvdnBjLXN0YWNrJztcclxuXHJcbmltcG9ydCB7IERFRkFVTFRfU1RBR0UgfSBmcm9tICcuLi8uLi9jb25maWcnO1xyXG5cclxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcclxuY29uc3QgZW52ID0ge1xyXG4gICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfQUNDT1VOVCxcclxuICAgIHJlZ2lvbjogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfUkVHSU9OLFxyXG59O1xyXG5jb25zdCBzdGFnZSA9IGFwcC5ub2RlLnRyeUdldENvbnRleHQoJ3N0YWdlJykgfHwgREVGQVVMVF9TVEFHRTtcclxuXHJcbm5ldyBWcGNTdGFjayhhcHAsIGB2cGMtZWtzLSR7c3RhZ2V9YCwge1xyXG4gICAgZW52LFxyXG4gICAgc3RhZ2UsXHJcbiAgICBkZXNjcmlwdGlvbjogYEVLUyBWUENgLFxyXG4gICAgdGVybWluYXRpb25Qcm90ZWN0aW9uOiBzdGFnZSE9PURFRkFVTFRfU1RBR0VcclxufSk7Il19