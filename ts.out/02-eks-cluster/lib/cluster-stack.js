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
exports.EksClusterStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const ec2 = __importStar(require("aws-cdk-lib/aws-ec2"));
const eks = __importStar(require("aws-cdk-lib/aws-eks"));
const iam = __importStar(require("aws-cdk-lib/aws-iam"));
const ssm = __importStar(require("aws-cdk-lib/aws-ssm"));
const config_1 = require("../../config");
class EksClusterStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        var _a;
        super(scope, id, props);
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
            // albController: {
            //     version: eks.AlbControllerVersion.V2_4_1,
            // },
            clusterLogging: [
                eks.ClusterLoggingTypes.API,
                eks.ClusterLoggingTypes.SCHEDULER
            ],
        });
        const certParam = new ssm.StringParameter(this, 'ssmClutsterCertificateAuthority', { parameterName: `/${clusterName}/cluster-certificate-authority`, stringValue: cluster.clusterCertificateAuthorityData });
        const openIdConnectProviderArn = new ssm.StringParameter(this, 'ssmOpenIdConnectProviderArn', { parameterName: `/${clusterName}/openid-connect-provider-arn`, stringValue: cluster.openIdConnectProvider.openIdConnectProviderArn });
        const kubectlRole = new ssm.StringParameter(this, 'ssmKubectlRole', { parameterName: `/${clusterName}/kubectl-role-arn`, stringValue: (_a = cluster.kubectlRole) === null || _a === void 0 ? void 0 : _a.roleArn });
        new aws_cdk_lib_1.CfnOutput(this, 'SSMClutsterCertificateAuthority', { value: certParam.parameterName });
        new aws_cdk_lib_1.CfnOutput(this, 'SSMopenIdConnectProviderArn', { value: openIdConnectProviderArn.parameterName });
        new aws_cdk_lib_1.CfnOutput(this, 'SSMopenIdConnectProviderArnValue', { value: openIdConnectProviderArn.stringValue });
        new aws_cdk_lib_1.CfnOutput(this, 'SSMKubectlRoleArnValue', { value: kubectlRole.stringValue });
        new aws_cdk_lib_1.CfnOutput(this, 'WebConsoleUrl', { value: `https://${this.region}.console.aws.amazon.com/eks/home?region=us-east-1#/clusters/${cluster.clusterName}` });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterName', { value: cluster.clusterName });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterArn', { value: cluster.clusterArn });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterEndpoint', { value: cluster.clusterEndpoint });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterSecurityGroupId', { value: cluster.clusterSecurityGroupId });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterEncryptionConfigKeyArn', { value: cluster.clusterEncryptionConfigKeyArn });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterOpenIdConnectIssuer', { value: cluster.clusterOpenIdConnectIssuer });
        new aws_cdk_lib_1.CfnOutput(this, 'ClusterOpenIdConnectIssuerUrl', { value: cluster.clusterOpenIdConnectIssuerUrl });
    }
}
exports.EksClusterStack = EksClusterStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1c3Rlci1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLzAyLWVrcy1jbHVzdGVyL2xpYi9jbHVzdGVyLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBMkQ7QUFDM0QseURBQTJDO0FBQzNDLHlEQUEyQztBQUMzQyx5REFBMkM7QUFDM0MseURBQTJDO0FBRzNDLHlDQUEwRTtBQUUxRSxNQUFhLGVBQWdCLFNBQVEsbUJBQUs7SUFDdEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUF1Qjs7UUFDN0QsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsbUJBQVUsU0FBUyxDQUFDLENBQUM7UUFDcEgsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRTlELE1BQU0sWUFBWSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUU7WUFDMUQsU0FBUyxFQUFFLElBQUksR0FBRyxDQUFDLG9CQUFvQixFQUFFO1NBQzVDLENBQUMsQ0FBQztRQUNILE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ25ELFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxFQUFFO1lBQ2hDLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztTQUMzRCxDQUFDLENBQUM7UUFDSCxXQUFXLENB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QWlCLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7UUFDM0UsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO1FBQ3pGLElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsK0JBQStCLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLDZCQUE2QixFQUFFLENBQUMsQ0FBQztRQUN2RyxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLDRCQUE0QixFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUM7UUFDakcsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSwrQkFBK0IsRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDO0lBQzNHLENBQUM7Q0FDSjtBQTNERCwwQ0EyREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcywgQ2ZuT3V0cHV0IH0gZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgKiBhcyBlYzIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XHJcbmltcG9ydCAqIGFzIGVrcyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWtzJztcclxuaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xyXG5pbXBvcnQgKiBhcyBzc20gZnJvbSAnYXdzLWNkay1saWIvYXdzLXNzbSc7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5cclxuaW1wb3J0IHsgU3RhY2tDb21tb25Qcm9wcywgU1NNX1BSRUZJWCwgQ0xVU1RFUl9OQU1FIH0gZnJvbSAnLi4vLi4vY29uZmlnJztcclxuXHJcbmV4cG9ydCBjbGFzcyBFa3NDbHVzdGVyU3RhY2sgZXh0ZW5kcyBTdGFjayB7XHJcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3RhY2tDb21tb25Qcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG5cclxuICAgICAgICBjb25zdCB2cGNJZCA9IHRoaXMubm9kZS50cnlHZXRDb250ZXh0KCd2cGNJZCcpIHx8IHNzbS5TdHJpbmdQYXJhbWV0ZXIudmFsdWVGcm9tTG9va3VwKHRoaXMsIGAke1NTTV9QUkVGSVh9L3ZwYy1pZGApO1xyXG4gICAgICAgIGNvbnN0IHZwYyA9IGVjMi5WcGMuZnJvbUxvb2t1cCh0aGlzLCAndnBjJywgeyB2cGNJZDogdnBjSWQgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsdXN0ZXJBZG1pbiA9IG5ldyBpYW0uUm9sZSh0aGlzLCAnY2x1c3Rlci1hZG1pbi1yb2xlJywge1xyXG4gICAgICAgICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uQWNjb3VudFJvb3RQcmluY2lwYWwoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGNsdXN0ZXJSb2xlID0gbmV3IGlhbS5Sb2xlKHRoaXMsICdjbHVzdGVyLXJvbGUnLCB7XHJcbiAgICAgICAgICAgIHJvbGVOYW1lOiBgRWtzQ2x1c3RlclJvbGUtJHtpZH1gLFxyXG4gICAgICAgICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbChcImVrcy5hbWF6b25hd3MuY29tXCIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNsdXN0ZXJSb2xlLmFkZE1hbmFnZWRQb2xpY3koaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKFwiQW1hem9uRUtTU2VydmljZVBvbGljeVwiKSk7XHJcbiAgICAgICAgY2x1c3RlclJvbGUuYWRkTWFuYWdlZFBvbGljeShpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXCJBbWF6b25FS1NDbHVzdGVyUG9saWN5XCIpKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2x1c3Rlck5hbWUgPSBgJHtDTFVTVEVSX05BTUV9LSR7cHJvcHMuc3RhZ2V9YDtcclxuICAgICAgICBjb25zdCBjbHVzdGVyID0gbmV3IGVrcy5DbHVzdGVyKHRoaXMsICdla3MtY2x1c3RlcicsIHtcclxuICAgICAgICAgICAgY2x1c3Rlck5hbWU6IGNsdXN0ZXJOYW1lLFxyXG4gICAgICAgICAgICB0YWdzOiB7XHJcbiAgICAgICAgICAgICAgICBTdGFnZTogcHJvcHMuc3RhZ2UsXHJcbiAgICAgICAgICAgICAgICBOYW1lOiBjbHVzdGVyTmFtZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbWFzdGVyc1JvbGU6IGNsdXN0ZXJBZG1pbixcclxuICAgICAgICAgICAgcm9sZTogY2x1c3RlclJvbGUsXHJcbiAgICAgICAgICAgIHZlcnNpb246IGVrcy5LdWJlcm5ldGVzVmVyc2lvbi5WMV8yMSxcclxuICAgICAgICAgICAgdnBjOiB2cGMsXHJcbiAgICAgICAgICAgIGRlZmF1bHRDYXBhY2l0eTogMCxcclxuICAgICAgICAgICAgLy8gYWxiQ29udHJvbGxlcjoge1xyXG4gICAgICAgICAgICAvLyAgICAgdmVyc2lvbjogZWtzLkFsYkNvbnRyb2xsZXJWZXJzaW9uLlYyXzRfMSxcclxuICAgICAgICAgICAgLy8gfSxcclxuICAgICAgICAgICAgY2x1c3RlckxvZ2dpbmc6IFtcclxuICAgICAgICAgICAgICAgIGVrcy5DbHVzdGVyTG9nZ2luZ1R5cGVzLkFQSSxcclxuICAgICAgICAgICAgICAgIGVrcy5DbHVzdGVyTG9nZ2luZ1R5cGVzLlNDSEVEVUxFUlxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBjZXJ0UGFyYW0gPSBuZXcgc3NtLlN0cmluZ1BhcmFtZXRlcih0aGlzLCAnc3NtQ2x1dHN0ZXJDZXJ0aWZpY2F0ZUF1dGhvcml0eScsXHJcbiAgICAgICAgICAgIHsgcGFyYW1ldGVyTmFtZTogYC8ke2NsdXN0ZXJOYW1lfS9jbHVzdGVyLWNlcnRpZmljYXRlLWF1dGhvcml0eWAsIHN0cmluZ1ZhbHVlOiBjbHVzdGVyLmNsdXN0ZXJDZXJ0aWZpY2F0ZUF1dGhvcml0eURhdGEgfSk7XHJcbiAgICAgICAgY29uc3Qgb3BlbklkQ29ubmVjdFByb3ZpZGVyQXJuID0gbmV3IHNzbS5TdHJpbmdQYXJhbWV0ZXIodGhpcywgJ3NzbU9wZW5JZENvbm5lY3RQcm92aWRlckFybicsXHJcbiAgICAgICAgICAgIHsgcGFyYW1ldGVyTmFtZTogYC8ke2NsdXN0ZXJOYW1lfS9vcGVuaWQtY29ubmVjdC1wcm92aWRlci1hcm5gLCBzdHJpbmdWYWx1ZTogY2x1c3Rlci5vcGVuSWRDb25uZWN0UHJvdmlkZXIub3BlbklkQ29ubmVjdFByb3ZpZGVyQXJuIH0pO1xyXG4gICAgICAgIGNvbnN0IGt1YmVjdGxSb2xlID0gbmV3IHNzbS5TdHJpbmdQYXJhbWV0ZXIodGhpcywgJ3NzbUt1YmVjdGxSb2xlJyxcclxuICAgICAgICAgICAgeyBwYXJhbWV0ZXJOYW1lOiBgLyR7Y2x1c3Rlck5hbWV9L2t1YmVjdGwtcm9sZS1hcm5gLCBzdHJpbmdWYWx1ZTogY2x1c3Rlci5rdWJlY3RsUm9sZT8ucm9sZUFybiBhcyBzdHJpbmcgfSk7XHJcblxyXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ1NTTUNsdXRzdGVyQ2VydGlmaWNhdGVBdXRob3JpdHknLCB7IHZhbHVlOiBjZXJ0UGFyYW0ucGFyYW1ldGVyTmFtZSB9KTtcclxuICAgICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdTU01vcGVuSWRDb25uZWN0UHJvdmlkZXJBcm4nLCB7IHZhbHVlOiBvcGVuSWRDb25uZWN0UHJvdmlkZXJBcm4ucGFyYW1ldGVyTmFtZSB9KTtcclxuICAgICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdTU01vcGVuSWRDb25uZWN0UHJvdmlkZXJBcm5WYWx1ZScsIHsgdmFsdWU6IG9wZW5JZENvbm5lY3RQcm92aWRlckFybi5zdHJpbmdWYWx1ZSB9KTtcclxuICAgICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdTU01LdWJlY3RsUm9sZUFyblZhbHVlJywgeyB2YWx1ZToga3ViZWN0bFJvbGUuc3RyaW5nVmFsdWUgfSk7XHJcblxyXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ1dlYkNvbnNvbGVVcmwnLCB7IHZhbHVlOiBgaHR0cHM6Ly8ke3RoaXMucmVnaW9ufS5jb25zb2xlLmF3cy5hbWF6b24uY29tL2Vrcy9ob21lP3JlZ2lvbj11cy1lYXN0LTEjL2NsdXN0ZXJzLyR7Y2x1c3Rlci5jbHVzdGVyTmFtZX1gIH0pO1xyXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ0NsdXN0ZXJOYW1lJywgeyB2YWx1ZTogY2x1c3Rlci5jbHVzdGVyTmFtZSB9KTtcclxuICAgICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdDbHVzdGVyQXJuJywgeyB2YWx1ZTogY2x1c3Rlci5jbHVzdGVyQXJuIH0pO1xyXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ0NsdXN0ZXJFbmRwb2ludCcsIHsgdmFsdWU6IGNsdXN0ZXIuY2x1c3RlckVuZHBvaW50IH0pO1xyXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ0NsdXN0ZXJTZWN1cml0eUdyb3VwSWQnLCB7IHZhbHVlOiBjbHVzdGVyLmNsdXN0ZXJTZWN1cml0eUdyb3VwSWQgfSk7XHJcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLCAnQ2x1c3RlckVuY3J5cHRpb25Db25maWdLZXlBcm4nLCB7IHZhbHVlOiBjbHVzdGVyLmNsdXN0ZXJFbmNyeXB0aW9uQ29uZmlnS2V5QXJuIH0pO1xyXG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ0NsdXN0ZXJPcGVuSWRDb25uZWN0SXNzdWVyJywgeyB2YWx1ZTogY2x1c3Rlci5jbHVzdGVyT3BlbklkQ29ubmVjdElzc3VlciB9KTtcclxuICAgICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdDbHVzdGVyT3BlbklkQ29ubmVjdElzc3VlclVybCcsIHsgdmFsdWU6IGNsdXN0ZXIuY2x1c3Rlck9wZW5JZENvbm5lY3RJc3N1ZXJVcmwgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19