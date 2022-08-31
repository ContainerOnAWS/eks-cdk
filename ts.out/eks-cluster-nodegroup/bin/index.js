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
const cluster_nodegroup_stack_1 = require("../lib/cluster-nodegroup-stack");
const config_1 = require("../../config");
const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
};
const stage = app.node.tryGetContext('stage') || config_1.DEFAULT_STAGE;
new cluster_nodegroup_stack_1.EksClusterNodegroupStack(app, `${config_1.CLUSTER_NAME}-${stage}`, {
    env,
    stage,
    description: `EKS cluster: ${config_1.CLUSTER_NAME}-${stage}`,
    terminationProtection: stage !== config_1.DEFAULT_STAGE
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9la3MtY2x1c3Rlci1ub2RlZ3JvdXAvYmluL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxpREFBbUM7QUFFbkMsNEVBQTBFO0FBQzFFLHlDQUEyRDtBQUUzRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixNQUFNLEdBQUcsR0FBRztJQUNSLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQjtJQUN4QyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0I7Q0FDekMsQ0FBQztBQUNGLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLHNCQUFhLENBQUM7QUFFL0QsSUFBSSxrREFBd0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxxQkFBWSxJQUFJLEtBQUssRUFBRSxFQUFHO0lBQzNELEdBQUc7SUFDSCxLQUFLO0lBQ0wsV0FBVyxFQUFFLGdCQUFnQixxQkFBWSxJQUFJLEtBQUssRUFBRTtJQUNwRCxxQkFBcUIsRUFBRSxLQUFLLEtBQUcsc0JBQWE7Q0FDL0MsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcblxuaW1wb3J0IHsgRWtzQ2x1c3Rlck5vZGVncm91cFN0YWNrIH0gZnJvbSAnLi4vbGliL2NsdXN0ZXItbm9kZWdyb3VwLXN0YWNrJztcbmltcG9ydCB7IERFRkFVTFRfU1RBR0UsIENMVVNURVJfTkFNRSB9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5jb25zdCBlbnYgPSB7XG4gICAgYWNjb3VudDogcHJvY2Vzcy5lbnYuQ0RLX0RFRkFVTFRfQUNDT1VOVCxcbiAgICByZWdpb246IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX1JFR0lPTlxufTtcbmNvbnN0IHN0YWdlID0gYXBwLm5vZGUudHJ5R2V0Q29udGV4dCgnc3RhZ2UnKSB8fCBERUZBVUxUX1NUQUdFO1xuXG5uZXcgRWtzQ2x1c3Rlck5vZGVncm91cFN0YWNrKGFwcCwgYCR7Q0xVU1RFUl9OQU1FfS0ke3N0YWdlfWAsICB7XG4gICAgZW52LFxuICAgIHN0YWdlLFxuICAgIGRlc2NyaXB0aW9uOiBgRUtTIGNsdXN0ZXI6ICR7Q0xVU1RFUl9OQU1FfS0ke3N0YWdlfWAsXG4gICAgdGVybWluYXRpb25Qcm90ZWN0aW9uOiBzdGFnZSE9PURFRkFVTFRfU1RBR0Vcbn0pOyJdfQ==