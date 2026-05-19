type R2ObjectBody = {
  body: ReadableStream;
  httpMetadata?: {
    contentType?: string;
  };
  writeHttpMetadata: (headers: Headers) => void;
};

type R2Bucket = {
  get: (key: string) => Promise<R2ObjectBody | null>;
  put: (
    key: string,
    value: ReadableStream | ArrayBuffer | ArrayBufferView | string | Blob,
    options?: {
      httpMetadata?: {
        contentType?: string;
      };
    },
  ) => Promise<unknown>;
  delete: (key: string) => Promise<void>;
};

declare module "cloudflare:workers" {
  export const env: {
    IMAGE_BUCKET?: R2Bucket;
    UPLOAD_PASSWORD?: string;
  };
}
