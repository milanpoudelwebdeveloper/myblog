import { axiosInstance, axiosInstanceFile } from "@/axiosConfig";

export const getCategories = async () => {
  try {
    const res = await axiosInstance.get("/category");
    if (res?.data) {
      return res?.data?.data;
    }
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong. Please try again";
    throw message;
  }
};

export const addCategory = async (name: string, image: File) => {
  try {
    const res = await axiosInstanceFile.post("/category", {
      name,
      image,
    });

    if (res?.data) {
      return res?.data?.message;
    }
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      "Something went wrong. Please try again";
    throw message;
  }
};
