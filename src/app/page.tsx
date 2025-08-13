import Link from "next/link"
import {
    ArrowRight,
    Users,
    Shield,
    BadgeEuro
} from "lucide-react"

export default function Home() {
    const features = [
        {
            icon: BadgeEuro,
            title: "Submit Salary Details",
            description:
                "Form for users to submit their salary information",
            href: "/user",
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            icon: Shield,
            title: "Admin Dashboard",
            description:
                "Admin panel to manage all salary records",
            href: "/admin",
            color: "text-green-600",
            bgColor: "bg-green-100"
        }
    ]

    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center py-0">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Salary Management System
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    A comprehensive solution for managing
                    employee salary details with unique
                    email handling, admin controls, and
                    automated calculations.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {features.map(feature => (
                    <Link
                        key={feature.href}
                        href={feature.href}
                    >
                        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                            <div
                                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${feature.bgColor} mb-4`}
                            >
                                <feature.icon
                                    className={`h-6 w-6 ${feature.color}`}
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {feature.description}
                            </p>
                            <div className="flex items-center text-blue-600 font-medium">
                                Get Started{" "}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Stats Section */}
            <div className="mt-16 bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                    Key Features
                </h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                        <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900">
                            Unique Email Handling
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                            Automatically updates existing
                            records for duplicate emails
                        </p>
                    </div>
                    <div>
                        <BadgeEuro className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900">
                            Auto Calculations
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                            Displayed salary automatically
                            calculated from euros +
                            commission
                        </p>
                    </div>
                    <div>
                        <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-900">
                            Admin Controls
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                            Full admin control over salary
                            details and commission rates
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
