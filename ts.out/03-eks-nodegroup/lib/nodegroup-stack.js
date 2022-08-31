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
exports.EksNodegroupStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const ec2 = __importStar(require("aws-cdk-lib/aws-ec2"));
const eks = __importStar(require("aws-cdk-lib/aws-eks"));
const iam = __importStar(require("aws-cdk-lib/aws-iam"));
const ssm = __importStar(require("aws-cdk-lib/aws-ssm"));
const config_1 = require("../../config");
/**
 * AmazonSSMManagedInstanceCore role is added to connect to EC2 instance by using SSM on AWS web console
 */
class EksNodegroupStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const vpcId = this.node.tryGetContext('vpcId') || ssm.StringParameter.valueFromLookup(this, `${config_1.SSM_PREFIX}/vpc-id`);
        const vpc = ec2.Vpc.fromLookup(this, 'vpc', { vpcId: vpcId });
        const clusterName = `${config_1.CLUSTER_NAME}-${props.stage}`;
        const openidProviderArn = ssm.StringParameter.valueFromLookup(this, `/${clusterName}/openid-connect-provider-arn`);
        const kubectlRoleArn = ssm.StringParameter.valueFromLookup(this, `/${clusterName}/kubectl-role-arn`);
        const openIdConnectProvider = iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(this, 'importedProviderArn', aws_cdk_lib_1.Lazy.string({ produce: () => openidProviderArn }));
        const cluster = eks.Cluster.fromClusterAttributes(this, clusterName, {
            vpc,
            clusterName,
            openIdConnectProvider,
            kubectlRoleArn: aws_cdk_lib_1.Lazy.string({ produce: () => kubectlRoleArn })
        });
        const nodegroup = new eks.Nodegroup(this, 'nodegroup', {
            cluster,
            nodegroupName: 'cpu-ng',
            instanceTypes: [new ec2.InstanceType(config_1.INSTANCE_TYPE)],
            minSize: 2,
            maxSize: 10,
            capacityType: eks.CapacityType.SPOT
        });
        nodegroup.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
        const createGpuCluster = false;
        if (createGpuCluster) {
            const gpuNodegroup = new eks.Nodegroup(this, 'gpu-nodegroup', {
                cluster,
                nodegroupName: 'gpu-ng',
                instanceTypes: [new ec2.InstanceType(config_1.GPU_INSTANCE_TYPE)],
                labels: { 'accelerator': 'nvidia-gpu' },
                minSize: 1,
                maxSize: 10,
            });
            gpuNodegroup.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonSSMManagedInstanceCore'));
        }
        new aws_cdk_lib_1.CfnOutput(this, 'WebConsoleUrl', { value: `https://${this.region}.console.aws.amazon.com/eks/home?#/clusters/${cluster.clusterName}?selectedTab=cluster-compute-tab` });
        new aws_cdk_lib_1.CfnOutput(this, 'NodegroupName', { value: nodegroup.nodegroupName });
        new aws_cdk_lib_1.CfnOutput(this, 'RoleArn', { value: nodegroup.role.roleArn });
    }
}
exports.EksNodegroupStack = EksNodegroupStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZWdyb3VwLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vMDMtZWtzLW5vZGVncm91cC9saWIvbm9kZWdyb3VwLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBaUU7QUFDakUseURBQTJDO0FBQzNDLHlEQUEyQztBQUMzQyx5REFBMkM7QUFDM0MseURBQTJDO0FBRzNDLHlDQUE0RztBQUU1Rzs7R0FFRztBQUNILE1BQWEsaUJBQWtCLFNBQVEsbUJBQUs7SUFDeEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUF1QjtRQUM3RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxtQkFBVSxTQUFTLENBQUMsQ0FBQztRQUNwSCxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFFOUQsTUFBTSxXQUFXLEdBQUcsR0FBRyxxQkFBWSxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyRCxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxJQUFJLFdBQVcsOEJBQThCLENBQUMsQ0FBQztRQUNuSCxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxXQUFXLG1CQUFtQixDQUFDLENBQUE7UUFDcEcsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLENBQUMscUJBQXFCLENBQUMsNEJBQTRCLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUM1RyxrQkFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV2RCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxXQUFXLEVBQUU7WUFDakUsR0FBRztZQUNILFdBQVc7WUFDWCxxQkFBcUI7WUFDckIsY0FBYyxFQUFFLGtCQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ2pFLENBQUMsQ0FBQztRQUNILE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQ25ELE9BQU87WUFDUCxhQUFhLEVBQUUsUUFBUTtZQUN2QixhQUFhLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsc0JBQWEsQ0FBQyxDQUFDO1lBQ3BELE9BQU8sRUFBRSxDQUFDO1lBQ1YsT0FBTyxFQUFFLEVBQUU7WUFDWCxZQUFZLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJO1NBQ3RDLENBQUMsQ0FBQztRQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7UUFFNUcsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxnQkFBZ0IsRUFBRTtZQUNsQixNQUFNLFlBQVksR0FBRyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtnQkFDMUQsT0FBTztnQkFDUCxhQUFhLEVBQUUsUUFBUTtnQkFDdkIsYUFBYSxFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLDBCQUFpQixDQUFDLENBQUM7Z0JBQ3hELE1BQU0sRUFBRSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUU7Z0JBQ3ZDLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSxFQUFFO2FBRWQsQ0FBQyxDQUFDO1lBQ0gsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQztTQUNsSDtRQUVELElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQVcsSUFBSSxDQUFDLE1BQU0sK0NBQStDLE9BQU8sQ0FBQyxXQUFXLGtDQUFrQyxFQUFFLENBQUMsQ0FBQztRQUM1SyxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUN6RSxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDdEUsQ0FBQztDQUNKO0FBL0NELDhDQStDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzLCBDZm5PdXRwdXQsIExhenkgfSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCAqIGFzIGVjMiBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcclxuaW1wb3J0ICogYXMgZWtzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1la3MnO1xyXG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XHJcbmltcG9ydCAqIGFzIHNzbSBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3NtJztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcblxyXG5pbXBvcnQgeyBTdGFja0NvbW1vblByb3BzLCBTU01fUFJFRklYLCBDTFVTVEVSX05BTUUsIElOU1RBTkNFX1RZUEUsIEdQVV9JTlNUQU5DRV9UWVBFIH0gZnJvbSAnLi4vLi4vY29uZmlnJztcclxuXHJcbi8qKlxyXG4gKiBBbWF6b25TU01NYW5hZ2VkSW5zdGFuY2VDb3JlIHJvbGUgaXMgYWRkZWQgdG8gY29ubmVjdCB0byBFQzIgaW5zdGFuY2UgYnkgdXNpbmcgU1NNIG9uIEFXUyB3ZWIgY29uc29sZVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEVrc05vZGVncm91cFN0YWNrIGV4dGVuZHMgU3RhY2sge1xyXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFN0YWNrQ29tbW9uUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICAgICAgY29uc3QgdnBjSWQgPSB0aGlzLm5vZGUudHJ5R2V0Q29udGV4dCgndnBjSWQnKSB8fCBzc20uU3RyaW5nUGFyYW1ldGVyLnZhbHVlRnJvbUxvb2t1cCh0aGlzLCBgJHtTU01fUFJFRklYfS92cGMtaWRgKTtcclxuICAgICAgICBjb25zdCB2cGMgPSBlYzIuVnBjLmZyb21Mb29rdXAodGhpcywgJ3ZwYycsIHsgdnBjSWQ6IHZwY0lkIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNsdXN0ZXJOYW1lID0gYCR7Q0xVU1RFUl9OQU1FfS0ke3Byb3BzLnN0YWdlfWA7XHJcbiAgICAgICAgY29uc3Qgb3BlbmlkUHJvdmlkZXJBcm4gPSBzc20uU3RyaW5nUGFyYW1ldGVyLnZhbHVlRnJvbUxvb2t1cCh0aGlzLCBgLyR7Y2x1c3Rlck5hbWV9L29wZW5pZC1jb25uZWN0LXByb3ZpZGVyLWFybmApO1xyXG4gICAgICAgIGNvbnN0IGt1YmVjdGxSb2xlQXJuID0gc3NtLlN0cmluZ1BhcmFtZXRlci52YWx1ZUZyb21Mb29rdXAodGhpcywgYC8ke2NsdXN0ZXJOYW1lfS9rdWJlY3RsLXJvbGUtYXJuYClcclxuICAgICAgICBjb25zdCBvcGVuSWRDb25uZWN0UHJvdmlkZXIgPSBpYW0uT3BlbklkQ29ubmVjdFByb3ZpZGVyLmZyb21PcGVuSWRDb25uZWN0UHJvdmlkZXJBcm4odGhpcywgJ2ltcG9ydGVkUHJvdmlkZXJBcm4nLFxyXG4gICAgICAgICAgICBMYXp5LnN0cmluZyh7IHByb2R1Y2U6ICgpID0+IG9wZW5pZFByb3ZpZGVyQXJuIH0pKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBjbHVzdGVyID0gZWtzLkNsdXN0ZXIuZnJvbUNsdXN0ZXJBdHRyaWJ1dGVzKHRoaXMsIGNsdXN0ZXJOYW1lLCB7XHJcbiAgICAgICAgICAgIHZwYyxcclxuICAgICAgICAgICAgY2x1c3Rlck5hbWUsXHJcbiAgICAgICAgICAgIG9wZW5JZENvbm5lY3RQcm92aWRlcixcclxuICAgICAgICAgICAga3ViZWN0bFJvbGVBcm46IExhenkuc3RyaW5nKHsgcHJvZHVjZTogKCkgPT4ga3ViZWN0bFJvbGVBcm4gfSlcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBub2RlZ3JvdXAgPSBuZXcgZWtzLk5vZGVncm91cCh0aGlzLCAnbm9kZWdyb3VwJywge1xyXG4gICAgICAgICAgICBjbHVzdGVyLFxyXG4gICAgICAgICAgICBub2RlZ3JvdXBOYW1lOiAnY3B1LW5nJyxcclxuICAgICAgICAgICAgaW5zdGFuY2VUeXBlczogW25ldyBlYzIuSW5zdGFuY2VUeXBlKElOU1RBTkNFX1RZUEUpXSxcclxuICAgICAgICAgICAgbWluU2l6ZTogMixcclxuICAgICAgICAgICAgbWF4U2l6ZTogMTAsXHJcbiAgICAgICAgICAgIGNhcGFjaXR5VHlwZTogZWtzLkNhcGFjaXR5VHlwZS5TUE9UXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbm9kZWdyb3VwLnJvbGUuYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvblNTTU1hbmFnZWRJbnN0YW5jZUNvcmUnKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNyZWF0ZUdwdUNsdXN0ZXIgPSBmYWxzZTsgXHJcbiAgICAgICAgaWYgKGNyZWF0ZUdwdUNsdXN0ZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgZ3B1Tm9kZWdyb3VwID0gbmV3IGVrcy5Ob2RlZ3JvdXAodGhpcywgJ2dwdS1ub2RlZ3JvdXAnLCB7XHJcbiAgICAgICAgICAgICAgICBjbHVzdGVyLFxyXG4gICAgICAgICAgICAgICAgbm9kZWdyb3VwTmFtZTogJ2dwdS1uZycsXHJcbiAgICAgICAgICAgICAgICBpbnN0YW5jZVR5cGVzOiBbbmV3IGVjMi5JbnN0YW5jZVR5cGUoR1BVX0lOU1RBTkNFX1RZUEUpXSxcclxuICAgICAgICAgICAgICAgIGxhYmVsczogeyAnYWNjZWxlcmF0b3InOiAnbnZpZGlhLWdwdScgfSxcclxuICAgICAgICAgICAgICAgIG1pblNpemU6IDEsXHJcbiAgICAgICAgICAgICAgICBtYXhTaXplOiAxMCxcclxuICAgICAgICAgICAgICAgIC8vIGNhcGFjaXR5VHlwZTogZWtzLkNhcGFjaXR5VHlwZS5TUE9UXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBncHVOb2RlZ3JvdXAucm9sZS5hZGRNYW5hZ2VkUG9saWN5KGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZSgnQW1hem9uU1NNTWFuYWdlZEluc3RhbmNlQ29yZScpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ1dlYkNvbnNvbGVVcmwnLCB7IHZhbHVlOiBgaHR0cHM6Ly8ke3RoaXMucmVnaW9ufS5jb25zb2xlLmF3cy5hbWF6b24uY29tL2Vrcy9ob21lPyMvY2x1c3RlcnMvJHtjbHVzdGVyLmNsdXN0ZXJOYW1lfT9zZWxlY3RlZFRhYj1jbHVzdGVyLWNvbXB1dGUtdGFiYCB9KTtcclxuICAgICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdOb2RlZ3JvdXBOYW1lJywgeyB2YWx1ZTogbm9kZWdyb3VwLm5vZGVncm91cE5hbWUgfSk7XHJcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLCAnUm9sZUFybicsIHsgdmFsdWU6IG5vZGVncm91cC5yb2xlLnJvbGVBcm4gfSk7XHJcbiAgICB9XHJcbn1cclxuIl19