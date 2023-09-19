# HAPI API

## Running Locally

1. **Create an S3 Bucket**

   - Create an Amazon S3 bucket to store your application's data.

2. **Install Required Packages**

   - Make sure you have Node.js and npm installed.
   - Run the following command to install the necessary dependencies:

     ```shell
     npm install
     ```

3. **Start the Application**

   - To start the application, run:

     ```shell
     npm start
     ```

4. **Run Tests**

   - To run tests for your application, execute:

     ```shell
     npm test
     ```

## Deploying to AWS using Serverless Framework

1. **Install AWS CLI Locally**

   - Install the AWS Command Line Interface (CLI) on your local machine.

2. **Configure AWS Credentials**

   - Set up your AWS credentials, including your secret key and access key, by running:

     ```shell
     aws configure
     ```

3. **Install Serverless Framework**

   - Install the Serverless Framework globally using npm:

     ```shell
     npm install -g serverless
     ```

4. **Optional: Modify S3 Bucket Configuration**

   - If you need to change the S3 bucket configuration, you can do so in the `serverless.yaml` file.

5. **Deploy Your Code**

   - To deploy your application to AWS, use the Serverless Framework by running:

     ```shell
     serverless deploy
     ```

   This will deploy your serverless application to AWS, making it accessible to users.

