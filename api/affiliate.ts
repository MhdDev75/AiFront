import apiClient from "./apiClient";

// دریافت کد دعوت
export const getAffiliate = async () => {
    try {
        const response = await apiClient.get(`/Affiliate`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": "Fa",
                },
            });
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }

}