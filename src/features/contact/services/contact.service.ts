import api from '@/services/api';

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ContactResponse {
    success: boolean;
    message: string;
}

export const sendContactMessage = async (data: ContactFormData): Promise<ContactResponse> => {
    try {
        const response = await api.post<ContactResponse>('/contact', data);
        return response.data;
    } catch (error) {
        console.error('Error sending contact message:', error);
        throw error;
    }
};