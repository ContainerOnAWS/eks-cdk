ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION=$(aws configure get default.region)

echo "ACCOUNT_ID: $ACCOUNT_ID"
echo "REGION: $REGION"
sleep 1

docker build -t eks-terraform .

aws ecr create-repository --repository-name eks-terraform --image-scanning-configuration scanOnPush=true --region $REGION

docker tag eks-terraform:latest ${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/eks-terraform:latest

aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com

docker push ${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/eks-terraform:latest

# docker run -it -p 8080:8080 eks-terraform