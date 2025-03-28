import api from '@/services/api';

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const sendContactMessage = async (data: ContactFormData): Promise<any> => {
    try {
        const response = await api.post('/contact', data);
        return response.data;
    } catch (error) {
        console.error('Error sending contact message:', error);
        throw error;
    }
};