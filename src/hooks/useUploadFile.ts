import { fileService } from "@/services/file/file.srervices";
import { useMutation } from "@tanstack/react-query";
import { IAxiosErrorData } from "./useAuth";
import { AxiosError, AxiosProgressEvent } from "axios";
import { useState } from "react";
import { axiosInstance } from "@/api/instance";
import { API_URL } from "@/utils/constants";
import { CloudinaryFile } from "@/services/file/file.interface";
import toast from "react-hot-toast";

type TStatus = "preview" | "uploaded";

export const useUploadFile = () => {
  const [status, setStatus] = useState<TStatus>("preview");
  const [progress, setProgress] = useState<number>(0);
  const [file, setFile] = useState<CloudinaryFile | null>(null);
  // const uploadFile = (selectedFile: File) => {
  //   if (!selectedFile) {
  //     console.log("provide file please");
  //     return;
  //   }
  //   axiosInstance
  //     .post<CloudinaryFile>(
  //       API_URL + "/cloudinary/upload",
  //       { file: selectedFile },
  //       // selectedFile,
  //       {
  //         responseType: "blob",
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         onDownloadProgress(progressEvent) {
  //           if (!progressEvent || !progressEvent.total) return;
  //           const percentComplete = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
  //           setProgress(percentComplete);
  //         },
  //       }
  //     )
  //     .then((res) => console.log("response file uploader", res.data));
  // };

  const {
    mutate: uploadFile,
    data,
    isLoading,
    isError,
    reset,
  } = useMutation({
    mutationFn: async (file: File) => fileService.uploadFile(file, setProgress),
    onSuccess: (data, variables, context) => {
      // return data.data.api_key;
    },
    onError(error: AxiosError<IAxiosErrorData, any>, variables, context) {
      const message =
        error.response && error.response.data.message
          ? typeof error.response.data.message === "object"
            ? error.response.data.message[0]
            : error.response.data.message
          : typeof error.response === "object"
          ? "message" in error.response && error.response.message
          : "something went wrong";
      if (message && typeof message === "string") {
        toast.error(message);
      }
      console.log(error);
      return error;
    },
    cacheTime: 0,
    retry: false,
  });

  return {
    progress,
    status,
    data,
    isLoadingFile: isLoading,
    isErrorLoadingFile: isError,
    reset,
    uploadFile,
  };
};
