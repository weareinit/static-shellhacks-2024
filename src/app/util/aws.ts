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
  ListTemplatesCommand,
  UpdateTemplateCommand,
  DeleteTemplateCommand,
} from "@aws-sdk/client-ses";
import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import { SESClient } from "@aws-sdk/client-ses";
import { ACCEPTED_REMINDER_TEMPLATE, ACCEPTED_TEMPLATE, APPLICATION_CONFIRMATION_TEMPLATE } from "@/app/constants/emailConstants";

const s3Configuration: S3ClientConfig = {
  credentials: {
    accessKeyId: "AKIAQ5O53R674C6PJ2KP",
    secretAccessKey: "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",
  },
  region: "us-east-2",
};

const s3Client = new S3Client(s3Configuration);
const emailClient = new SESClient({
  region: "us-east-2",
  credentials: {
    accessKeyId: "AKIAQ5O53R674C6PJ2KP",
    secretAccessKey: "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",
  },
});

/*
 * Uploads a resume to the S3 bucket and generates a thumbnail image
 */
export const uploadResume = async (resumeId: string, resume: Buffer) => {
  //print some details about the buffer for debugging
  console.log("Buffer length:", resume.length);
  console.log("Buffer type:", typeof resume);
  console.log("Buffer:", resume);
  try {
    // Upload the original resume
    const params: PutObjectCommandInput = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: resumeId,
      Body: resume,
      ContentType: "application/pdf",
    };
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Generate thumbnail image from the first page of the resume
    // gm(resume)
    //   .selectFrame(0)
    //   .setFormat("jpg")
    //   .resize(200) // Resize to fixed 200px width, maintaining aspect ratio
    //   .quality(75) // Quality from 0 to 100
    //   .toBuffer("jpg", async (err: any, buffer: any) => {
    //     if (err) {
    //       console.error("Error generating thumbnail image:", err, buffer);
    //       throw err;
    //     }

    // Upload the thumbnail image to a different bucket
    // const thumbnailParams: PutObjectCommandInput = {
    //   Bucket: process.env.AWS_THUMBNAIL_BUCKET_NAME!,
    //   Key: `${resumeId}.png`,
    //   Body: buffer,
    //   ContentType: "image/png",
    // };
    // const thumbnailCommand = new PutObjectCommand(thumbnailParams);
    // await s3Client.send(thumbnailCommand);
    // });

    return { message: "Resume uploaded successfully" };
  } catch (error) {
    console.error("Error uploading resume:", error);
    throw error;
  }
};

/*
 * Generates a signed URL to get  a resume in the S3 bucket
 */
export const generateSignedResumeUrl = async (resumeId: string) => {
  // logger.info(`Generating signed url for resume ${resumeId}`);
  const params: GetObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: resumeId,
  };
  const command = new GetObjectCommand(params);
  return await getSignedUrl(s3Client, command, { expiresIn: 60 * 30 });
};

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

/*
 * The confirmation email a hacker get swhen they register
 */
export const sendConfirmationEmail = async (
  toEmail: string,
  // firstName: string,
) => {
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/ses/command/SendTemplatedEmailCommand/
  const params: SendTemplatedEmailCommandInput = {
    Destination: {
      ToAddresses: [toEmail],
    },
    Source: "fiuoperations@weareinit.org",
    Template: APPLICATION_CONFIRMATION_TEMPLATE,
    TemplateData: "{}", //`{ \"FIRST_NAME\":\"${firstName}\" }`,
  };

  const command = new SendTemplatedEmailCommand(params);
  await emailClient.send(command);
};

/*
 * The emails that get sent out when a hacker is accepted. This will typically be done in "waves", which is why bulk sendign is used
 * We also need to resend the acceptance emails to remind hackers to confirm their attendance. This ia done via a button in the admin dash
 *
 * @param applicants - the list of applicants to send the emails to
 * @param reminder - whether or not this is a reminder email
 */
export const sendAcceptanceEmails = async (applicants: EmailPayload[], reminder: boolean = false) => {
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

  const batchSize = 45; //AWS limit is 50
  const numBatches = Math.ceil(destinations.length / batchSize);

  for (let i = 0; i < numBatches; i++) {
    const params: SendBulkTemplatedEmailCommandInput = {
      Destinations: destinations.slice(i * batchSize, (i + 1) * batchSize),
      Source: "fiuoperations@weareinit.org",
      Template: reminder ? ACCEPTED_REMINDER_TEMPLATE : ACCEPTED_TEMPLATE,
      DefaultTemplateData: JSON.stringify({ first_name: "first_name" }),
    };

    const command = new SendBulkTemplatedEmailCommand(params);
    await emailClient.send(command);
  }
};

/*
 * The confirmation email a hacker gets when they confirm their attendence
 */
export const sendStatusConfirmedEmail = async (applicant: EmailPayload) => {
  // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/preview/client/ses/command/SendTemplatedEmailCommand/
  const { email, first_name } = applicant;

  const params: SendTemplatedEmailCommandInput = {
    Destination: {
      ToAddresses: [email],
    },
    Source: "fiuoperations@weareinit.org",
    Template: "status-confirmed-template-updated-5",
    TemplateData: `{ \"first_name\":\"${first_name}\" }`,
  };

  const command = new SendTemplatedEmailCommand(params);
  await emailClient.send(command);
};

export const sendDiscordVerificationEmail = async (toEmail: string, hackerCode: string) => {
  const params: SendTemplatedEmailCommandInput = {
    Destination: {
      ToAddresses: [toEmail],
    },
    Source: "fiuoperations@weareinit.org",
    Template: "verifyDiscordTemplate18a825cab5d",
    TemplateData: `{ \"discord_code\":\"${hackerCode}\" }`,
  };

  const command = new SendTemplatedEmailCommand(params);
  await emailClient.send(command);
};

export const sendDiscordLinkedSuccessEmail = async (toEmail: string, discordUsername: string, firstName: string) => {
  const params: SendTemplatedEmailCommandInput = {
    Destination: {
      ToAddresses: [toEmail],
    },
    Source: "fiuoperations@weareinit.org",
    Template: "discordLinkedSuccessTemplate18a8270e068",
    TemplateData: `{ \"discord_username\":\"${discordUsername}\", \"first_name\":\"${firstName}\" }`,
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

export async function getEmailTemplates() {
  const getTemplates = new ListTemplatesCommand({});
  try {
    const data = await emailClient.send(getTemplates);
    return data;
  } catch (err) {
    console.log(err);
    // handle err
  }
}

export async function updateEmailTemplate(templateName: string, subjectPart: string, htlmPart: string) {
  const command = new UpdateTemplateCommand({
    Template: {
      TemplateName: templateName,
      SubjectPart: subjectPart,
      HtmlPart: htlmPart,
    },
  });

  const data = await emailClient.send(command);
  return data;
}

export async function removeEmailTemplate(templateName: string) {
  const command = new DeleteTemplateCommand({
    TemplateName: templateName,
  });

  const data = await emailClient.send(command);
  return data;
}

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
