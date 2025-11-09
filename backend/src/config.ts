import path from "path";

const requiredEnvVars = [
  "DB_HOST",
  "DB_PORT",
  "DB_USER",
  "DB_PASS",
  "DB_NAME",
  "JWT_SECRET",
  "INITIAL_ADMIN_PASSWORD",
];

const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName],
);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
}

export const config = {
  db: {
    host: process.env["DB_HOST"]!,
    port: parseInt(process.env["DB_PORT"]!),
    user: process.env["DB_USER"]!,
    password: process.env["DB_PASS"]!,
    name: process.env["DB_NAME"]!,
  },
  initialAdmin: {
    username: process.env["INITIAL_ADMIN_USERNAME"] || "admin",
    password: process.env["INITIAL_ADMIN_PASSWORD"]!,
  },
  jwtSecret: process.env["JWT_SECRET"]!,
  env: process.env["NODE_ENV"] || "development",
  allowedMediaTypes: {
    image: process.env["ALLOWED_IMAGE_TYPES"]
      ? process.env["ALLOWED_IMAGE_TYPES"]!.split(",")
      : ["png", "jpg", "jpeg", "gif"],
    video: process.env["ALLOWED_VIDEO_TYPES"]
      ? process.env["ALLOWED_VIDEO_TYPES"]!.split(",")
      : ["mp4", "avi", "mov", "wmv", "flv", "mkv"],
  },
  address: {
    port: process.env["PORT"] ? parseInt(process.env["PORT"]) : 4000,
    apiEndpoint: process.env["API_ENDPOINT"] || "/graphql",
    uploadEndpoint: process.env["UPLOAD_ENDPOINT"] || "/uploads",
  },
  uploadPath: process.env["UPLOAD_PATH"] || path.join(import.meta.dirname, "..", "uploads"),
};