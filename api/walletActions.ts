// src/api/actions/userActions.js
import { IReceiptPayment } from "@/lib/type";
import apiClient, { getDomain, getToken } from "./apiClient";
import axios from "axios";

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
export const postReceiptPayment = async (
  inputs: IReceiptPayment,
  file?: File
) => {
  try {
    const formData = new FormData();
    if (inputs.type === "IMAGE") {
      if (file !== undefined) {
        formData.append("File", file);
      }
    }

    const response = await axios({
      method: "post",
      url: `${getDomain()}Payment/ReceiptPayment?Amount=${Number(
        inputs.amount
      )}&Type=${inputs.type}&Text=${inputs.text}`,
      data: formData,
      headers: {
        Authorization: getToken(),
        "Content-Type": "multipart/form-data",
        "Accept-Language": "Fa", // زبان پیش‌فرض
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
