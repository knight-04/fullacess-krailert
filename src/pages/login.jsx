import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { setAuthCookie } from '../authen/cookie';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = { username: '', password: '' };
    let isValid = true;

    if (!username) {
      newErrors.username = 'กรุณากรอกชื่อผู้ใช้';
      isValid = false;
    } else if (username !== 'admin') {
      newErrors.username = 'ชื่อผู้ใช้ไม่ถูกต้อง';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
      isValid = false;
    } else if (password !== '1234') {
      newErrors.password = 'รหัสผ่านไม่ถูกต้อง';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSuccess(true);
      // เซ็ต cookie ด้วย js-cookie
      setAuthCookie();
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">เข้าสู่ระบบ</h2>

        {isSuccess && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg text-center">
            เข้าสู่ระบบสำเร็จ กำลังนำคุณไปยังหน้าแอดมิน...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="ชื่อผู้ใช้"
                disabled={isSuccess}
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="รหัสผ่าน"
                disabled={isSuccess}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-400"
            disabled={isSuccess}
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;