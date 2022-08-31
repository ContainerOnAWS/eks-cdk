import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackCommonProps } from '../../config';
/**
 * AmazonSSMManagedInstanceCore role is added to connect to EC2 instance by using SSM on AWS web console
 */
export declare class EksClusterNodegroupStack extends Stack {
    constructor(scope: Construct, id: string, props: StackCommonProps);
}
