import boto3
import time
import paramiko

class AwsService:
    @staticmethod
    def create_instance(region: str, ami_id: str, instance_type: str, key_name: str, security_group_ids: str, subnet_id: str):
        ec2_resource = boto3.resource("ec2", region_name=region)

        response = ec2_resource.create_instances(
            ImageId=ami_id,
            InstanceType=instance_type,
            KeyName=key_name,
            SecurityGroupIds=security_group_ids,
            SubnetId=subnet_id,
            MinCount=1,
            MaxCount=1
        )
        instance = response[0]

        instance.wait_until_running()
        instance.load()

        return instance

    @staticmethod
    def execute_commands_on_instance(instance, commands: list[str]):
        time.sleep(10)
        
        key = paramiko.RSAKey.from_private_key_file("apiveil.pem")
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        
        ssh.connect(hostname=instance.public_ip_address, username="root", pkey=key)
        
        # Update package lists
        stdin, stdout, stderr = ssh.exec_command("apt-get update")
        stdout.read()
        
        # Install Docker
        stdin, stdout, stderr = ssh.exec_command("apt-get install -y docker.io")
        stdout.read()
        
        # Start and enable Docker service
        stdin, stdout, stderr = ssh.exec_command("systemctl start docker && systemctl enable docker")
        stdout.read()
        
        # Pull Docker image
        stdin, stdout, stderr = ssh.exec_command("docker pull apiveil/proxy:latest")
        stdout.read()
        
        # Run Docker container with environment variables
        stdin, stdout, stderr = ssh.exec_command("""
        docker run -d \\
          --name apiveil-proxy \\
          -p 8080:8080 \\
          -e API_KEY="your_api_key" \\
          -e API_SECRET="your_api_secret" \\
          -e TARGET_URL="https://api.target.com" \\
          apiveil/proxy:latest
        """)
        
        # Collect final output and errors
        output = stdout.read().decode()
        error = stderr.read().decode()
        
        ssh.close()
        
        return output, error