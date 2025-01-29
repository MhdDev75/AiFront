import { IReceiptPayment } from "@/lib/type";
import apiClient from "./apiClient";

// گرفتن کیف پول کاربر
export const getBalance = async () => {
  try {
    const response = await apiClient.get(`/Account/Balance`);
    return response.data;
  } catch (error) {
    console.error("Error Get Balance:", error);
    throw error;
  }
};

// گرفتن اطلاعات تراکنش کاربر
export const getTransaction = async () => {
  try {
    const response = await apiClient.get(`/Payment/Transactions`);
    return response.data;
  } catch (error) {
    console.error("Error Get Transaction:", error);
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
    const response = await apiClient.post(
      `/Payment/ReceiptPayment?Amount=${Number(inputs.amount)}&Type=${
        inputs.type
      }&Text=${inputs.text}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Post Payment:", error);
    throw error;
  }
};
