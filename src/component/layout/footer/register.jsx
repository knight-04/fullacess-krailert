import React, { useState } from 'react';

const RegistrationForm = ({ id }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    plan: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const GOOGLE_SCRIPTS_URL = 'https://script.google.com/macros/s/AKfycbz6WADwLxtsehOvmT4pMT9WCw-gpTf5QBzVrmZfMvROAViG8TgECGuz-E4uzLwwkeF-/exec';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const urlParams = new URLSearchParams(formData).toString();
      const finalUrl = `${GOOGLE_SCRIPTS_URL}?${urlParams}`;

      await fetch(finalUrl, {
        method: 'GET',
        mode: 'no-cors',
      });

      setIsSuccess(true);
      setFormData({
        email: '',
        name: '',
        phone: '',
        plan: ''
      });
    } catch (error) {
      console.error('Error:', error);
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id={id}>
      <div className="w-full bg-[#1B2848]">
        <div className="w-full max-w-2xl mx-auto p-6 bg-[#1B2848]">
          <h1 className="text-xl font-bold text-white mb-6 text-center">
            ลงทะเบียนรับสิทธิพิเศษ
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="กรุณากรอกชื่อของท่าน"
                required
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="กรุณากรอกเบอร์โทรศัพท์ของท่าน"
                required
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="กรุณากรอกอีเมลของท่าน"
                required
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2"
              />
              <select
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2"
              >
                <option value="">แผนการซื้อบ้าน</option>
                <option value="1-2 เดือน">1-2 เดือน</option>
                <option value="1 ปีขึ้นไป">1 ปีขึ้นไป</option>
              </select>
            </div>

            {error && (
              <div className="text-red-500 text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-8 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-100 focus:ring-2 transition-all duration-300 transform hover:scale-110 text-lg hover:text-white hover:border hover:bg-transparent disabled:bg-gray-400 disabled:hover:scale-100 disabled:hover:bg-gray-400 disabled:hover:text-gray-800"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-800 mr-2"></div>
                  กำลังดำเนินการ...
                </div>
              ) : (
                'ลงทะเบียนรับข้อมูล'
              )}
            </button>

            {isSuccess && (
              <div className="flex items-center text-green-500 justify-center mt-4">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                ลงทะเบียนรับข้อมูลสำเร็จ
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;