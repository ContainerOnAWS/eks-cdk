import * as cdk from 'aws-cdk-lib';

export const SSM_PREFIX = '/cdk-eks';

export const CLUSTER_NAME = 'eks-cluster';

export const INSTANCE_TYPE = 'c5.xlarge';

export const GPU_INSTANCE_TYPE = 'g4dn.xlarge';

export const DEFAULT_STAGE = 'dev';

export interface StackCommonProps extends cdk.StackProps {
    stage: string;
}