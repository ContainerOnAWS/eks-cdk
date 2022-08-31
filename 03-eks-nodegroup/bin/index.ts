#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { EksNodegroupStack } from '../lib/nodegroup-stack';
import { DEFAULT_STAGE, CLUSTER_NAME } from '../../config';

const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
};
const stage = app.node.tryGetContext('stage') || DEFAULT_STAGE;

new EksNodegroupStack(app, `${CLUSTER_NAME}-ng-${stage}`,   {
    env,
    stage,
    description: `EKS nodegroup, cluster: ${CLUSTER_NAME}-${stage}`,
    terminationProtection: stage!==DEFAULT_STAGE
});