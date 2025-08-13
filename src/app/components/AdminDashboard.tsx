"use client"

import React, { useState, useEffect } from "react"

import toast from "react-hot-toast"
import {
    Loader2,
    Edit3,
    Save,
    X,
    Users,
    Euro,
    Calculator
} from "lucide-react"
import { AdminUpdateData, ApiResponse, User } from "../types"
import { api, apiEndpoints } from "../lib/api"

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [editingUserId, setEditingUserId] = useState<
        number | null
    >(null)
    const [editData, setEditData] =
        useState<AdminUpdateData>({})
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await api.get<
                ApiResponse<User[]>
            >(apiEndpoints.getAllSalaries)
            setUsers(response.data.data || [])
        } catch (error: any) {
            console.error("Error fetching users:", error)
            toast.error("Failed to load user data")
        } finally {
            setLoading(false)
        }
    }

    const startEdit = (user: User) => {
        setEditingUserId(user.id)
        setEditData({
            salary_local_currency:
                user.salary_detail?.salary_local_currency ||
                0,
            salary_in_euros:
                user.salary_detail?.salary_in_euros || 0,
            commission:
                user.salary_detail?.commission || 500
        })
    }

    const cancelEdit = () => {
        setEditingUserId(null)
        setEditData({})
    }

    const saveEdit = async (userId: number) => {
        setSaving(true)
        try {
            const response = await api.put<
                ApiResponse<User>
            >(apiEndpoints.updateSalary(userId), editData)

            toast.success("Salary updated successfully!")

            // Update local state
            setUsers(prev =>
                prev.map(user =>
                    user.id === userId
                        ? response.data.data!
                        : user
                )
            )

            setEditingUserId(null)
            setEditData({})
        } catch (error: any) {
            console.error("Error updating salary:", error)
            toast.error(
                error.response?.data?.message ||
                    "Failed to update salary"
            )
        } finally {
            setSaving(false)
        }
    }

    const handleEditInputChange = (
        field: keyof AdminUpdateData,
        value: string
    ) => {
        setEditData(prev => ({
            ...prev,
            [field]: parseFloat(value) || 0
        }))
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">
                    Admin Dashboard
                </h2>
            </div>

            {users.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                    No salary records found.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Local Currency
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Salary (EUR)
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Commission (EUR)
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Displayed Salary
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(user => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {user.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {user.email}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {editingUserId ===
                                        user.id ? (
                                            <input
                                                type="number"
                                                value={
                                                    editData.salary_local_currency ||
                                                    0
                                                }
                                                onChange={e =>
                                                    handleEditInputChange(
                                                        "salary_local_currency",
                                                        e
                                                            .target
                                                            .value
                                                    )
                                                }
                                                className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                                step="0.01"
                                                min="0"
                                            />
                                        ) : (
                                            <span className="text-sm text-gray-900">
                                                $
                                                {user
                                                    .salary_detail
                                                    ?.salary_local_currency
                                                    ? Number(
                                                          user
                                                              .salary_detail
                                                              .salary_local_currency
                                                      ).toFixed(
                                                          2
                                                      )
                                                    : "0.00"}
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {editingUserId ===
                                        user.id ? (
                                            <div className="flex items-center">
                                                <Euro className="h-4 w-4 text-gray-400 mr-1" />
                                                <input
                                                    type="number"
                                                    value={
                                                        editData.salary_in_euros ||
                                                        0
                                                    }
                                                    onChange={e =>
                                                        handleEditInputChange(
                                                            "salary_in_euros",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                                    step="0.01"
                                                    min="0"
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-900 flex items-center">
                                                <Euro className="h-4 w-4 text-gray-400 mr-1" />
                                                {user
                                                    .salary_detail
                                                    ?.salary_in_euros
                                                    ? Number(
                                                          user
                                                              .salary_detail
                                                              .salary_in_euros
                                                      ).toFixed(
                                                          2
                                                      )
                                                    : "0.00"}
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {editingUserId ===
                                        user.id ? (
                                            <div className="flex items-center">
                                                <Euro className="h-4 w-4 text-gray-400 mr-1" />
                                                <input
                                                    type="number"
                                                    value={
                                                        editData.commission ||
                                                        500
                                                    }
                                                    onChange={e =>
                                                        handleEditInputChange(
                                                            "commission",
                                                            e
                                                                .target
                                                                .value
                                                        )
                                                    }
                                                    className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                                                    step="0.01"
                                                    min="0"
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-900 flex items-center">
                                                <Euro className="h-4 w-4 text-gray-400 mr-1" />
                                                {user
                                                    .salary_detail
                                                    ?.commission
                                                    ? Number(
                                                          user
                                                              .salary_detail
                                                              .commission
                                                      ).toFixed(
                                                          2
                                                      )
                                                    : "500.00"}
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-semibold text-green-600 flex items-center">
                                            <Calculator className="h-4 w-4 mr-1" />
                                            €
                                            {user
                                                .salary_detail
                                                ?.displayed_salary
                                                ? Number(
                                                      user
                                                          .salary_detail
                                                          .displayed_salary
                                                  ).toFixed(
                                                      2
                                                  )
                                                : "500.00"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {editingUserId ===
                                        user.id ? (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() =>
                                                        saveEdit(
                                                            user.id
                                                        )
                                                    }
                                                    disabled={
                                                        saving
                                                    }
                                                    className="text-green-600 hover:text-green-900 disabled:text-green-400"
                                                >
                                                    {saving ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Save className="h-4 w-4" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={
                                                        cancelEdit
                                                    }
                                                    className="text-gray-600 hover:text-gray-900"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    startEdit(
                                                        user
                                                    )
                                                }
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <Edit3 className="h-4 w-4" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AdminDashboard
