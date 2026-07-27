"use client";

import { useEffect, useState, use, useRef } from "react";
import Link from "next/link";

type ImageSize = "square" | "wide" | "tall" | "large";

type GalleryImage = {
  id: number;
  src: string;
  category: string;
  size: ImageSize;
  colors?: string;
};

type Category = {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  images: GalleryImage[];
};

type ContentData = {
  beauty: Category[];
  bharathanatyam: Category[];
  tailoring: Category[];
};

const VALID_SECTIONS = ["beauty", "bharathanatyam", "tailoring"];
const SIZES: ImageSize[] = ["square", "wide", "tall", "large"];

const LABELS: Record<string, string> = {
  beauty: "Beauty",
  bharathanatyam: "Bharathanatyam",
  tailoring: "Tailoring",
};

export default function SectionAdminPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = use(params);
  const [data, setData] = useState<ContentData | null>(null);
  const [availableFiles, setAvailableFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({
    title: "",
    subtitle: "",
    cover: "",
  });
  const [imageForms, setImageForms] = useState<
    Record<string, { src: string; size: ImageSize; colors: string }>
  >({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const isValid = VALID_SECTIONS.includes(section);

  async function load() {
    setLoading(true);
    const [contentRes, filesRes] = await Promise.all([
      fetch("/api/admin/content"),
      fetch("/api/admin/images/list"),
    ]);
    const contentJson = await contentRes.json();
    const filesJson = await filesRes.json();
    setData(contentJson);
    setAvailableFiles(filesJson.files || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function callApi(body: object) {
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ section, ...body }),
    });
    const json = await res.json();
    setData(json);
  }

  function getImageForm(categoryId: string) {
    return (
      imageForms[categoryId] || {
        src: "",
        size: "tall" as ImageSize,
        colors: "",
      }
    );
  }

  function setImageForm(
    categoryId: string,
    updates: Partial<{ src: string; size: ImageSize; colors: string }>,
  ) {
    setImageForms((prev) => ({
      ...prev,
      [categoryId]: { ...getImageForm(categoryId), ...updates },
    }));
  }

  async function handleFileUpload(categoryId: string, file: File) {
    setUploadingId(categoryId);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = await res
          .json()
          .catch(() => ({ message: "Upload failed" }));
        alert(err.message || "Upload failed");
        return;
      }
      const json = await res.json();
      setImageForm(categoryId, { src: json.path });
      setAvailableFiles((prev) =>
        prev.includes(json.path) ? prev : [...prev, json.path].sort(),
      );
    } catch {
      alert("Upload failed. Check your connection and try again.");
    } finally {
      setUploadingId(null);
    }
  }

  if (!isValid) return <div className="p-10">Unknown section.</div>;
  if (loading || !data) return <div className="p-10">Loading...</div>;

  const categories = data[section as keyof ContentData];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/admin" className="text-sm text-gray-500 hover:text-black">
          ← Back to dashboard
        </Link>
        <h1 className="text-3xl font-semibold mt-2 mb-2">
          {LABELS[section]} Management
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          {availableFiles.length} image files found in{" "}
          <code>public/assets</code>
        </p>

        {/* Add category */}
        <div className="bg-white rounded-lg shadow p-5 mb-8 border border-gray-100">
          <h2 className="font-medium mb-3">Add a new category</h2>
          <div className="grid gap-2 sm:grid-cols-3">
            <input
              placeholder="Title"
              value={newCategory.title}
              onChange={(e) =>
                setNewCategory((p) => ({ ...p, title: e.target.value }))
              }
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <input
              placeholder="Subtitle"
              value={newCategory.subtitle}
              onChange={(e) =>
                setNewCategory((p) => ({ ...p, subtitle: e.target.value }))
              }
              className="border border-gray-300 rounded-md px-3 py-2"
            />
            <select
              value={newCategory.cover}
              onChange={(e) =>
                setNewCategory((p) => ({ ...p, cover: e.target.value }))
              }
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Choose cover image...</option>
              {availableFiles.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={async () => {
              if (!newCategory.title.trim()) return;
              await callApi({ action: "addCategory", payload: newCategory });
              setNewCategory({ title: "", subtitle: "", cover: "" });
            }}
            className="mt-3 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
          >
            Add category
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {categories.length === 0 && (
            <p className="text-gray-500">No categories yet.</p>
          )}

          {categories.map((category) => {
            const isUploading = uploadingId === category.id;

            return (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow border border-gray-100 p-5"
              >
                <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                  <div className="flex-1 grid gap-2 sm:grid-cols-3">
                    <input
                      defaultValue={category.title}
                      onBlur={(e) => {
                        if (e.target.value !== category.title) {
                          callApi({
                            action: "updateCategory",
                            categoryId: category.id,
                            payload: { title: e.target.value },
                          });
                        }
                      }}
                      className="font-medium border-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded px-1 -mx-1"
                    />
                    <input
                      defaultValue={category.subtitle}
                      onBlur={(e) => {
                        if (e.target.value !== category.subtitle) {
                          callApi({
                            action: "updateCategory",
                            categoryId: category.id,
                            payload: { subtitle: e.target.value },
                          });
                        }
                      }}
                      className="text-sm text-gray-600 border-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded px-1 -mx-1"
                    />
                    <select
                      defaultValue={category.cover}
                      onChange={(e) =>
                        callApi({
                          action: "updateCategory",
                          categoryId: category.id,
                          payload: { cover: e.target.value },
                        })
                      }
                      className="text-xs text-gray-500 border-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded px-1 -mx-1"
                    >
                      <option value={category.cover}>{category.cover}</option>
                      {availableFiles
                        .filter((f) => f !== category.cover)
                        .map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                    </select>
                  </div>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `Delete category "${category.title}" and all its images?`,
                        )
                      ) {
                        callApi({
                          action: "deleteCategory",
                          categoryId: category.id,
                        });
                      }
                    }}
                    className="text-sm text-red-600 hover:underline whitespace-nowrap"
                  >
                    Delete category
                  </button>
                </div>

                {/* Images grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                  {category.images.map((img) => (
                    <div
                      key={img.id}
                      className="border border-gray-200 rounded-md p-2"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt=""
                        className="w-full h-24 object-cover rounded mb-1"
                      />
                      <input
                        defaultValue={img.colors || ""}
                        placeholder="Colors"
                        onBlur={(e) => {
                          if (e.target.value !== (img.colors || "")) {
                            callApi({
                              action: "updateImage",
                              categoryId: category.id,
                              imageId: img.id,
                              payload: { colors: e.target.value },
                            });
                          }
                        }}
                        className="text-xs w-full border-none focus:outline-none focus:ring-1 focus:ring-gray-300 rounded px-1"
                      />
                      <div className="flex items-center justify-between mt-1">
                        <select
                          defaultValue={img.size}
                          onChange={(e) =>
                            callApi({
                              action: "updateImage",
                              categoryId: category.id,
                              imageId: img.id,
                              payload: { size: e.target.value as ImageSize },
                            })
                          }
                          className="text-xs border border-gray-200 rounded"
                        >
                          {SIZES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() =>
                            callApi({
                              action: "deleteImage",
                              categoryId: category.id,
                              imageId: img.id,
                            })
                          }
                          className="text-xs text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add image form — upload from device only */}
                <div className="bg-gray-50 rounded-md p-3">
                  <p className="text-sm font-medium mb-2">Add image</p>

                  <div className="mb-3 p-3 border-2 border-dashed border-gray-300 rounded-md bg-white">
                    <input
                      ref={(el) => {
                        fileInputRefs.current[category.id] = el;
                      }}
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(category.id, file);
                        e.target.value = "";
                      }}
                    />
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() =>
                        fileInputRefs.current[category.id]?.click()
                      }
                      className="w-full text-sm bg-white border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 disabled:opacity-50"
                    >
                      {isUploading
                        ? "Uploading..."
                        : "📤 Upload photo from your device"}
                    </button>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <select
                      value={getImageForm(category.id).size}
                      onChange={(e) =>
                        setImageForm(category.id, {
                          size: e.target.value as ImageSize,
                        })
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      {SIZES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <input
                      placeholder="Colors (optional)"
                      value={getImageForm(category.id).colors}
                      onChange={(e) =>
                        setImageForm(category.id, { colors: e.target.value })
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  {getImageForm(category.id).src && (
                    <div className="mt-2 flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={getImageForm(category.id).src}
                        alt=""
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <span className="text-xs text-gray-500">
                        {getImageForm(category.id).src}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={async () => {
                      const form = getImageForm(category.id);
                      if (!form.src) return;
                      await callApi({
                        action: "addImage",
                        categoryId: category.id,
                        payload: {
                          src: form.src,
                          size: form.size,
                          colors: form.colors || undefined,
                        },
                      });
                      setImageForm(category.id, {
                        src: "",
                        size: "tall",
                        colors: "",
                      });
                    }}
                    className="mt-2 bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800"
                  >
                    Add image
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
