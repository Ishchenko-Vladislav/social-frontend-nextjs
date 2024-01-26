import { CloudinaryResponse } from "@/services/file/file.interface";
import { fileService } from "@/services/file/file.services";
import { convertBase64 } from "@/utils/utils";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IAxiosErrorData } from "./useAuth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
type TPreviewAttachments = {
  resource_type: "image" | "video";
};
type TRenderAttach = {
  attachments: CloudinaryResponse[];
  previewAttachments: {}[];
  renderCount: number;
};
const d: any = {
  image: "image",
  video: "video",
};
type TAcceptFiles = "image/*" | "video/*" | "image/*, video/*";
export const usePreviewFile = () => {
  const [attachments, setAttachments] = useState<CloudinaryResponse[]>([]);
  const [attachmentsPreview, setAttachmentsPreview] = useState<TPreviewAttachments[]>([
    // { resource_type: "image" },
    // { resource_type: "image" },
    // { resource_type: "image" },
    // { resource_type: "image" },
  ]);
  const [acceptFiles, setAcceptFiles] = useState<TAcceptFiles>("image/*, video/*");
  const { mutateAsync, data, isPending, isError, reset } = useMutation({
    // mutationFn: async (file: FormData) => fileService.uploadFile(file, setProgress),
    mutationFn: async (files: FileList) => {
      // setAttachmentsPreview({ isPreview: true, previewCount: files.length });
      const files_uploaded = await Promise.all(f(files));
      return files_uploaded;
    },
    onSuccess: (data: CloudinaryResponse[], variables, context) => {
      setAttachments((prev) => [...prev, ...data]);
      // return data.data.api_key;
      // console.log("uploaded file hrere", data);
      // setAttachments((prev) => [...prev, data]);
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
    onSettled(data, error, variables, context) {
      // setAttachmentsPreview({
      //   isPreview: false,
      //   previewCount: 0,
      // });
      setAttachmentsPreview([]);
    },
    // cacheTime: 0,
    retry: false,
  });

  const attachRef = useRef<any>(null);
  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length == 0) return;
    if (files.length > 4) return toast.error("Please choose either 1 video or up to 4 photos.");
    if (files.length + attachments.length > 4)
      return toast.error("Please choose either 1 video or up to 4 photos.");
    const resource_type = validateResourceType(files);
    if (!resource_type) return toast.error("Please choose either 1 video or up to 4 photos.");
    setAttachmentsPreview(new Array(files.length).fill({ resource_type }));
    mutateAsync(files);
    // const files_uploaded = await Promise.all(f(files));
    // console.log("files_uploaded", files_uploaded);
    // setAttachments((prev) => [...prev, ...files_uploaded]);
  };
  useEffect(() => {
    attachRef.current = attachments;

    if (!!attachments.length) {
      const resource_type = attachments[0].resource_type + "/*";
      setAcceptFiles(resource_type as TAcceptFiles);
      window.addEventListener("beforeunload", beforeUnload);
    } else {
      setAcceptFiles("image/*, video/*");
    }
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [attachments]);
  const beforeUnload = () => {
    attachRef.current.map((el: any) => fileService.deleteFile(el.public_id));
  };
  const remove = async (public_id: string | "all") => {
    if (public_id === "all") {
      return setAttachments([]);
    }
    const res = fileService.deleteFile(public_id);
    setAttachments((prev) => {
      return prev.filter((el) => el.public_id !== public_id);
    });
  };
  const f = (files: FileList) => {
    const promises = [];
    for (const file of files) {
      const newPromise = fileService.upload(file);
      promises.push(newPromise);
    }
    return promises;
  };
  const validateResourceType = (files: FileList) => {
    const types = [];
    for (const file of files) {
      const type = file.type.split("/")[0];
      types.push(type);
    }
    const isImages = types.every((el) => el === "image");
    if (isImages) return "image";
    const isVideo = types.length === 1 && types[0] === "video";
    if (isVideo) return "video";
    return false;
  };

  const countToRender = useMemo(() => {
    console.log("count to render", attachmentsPreview);
    return attachments.length + attachmentsPreview.length;
  }, [attachments, attachmentsPreview]);
  return { attachments, acceptFiles, attachmentsPreview, countToRender, remove, uploadFile };
};
