import { DeleteObjectCommand, DeleteObjectCommandInput, PutObjectCommand, PutObjectCommandInput, GetObjectCommand, GetObjectCommandInput } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  SendTemplatedEmailCommand,
  CreateTemplateCommand,
  SendBulkTemplatedEmailCommand,
  type SendTemplatedEmailCommandInput,
  CreateTemplateCommandInput,
  SendBulkTemplatedEmailCommandInput,
  BulkEmailDestination,
} from "@aws-sdk/client-ses";
import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { SESClient } from "@aws-sdk/client-ses";

const s3Configuration: S3ClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: process.env.AWS_REGION!,
};
//logger.info(`Creating S3 client with configuration: ${JSON.stringify(s3Configuration)}`)

const s3Client = new S3Client(s3Configuration);
const emailClient = new SESClient({});

export const generateSignedResumeUploadUrl = async (resumeId: string) => {
  // logger.info(`Generating signed url for resume ${resumeId}`);
  console.log("resumeId", resumeId, "access id", process.env.AWS_SECRET_ACCESS_KEY!, "secret access", process.env.AWS_SECRET_ACCESS_KEY!);
  const params: PutObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: resumeId,
    ContentType: "application/pdf",
  };
  const command = new PutObjectCommand(params);
  return await getSignedUrl(s3Client, command, { expiresIn: 60 * 30 });
};

export const generateSignedResumeUrl = async (resumeId: string) => {
  // logger.info(`Generating signed url for resume ${resumeId}`);
  const params: GetObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: resumeId,
  };
  const command = new GetObjectCommand(params);
  return await getSignedUrl(s3Client, command, { expiresIn: 60 * 30 });
};

export const deleteResume = async (resumeId: string) => {
  const params: DeleteObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: resumeId,
  };
  const command = new DeleteObjectCommand(params);
  return await s3Client.send(command);
};

interface EmailPayload {
  first_name: string;
  email: string;
}

export const sendAcceptanceEmails = async (applicants: EmailPayload[]) => {
  const destinations = applicants.map((applicant) => {
    const { email, first_name } = applicant;
    const destination: BulkEmailDestination = {
      Destination: {
        ToAddresses: [email],
      },
      ReplacementTemplateData: JSON.stringify({ first_name }),
    };

    return destination;
  });

  const params: SendBulkTemplatedEmailCommandInput = {
    Destinations: destinations,
    Source: "fiuoperations@weareinit.org",
    Template: "status-accepted-template-updated",
    DefaultTemplateData: JSON.stringify({ first_name: "first_name" }),
  };

  const command = new SendBulkTemplatedEmailCommand(params);
  await emailClient.send(command);
};

export const sendStatusConfirmedEmail = async (applicant: EmailPayload) => {
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/ses/command/SendTemplatedEmailCommand/
  const { email, first_name } = applicant;

  const params: SendTemplatedEmailCommandInput = {
    Destination: {
      ToAddresses: [email],
    },
    Source: "fiuoperations@weareinit.org",
    Template: "status-confirmed-template-updated-1",
    TemplateData: `{ \"first_name\":\"${first_name}\" }`,
  };

  const command = new SendTemplatedEmailCommand(params);
  await emailClient.send(command);
};

export const sendConfirmationEmail = async (toEmail: string, firstName: string) => {
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/ses/command/SendTemplatedEmailCommand/
  const params: SendTemplatedEmailCommandInput = {
    Destination: {
      ToAddresses: [toEmail],
    },
    Source: "fiuoperations@weareinit.org",
    Template: "welcome-template3",
    TemplateData: `{ \"FIRST_NAME\":\"${firstName}\" }`,
  };

  const command = new SendTemplatedEmailCommand(params);
  await emailClient.send(command);
};

export const createEmailTemplate = async (templateName: string, subjectPart: string, htmlPart: string) => {
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/ses/commands/CreateTemplateCommand.html
  const params: CreateTemplateCommandInput = {
    Template: {
      TemplateName: templateName,
      SubjectPart: subjectPart,
      HtmlPart: htmlPart,
    },
  };

  const command = new CreateTemplateCommand(params);
  const res = await emailClient.send(command);
  return res;
};

// export async function doesFileExistInS3(fileName: string) {
//   const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: fileName }
//   try {
//     const headObjectCmd: HeadObjectCommand = new HeadObjectCommand(params)
//     await s3Client.send(headObjectCmd)
//   } catch (error) {
//     throw Error(`File not found in S3 bucket`)
//   }
// }

// export async function deleteFromS3(fileName: string) {
//   const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: fileName }
//   try {
//     // Check if file exists
//     await doesFileExistInS3(fileName)
//     const command: DeleteObjectCommand = new DeleteObjectCommand(params)
//     await s3Client.send(command)
//   } catch (error) {
//     throw Error(`File does not exist on S3 bucket`)
//   }
// }
