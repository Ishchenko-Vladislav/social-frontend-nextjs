import { axiosInstance } from "@/api/instance";
import { API_URL, CloudinaryUrl } from "@/utils/constants";
import { CloudinaryFile, CloudinaryFileUpload, CloudinaryResponse } from "./file.interface";
import axios from "axios";

type DestroyDTO = {
  resource_type: string;
  public_id: string;
  signature: string;
  api_key: string;
  timestamp: any;
};
export const fileService = {
  dictionary_type: {
    image: "image",
    video: "video",
  },
  async uploadFile(file: File, onProgress?: (a: number) => void) {
    const url = "https://api.cloudinary.com/v1_1/daswkls85/image/upload";
    // const resource_type = this.dictionary_type[file.type.split("/")[0]];
    return axios
      .post<CloudinaryResponse>(url, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (progressEvent) => {
          if (!onProgress) return;
          if (!progressEvent || !progressEvent.total) return;
          const percentComplete = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
          onProgress(percentComplete);
          // console.log("onUploadProgress", percentComplete);
          // // setProgress(percentComplete);
        },
        // onDownloadProgress: (progressEvent) => {
        //   if (!progressEvent || !progressEvent.total) return;
        //   const percentComplete = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
        //   console.log("onDownloadProgress", percentComplete);
        //   // setProgress(percentComplete);
        // },
      })
      .then((res) => res.data);
  },
  async deleteFile(publicId: string) {
    return axiosInstance.delete<{ result: string }>("/cloudinary/" + publicId).then((res) => {
      console.log("file deleted");
      return res.data;
    });
  },
  async upload(file: File, onProgress?: (a: number) => void) {
    const file_type = file.type.split("/")[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wfz11ll4");
    const resource_type = file_type === "image" ? "image" : file_type === "video" ? "video" : "raw";
    return axios
      .post<CloudinaryResponse>(CloudinaryUrl.upload(resource_type), formData, {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },

        onUploadProgress: (progressEvent) => {
          if (!onProgress) return;
          if (!progressEvent || !progressEvent.total) return;
          const percentComplete = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
          onProgress(percentComplete);
        },
      })
      .then((res) => res.data);
  },
  async destroy(obj: any) {
    // const { resource_type, ...data } = obj;
    const api_key = process.env.CLOUDINARY_API_KEY;
    const timestamp = new Date(obj.created_at).getTime();
    const signature = obj.signature;
    // const signature = `public_id=${obj.public_id}&timestamp=${timestamp}&type=${obj.type}`;
    // const signature = `'public_id=${obj.public_id}&timestamp=${timestamp}'`;
    console.log("signature", signature);
    return axios.post(
      CloudinaryUrl.destroy(obj.resource_type) +
        `?api_key=${api_key}&timestamp=${timestamp}&signature=${signature}`,
      {
        public_id: obj.public_id,
      }
    );
  },
};
