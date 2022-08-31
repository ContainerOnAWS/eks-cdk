#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';

import { DEFAULT_STAGE } from '../../config';

const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};
const stage = app.node.tryGetContext('stage') || DEFAULT_STAGE;

new VpcStack(app, `vpc-eks-${stage}`, {
    env,
    stage,
    description: `EKS VPC`,
    terminationProtection: stage!==DEFAULT_STAGE
});