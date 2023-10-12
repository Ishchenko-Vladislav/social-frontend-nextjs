import { axiosInstance } from "@/api/instance";
import { API_URL } from "@/utils/constants";
import { CloudinaryFile } from "./file.interface";

export const fileService = {
  async uploadFile(file: File, setProgress: (val: number) => void) {
    return axiosInstance.post<CloudinaryFile>(
      API_URL + "/cloudinary/upload",
      {
        file,
      },
      {
        // responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onDownloadProgress(progressEvent) {
          if (!progressEvent || !progressEvent.total) return;
          const percentComplete = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
          setProgress(percentComplete);
        },
      }
    );
  },
};
