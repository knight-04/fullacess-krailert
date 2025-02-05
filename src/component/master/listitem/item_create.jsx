import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Package } from 'lucide-react';

const ItemSetForm = ({ itemSet, mode, onClose, onSave }) => {
  const [data, setData] = useState(itemSet || {
    name: '',
    items: []
  });

  const [saving, setSaving] = useState(false);
  
  // Mock product options
  const productOptions = [
    { name: 'โถสุขภัณฑ์', price: 3500 },
    { name: 'อ่างล้างหน้า', price: 2500 },
    { name: 'ก๊อกน้ำ', price: 750 },
    { name: 'ฝักบัว', price: 1200 },
    { name: 'สวิตช์ไฟ', price: 120 },
    { name: 'ปลั๊กไฟ', price: 150 },
    { name: 'หลอดไฟ LED', price: 180 },
    { name: 'กระเบื้องปูพื้น', price: 450 },
    { name: 'ประตู PVC', price: 1500 },
    { name: 'หน้าต่างบานเลื่อน', price: 2200 }
  ];

  useEffect(() => {
    if (itemSet) {
      setData(itemSet);
    }
  }, [itemSet]);

  const handleFieldChange = (field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddItem = () => {
    const newItem = {
      id: data.items.length + 1,
      name: '',
      quantity: 1,
      price: 0
    };
    handleFieldChange('items', [...data.items, newItem]);
  };

  const handleRemoveItem = (index) => {
    handleFieldChange('items', data.items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...data.items];
    if (field === 'name') {
      const selectedProduct = productOptions.find(p => p.name === value);
      newItems[index] = {
        ...newItems[index],
        name: value,
        price: selectedProduct ? selectedProduct.price : 0
      };
    } else {
      newItems[index] = {
        ...newItems[index],
        [field]: value
      };
    }
    handleFieldChange('items', newItems);
  };

  const calculateTotal = () => {
    return data.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  };

  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const totalPrice = calculateTotal();
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave({ ...data, totalPrice });
    } catch (error) {
      console.error('Error saving item set:', error);
    } finally {
      setSaving(false);
    }
  };

  const isReadOnly = mode === 'view';

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b pb-3">
            <h2 className="text-xl font-semibold">
              {isReadOnly ? 'ข้อมูลชุดอุปกรณ์' : (mode === 'edit' && itemSet ? 'แก้ไขข้อมูลชุดอุปกรณ์' : 'เพิ่มชุดอุปกรณ์ใหม่')}
            </h2>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อชุดอุปกรณ์ <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <Package size={20} className="text-gray-400" />
                <input
                  type="text"
                  className={`w-full border rounded-lg p-2 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                  value={data.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  required
                  readOnly={isReadOnly}
                  placeholder="ระบุชื่อชุดอุปกรณ์"
                />
              </div>
            </div>

            {/* Items Table */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                รายการอุปกรณ์ <span className="text-red-500">*</span>
              </label>
              <div className="overflow-x-auto border rounded-lg">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ชื่อสินค้า</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase w-32">จำนวน</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase w-40">ราคา/หน่วย</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase w-40">รวม</th>
                      {!isReadOnly && (
                        <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase w-20">ลบ</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.items.map((item, index) => (
                      <tr key={item.id} className={isReadOnly ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                        <td className="px-4 py-2">
                          <select
                            className={`w-full border rounded p-1 ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                            value={item.name}
                            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                            required
                            disabled={isReadOnly}
                          >
                            <option value="">เลือกสินค้า</option>
                            {productOptions.map(product => (
                              <option key={product.name} value={product.name}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            className={`w-full border rounded p-1 text-center ${isReadOnly ? 'bg-gray-100' : 'bg-white'}`}
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                            required
                            min="1"
                            readOnly={isReadOnly}
                          />
                        </td>
                        <td className="px-4 py-2 text-right">
                          {item.price.toLocaleString('th-TH', {
                            style: 'currency',
                            currency: 'THB'
                          })}
                        </td>
                        <td className="px-4 py-2 text-right">
                          {calculateItemTotal(item).toLocaleString('th-TH', {
                            style: 'currency',
                            currency: 'THB'
                          })}
                        </td>
                        {!isReadOnly && (
                          <td className="px-4 py-2 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={!isReadOnly ? 5 : 4} className="px-4 py-2">
                        {!isReadOnly && (
                          <button
                            type="button"
                            onClick={handleAddItem}
                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                          >
                            <Plus size={16} />
                            เพิ่มรายการ
                          </button>
                        )}
                      </td>
                    </tr>
                    <tr className="border-t-2">
                      <td colSpan={!isReadOnly ? 3 : 2} className="px-4 py-2 text-right font-medium">
                        ราคารวมทั้งหมด
                      </td>
                      <td className="px-4 py-2 text-right font-medium">
                        {calculateTotal().toLocaleString('th-TH', {
                          style: 'currency',
                          currency: 'THB'
                        })}
                      </td>
                      {!isReadOnly && <td></td>}
                    </tr>
                  </tfoot>
                </table>
              </div>
              {data.items.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">ยังไม่มีรายการ</p>
              )}
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
                disabled={saving || data.items.length === 0}
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

export default ItemSetForm;