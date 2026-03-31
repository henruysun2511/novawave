import { useUploadFile } from "@/libs/upload";

export const useUpload = () => {
    const { uploadFile, isUploading } = useUploadFile();

    const uploadImage = async (file: File): Promise<string> => {
        const result = await uploadFile(file);
        return result.url;
    };

    return {
        uploadImage,
        isUploading,
    };
};