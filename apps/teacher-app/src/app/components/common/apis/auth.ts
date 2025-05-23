const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email: string, password: string) => {
    const language = localStorage.getItem('language');
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': language ,
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