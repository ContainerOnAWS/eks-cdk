# EKS sample project with CDK

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ContainerOnAWS_eks-cdk&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ContainerOnAWS_eks-cdk) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=ContainerOnAWS_eks-cdk&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=ContainerOnAWS_eks-cdk)

![eks-cdk](./screenshots/eks-cdk.png?raw=true)

## Table of Contents

1. VPC
2. EKS cluster
3. EKS nodegroup
4. Build and push to ECR
5. Deploy

## Prerequisites

```bash
npm install -g aws-cdk@2.32.1

# install packages in the root folder
npm install
cdk bootstrap
```

Use the `cdk` command-line toolkit to interact with your project:

* `cdk deploy`: deploys your app into an AWS account
* `cdk synth`: synthesizes an AWS CloudFormation template for your app
* `cdk diff`: compares your app with the deployed stack
* `cdk watch`: deployment every time a file change is detected

## CDK Stack

|   | Stack                         | Time    |
|---|-------------------------------|---------|
| 1 | VPC                           | 3m 30s (optional) |
| 2 | EKS cluster                   | 13m     |
| 3 | EKS nodegroups                | 10m     |
| 4 | Build image and push to ECR   | 4m      |
| 5 | Deploy(including ALB)         | 4m      |
|   | Total                         | 31m (34m 30s with a new VPC)     |

## Deploy

### Step 1: VPC

The VPC ID will be saved into the SSM Parameter Store named `/eks-cdk/vpc-id` to refer from other stacks.

Create the SSM Parameter if you want to use the existing VPC:

```bash
aws ssm put-parameter --name "/eks-cdk/vpc-id" --value "{existing-vpc-id}" --type String 
```

```bash
cd vpc
cdk deploy
```

[01-vpc/lib/vpc-stack.ts](./01-vpc/lib/vpc-stack.ts)

### Step 2: EKS cluster

```bash
cd ../eks-cluster-nodegroup
cdk deploy 

# or define your VPC id with context parameter
cdk deploy -c vpcId=<vpc-id>
```

[02-eks-cluster/lib/cluster-stack.ts](./02-eks-cluster/lib/cluster-stack.ts)

SSM parameter:

* /eks-cdk/vpc-id

Cluster Name: [config.ts](./config.ts)

### Step 3: EKS nodegroup

```bash
cd ../03-eks-nodegroup
cdk deploy 
```

SSM parameters:

* /eks-cdk/vpc-id
* /${clusterName}/openid-connect-provider-arn
* /${clusterName}/kubectl-role-arn

```bash
clusterName: eks-cluster-local, eks-cluster-dev, eks-cluster-stg
```

[03-eks-nodegroup/lib/nodegroup-stack.ts](./03-eks-nodegroup/lib/nodegroup-stack.ts)

### Step 4: Build the SpringBoot Ping API

Build and push to ECR:

```bash
cd ../04-ecr
cdk deploy 
```

[04-ecr/lib/ecr-stack.ts](./04-ecr/lib/ecr-stack.ts)

### Step 5: Deploy the API

Create a YAML file for K8s Deployment, Service, HorizontalPodAutoscaler, and Ingress using a template file.

```bash
cd ../app
sed -e "s|<account-id>|${ACCOUNT_ID}|g" ping-api-template.yaml | sed -e "s|<region>|${REGION}|g" > ping-api.yaml
cat ping-api.yaml
kubectl apply -f ping-api.yaml
```

[app/ping-api-template.yaml](./app/ping-api-template.yaml)

## Cleanup

```bash
find . -name "node_modules" -exec rm -rf {} \;
find . -name "cdk.context.json" -exec rm -f {} \;
find . -name "cdk.out" -exec rm -rf {} \;
find . -name "build" -exec rm -rf {} \;

cd 04-ecr
cdk destroy

cd ../03-eks-nodegroup
cdk destroy

cd ../02-eks-cluster
cdk destroy

cd ../01-vpc
cdk destroy
```

## Structure

```text
.
├── build.gradle
├── config.ts
├── package-lock.json
├── package.json
├── tsconfig.json
├── 01-vpc
│   ├── bin
│   │   └── index.ts
│   ├── cdk.json
│   ├── jest.config.js
│   └── lib
│       └── vpc-stack.ts
├── 02 eks-cluster
│   ├── bin
│   │   └── index.ts
│   ├── cdk.json
│   ├── jest.config.js
│   └── lib
│       └── cluster-stack.ts
├── 03-eks-nodegroup
│   ├── bin
│   │   └── index.ts
│   ├── cdk.json
│   ├── jest.config.js
│   └── lib
│       └── nodegroup-stack.ts
├── 04-ecr
│   ├── bin
│   │   └── index.ts
│   ├── cdk.json
│   └── lib
│       └── ecr-stack.ts
├── eks-cluster-nodegroup
│   ├── bin
│   │   └── index.ts
│   ├── cdk.json
│   ├── jest.config.js
│   └── lib
│       └── cluster-nodegroup-stack.ts
├── app
│   ├── Dockerfile
│   ├── build.gradle
│   ├── build.sh
│   ├── ping-api-template.yaml
│   └── src
│       └── main
│           ├── java
│           │   └── com
│           │       └── sample
│           │           ├── SampleApplication.java
│           │           └── SampleController.java
│           └── resources
│               └── application.yaml
```

## Reference

### CDK Lib

* [EKS](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_eks-readme.html)

* [EKS ALB Controller](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_eks-readme.html#alb-controller)

* [IAM](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_iam-readme.html)

* [SSM](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ssm-readme.html)
