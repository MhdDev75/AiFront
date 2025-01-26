import apiClient from "./apiClient";

// دریافت لیست ماموریت ها 
export const getTaskList = async () => {
    try {
        const response = await apiClient.get(`/UserTask/MyTask`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }

}

export const postAffiliate = async () => {
    try {
        const response = await apiClient.post(`/Affiliate`, {});
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }

}

export const getInvitedList = async () => {
    try {
        const response = await apiClient.get(`/Affiliate/Invited`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }

}

