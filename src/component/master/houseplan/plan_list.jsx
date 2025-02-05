import React, { useState, useEffect } from 'react';
import { Eye, Edit, Plus, Trash2 } from 'lucide-react';
import HousePlanForm from './plan_create';
import { Alert, useAlert } from '../../../Toast/alert';
import { mockHousePlans } from '../../mockdata/mockData';

const HousePlanList = () => {
  const [housePlans, setHousePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHousePlan, setSelectedHousePlan] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mode, setMode] = useState('view');
  const { alert, showAlert } = useAlert();

  const fetchHousePlans = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHousePlans(mockHousePlans);
      setError(null);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลได้');
      console.error('Error fetching house plans:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHousePlans();
  }, []);

  const handleView = (housePlan) => {
    setSelectedHousePlan(JSON.parse(JSON.stringify(housePlan)));
    setMode('view');
    setIsFormOpen(true);
  };

  const handleEdit = (housePlan) => {
    setSelectedHousePlan(JSON.parse(JSON.stringify(housePlan)));
    setMode('edit');
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedHousePlan(null);
    setMode('edit');
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedHousePlan(null);
  };

  const handleDelete = async (housePlan) => {
    if (window.confirm('คุณต้องการลบแปลนบ้านนี้ใช่หรือไม่?')) {
      try {
        // API call would go here
        await new Promise(resolve => setTimeout(resolve, 1000));
        showAlert('ลบข้อมูลสำเร็จ', 'success');
        fetchHousePlans();
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
        <HousePlanForm
          housePlan={selectedHousePlan}
          mode={mode}
          onClose={handleCloseForm}
          onSave={() => {
            showAlert('บันทึกข้อมูลสำเร็จ', 'success');
            handleCloseForm();
            fetchHousePlans();
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
        <h2 className="text-lg font-semibold">รายการแปลนบ้านทั้งหมด</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          <Plus size={16} />
          เพิ่มแปลนบ้าน
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
                โครงการ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ชื่อบ้าน
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                แปลนบ้าน
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ที่อยู่
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {housePlans.map((housePlan) => (
              <tr key={housePlan.id} className="hover:bg-gray-50">
                {/* <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleView(housePlan)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye size={16} />
                  </button>
                </td> */}
                <td className="px-6 py-4 text-sm text-gray-900">
                  {housePlan.project}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {housePlan.houseName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {housePlan.planName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {housePlan.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleEdit(housePlan)}
                    className="text-gray-600 hover:text-gray-900 mx-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(housePlan)}
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

      {housePlans.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          ไม่พบรายการแปลนบ้าน
        </div>
      )}
    </div>
  );
};

export default HousePlanList;