// types/index.d.ts
import type { NextApiRequest } from "next";
import type { File } from "multer";

export interface NextApiRequestWithFile extends NextApiRequest {
  file?: File;
  files?: File[];
}
