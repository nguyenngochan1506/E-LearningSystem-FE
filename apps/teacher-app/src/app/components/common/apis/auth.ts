import { Permission, Role } from "../../../pages/roles-management/RoleManagement";

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

export async function createRoleAPI(role: Omit<Role, 'id' | 'createdAt' | 'permissions'> & { permissions?: number[] }) {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token is missing');
  }
  const { name, description, permissions } = role;
  const responseRoles = await fetch(`${API_URL}/v1/roles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': LANGUAGE || 'en',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ name, description }),
  });
  const dataRoles = await responseRoles.json();
  if (!responseRoles.ok) {
    throw new Error(dataRoles.message || 'Failed to create role');
  }
  const roleId = dataRoles.data;
  if(roleId && permissions && permissions.length > 0) {
    const response = await assignPermissionsToRoleAPI(roleId, permissions);
    return response;
  }
  return null;
}
export async function assignPermissionsToRoleAPI(roleId: number, permissions: number[]) {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token is missing');
  }
  const response = await fetch(`${API_URL}/v1/roles/assign-permission`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': LANGUAGE || 'en',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ 
      roleId,
      permissionIds: permissions, // Mảng ID của permissions
     }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to assign permissions to role');
  }
  const data = await response.json();
  return data.data; // Trả về dữ liệu của role đã được cập nhật
}

export async function updateRoleAPI(role: Role) {
  console.log('Mock updating role:', role);
  return {
    success: true,
    data: role,
  };
}

export async function getRolesAPI(): Promise<Role[]> {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  const response = await fetch(`${API_URL}/v1/roles?pageNo=1&pageSize=100`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': LANGUAGE || 'en',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  
  const data = await response.json();
  
  return data.data.roles;
}


export async function deleteRoleAPI(id: number) {
  console.log('Mock deleting role:', id);
  return { success: true };
}

export async function getPermissionsAPI(): Promise<Permission[]> {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  const response = await fetch(`${API_URL}/v1/permissions?pageNo=1&pageSize=100`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': LANGUAGE || 'en',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  
  const data = await response.json();
  
  return data.data.permissions;
}

export async function createPermissionAPI(permission: Omit<Permission, 'id' | 'createdAt'>) {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token is missing');
  }
  const response = await fetch(`${API_URL}/v1/permissions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': LANGUAGE || 'en',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(permission),
  });

  const data = await response.json();
  if (response.ok) {
    return data.data;
  } else {
    throw new Error(data.message || 'Failed to create permission');
  }

}

export async function updatePermissionAPI(permission: Permission) {
  console.log('Mock updating permission:', permission);
  return {
    success: true,
    data: permission,
  };
}

export async function deletePermissionAPI(id: number) {
  console.log('Mock deleting permission:', id);
  return { success: true };
}

export async function getMeAPI() {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  const response = await fetch(`${API_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': LANGUAGE || 'en',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch user data');
  }

  const data = await response.json();
  
  return data.data; // Trả về dữ liệu người dùng
}

export async function getListUserAPI() {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    throw new Error('Access token is missing');
  }
  const response = await fetch(`${API_URL}/v1/users?pageNo=1&pageSize=100`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': LANGUAGE || 'en',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch user list');
  }
  const data = await response.json();
  return data.data.users; // Trả về danh sách người dùng
}
export async function getUserByIdAPI(id: number) {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    throw new Error('Access token is missing');
  }
  const response = await fetch(`${API_URL}/v1/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': LANGUAGE || 'en',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch user by ID');
  }
  const data = await response.json();
  return data.data; // Trả về thông tin người dùng
}