import { LoginUserPayload } from "@/types/auth";
import axios from "./axios"

export async function apiLoginUser(payload: LoginUserPayload): Promise<any> {
    const { data } = await axios.post("/auth/login", payload);
    return data;
}