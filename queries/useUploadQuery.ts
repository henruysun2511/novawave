import { CloudinaryService } from "@/services/upload.service";
import { ApiResponse } from "@/types/body.type";
import { Upload } from "@/types/object.type";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useUploadMedia = (
    options?: UseMutationOptions<ApiResponse<Upload>, Error, File>
) => {
    return useMutation<ApiResponse<Upload>, Error, File>({
        mutationFn: (file: File) => CloudinaryService.uploadMedia(file), 
        ...options 
    });
};