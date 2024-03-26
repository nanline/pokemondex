import { AxiosResponse, AxiosError } from "axios"

//ไฟล์นี้จะเป็นฟังชั่นที่โยนค่าเข้ามาและโยนค่าออกไป เป็นการจัดการ response แบบ error

export interface IResponse {
    status: number | undefined,
    error?: AxiosError<AxiosResponse<AxiosResponse<any, any>, any>>
    | AxiosResponse<any, any>
    | undefined
}

export const handleResponse = {
    success: (res: AxiosResponse) => {
        return {
            status: res.status,
            data: res.data
        }
    },
    error: (res: AxiosError<AxiosResponse>): IResponse => {
        if (res.message === "Network Error") {
            return {
                status: 500,
                error: res
            }
        } else {
            return {
                status: res.response?.status,
                error: res.response?.data
            }
        }
    }
}