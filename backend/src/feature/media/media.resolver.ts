import { mediaType } from "./media.schema.ts";
import type { FileUpload } from "graphql-upload-minimal";
import { GraphQLUpload } from "graphql-upload-minimal";
import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
} from "graphql";
import { Media } from "./media.orm.ts";
import path from "path";
import fs from "fs";
import { config } from "../../config.ts";

const getMediaTypeAndValidate = (filename: string) => {
  const extension = path.extname(filename).toLowerCase().replace(".", "");
  if (config.allowedMediaTypes.image.includes(extension)) {
    return "image";
  }
  if (config.allowedMediaTypes.video.includes(extension)) {
    return "video";
  }
  return null;
};

const saveFile = async (file: FileUpload) => {
  if (!file) {
    console.error("No file uploaded!");
    return null;
  }
  const fileType = getMediaTypeAndValidate(file.filename);
  if (!fileType) {
    console.error("Invalid file type uploaded!");
    return null;
  }

  // Create uploads folder if it doesn't exist
  if (!fs.existsSync(config.uploadPath)) {
    fs.mkdir(path.parse(config.uploadPath).dir, { recursive: true }, (err) => {
      if (err) {
        console.error("Failed to create upload directory:", err);
      }
    });
  }
  const filename = `${Math.random().toString(36).substring(2)}${path
    .extname(file.filename)
    .toLowerCase()}`;
  // Save file
  const filePath = path.join(config.uploadPath, filename);
  const writeStream = fs.createWriteStream(filePath);
  await new Promise<void>((resolve, reject) => {
    file.createReadStream()
      .pipe(writeStream)
      .on("finish", () => resolve())
      .on("error", (error) => {
        console.error("Error saving file:", error);
        reject(error);
      });
  });
  return { filePath, filename, fileType };
};

export const createMedia = {
  type: mediaType,
  args: {
    file: { type: new GraphQLNonNull(GraphQLUpload) },
    title: { type: GraphQLString },
  },
  resolve: async (
    _: any,
    args: { file: Promise<FileUpload>; title?: string },
  ) => {
    if (!args.file) {
      console.error("No file argument provided!");
      return null;
    }
    const file = await saveFile(await args.file);
    if (!file) {
      console.error("File saving failed!");
      return null;
    }
    return await Media.create({
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
        path.join(config.uploadPath, media.getDataValue("filename")),
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

// TODO: delete unused media after deleting quizzes/questions
export const deleteMedia = {
  type: GraphQLBoolean,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: async (_: any, args: { id: number }) => {
    const media = await Media.findByPk(args.id);
    if (!media) {
      return;
    }
    fs.unlink(
      path.join(config.uploadPath, media.getDataValue("filename")),
      () => {
        media.destroy().then();
      },
    );
    return true;
  },
};
