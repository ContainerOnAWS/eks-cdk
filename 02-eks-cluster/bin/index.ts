#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';

import { EksClusterStack } from '../lib/cluster-stack';
import { CLUSTER_NAME, DEFAULT_STAGE } from '../../config';

const app = new cdk.App();
const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
};
const stage = app.node.tryGetContext('stage') || DEFAULT_STAGE;

new EksClusterStack(app, `${CLUSTER_NAME}-${stage}`, {
    env,
    stage,
    description: `EKS cluster: ${CLUSTER_NAME}-${stage}`,
    terminationProtection: stage!==DEFAULT_STAGE
});