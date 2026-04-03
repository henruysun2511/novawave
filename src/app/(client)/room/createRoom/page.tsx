"use client";

import { ArrowLeftOutlined, CalendarOutlined, CheckCircleFilled, EyeOutlined, InfoCircleOutlined, SearchOutlined, ThunderboltFilled } from "@ant-design/icons";
import { Avatar, Button, Card, Form, Input, Segmented, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useToast } from "@/hooks/useToast";
import { useCreateRoom } from "@/queries/useRoomQuery";
import { useSearch } from "@/queries/useSearchQuery";
import { RoomSourceType } from "@/types/constant.type";

interface SearchSourceItem {
  _id: string;
  name: string;
  imageUrl: string;
  subtitle?: string;
  sourceType: RoomSourceType;
}

interface SearchSongItem {
  _id: string;
  name: string;
  imageUrl: string;
  artistId?: { name?: string };
}

interface SearchAlbumItem {
  _id: string;
  name: string;
  img: string;
  artist?: string;
}

interface SearchPlaylistItem {
  _id: string;
  name: string;
  img: string;
  description?: string;
}

interface CreateRoomFormValues {
  name: string;
  description?: string;
  scheduledAt?: string;
}

function getErrorMessage(error: unknown, fallback: string) {
  const normalized = error as { response?: { data?: { message?: string } } };
  return normalized?.response?.data?.message || fallback;
}

const sourceOptions = [
  { label: "Bai hat", value: RoomSourceType.SONG },
  { label: "Album", value: RoomSourceType.ALBUM },
  { label: "Playlist", value: RoomSourceType.PLAYLIST },
];

