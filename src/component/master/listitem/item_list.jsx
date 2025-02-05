import React, { useState, useEffect } from 'react';
import { Eye, Edit, Plus, Trash2, Package } from 'lucide-react';
import ItemSetForm from './item_create';
import { Alert, useAlert } from '../../../Toast/alert';

// Mock data
const mockItemSets = [
  {
    id: 1,
    name: 'ชุดอุปกรณ์ห้องน้ำมาตรฐาน',
    items: [
      { id: 1, name: 'โถสุขภัณฑ์', quantity: 1, price: 3500 },
      { id: 2, name: 'อ่างล้างหน้า', quantity: 1, price: 2500 },
      { id: 3, name: 'ก๊อกน้ำ', quantity: 2, price: 750 },
      { id: 4, name: 'ฝักบัว', quantity: 1, price: 1200 },
    ],
    totalPrice: 8700
  },
  {
    id: 2,
    name: 'ชุดอุปกรณ์ไฟฟ้าห้องนอน',
    items: [
      { id: 1, name: 'สวิตช์ไฟ', quantity: 2, price: 120 },
      { id: 2, name: 'ปลั๊กไฟ', quantity: 4, price: 150 },
      { id: 3, name: 'หลอดไฟ LED', quantity: 4, price: 180 },
    ],
    totalPrice: 1560
  }
];

const ItemSetList = () => {
  const [itemSets, setItemSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItemSet, setSelectedItemSet] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mode, setMode] = useState('view');
  const { alert, showAlert } = useAlert();

  const fetchItemSets = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setItemSets(mockItemSets);
      setError(null);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลได้');
      console.error('Error fetching item sets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemSets();
  }, []);

  const handleView = (itemSet) => {
    setSelectedItemSet(JSON.parse(JSON.stringify(itemSet)));
    setMode('view');
    setIsFormOpen(true);
  };

  const handleEdit = (itemSet) => {
    setSelectedItemSet(JSON.parse(JSON.stringify(itemSet)));
    setMode('edit');
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedItemSet(null);
    setMode('edit');
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedItemSet(null);
  };

  const handleDelete = async (itemSet) => {
    if (window.confirm('คุณต้องการลบรายการชุดนี้ใช่หรือไม่?')) {
      try {
        // API call would go here
        await new Promise(resolve => setTimeout(resolve, 1000));
        showAlert('ลบข้อมูลสำเร็จ', 'success');
        fetchItemSets();
      } catch (error) {
        showAlert('เกิดข้อผิดพลาด กรุณาลองใหม่', 'error');
      }
    }
  };

  if (isFormOpen) {
    return (
      <div>
        <div className="mb-4">
          <button
            onClick={handleCloseForm}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← กลับไปหน้ารายการ
          </button>
        </div>
        <ItemSetForm
          itemSet={selectedItemSet}
          mode={mode}
          onClose={handleCloseForm}
          onSave={() => {
            showAlert('บันทึกข้อมูลสำเร็จ', 'success');
            handleCloseForm();
            fetchItemSets();
          }}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <Alert {...alert} />
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">รายการชุดอุปกรณ์ทั้งหมด</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          <Plus size={16} />
          เพิ่มชุดอุปกรณ์
        </button>
      </div>

      {error && (
        <div className="p-4 text-red-600 text-center bg-red-50">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {/* <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                ดูข้อมูล
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ชื่อชุดอุปกรณ์
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                จำนวนรายการ
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                ราคารวม
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {itemSets.map((itemSet) => (
              <tr key={itemSet.id} className="hover:bg-gray-50">
                {/* <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleView(itemSet)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye size={16} />
                  </button>
                </td> */}
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <Package size={20} className="text-gray-400" />
                    {itemSet.name}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                  {itemSet.items.length} รายการ
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 text-right">
                  {itemSet.totalPrice.toLocaleString('th-TH', {
                    style: 'currency',
                    currency: 'THB'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleEdit(itemSet)}
                    className="text-gray-600 hover:text-gray-900 mx-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(itemSet)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {itemSets.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          ไม่พบรายการชุดอุปกรณ์
        </div>
      )}
    </div>
  );
};

export default ItemSetList;