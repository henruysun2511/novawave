"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

interface Props {
  value?: string;
  onChange?: (content: string) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

export default function TextEditor({ value, onChange, onImageUpload }: Props) {
  const editorRef = useRef<any>(null);

  const handleEditorChange = (content: string) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <div className="w-full border rounded-md overflow-hidden">
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
            "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
            "insertdatetime", "media", "table", "code", "help", "wordcount"
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "image media | removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          
          // Logic xử lý upload ảnh khi người dùng chọn file từ máy tính
          images_upload_handler: async (blobInfo: any): Promise<string> => {
            if (!onImageUpload) return "";
            
            const file = new File([blobInfo.blob()], blobInfo.filename(), {
              type: blobInfo.blob().type,
            });

            const url = await onImageUpload(file);
            return url; // Trả về URL để TinyMCE chèn vào thẻ <img>
          },
        }}
       apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
      />
    </div>
  );
}