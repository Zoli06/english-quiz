import { mediaType } from "./media.schema.ts";
import { GraphQLUpload } from "graphql-upload-minimal";
import type { FileUpload } from "graphql-upload-minimal";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { Media } from "./media.orm.ts";
import path from "path";
import fs from "fs";

const getMediaTypeAndValidate = (filename: string) => {
  const defaultImageTypes = ["png", "jpg", "jpeg", "gif"];
  const defaultVideoTypes = ["mp4", "avi", "mov", "wmv", "flv", "mkv"];

  if (!process.env["ALLOWED_IMAGE_TYPES"]) {
    console.error(
      "ALLOWED_IMAGE_TYPES is not set in environment variables. Using default image types.",
    );
    process.env["ALLOWED_IMAGE_TYPES"] = JSON.stringify(defaultImageTypes);
  }

  if (!process.env["ALLOWED_VIDEO_TYPES"]) {
    console.error(
      "ALLOWED_VIDEO_TYPES is not set in environment variables. Using default video types.",
    );
    process.env["ALLOWED_VIDEO_TYPES"] = JSON.stringify(defaultVideoTypes);
  }

  // Check if media is an image or video
  const allowedImageExtensions = JSON.parse(process.env["ALLOWED_IMAGE_TYPES"]);
  const allowedVideoExtensions = JSON.parse(process.env["ALLOWED_VIDEO_TYPES"]);
  const extension = path.extname(filename).toLowerCase().replace(".", "");
  if (allowedImageExtensions.includes(extension)) {
    return "image";
  }
  if (allowedVideoExtensions.includes(extension)) {
    return "video";
  }
  return null;
};

const saveFile = async (file: FileUpload) => {
  if (!file) {
    return null;
  }
  const fileType = getMediaTypeAndValidate(file.filename);
  if (!fileType) {
    return null;
  }

  // Create uploads folder if it doesn't exist
  if (!fs.existsSync(path.parse(process.env["UPLOAD_PATH"]!).dir)) {
    fs.mkdir(
      path.parse(process.env["UPLOAD_PATH"]!).dir,
      { recursive: true },
      (err) => {
        if (err) {
          console.error("Failed to create upload directory:", err);
        }
      },
    );
  }
  const filename = `${Math.random().toString(36).substring(2)}${path
    .extname(file.filename)
    .toLowerCase()}`;
  // Save file
  const filePath = path.join(
    process.env["UPLOAD_PATH"]!,
    filename,
  );
  console.log("Saving file to:", filePath);
  file.createReadStream().pipe(fs.createWriteStream(filePath));
  return {filePath, filename, fileType};
};

export const createMedia = {
  type: mediaType,
  args: {
    file: { type: new GraphQLNonNull(GraphQLUpload) },
    title: { type: GraphQLString },
  },
  resolve: async (_: any, args: { file: Promise<FileUpload>; title?: string }) => {
    if (!args.file) {
      return null;
    }
    const file = await saveFile(await args.file);
    if (!file) {
      return null;
    }
    return await Media.create({
      // extract file name
      filename: file.filename,
      title: args.title,
      type: file.fileType,
    });
  },
};

export const editMedia = {
  type: mediaType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    file: { type: GraphQLUpload },
    title: { type: GraphQLString },
  },
  resolve: async (
    _: any,
    args: { id: number; file?: Promise<FileUpload>; title?: string },
  ) => {
    const media = await Media.findByPk(args.id);
    if (!media) {
      return null;
    }
    if (args.file) {
      const file = await saveFile(await args.file);
      if (!file) {
        return null;
      }
      fs.unlink(
        path.join(process.env["UPLOAD_PATH"]!, media.getDataValue("filename")),
        () => {},
      );
      media.setDataValue("type", file.fileType);
      media.setDataValue("filename", file.filename);
    }
    if (args.title) {
      media.setDataValue("title", args.title);
    }

    return await media.save();
  },
};

export const deleteMedia = {
  type: GraphQLBoolean,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: async (_: any, args: { id: number }) => {
    const media = await Media.findByPk(args.id);
    if (!media) {
      return;
    }
    fs.unlink(
      path.join(process.env["UPLOAD_PATH"]!, media.getDataValue("filename")),
      () => {
        media.destroy().then();
      },
    );
    return true;
  },
};
