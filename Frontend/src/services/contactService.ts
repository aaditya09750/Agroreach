import api from './api';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  location?: string;
  currency?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export const contactService = {
  /**
   * Send contact form message
   * @param formData - Contact form data
   * @returns Promise with response
   */
  sendMessage: async (formData: ContactFormData): Promise<ContactResponse> => {
    try {
      const response = await api.post<ContactResponse>('/contact', formData);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to send message. Please try again.';
      throw new Error(errorMessage);
    }
  },
};

export default contactService;
