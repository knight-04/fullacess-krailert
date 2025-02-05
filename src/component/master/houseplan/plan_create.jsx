import React, { useState, useEffect } from 'react';

const HousePlanForm = ({ housePlan, mode, onClose, onSave }) => {
  const [data, setData] = useState(housePlan || {
    project: '',
    houseName: '',
    planName: '',
    address: ''
  });

  const [saving, setSaving] = useState(false);

  // Mock project options
  const projectOptions = [
    'หมู่บ้านกรีนวิลล์',
    'หมู่บ้านเดอะพาร์ค',
    'หมู่บ้านลากูน่า',
    'หมู่บ้านแกรนด์วิลเลจ'
  ];

  // Mock house plan options
  const planOptions = [
    'Type A - 150 sq.m.',
    'Type B - 180 sq.m.',
    'Type C - 200 sq.m.',
    'Type D - 250 sq.m.'
  ];

  useEffect(() => {
    if (housePlan) {
      setData(housePlan);
    }
  }, [housePlan]);

  const handleFieldChange = (field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(data);
    } catch (error) {
      console.error('Error saving house plan:', error);
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
              {isReadOnly ? 'ข้อมูลแปลนบ้าน' : (mode === 'edit' && housePlan ? 'แก้ไขข้อมูลแปลนบ้าน' : 'เพิ่มแปลนบ้านใหม่')}
            </h2>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                โครงการ <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full border rounded-lg p-2 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                value={data.project}
                onChange={(e) => handleFieldChange('project', e.target.value)}
                required
                disabled={isReadOnly}
              >
                <option value="">เลือกโครงการ</option>
                {projectOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อบ้าน <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full border rounded-lg p-2 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                value={data.houseName}
                onChange={(e) => handleFieldChange('houseName', e.target.value)}
                required
                readOnly={isReadOnly}
                placeholder="ระบุชื่อบ้าน"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                แปลนบ้าน <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full border rounded-lg p-2 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                value={data.planName}
                onChange={(e) => handleFieldChange('planName', e.target.value)}
                required
                disabled={isReadOnly}
              >
                <option value="">เลือกแปลนบ้าน</option>
                {planOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

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

export default HousePlanForm;