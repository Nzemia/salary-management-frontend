import axios from "axios"

const API_BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://salary-api-3nx4.onrender.com/api"
        : "http://localhost:8000/api"

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
})

// API endpoints
export const apiEndpoints = {
    // User endpoints
    submitSalary: "/user/salary",

    // Admin endpoints
    getAllSalaries: "/admin/salaries",
    getSalaryById: (userId: number) =>
        `/admin/salary/${userId}`,
    updateSalary: (userId: number) =>
        `/admin/salary/${userId}`
}
