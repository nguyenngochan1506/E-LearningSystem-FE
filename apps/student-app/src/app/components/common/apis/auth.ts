const API_URL = import.meta.env.VITE_API_URL;
const LANGUAGE = localStorage.getItem('language');
export const login = async (email: string, password: string) => {
    
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': LANGUAGE ,
        },
        body: JSON.stringify({
            email,
            password,
            platform: "WEB",
            deviceToken: "1223",
        }),
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        // const messageData = errorData.message;
        console.log(errorData);
        throw new Error(errorData.message);
        }
    const data = await response.json();
    return data.data; // Trả về dữ liệu (ví dụ: token)
};

export const sendEmailForgotPassword = async (email: string) => {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': LANGUAGE
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json();
    
    return data; // Trả về dữ liệu nếu cần
}

export const resetPassword = async (secretKey: string, newPassword: string) => {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': LANGUAGE
        },
        body: JSON.stringify({ secretKey, newPassword }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const data = await response.json();
    
    return data; // Trả về dữ liệu nếu cần
}