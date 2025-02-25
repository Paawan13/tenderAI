import { useState } from 'react';
import axios from 'axios';
import { message, Modal } from 'antd';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      messageApi.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_REGISTER}/signup/`,
        new URLSearchParams({
          name,
          email,
          password,
          confirm_password: confirmPassword,
          company
        }).toString(),
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      messageApi.success(response.data.message || 'Registration Successful');
    } catch (error) {
      messageApi.error(error.response?.data?.detail || 'Registration failed!');
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
            <Modal
              open={open}
              footer={null}
              closable={false}
              centered
              width="100vw"
              bodyStyle={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <h1 className="text-7xl font-bold text-center">Coming Soon...</h1>
            </Modal>
            <h1 className="text-3xl font-bold text-blue-800 mb-2">
              Manage Government Contracts with AI
            </h1>
          </div>
          <div className="shadow-xl rounded-lg p-6">
            <h3 className="text-2xl font-bold text-center text-blue-800 mb-6">
              Create Your Account
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
              <input
                type="text"
                value={name}
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
              <input
                type="text"
                value={company}
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company"
                required
              />
              <input
                type="email"
                value={email}
                className="border col-span-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                type="password"
                value={password}
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <input
                type="password"
                value={confirmPassword}
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="col-span-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
              >
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
            <div className="text-center mt-4">
              <a href="/login" className="text-sm text-blue-600 hover:text-blue-800">
                Already have an account? Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
