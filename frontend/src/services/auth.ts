import { LoginUserPayload, SignupUserPayload } from "@/types/auth";
import axios from "./axios"
import { ServerResult } from "@/types/common";

export async function apiLoginUser(payload: LoginUserPayload): Promise<any> {
    const { data } = await axios.post("/auth/login", payload);
    return data;
}

export async function apiSignupUser(payload: SignupUserPayload): Promise<any> {
    const { data } = await axios.post("/auth/register", payload);
    return data;
}

export async function apiCheckAuth(): Promise<any> {
    const { data } = await axios.get("/auth/checkAuth");
    return data;
}

export async function apiLogOutUser(): Promise<ServerResult<null>> {
    const { data } = await axios.post("/auth/log-out");
    return data;
}