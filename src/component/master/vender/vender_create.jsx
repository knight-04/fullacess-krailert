import React, { useState, useEffect } from 'react';
import { Tags, Plus, X } from 'lucide-react';

const VendorForm = ({ vendor, mode, onClose, onSave }) => {
  const [data, setData] = useState(vendor || {
    name: '',
    address: '',
    phone: '',
    paymentTerms: '',
    services: []
  });

  const [saving, setSaving] = useState(false);
  const [serviceInput, setServiceInput] = useState('');

  const paymentTermsOptions = [
    'เงินสด',
    'เครดิต 7 วัน',
    'เครดิต 15 วัน',
    'เครดิต 30 วัน',
    'เครดิต 45 วัน',
    'เครดิต 60 วัน'
  ];

  const serviceOptions = [
    'งานระบบไฟฟ้า',
    'งานระบบประปา',
    'งานติดตั้งเฟอร์นิเจอร์',
    'งานตกแต่งภายใน',
    'งานปูกระเบื้อง',
    'งานสี',
    'งานฝ้า',
    'งานประตู-หน้าต่าง',
    'งานหลังคา',
    'งานปรับปรุงซ่อมแซม'
  ];

  useEffect(() => {
    if (vendor) {
      setData(vendor);
    }
  }, [vendor]);

  const handleFieldChange = (field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddService = (service) => {
    if (service && !data.services.includes(service)) {
      handleFieldChange('services', [...data.services, service]);
    }
    setServiceInput('');
  };

  const handleRemoveService = (serviceToRemove) => {
    handleFieldChange(
      'services',
      data.services.filter(service => service !== serviceToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(data);
    } catch (error) {
      console.error('Error saving vendor:', error);
    } finally {
      setSaving(false);
    }
  };

  const isReadOnly = mode === 'view';

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b pb-3">
            <h2 className="text-xl font-semibold">
              {isReadOnly ? 'ข้อมูล Vendor' : (mode === 'edit' && vendor ? 'แก้ไขข้อมูล Vendor' : 'เพิ่ม Vendor ใหม่')}
            </h2>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อ Vendor <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full border rounded-lg p-2 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                value={data.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                required
                readOnly={isReadOnly}
                placeholder="ระบุชื่อ Vendor"
              />
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ประเภทงาน <span className="text-red-500">*</span>
              </label>
              {!isReadOnly && (
                <div className="mb-2">
                  <div className="flex gap-2">
                    <select
                      className="w-full border rounded-lg p-2"
                      value={serviceInput}
                      onChange={(e) => setServiceInput(e.target.value)}
                    >
                      <option value="">เลือกประเภทงาน</option>
                      {serviceOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => handleAddService(serviceInput)}
                      disabled={!serviceInput}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {data.services.map((service, index) => (
                  <span
                    key={index}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm 
                      ${isReadOnly ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}
                  >
                    <Tags size={16} />
                    {service}
                    {!isReadOnly && (
                      <button
                        type="button"
                        onClick={() => handleRemoveService(service)}
                        className="hover:text-blue-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {data.services.length === 0 && (
                <p className="text-sm text-gray-500 mt-1">ยังไม่ได้เลือกประเภทงาน</p>
              )}
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ที่อยู่ <span className="text-red-500">*</span>
              </label>
              <textarea
                className={`w-full border rounded-lg p-2 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                value={data.address}
                onChange={(e) => handleFieldChange('address', e.target.value)}
                required
                readOnly={isReadOnly}
                rows={3}
                placeholder="ระบุที่อยู่"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เบอร์โทร <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className={`w-full border rounded-lg p-2 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                value={data.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                required
                readOnly={isReadOnly}
                placeholder="02-XXX-XXXX"
                pattern="[0-9-]{9,}"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เงื่อนไขการชำระเงิน <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full border rounded-lg p-2 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                value={data.paymentTerms}
                onChange={(e) => handleFieldChange('paymentTerms', e.target.value)}
                required
                disabled={isReadOnly}
              >
                <option value="">เลือกเงื่อนไขการชำระเงิน</option>
                {paymentTermsOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {isReadOnly ? 'ปิด' : 'ยกเลิก'}
            </button>
            
            {!isReadOnly && (
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                disabled={saving}
              >
                {saving && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                )}
                {saving ? 'กำลังบันทึก...' : 'บันทึก'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default VendorForm;