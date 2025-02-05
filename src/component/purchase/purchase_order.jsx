import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { supplierOptions, itemOptions } from '../mockdata/mockData';

const PurchaseOrderForm = ({ order, mode, onChange, onSubmit, handleSave }) => {
  // const [data, setData] = useState({
  //   poNumber: '',
  //   date: '',
  //   project: '',
  //   supplier: '',
  //   address: '',
  //   contact: '',
  //   phone: '',
  //   dueDate: '',
  //   projectContact: '',
  //   houseplan: '',
  //   notes: '',
  //   documentType: '',
  //   items: [{ id: 1, name: '', quantity: '', unit: '', unitPrice: '', total: '' }],
  //   loading: false,
  //   error: null,
  //   // Signature fields
  //   controllerSignature: '',
  //   controllerDate: '',
  //   purchaserSignature: '',
  //   purchaserDate: '',
  //   inspectorSignature: '',
  //   inspectorDate: '',
  // });

  const [data, setData] = useState(order || {
    poNumber: '',
    date: '',
    project: '',
    supplier: '',
    address: '',
    contact: '',
    phone: '',
    dueDate: '',
    projectContact: '',
    houseplan: '',
    notes: '',
    documentType: '',
    items: [{ id: 1, name: '', quantity: '', unit: '', unitPrice: '', total: '' }],
    loading: false,
    error: null,
    controllerSignature: '',
    controllerDate: '',
    purchaserSignature: '',
    purchaserDate: '',
    inspectorSignature: '',
    inspectorDate: '',
  });


  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    if (order) {
      setData(order);
    }
  }, [order]);


  useEffect(() => {
    onChange?.(data);
  }, [data, onChange]);



  const fetchData = async () => {
    try {
      setData(prev => ({ ...prev, loading: true }));
      const response = await fetch('/api/purchase-orders');
      const result = await response.json();
      setData(prev => ({
        ...prev,
        ...result,
        loading: false
      }));
    } catch (error) {
      setData(prev => ({
        ...prev,
        error: 'ไม่สามารถโหลดข้อมูลได้',
        loading: false
      }));
    }
  };

  const handleFieldChange = (field, value) => {
    setData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: prev.items.length + 1,
        name: '',
        quantity: '',
        unit: '',
        unitPrice: '',
        total: ''
      }]
    }));
  };

  const handleRemoveItem = (index) => {
    setData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (index, field, value) => {
    setData(prev => {
      const newItems = [...prev.items];
      newItems[index] = {
        ...newItems[index],
        [field]: value
      };

      if (field === 'quantity' || field === 'unitPrice') {
        const quantity = parseFloat(field === 'quantity' ? value : newItems[index].quantity) || 0;
        const unitPrice = parseFloat(field === 'unitPrice' ? value : newItems[index].unitPrice) || 0;
        newItems[index].total = (quantity * unitPrice).toFixed(2);
      }

      return {
        ...prev,
        items: newItems
      };
    });
  };

  const calculateSubTotal = () => {
    return data.items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
  };

  const calculateVat = () => {
    return calculateSubTotal() * 0.07;
  };

  const calculateTotal = () => {
    return calculateSubTotal() + calculateVat();
  };


  if (data.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  const documentTypes = [
    'งานในสัญญา',
    'งานตรวจก่อนโอน',
    'งานโอนแล้วรอส่งมอบ',
    'งานต่อเดิม',
    'งานแจ้งซ่อมในประกัน',
    'งานขายและการบริการ'
  ];


  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <form onSubmit={handleSave}>
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <div className="w-32 h-32 rounded flex items-center justify-center mt-3">
              <img src='/images/626.jpg' alt="Company Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-semibold mb-2">บริษัท ไกรเลิศ แลนด์ จำกัด</h1>
              <p className="text-sm text-gray-600">7/10 ถนนสรุปราชัย แขวงดังบูรพา เขตบานนา</p>
              <p className="text-sm text-gray-600">กรุงเทพมหานคร 10120</p>
              <p className="text-sm text-gray-600">เลขประจำตัวผู้เสียภาษี 0105564136941</p>
            </div>
          </div>

          {/* Document Type Checkboxes */}
          <div className="space-y-2">
            {documentTypes.map((type, index) => (
              <div key={type} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`type-${index}`}
                  checked={data.documentType === type}
                  onChange={() => handleFieldChange('documentType', type)}
                  className="rounded"
                  required={index === 0}
                />
                <label htmlFor={`type-${index}`} className="text-sm">
                  {index + 1}. {type}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">ใบสั่งซื้อ (Purchase Order)</h2>
        </div>

        {/* PO Details */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="border rounded p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">ชื่อบริษัท</label>
                <select required
                  className="w-full border rounded p-2"
                  value={data.supplier}
                  onChange={(e) => handleFieldChange('supplier', e.target.value)}
                >
                  <option value="" disabled>เลือกบริษัท</option>
                  {supplierOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">ที่อยู่</label>
                <input required 
                  type="text"
                  className="w-full border rounded p-2"
                  value={data.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">ติดต่อ</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={data.contact}
                    onChange={(e) => handleFieldChange('contact', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">โทร.</label>
                  <input
                    type="text"
                    className="w-full border rounded p-2"
                    value={data.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">วันที่</label>
                <input
                  type="date"
                  className="w-full border rounded p-2"
                  value={data.date}
                  onChange={(e) => handleFieldChange('date', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">เลขที่ PO</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={data.poNumber}
                  onChange={(e) => handleFieldChange('poNumber', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">โครงการ</label>
                <select
                  className="w-full border rounded p-2"
                  value={data.project}
                  onChange={(e) => handleFieldChange('project', e.target.value)}
                >
                  <option value="">เลือกโครงการ</option>
                  <option value="project1">โครงการ 1</option>
                  <option value="project2">โครงการ 2</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">แปลนบ้าน</label>
                <select
                  className="w-full border rounded p-2"
                  value={data.houseplan}
                  onChange={(e) => handleFieldChange('houseplan', e.target.value)}
                >
                  <option value="">เลือกแบบบ้าน</option>
                  <option value="plan1">แบบบ้าน 1</option>
                  <option value="plan2">แบบบ้าน 2</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">วันกำหนดส่ง</label>
                <input
                  type="date"
                  className="w-full border rounded p-2"
                  value={data.dueDate}
                  onChange={(e) => handleFieldChange('dueDate', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">ติดต่อ</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={data.projectContact}
                  onChange={(e) => handleFieldChange('projectContact', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-sm w-16">ลำดับ</th>
                <th className="border p-2 text-sm">รายการสินค้า</th>
                <th className="border p-2 text-sm w-24">จำนวน</th>
                <th className="border p-2 text-sm w-24">หน่วย</th>
                <th className="border p-2 text-sm w-32">ราคา/หน่วย</th>
                <th className="border p-2 text-sm w-32">จำนวนเงิน</th>
                <th className="border p-2 text-sm w-16">จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={item.id}>
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">
                    <select
                      className="w-full p-1 border rounded"
                      value={item.name}
                      onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    >
                      <option value="" disabled>เลือกสินค้า</option>
                      {itemOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      className="w-full p-1 border rounded text-right"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      className="w-full p-1 border rounded text-center"
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      className="w-full p-1 border rounded text-right"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                    />
                  </td>
                  <td className="border p-2">
                    <input
                      type="text"
                      className="w-full p-1 border rounded text-right"
                      value={item.total}
                      readOnly
                    />
                  </td>
                  <td className="border p-2 text-center">
                    {data.items.length > 1 && (
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="7" className="border p-2">
                  <button
                    onClick={handleAddItem}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    <Plus size={16} />
                    เพิ่มรายการ
                  </button>
                </td>
              </tr>

              <tr>
                <td colSpan="4" rowSpan="3" className="border p-2">
                  <textarea
                    className="w-full p-2 border rounded"
                    placeholder="หมายเหตุ"
                    rows="3"
                    value={data.notes}
                    onChange={(e) => handleFieldChange('notes', e.target.value)}
                  />
                </td>
                <td className="border p-2 text-right font-semibold text-sm">รวมเงิน</td>
                <td className="border p-2 text-right">
                  {calculateSubTotal().toFixed(2)}
                </td>
                <td className="border"></td>
              </tr>
              <tr>
                <td className="border p-2 text-right font-semibold text-sm">VAT 7%</td>
                <td className="border p-2 text-right">
                  {calculateVat().toFixed(2)}
                </td>
                <td className="border"></td>
              </tr>
              <tr>
                <td className="border p-2 text-right font-semibold text-sm">รวมเป็นเงินทั้งสิ้น</td>
                <td className="border p-2 text-right">
                  {calculateTotal().toFixed(2)}
                </td>
                <td className="border"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="border-b pb-8 mb-2"></div>
            <p className="text-sm">ผู้ควบคุมงาน</p>
            <p className="text-sm text-gray-600">วันที่ ___/___/___</p>
          </div>
          <div className="text-center">
            <div className="border-b pb-8 mb-2"></div>
            <p className="text-sm">ผู้สั่งซื้อ / สั่งซ่อม</p>
            <p className="text-sm text-gray-600">วันที่ ___/___/___</p>
          </div>
          <div className="text-center">
            <div className="border-b pb-8 mb-2"></div>
            <p className="text-sm">ผู้ตรวจสอบ (Site N)</p>
            <p className="text-sm text-gray-600">วันที่ ___/___/___</p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PurchaseOrderForm;

