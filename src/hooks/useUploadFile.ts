import { fileService } from "@/services/file/file.services";
import { useMutation } from "@tanstack/react-query";
import { IAxiosErrorData } from "./useAuth";
import axios, { AxiosError, AxiosProgressEvent } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { axiosInstance } from "@/api/instance";
import { API_URL } from "@/utils/constants";
import {
  CloudinaryFile,
  CloudinaryFileUpload,
  CloudinaryResponse,
} from "@/services/file/file.interface";
import toast from "react-hot-toast";

type TStatus = "preview" | "uploaded";

export const useUploadFile = () => {
  const [status, setStatus] = useState<TStatus>("preview");
  const [progress, setProgress] = useState<number>(0);
  const [attachments, setAttachments] = useState<CloudinaryResponse[]>([]);

  const { mutateAsync, data, isPending, isError, reset } = useMutation({
    mutationFn: async (file: FormData) => fileService.uploadFile(file, setProgress),
    // mutationFn: async (file: FormData) => {

    //   const res = await axios.post<CloudinaryResponse>(url, file, {
    //     onUploadProgress: (progressEvent) => {
    //       if (progressEvent && progressEvent.total) {
    //         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //         setProgress(percentCompleted);
    //       }
    //     },
    //   });
    //   return res.data;
    // },
    onSuccess: (data, variables, context) => {
      // return data.data.api_key;
      // console.log("uploaded file hrere", data);
      setAttachments((prev) => [...prev, data]);
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
    // cacheTime: 0,
    retry: false,
  });

  // const dictionary: Record<TFileTypes, string> = {
  //   image: 'image',
  //   video: 'video',
  //   raw: 'raw',
  //   auto: 'auto',
  // };
  // const limitFileSize: Record<TFileTypes, number> = {
  //   image: 1024 * 1024 * 10,
  //   video: 1024 * 1024 * 50,
  //   raw: 1024 * 1024 * 10,
  //   auto: 1024 * 1024 * 50,
  // };
  // const uploadFileStream = async (file: any): Promise<CloudinaryResponse> => {
  //   return await new Promise<CloudinaryResponse>((resolve, reject) => {
  //     const typeFromMimetype = file.mimetype.split('/')[0];
  //     const sizeFile = file.size;
  //     let fileType: TFileTypes = 'auto';
  //     if (typeFromMimetype) {
  //       fileType = dictionary[typeFromMimetype] || 'auto';
  //     }

  //     if (fileType === 'image' && sizeFile >= limitFileSize['image']) {
  //       return toast.error(
  //         'Image size must be less than' + limitFileSize['image'],
  //       );
  //     } else if (
  //       fileType === 'video' &&
  //       sizeFile >= limitFileSize['video']
  //     ) {
  //       return toast.error(
  //         'Video size must be less than' + limitFileSize['video'],
  //       );
  //     } else if (fileType === 'raw' && sizeFile >= limitFileSize['raw']) {
  //       return toast.error(
  //         'File size like this must be less than' + limitFileSize['raw'],
  //       );
  //     }

  //     const uploadStream = cloudinary.uploader.upload_stream(
  //       {
  //         resource_type: fileType,
  //       },
  //       (error, result) => {
  //         if (error) return reject(error);
  //         resolve(result);
  //       },
  //     );
  //     streamifier.createReadStream(file.buffer).pipe(uploadStream);
  //   });
  // }

  useEffect(() => {
    return () => {
      if (status === "preview") {
      }
    };
  }, []);

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    // const selectedFile = e.target.files ? e.target.files[0] : null;
    const files = e.target.files;
    if (!files?.length) {
      console.log("selectedFile not found");
      return;
    }
    if (files.length > 1) {
      toast.error("only one file can be selected");
      e.target.value = "";
      console.log(e.target.files);
      return;
    }

    // console.log("selectedFile", e.target.files, selectedFile);

    const selectedFile = files[0];
    const resource_type = selectedFile.type.split("/")[0];

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "wfz11ll4");
    // await uploadFile(formData);
    await mutateAsync(formData);
    // console.log("formData", files[0], resource_type);
    // e.target.value = "";
  };

  const remove = (publicId: string) => {
    setAttachments((prev) => {
      const filtered = prev.filter((el) => el.public_id != publicId);
      return filtered;
    });
    console.log("file with public id should be delete", publicId);
    fileService.deleteFile(publicId);
  };

  return {
    status,
    progress,
    attachments,
    isLoadingFile: isPending,
    isErrorLoadingFile: isError,
    remove,
    uploadFile,
  };
};
