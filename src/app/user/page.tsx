import UserSalaryForm from "../components/UserSalaryForm";

export default function UserPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Submit Your Salary Details
                </h1>
                <p className="text-gray-600">
                    Enter your salary information. If you&apos;ve
                    submitted before, this will update your
                    existing record.
                </p>
            </div>

            <UserSalaryForm />
        </div>
    )
}
