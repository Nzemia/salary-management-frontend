"use client"

import React, { useState } from "react"

import toast from "react-hot-toast"
import {
    Loader2,
    DollarSign,
    User as UserIcon,
    Mail
} from "lucide-react"
import { ApiResponse, User, UserSalaryFormData } from "../types"
import { api, apiEndpoints } from "../lib/api"

const UserSalaryForm: React.FC = () => {
    const [formData, setFormData] =
        useState<UserSalaryFormData>({
            name: "",
            email: "",
            salary_local_currency: 0
        })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await api.post<
                ApiResponse<User>
            >(apiEndpoints.submitSalary, formData)

            toast.success(
                response.data.message ||
                    "Salary details submitted successfully!"
            )

            // Reset form
            setFormData({
                name: "",
                email: "",
                salary_local_currency: 0
            })
        } catch (error: any) {
            console.error("Error submitting salary:", error)

            if (error.response?.data?.errors) {
                // Handle validation errors
                Object.values(error.response.data.errors)
                    .flat()
                    .forEach((errorMsg: any) => {
                        toast.error(errorMsg)
                    })
            } else {
                toast.error(
                    error.response?.data?.message ||
                        "An error occurred"
                )
            }
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]:
                name === "salary_local_currency"
                    ? parseFloat(value) || 0
                    : value
        }))
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Submit Salary Details
            </h2>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                {/* Name Field */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Full Name
                    </label>
                    <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your full name"
                        />
                    </div>
                </div>

                {/* Email Field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>

                {/* Salary Field */}
                <div>
                    <label
                        htmlFor="salary_local_currency"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Salary (Local Currency)
                    </label>
                    <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            type="number"
                            id="salary_local_currency"
                            name="salary_local_currency"
                            value={
                                formData.salary_local_currency
                            }
                            onChange={handleInputChange}
                            min="0"
                            step="0.01"
                            required
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter salary amount"
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            Submitting...
                        </>
                    ) : (
                        "Submit Salary Details"
                    )}
                </button>
            </form>
        </div>
    )
}

export default UserSalaryForm
