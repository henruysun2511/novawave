import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { Upload } from "@/types/object.type";

export const CloudinaryService = {
    uploadMedia: (file: File): Promise<ApiResponse<Upload>> => { 
        const formData = new FormData();
        formData.append('media', file); 
        
        return http.post<ApiResponse<Upload>>(`/cloudinaries/media`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res => res.data); 
    },
};