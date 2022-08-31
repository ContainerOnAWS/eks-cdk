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
exports.EksClusterNodegroupStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const ec2 = __importStar(require("aws-cdk-lib/aws-ec2"));
const eks = __importStar(require("aws-cdk-lib/aws-eks"));
const iam = __importStar(require("aws-cdk-lib/aws-iam"));
const ssm = __importStar(require("aws-cdk-lib/aws-ssm"));
const config_1 = require("../../config");
/**
 * AmazonSSMManagedInstanceCore role is added to connect to EC2 instance by using SSM on AWS web console
 */
class EksClusterNodegroupStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        var _a;
        super(scope, id, props);
        // const stage = this.node.tryGetContext('stage') || 'local';
        const vpcId = this.node.tryGetContext('vpcId') || ssm.StringParameter.valueFromLookup(this, `${config_1.SSM_PREFIX}/vpc-id`);
        const vpc = ec2.Vpc.fromLookup(this, 'vpc', { vpcId: vpcId });
        const clusterAdmin = new iam.Role(this, 'cluster-admin-role', {
            assumedBy: new iam.AccountRootPrincipal()
        });
        const clusterRole = new iam.Role(this, 'cluster-role', {
            roleName: `EksClusterRole-${id}`,
            assumedBy: new iam.ServicePrincipal("eks.amazonaws.com"),
        });
        clusterRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonEKSServicePolicy"));
        clusterRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonEKSClusterPolicy"));
        const clusterName = `${config_1.CLUSTER_NAME}-${props.stage}`;
        const cluster = new eks.Cluster(this, 'eks-cluster', {
            clusterName: clusterName,
            tags: {
                Stage: props.stage,
                Name: clusterName,
            },
            mastersRole: clusterAdmin,
            role: clusterRole,
            version: eks.KubernetesVersion.V1_21,
            vpc: vpc,
            defaultCapacity: 0,
            albController: {
                version: eks.AlbControllerVersion.V2_4_1,
            },
            clusterLogging: [
                eks.ClusterLoggingTypes.API,
                eks.ClusterLoggingTypes.SCHEDULER
            ],
        });
        (_a = cluster.defaultNodegroup) === null || _a === void 0 ? void 0 : _a.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
        const cpuNodeGroup = cluster.addNodegroupCapacity('cpu-ng', {
            nodegroupName: 'cpu-ng',
            instanceTypes: [new ec2.InstanceType(config_1.INSTANCE_TYPE)],
            minSize: 2,
            maxSize: 10,
            capacityType: eks.CapacityType.SPOT
        });
        cpuNodeGroup.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
        const isCreateGpuNodegroup = false;
        if (isCreateGpuNodegroup) {
            const gpuNodeGroup = cluster.addNodegroupCapacity('gpu-ng', {
                nodegroupName: 'gpu-ng',
                instanceTypes: [new ec2.InstanceType(config_1.GPU_INSTANCE_TYPE)],
                labels: { 'accelerator': 'nvidia-gpu' },
                minSize: 1,
                maxSize: 10
            });
            gpuNodeGroup.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
        }
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterName', { value: cluster.clusterName });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterArn', { value: cluster.clusterArn });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterEndpoint', { value: cluster.clusterEndpoint });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterSecurityGroupId', { value: cluster.clusterSecurityGroupId });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterEncryptionConfigKeyArn', { value: cluster.clusterEncryptionConfigKeyArn });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterOpenIdConnectIssuer', { value: cluster.clusterOpenIdConnectIssuer });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterOpenIdConnectIssuerUrl', { value: cluster.clusterOpenIdConnectIssuerUrl });
    }
}
exports.EksClusterNodegroupStack = EksClusterNodegroupStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1ub2RlZ3JvdXAtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9la3MtY2x1c3Rlci1ub2RlZ3JvdXAvbGliL2NsdXN0ZXItbm9kZWdyb3VwLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBMkQ7QUFDM0QseURBQTJDO0FBQzNDLHlEQUEyQztBQUMzQyx5REFBMkM7QUFDM0MseURBQTJDO0FBRzNDLHlDQUE0RztBQUU1Rzs7R0FFRztBQUNILE1BQWEsd0JBQXlCLFNBQVEsbUJBQUs7SUFDL0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUF1Qjs7UUFDN0QsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsNkRBQTZEO1FBQzdELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLG1CQUFVLFNBQVMsQ0FBQyxDQUFDO1FBQ3BILE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUU5RCxNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQzFELFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRTtTQUM1QyxDQUFDLENBQUM7UUFDSCxNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUNuRCxRQUFRLEVBQUUsa0JBQWtCLEVBQUUsRUFBRTtZQUNoQyxTQUFTLEVBQUUsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUM7U0FDM0QsQ0FBQyxDQUFDO1FBQ0gsV0FBVyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1FBQ25HLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztRQUVuRyxNQUFNLFdBQVcsR0FBRyxHQUFHLHFCQUFZLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JELE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ2pELFdBQVcsRUFBRSxXQUFXO1lBQ3hCLElBQUksRUFBRTtnQkFDRixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUs7Z0JBQ2xCLElBQUksRUFBRSxXQUFXO2FBQ3BCO1lBQ0QsV0FBVyxFQUFFLFlBQVk7WUFDekIsSUFBSSxFQUFFLFdBQVc7WUFDakIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLO1lBQ3BDLEdBQUcsRUFBRSxHQUFHO1lBQ1IsZUFBZSxFQUFFLENBQUM7WUFDbEIsYUFBYSxFQUFFO2dCQUNYLE9BQU8sRUFBRSxHQUFHLENBQUMsb0JBQW9CLENBQUMsTUFBTTthQUMzQztZQUNELGNBQWMsRUFBRTtnQkFDWixHQUFHLENBQUMsbUJBQW1CLENBQUMsR0FBRztnQkFDM0IsR0FBRyxDQUFDLG1CQUFtQixDQUFDLFNBQVM7YUFDcEM7U0FDSixDQUFDLENBQUM7UUFDSCxNQUFBLE9BQU8sQ0FBQyxnQkFBZ0IsMENBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsOEJBQThCLENBQUMsRUFBRTtRQUU1SCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsUUFBUSxFQUFFO1lBQ3hELGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLGFBQWEsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxzQkFBYSxDQUFDLENBQUM7WUFDcEQsT0FBTyxFQUFFLENBQUM7WUFDVixPQUFPLEVBQUUsRUFBRTtZQUNYLFlBQVksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUk7U0FDdEMsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztRQUUvRyxNQUFNLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUNuQyxJQUFJLG9CQUFvQixFQUFFO1lBQ3RCLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3hELGFBQWEsRUFBRSxRQUFRO2dCQUN2QixhQUFhLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsMEJBQWlCLENBQUMsQ0FBQztnQkFDeEQsTUFBTSxFQUFFLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRTtnQkFDdkMsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLEVBQUU7YUFDZCxDQUFDLENBQUM7WUFDSCxZQUFZLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDO1NBQ2xIO1FBQ0QsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDbkUsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDakUsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztRQUMzRSxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7UUFDekYsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSwrQkFBK0IsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZHLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsNEJBQTRCLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQztRQUNqRyxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLCtCQUErQixFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyw2QkFBNkIsRUFBRSxDQUFDLENBQUM7SUFDM0csQ0FBQztDQUNKO0FBcEVELDREQW9FQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBDZm5PdXRwdXQgfSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCAqIGFzIGVjMiBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcclxuaW1wb3J0ICogYXMgZWtzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1la3MnO1xyXG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XHJcbmltcG9ydCAqIGFzIHNzbSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3NtJztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcblxyXG5pbXBvcnQgeyBTdGFja0NvbW1vblByb3BzLCBTU01fUFJFRklYLCBDTFVTVEVSX05BTUUsIElOU1RBTkNFX1RZUEUsIEdQVV9JTlNUQU5DRV9UWVBFIH0gZnJvbSAnLi4vLi4vY29uZmlnJztcclxuXHJcbi8qKlxyXG4gKiBBbWF6b25TU01NYW5hZ2VkSW5zdGFuY2VDb3JlIHJvbGUgaXMgYWRkZWQgdG8gY29ubmVjdCB0byBFQzIgaW5zdGFuY2UgYnkgdXNpbmcgU1NNIG9uIEFXUyB3ZWIgY29uc29sZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVrc0NsdXN0ZXJOb2RlZ3JvdXBTdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTdGFja0NvbW1vblByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgICAgIC8vIGNvbnN0IHN0YWdlID0gdGhpcy5ub2RlLnRyeUdldENvbnRleHQoJ3N0YWdlJykgfHwgJ2xvY2FsJztcclxuICAgICAgICBjb25zdCB2cGNJZCA9IHRoaXMubm9kZS50cnlHZXRDb250ZXh0KCd2cGNJZCcpIHx8IHNzbS5TdHJpbmdQYXJhbWV0ZXIudmFsdWVGcm9tTG9va3VwKHRoaXMsIGAke1NTTV9QUkVGSVh9L3ZwYy1pZGApO1xyXG4gICAgICAgIGNvbnN0IHZwYyA9IGVjMi5WcGMuZnJvbUxvb2t1cCh0aGlzLCAndnBjJywgeyB2cGNJZDogdnBjSWQgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsdXN0ZXJBZG1pbiA9IG5ldyBpYW0uUm9sZSh0aGlzLCAnY2x1c3Rlci1hZG1pbi1yb2xlJywge1xyXG4gICAgICAgICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uQWNjb3VudFJvb3RQcmluY2lwYWwoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGNsdXN0ZXJSb2xlID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdjbHVzdGVyLXJvbGUnLCB7XHJcbiAgICAgICAgICAgIHJvbGVOYW1lOiBgRWtzQ2x1c3RlclJvbGUtJHtpZH1gLFxyXG4gICAgICAgICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbChcImVrcy5hbWF6b25hd3MuY29tXCIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNsdXN0ZXJSb2xlLmFkZE1hbmFnZWRQb2xpY3koaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKFwiQW1hem9uRUtTU2VydmljZVBvbGljeVwiKSk7XHJcbiAgICAgICAgY2x1c3RlclJvbGUuYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXCJBbWF6b25FS1NDbHVzdGVyUG9saWN5XCIpKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2x1c3Rlck5hbWUgPSBgJHtDTFVTVEVSX05BTUV9LSR7cHJvcHMuc3RhZ2V9YDtcclxuICAgICAgICBjb25zdCBjbHVzdGVyID0gbmV3IGVrcy5DbHVzdGVyKHRoaXMsICdla3MtY2x1c3RlcicsIHtcclxuICAgICAgICAgICAgY2x1c3Rlck5hbWU6IGNsdXN0ZXJOYW1lLFxyXG4gICAgICAgICAgICB0YWdzOiB7XHJcbiAgICAgICAgICAgICAgICBTdGFnZTogcHJvcHMuc3RhZ2UsXHJcbiAgICAgICAgICAgICAgICBOYW1lOiBjbHVzdGVyTmFtZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWFzdGVyc1JvbGU6IGNsdXN0ZXJBZG1pbixcclxuICAgICAgICAgICAgcm9sZTogY2x1c3RlclJvbGUsXHJcbiAgICAgICAgICAgIHZlcnNpb246IGVrcy5LdWJlcm5ldGVzVmVyc2lvbi5WMV8yMSxcclxuICAgICAgICAgICAgdnBjOiB2cGMsXHJcbiAgICAgICAgICAgIGRlZmF1bHRDYXBhY2l0eTogMCxcclxuICAgICAgICAgICAgYWxiQ29udHJvbGxlcjoge1xyXG4gICAgICAgICAgICAgICAgdmVyc2lvbjogZWtzLkFsYkNvbnRyb2xsZXJWZXJzaW9uLlYyXzRfMSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2x1c3RlckxvZ2dpbmc6IFtcclxuICAgICAgICAgICAgICAgIGVrcy5DbHVzdGVyTG9nZ2luZ1R5cGVzLkFQSSxcclxuICAgICAgICAgICAgICAgIGVrcy5DbHVzdGVyTG9nZ2luZ1R5cGVzLlNDSEVEVUxFUlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNsdXN0ZXIuZGVmYXVsdE5vZGVncm91cD8ucm9sZS5hZGRNYW5hZ2VkUG9saWN5KGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnQW1hem9uU1NNTWFuYWdlZEluc3RhbmNlQ29yZScpKTtcclxuXHJcbiAgICAgICAgY29uc3QgY3B1Tm9kZUdyb3VwID0gY2x1c3Rlci5hZGROb2RlZ3JvdXBDYXBhY2l0eSgnY3B1LW5nJywge1xyXG4gICAgICAgICAgICBub2RlZ3JvdXBOYW1lOiAnY3B1LW5nJyxcclxuICAgICAgICAgICAgaW5zdGFuY2VUeXBlczogW25ldyBlYzIuSW5zdGFuY2VUeXBlKElOU1RBTkNFX1RZUEUpXSxcclxuICAgICAgICAgICAgbWluU2l6ZTogMixcclxuICAgICAgICAgICAgbWF4U2l6ZTogMTAsXHJcbiAgICAgICAgICAgIGNhcGFjaXR5VHlwZTogZWtzLkNhcGFjaXR5VHlwZS5TUE9UXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY3B1Tm9kZUdyb3VwLnJvbGUuYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvblNTTU1hbmFnZWRJbnN0YW5jZUNvcmUnKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlzQ3JlYXRlR3B1Tm9kZWdyb3VwID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGlzQ3JlYXRlR3B1Tm9kZWdyb3VwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdwdU5vZGVHcm91cCA9IGNsdXN0ZXIuYWRkTm9kZWdyb3VwQ2FwYWNpdHkoJ2dwdS1uZycsIHtcclxuICAgICAgICAgICAgICAgIG5vZGVncm91cE5hbWU6ICdncHUtbmcnLFxyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2VUeXBlczogW25ldyBlYzIuSW5zdGFuY2VUeXBlKEdQVV9JTlNUQU5DRV9UWVBFKV0sXHJcbiAgICAgICAgICAgICAgICBsYWJlbHM6IHsgJ2FjY2VsZXJhdG9yJzogJ252aWRpYS1ncHUnIH0sXHJcbiAgICAgICAgICAgICAgICBtaW5TaXplOiAxLFxyXG4gICAgICAgICAgICAgICAgbWF4U2l6ZTogMTBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGdwdU5vZGVHcm91cC5yb2xlLmFkZE1hbmFnZWRQb2xpY3koaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKCdBbWF6b25TU01NYW5hZ2VkSW5zdGFuY2VDb3JlJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdDbHVzdGVyTmFtZScsIHsgdmFsdWU6IGNsdXN0ZXIuY2x1c3Rlck5hbWUgfSk7XHJcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLCAnQ2x1c3RlckFybicsIHsgdmFsdWU6IGNsdXN0ZXIuY2x1c3RlckFybiB9KTtcclxuICAgICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdDbHVzdGVyRW5kcG9pbnQnLCB7IHZhbHVlOiBjbHVzdGVyLmNsdXN0ZXJFbmRwb2ludCB9KTtcclxuICAgICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdDbHVzdGVyU2VjdXJpdHlHcm91cElkJywgeyB2YWx1ZTogY2x1c3Rlci5jbHVzdGVyU2VjdXJpdHlHcm91cElkIH0pO1xyXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ0NsdXN0ZXJFbmNyeXB0aW9uQ29uZmlnS2V5QXJuJywgeyB2YWx1ZTogY2x1c3Rlci5jbHVzdGVyRW5jcnlwdGlvbkNvbmZpZ0tleUFybiB9KTtcclxuICAgICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdDbHVzdGVyT3BlbklkQ29ubmVjdElzc3VlcicsIHsgdmFsdWU6IGNsdXN0ZXIuY2x1c3Rlck9wZW5JZENvbm5lY3RJc3N1ZXIgfSk7XHJcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLCAnQ2x1c3Rlck9wZW5JZENvbm5lY3RJc3N1ZXJVcmwnLCB7IHZhbHVlOiBjbHVzdGVyLmNsdXN0ZXJPcGVuSWRDb25uZWN0SXNzdWVyVXJsIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==