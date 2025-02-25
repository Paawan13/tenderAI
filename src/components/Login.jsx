import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_LOGIN}/login/`,
        new URLSearchParams({
          email,
          password,
        }).toString(),
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      messageApi.success(response.data.message || 'Login Successful');
      setTimeout(() => {
        window.location.href = '/';
      }
        , 1000);
    } catch (error) {
      messageApi.error(error.response?.data?.detail || 'Login failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        {contextHolder}

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              Manage Government Contracts with AI
            </h1>
            {/* <h2 className="text-xl font-semibold text-blue-600">
              by CompTech Enterprises
            </h2> */}
          </div>
          <div className="shadow-xl rounded-lg p-6">
            <h3 className="text-2xl font-bold text-center text-blue-800 mb-6">
              Welcome Back
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <div className="text-center mt-4">
              <a href="/register" className="text-sm text-blue-600 hover:text-blue-800">
                Create an account
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
