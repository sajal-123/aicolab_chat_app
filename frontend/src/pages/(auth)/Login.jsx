import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../../services/authServices'; // You need to create the loginUser function
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const mutation = useMutation({
        mutationFn: (formData) => loginUser(formData),
        onSuccess: (data) => {
            toast.success(data);
            navigate('/'); // Redirect to the dashboard or home after successful login
        },
        onError: (error) => {
            toast.error(error?.response?.data?.error || 'Something went wrong');
        },
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(formData); // Trigger the mutation with form data
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            mutation.isLoading
                                ? 'bg-blue-300 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        }`}
                    >
                        {mutation.isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                {mutation.isError && (
                    <p className="mt-4 text-sm text-red-500">
                        Error: {mutation.error.message || 'Something went wrong'}
                    </p>
                )}
                <div className="w-full items-center justify-center flex">
                    <Link to="/register" className="text-sm text-blue-600 hover:text-blue-800 hover:underline hover:font-bold duration-150">
                        Don&apos;t have an account? Register
                    </Link>
                </div>
            </div>
        </div>
    );
}

export { LoginForm };
