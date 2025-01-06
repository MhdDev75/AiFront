// src/api/actions/userActions.js
import { IReceiptPayment } from "@/lib/type";
import apiClient from "./apiClient";

// گرفتن کیف پول کاربر
export const getBalance = async () => {
  try {
    const response = await apiClient.get(`/Account/Balance`);
    console.log(response);

    return response.data;
  } catch (error) {
    console.log(error);
    console.error("Error login user:", error);
    throw error;
  }
};

// گرفتن اطلاعات تراکنش کاربر
export const getTransaction = async () => {
  try {
    const response = await apiClient.get(`/Payment/Transactions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// ارسال درخواست پرداخت
export const postReceiptPayment = async (inputs: IReceiptPayment, file?: File) => {
  try {
    const formData = new FormData();
    if (inputs.type === "IMAGE") {
      inputs.text = ""
      if (file) {
        formData.append("FILE", file);
      }
      else {
        throw new Error("File is required");
      }
    } else {
      if (!inputs.text) {
        throw new Error("Text is required");
      }
    }
    const response = await apiClient.post(`/Payment/ReceiptPayment?Amount=${Number(inputs.amount)}&Type=${inputs.type}&Text=${inputs.text}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// گرفتن اطلاعات ملیت کاربر
export const getUserRegion = async () => {
  try {
    const response = await apiClient.get(`/Region/UserRegion`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }

};

// افزودن ملیت کاربر
export const postUserRegion = async (region: number) => {
  try {
    const response = await apiClient.post(`/Region/AddUserRegion`, {
      regionId: region
    },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": region,
        },
      });
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }

}
