import { Stack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StackCommonProps } from '../../config';
export declare class VpcStack extends Stack {
    constructor(scope: Construct, id: string, props: StackCommonProps);
}
