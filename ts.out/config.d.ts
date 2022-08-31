import * as cdk from 'aws-cdk-lib';
export declare const SSM_PREFIX = "/cdk-eks";
export declare const CLUSTER_NAME = "eks-cluster";
export declare const INSTANCE_TYPE = "c5.xlarge";
export declare const GPU_INSTANCE_TYPE = "g4dn.xlarge";
export declare const DEFAULT_STAGE = "dev";
export interface StackCommonProps extends cdk.StackProps {
    stage: string;
}
