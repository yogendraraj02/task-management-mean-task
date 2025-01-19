export interface AdminCredentials{
    email : string,
    password : string
}

export interface LoginData{
    "success": boolean,
    "message":string,
    "data": LoginUserInfo,
    "code": number,
}

export interface LoginUserInfo{
   "_id": string,
    "username": string,
    "email": string,
    "role": string,
    "profilePicture": "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    "createdAt": string,
    "updatedAt": string,
    "__v": number,
    "access_token": string,
}


export interface DecodedToken {
    id : number,
    email : string,
    iat : number,
    exp : number,
    role : string
}


export interface User {
    id: string;
    name: string;
    email: string;
    role: 'manager' | 'teamLead' | 'employee';
    teamLeadId?: number; // For employees
    managerId?: number;  // For teamLeads and employees
}
  