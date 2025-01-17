import apiClient from "./apiClient";

// ورود کاربر
export const radioJavanDownloader = async (url: string) => {
  try {
    const formData = new FormData();
    formData.append("url", url);
    formData.append("token", "18cf444ea2f1bd8608c8cc3bd8b5ad085bc0085dac000276ea0081ddebaa95cc");

    const response = await apiClient.post(
      `https://flydownloader.com/wp-json/aio-dl/video-data/`,
      formData
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error login user:", error);
    throw error;
  }
};

