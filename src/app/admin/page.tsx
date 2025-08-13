import AdminDashboard from "../components/AdminDashboard";

export default function AdminPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-gray-600">
                    View and manage all employee salary
                    records. Update salary amounts and
                    commission rates.
                </p>
            </div>

            <AdminDashboard />
        </div>
    )
}