export default function CreateRoomPage() {
  const router = useRouter();
  const toast = useToast();
  const [form] = Form.useForm<CreateRoomFormValues>();
  const [keyword, setKeyword] = useState("");
  const [sourceType, setSourceType] = useState<RoomSourceType>(RoomSourceType.SONG);
  const [selectedSource, setSelectedSource] = useState<SearchSourceItem | null>(null);
  const { data: searchData, isFetching } = useSearch(keyword.trim());
  const { mutate: createRoom, isPending } = useCreateRoom();

  const items = useMemo<SearchSourceItem[]>(() => {
    if (!searchData) return [];

    if (sourceType === RoomSourceType.SONG) {
      return ((searchData.songs ?? []) as SearchSongItem[]).map((item) => ({
        _id: item._id,
        name: item.name,
        imageUrl: item.imageUrl,
        subtitle: item.artistId?.name,
        sourceType,
      }));
    }

    if (sourceType === RoomSourceType.ALBUM) {
      return ((searchData.albums ?? []) as SearchAlbumItem[]).map((item) => ({
        _id: item._id,
        name: item.name,
        imageUrl: item.img,
        subtitle: item.artist,
        sourceType,
      }));
    }

    return ((searchData.playlists ?? []) as SearchPlaylistItem[]).map((item) => ({
      _id: item._id,
      name: item.name,
      imageUrl: item.img,
      subtitle: item.description,
      sourceType,
    }));
  }, [searchData, sourceType]);

  const handleSelectSource = (item: SearchSourceItem) => {
    setSelectedSource(item);
    form.setFieldsValue({
      imageUrl: item.imageUrl,
      name: form.getFieldValue("name") || item.name,
    } as never);
  };

  const handleSubmit = (values: CreateRoomFormValues) => {
    if (!selectedSource) {
      toast.error("Vui long chon mot nguon phat truoc khi tao phong");
      return;
    }

    createRoom(
      {
        name: values.name,
        description: values.description,
        imageUrl: selectedSource.imageUrl,
        scheduledAt: values.scheduledAt ? new Date(values.scheduledAt).toISOString() : undefined,
        initialSongId: selectedSource.sourceType === RoomSourceType.SONG ? selectedSource._id : undefined,
        albumId: selectedSource.sourceType === RoomSourceType.ALBUM ? selectedSource._id : undefined,
        playlistId: selectedSource.sourceType === RoomSourceType.PLAYLIST ? selectedSource._id : undefined,
      },
      {
        onSuccess: () => {
          toast.success("Tao phong thanh cong");
          router.push("/room");
        },
        onError: (error: unknown) => {
          toast.error(getErrorMessage(error, "Khong the tao phong"));
        },
      }
    );
  };

  return (
    <div >
      <div className="relative w-full h-[300px] md:h-[450px]">
        <img
          src={"https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1470&q=80"}
          alt="Album Banner"
          className="w-full h-full object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute bottom-0 left-0 z-20 p-4 md:p-6 w-full">
          <div className="text-xs md:text-base text-white mb-1">
            Kết nối và chia sẻ âm nhạc với bạn bè
          </div>
          <h3 className="uppercase text-3xl md:text-5xl lg:text-7xl font-extrabold text-white mb-1 hover:text-green transition line-clamp-2">
            Tạo phòng nghe nhạc chung
          </h3>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
        {/* Nút quay lại với hiệu ứng Glassmorphism nhẹ */}
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push("/room")}
          className="border-white/10 bg-white/5 text-white hover:!bg-white/10 hover:!border-emerald-500/50"
        >
          Quay lại danh sách phòng
        </Button>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          {/* CỘT TRÁI: FORM NHẬP LIỆU */}
          <Card
            className="rounded-[32px] border-white/10 bg-[#121212]/60 backdrop-blur-xl shadow-2xl"

          >
            <div className="mb-10">
              <div className="inline-block rounded-full bg-emerald-500/10 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-400 border border-emerald-500/20">
                Create New Room
              </div>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white">Tạo phòng nghe nhạc</h1>
              <p className="mt-2 text-sm font-medium text-white/50">Thiết lập không gian âm nhạc của riêng bạn trong vài bước.</p>
            </div>

            <Form<CreateRoomFormValues>
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              initialValues={{ name: "", description: "" }}
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Form.Item
                  label={<span className="text-xs font-bold uppercase tracking-wider text-white/60">Tên phòng</span>}
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]}
                >
                  <Input size="large" placeholder="Ví dụ: Lofi ban đêm..." className="h-12 rounded-xl border-white/10 bg-white/5 text-white focus:bg-white/10" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-xs font-bold uppercase tracking-wider text-white/60">Lịch bắt đầu</span>}
                  name="scheduledAt"
                >
                  <Input size="large" type="datetime-local" prefix={<CalendarOutlined className="text-emerald-400" />} className="h-12 rounded-xl border-white/10 bg-white/5 text-white focus:bg-white/10" />
                </Form.Item>
              </div>

              <Form.Item label={<span className="text-xs font-bold uppercase tracking-wider text-white/60">Mô tả phòng</span>} name="description">
                <Input.TextArea rows={3} placeholder="Chia sẻ một chút về phong cách nhạc của phòng này..." className="rounded-xl border-white/10 bg-white/5 text-white focus:bg-white/10" />
              </Form.Item>

              <Form.Item label={<span className="text-xs font-bold uppercase tracking-wider text-white/60">Chọn nguồn phát âm nhạc</span>} required>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-white/5 p-1.5 border border-white/5">
                    <Segmented
                      block
                      className="custom-segmented-create bg-transparent"
                      options={sourceOptions}
                      value={sourceType}
                      onChange={(value) => {
                        setSourceType(value as RoomSourceType);
                        setSelectedSource(null);
                      }}
                    />
                  </div>

                  <Input
                    allowClear
                    value={keyword}
                    size="large"
                    prefix={<SearchOutlined className="text-emerald-400" />}
                    placeholder={`Tìm ${sourceType === RoomSourceType.SONG ? "bài hát" : sourceType === RoomSourceType.ALBUM ? "album" : "playlist"}...`}
                    onChange={(event) => setKeyword(event.target.value)}
                    className="h-12 rounded-xl border-white/10 bg-white/5 text-white focus:bg-white/10"
                  />

                  {/* List kết quả tìm kiếm được cải tiến */}
                  <div className="max-h-[380px] space-y-2 overflow-y-auto rounded-2xl bg-black/20 p-2 scrollbar-thin scrollbar-thumb-white/10">
                    {isFetching ? (
                      <div className="flex flex-col items-center py-10 gap-3">
                        <Spin size="large" />
                        <span className="text-xs text-white/40 italic">Đang tìm kiếm giai điệu...</span>
                      </div>
                    ) : items.length > 0 ? (
                      items.map((item) => {
                        const isActive = selectedSource?._id === item._id;
                        return (
                          <button
                            type="button"
                            key={item._id}
                            onClick={() => handleSelectSource(item)}
                            className={`flex w-full items-center gap-4 rounded-xl p-3 text-left transition-all duration-300 ${isActive
                                ? "bg-emerald-500/20 border-emerald-500/50 shadow-lg shadow-emerald-500/10"
                                : "hover:bg-white/5 border border-transparent"
                              }`}
                          >
                            <div className="relative h-14 w-14 shrink-0">
                              <img src={item.imageUrl} alt={item.name} className="h-full w-full rounded-lg object-cover shadow-md" />
                              {isActive && <div className="absolute inset-0 rounded-lg bg-emerald-500/20 ring-2 ring-emerald-500" />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className={`truncate font-bold ${isActive ? "text-emerald-400" : "text-white"}`}>{item.name}</div>
                              <div className="truncate text-xs text-white/40">{item.subtitle || "Không có mô tả"}</div>
                            </div>
                            {isActive && <CheckCircleFilled className="text-emerald-500 text-xl animate-in zoom-in" />}
                          </button>
                        );
                      })
                    ) : (
                      <div className="py-12 text-center text-white/30 text-sm font-medium border border-dashed border-white/10 rounded-xl">
                        {keyword ? "Không tìm thấy kết quả nào" : "Nhập từ khóa để bắt đầu tìm kiếm"}
                      </div>
                    )}
                  </div>
                </div>
              </Form.Item>

              <div className="pt-4 flex items-center gap-4">
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  className="h-12 flex-1 rounded-xl bg-emerald-500 font-bold hover:!bg-emerald-400 shadow-lg shadow-emerald-500/20 border-none"
                  loading={isPending}
                >
                  Xác nhận tạo phòng
                </Button>
                <Button
                  size="large"
                  onClick={() => router.push("/room")}
                  className="h-12 rounded-xl border-white/10 bg-white/5 text-white hover:!bg-white/10"
                >
                  Hủy
                </Button>
              </div>
            </Form>
          </Card>

          {/* CỘT PHẢI: PREVIEW CARD */}
          <div className="sticky top-8 space-y-6">
            <div className="px-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <EyeOutlined />
                <span className="text-xs font-black uppercase tracking-widest">Live Preview</span>
              </div>
              <h2 className="mt-2 text-xl font-bold text-white">Xem trước hiển thị</h2>
            </div>

            <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#121212]/40 backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-emerald-500/30">
              <div className="relative h-80 overflow-hidden">
                <img
                  src={selectedSource?.imageUrl || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000"}
                  alt="Room preview"
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />

                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold text-emerald-400 backdrop-blur-md border border-white/10 uppercase tracking-tighter">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {selectedSource?.sourceType || sourceType}
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="line-clamp-2 text-3xl font-black leading-tight text-white">
                    {form.getFieldValue("name") || "Tên phòng của bạn"}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm font-medium text-white/60">
                    {form.getFieldValue("description") || "Mô tả phòng sẽ được hiển thị tại đây để thu hút người tham gia..."}
                  </p>
                </div>
              </div>

              {/* Thông tin chi tiết nguồn phat ở footer của Preview */}
              <div className="border-t border-white/5 bg-white/5 p-6 transition-colors group-hover:bg-white/10">
                {selectedSource ? (
                  <div className="flex items-center gap-4">
                    <Avatar shape="square" size={48} src={selectedSource.imageUrl} className="rounded-lg shadow-lg" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Nguồn đang chọn</div>
                      <div className="truncate text-sm font-bold text-white">{selectedSource.name}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-white/30 italic text-xs">
                    <InfoCircleOutlined />
                    Chưa có nguồn âm nhạc nào được chọn
                  </div>
                )}
              </div>
            </div>

            {/* Tip Box */}
            <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/10 p-5">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <ThunderboltFilled /> Mẹo nhỏ
              </h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Chọn một hình ảnh đại diện bắt mắt và mô tả ngắn gọn sẽ giúp phòng của bạn có nhiều người tham gia nghe nhạc cùng hơn.
              </p>
            </div>
          </div>
        </div>

        <style jsx global>{`
    .custom-segmented-create .ant-segmented-item {
        color: rgba(255,255,255,0.4) !important;
        font-weight: 600 !important;
        padding: 8px 0 !important;
    }
    .custom-segmented-create .ant-segmented-item-selected {
        background: #10b981 !important;
        color: white !important;
        border-radius: 12px !important;
    }
    .custom-segmented-create .ant-segmented-thumb {
        background: #10b981 !important;
        border-radius: 12px !important;
    }
  `}</style>
      </div>
    </div>
  );
}
