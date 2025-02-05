import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, mode, onClose, onSave }) => {
  const [data, setData] = useState(product || {
    name: '',
    category: '',
    unit: '',
    price: '',
    supplier: ''
  });

  const [saving, setSaving] = useState(false);

  const categoryOptions = [
    'วัสดุก่อสร้าง',
    'วัสดุไฟฟ้า',
    'วัสดุประปา',
    'เฟอร์นิเจอร์',
    'อุปกรณ์ตกแต่ง',
    'อื่นๆ'
  ];

  const unitOptions = [
    'ชิ้น',
    'อัน',
    'ชุด',
    'กล่อง',
    'ถุง',
    'ม้วน',
    'แผ่น',
    'เมตร',
    'ลิตร'
  ];

  const supplierOptions = [
    'บริษัท ไทยไฟฟ้า จำกัด',
    'บริษัท สยามซีเมนต์ จำกัด',
    'บริษัท วัสดุภัณฑ์ จำกัด',
    'ห้างหุ้นส่วนจำกัด รุ่งเรืองการค้า'
  ];

  useEffect(() => {
    if (product) {
      setData(product);
    }
  }, [product]);

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
      console.error('Error saving product:', error);
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
              {isReadOnly ? 'ข้อมูลสินค้า' : (mode === 'edit' && product ? 'แก้ไขข้อมูลสินค้า' : 'เพิ่มสินค้าใหม่')}
            </h2>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อสินค้า <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`w-full border rounded-lg p-2 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                value={data.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                required
                readOnly={isReadOnly}
                placeholder="ระบุชื่อสินค้า"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                หมวดหมู่ <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full border rounded-lg p-2 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                value={data.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                required
                disabled={isReadOnly}
              >
                <option value="">เลือกหมวดหมู่</option>
                {categoryOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                หน่วย <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full border rounded-lg p-2 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                value={data.unit}
                onChange={(e) => handleFieldChange('unit', e.target.value)}
                required
                disabled={isReadOnly}
              >
                <option value="">เลือกหน่วย</option>
                {unitOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ราคา <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  className={`w-full border rounded-lg p-2 pr-12 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                  value={data.price}
                  onChange={(e) => handleFieldChange('price', e.target.value)}
                  required
                  min="0"
                  step="0.01"
                  readOnly={isReadOnly}
                  placeholder="0.00"
                />
                <span className="absolute right-3 top-2 text-gray-500">บาท</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier <span className="text-red-500">*</span>
              </label>
              <select
                className={`w-full border rounded-lg p-2 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                value={data.supplier}
                onChange={(e) => handleFieldChange('supplier', e.target.value)}
                required
                disabled={isReadOnly}
              >
                <option value="">เลือก Supplier</option>
                {supplierOptions.map(option => (
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

export default ProductForm;