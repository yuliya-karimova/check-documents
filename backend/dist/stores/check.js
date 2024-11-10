import { defineStore } from 'pinia';
import axios from 'axios';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const useCheckStore = defineStore('check', {
    actions: {
        async checkCase(ucFile, sstsFile) {
            const formData = new FormData();
            formData.append('uc_file', ucFile); // Добавляем файл UC-number
            formData.append('ssts_file', sstsFile); // Добавляем файл SSTS-number
            try {
                const response = await axios.post(`${apiBaseUrl}/api/check-case`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                return response.data;
            }
            catch (err) {
                return err.response?.data?.error || 'Не удалось проверить требования';
            }
        },
        getDownloadLink(url) {
            // return `${apiBaseUrl}${url}`
            return `/${url}`;
        }
    }
});
