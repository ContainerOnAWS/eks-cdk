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
const nodegroup_stack_1 = require("../lib/nodegroup-stack");
const config_1 = require("../../config");
const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
};
const stage = app.node.tryGetContext('stage') || config_1.DEFAULT_STAGE;
new nodegroup_stack_1.EksNodegroupStack(app, `${config_1.CLUSTER_NAME}-ng-${stage}`, {
    env,
    stage,
    description: `EKS nodegroup, cluster: ${config_1.CLUSTER_NAME}-${stage}`,
    terminationProtection: stage !== config_1.DEFAULT_STAGE
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8wMy1la3Mtbm9kZWdyb3VwL2Jpbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQW1DO0FBRW5DLDREQUEyRDtBQUMzRCx5Q0FBMkQ7QUFFM0QsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUIsTUFBTSxHQUFHLEdBQUc7SUFDUixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUI7SUFDeEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCO0NBQ3pDLENBQUM7QUFDRixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxzQkFBYSxDQUFDO0FBRS9ELElBQUksbUNBQWlCLENBQUMsR0FBRyxFQUFFLEdBQUcscUJBQVksT0FBTyxLQUFLLEVBQUUsRUFBSTtJQUN4RCxHQUFHO0lBQ0gsS0FBSztJQUNMLFdBQVcsRUFBRSwyQkFBMkIscUJBQVksSUFBSSxLQUFLLEVBQUU7SUFDL0QscUJBQXFCLEVBQUUsS0FBSyxLQUFHLHNCQUFhO0NBQy9DLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5cbmltcG9ydCB7IEVrc05vZGVncm91cFN0YWNrIH0gZnJvbSAnLi4vbGliL25vZGVncm91cC1zdGFjayc7XG5pbXBvcnQgeyBERUZBVUxUX1NUQUdFLCBDTFVTVEVSX05BTUUgfSBmcm9tICcuLi8uLi9jb25maWcnO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuY29uc3QgZW52ID0ge1xuICAgIGFjY291bnQ6IHByb2Nlc3MuZW52LkNES19ERUZBVUxUX0FDQ09VTlQsXG4gICAgcmVnaW9uOiBwcm9jZXNzLmVudi5DREtfREVGQVVMVF9SRUdJT05cbn07XG5jb25zdCBzdGFnZSA9IGFwcC5ub2RlLnRyeUdldENvbnRleHQoJ3N0YWdlJykgfHwgREVGQVVMVF9TVEFHRTtcblxubmV3IEVrc05vZGVncm91cFN0YWNrKGFwcCwgYCR7Q0xVU1RFUl9OQU1FfS1uZy0ke3N0YWdlfWAsICAge1xuICAgIGVudixcbiAgICBzdGFnZSxcbiAgICBkZXNjcmlwdGlvbjogYEVLUyBub2RlZ3JvdXAsIGNsdXN0ZXI6ICR7Q0xVU1RFUl9OQU1FfS0ke3N0YWdlfWAsXG4gICAgdGVybWluYXRpb25Qcm90ZWN0aW9uOiBzdGFnZSE9PURFRkFVTFRfU1RBR0Vcbn0pOyJdfQ==