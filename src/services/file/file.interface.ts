export type CloudinaryFileUpload = {
  id: string;
  api_key: string;
  asset_id: string;
  bytes: number;
  created_at: Date;
  etag: string;
  public_id: string;
  resource_type: TFileResourceType;
  secure_url: string;
  signature: string;
  url: string;
  height: number;
  width: number;
};
type TFileResourceType = "video" | "image" | "raw";

export type CloudinaryFile = {
  id: string;
  assetId: string;
  publicId: string;
  resourceType: TFileResourceType;
  bytes: number;
  url: string;
  secureUrl: string;
  createdAt: string;
  image: CloudinaryImage | null;
  video: CloudinaryVideo | null;
  // api_key: string;
};

type CloudinaryImage = {
  width: number;
  height: number;
  format: string;
};
type CloudinaryVideo = {
  width: number;
  height: number;
  format: string;
  // audio: any;
  // duration: number;
  // playback_url: string;
  // metadata: {
  //   pix_format: string;
  //   codec: string;
  //   level: number;
  //   profile: string;
  //   bit_rate: string;
  //   dar: string;
  //   time_base: string;
  // };
};

export type CloudinaryResponse =
  | CloudinaryVideoResponse
  | CloudinaryImageResponse
  | CloudinaryRawResponse;

type CloudinaryVideoResponse = {
  asset_id: string; // 1 2 3
  public_id: string; // 1 2 3
  version: number; // 1 2 3
  version_id: string; // 1 2 3
  signature: string; // 1 2 3
  width: number; // 1 2
  height: number; // 1 2
  format: string; // 1 2
  resource_type: "video"; // 1 2 3
  created_at: string; // 1 2 3
  tags: []; // 1 2 3
  pages: number;
  bytes: number; // 1 2 3
  type: string; // 1 2 3
  etag: string; // 1 2 3
  placeholder: false; // 1 2 3
  url: string; // 1 2 3
  secure_url: string; // 1 2 3
  playback_url: string;
  folder: string; // 1 2 3
  audio: {};
  video: {
    pix_format: string;
    codec: string;
    level: number;
    profile: string;
    bit_rate: string;
    dar: string;
    time_base: string;
  };
  frame_rate: number;
  bit_rate: number;
  duration: number;
  rotation: number;
  original_filename: string; // 1 2 3
  nb_frames: number;
  api_key: string; // 1 2 3
};

type CloudinaryImageResponse = {
  asset_id: string; // 1 2 3
  public_id: string; // 1 2 3
  version: number; // 1 2 3
  version_id: string; // 1 2 3
  signature: string; // 1 2 3
  width: number; // 1 2
  height: number; // 1 2
  format: string; // 1 2
  resource_type: "image"; // 1 2 3
  created_at: Date; // 1 2 3
  tags: string[]; // 1 2 3
  bytes: number; // 1 2 3
  type: string; // 1 2 3
  etag: string; // 1 2 3
  placeholder: false; // 1 2 3
  url: string; // 1 2 3
  secure_url: string; // 1 2 3
  folder: string; // 1 2 3
  original_filename: string; // 1 2 3
  api_key: string; // 1 2 3
};
type CloudinaryRawResponse = {
  asset_id: string; // 1 2 3
  public_id: string; // 1 2 3
  version: number; // 1 2 3
  version_id: string; // 1 2 3
  signature: string; // 1 2 3
  resource_type: "raw"; // 1 2 3
  created_at: string; // 1 2 3
  tags: []; // 1 2 3
  bytes: number; // 1 2 3
  type: string; // 1 2 3
  etag: string; // 1 2 3
  placeholder: boolean; // 1 2 3
  url: string; // 1 2 3
  secure_url: string; // 1 2 3
  folder: string; // 1 2 3
  original_filename: string; // 1 2 3
  api_key: string; // 1 2 3
};

// type n = {
//   url: string; // 1 2 3
//   secure_url: string; // 1 2 3
//   bytes: number; // 1 2 3
//   width: number; // 1 2
//   height: number; // 1 2
//   asset_id: string; // 1 2 3
//   public_id: string; // 1 2 3
//   // version: number; // 1 2 3
//   // version_id: string; // 1 2 3
//   // signature: string; // 1 2 3
//   resource_type: "raw"; // 1 2 3
//   created_at: string; // 1 2 3
// };
