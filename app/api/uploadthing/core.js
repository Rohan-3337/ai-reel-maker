import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const audioFileRouter = {
  audioUploader: f({ audio: { maxFileSize: "16MB" } }) // Limit file size
    .onUploadComplete(({ file }) => {
      console.log("Uploaded file URL:", file.url);
      return { url: file.url };
    }),
};
