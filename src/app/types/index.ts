export interface User {
    id: number
    name: string
    email: string
    created_at: string
    updated_at: string
    salary_detail?: SalaryDetail
}

export interface SalaryDetail {
    id: number
    user_id: number
    salary_local_currency: number
    salary_in_euros: number | null
    commission: number
    displayed_salary: number | null
    created_at: string
    updated_at: string
}

export interface UserSalaryFormData {
    name: string
    email: string
    salary_local_currency: number
}

export interface AdminUpdateData {
    salary_local_currency?: number
    salary_in_euros?: number
    commission?: number
}

export interface ApiResponse<T> {
    message: string
    data?: T
    user?: User
    errors?: Record<string, string[]>
}

export interface ApiError {
    response?: {
        data?: {
            message?: string
            errors?: Record<string, string[]>
        }
    }
}
