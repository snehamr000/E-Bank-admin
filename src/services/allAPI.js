import SERVER_URL from "./baseUrl"
import { commonAPI } from "./commonAPI"

export const loginAPI = async(user) =>{
    return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
}