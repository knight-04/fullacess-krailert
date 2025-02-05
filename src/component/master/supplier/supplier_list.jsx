import React, { useState, useEffect } from 'react';
import { Eye, Edit, Plus, Trash2 } from 'lucide-react';
import SupplierForm from './supplier_create';
import { Alert, useAlert } from '../../../Toast/alert';
import { mockSuppliers } from '../../mockdata/mockData';


const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mode, setMode] = useState('view');
  const { alert, showAlert } = useAlert();

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuppliers(mockSuppliers);
      setError(null);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลได้');
      console.error('Error fetching suppliers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleView = (supplier) => {
    setSelectedSupplier(JSON.parse(JSON.stringify(supplier)));
    setMode('view');
    setIsFormOpen(true);
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(JSON.parse(JSON.stringify(supplier)));
    setMode('edit');
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedSupplier(null);
    setMode('edit');
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedSupplier(null);
  };

  const handleDelete = async (supplier) => {
    if (window.confirm('คุณต้องการลบ Supplier นี้ใช่หรือไม่?')) {
      try {
        // API call would go here
        await new Promise(resolve => setTimeout(resolve, 1000));
        showAlert('ลบข้อมูลสำเร็จ', 'success');
        fetchSuppliers();
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
        <SupplierForm
          supplier={selectedSupplier}
          mode={mode}
          onClose={handleCloseForm}
          onSave={() => {
            showAlert('บันทึกข้อมูลสำเร็จ', 'success');
            handleCloseForm();
            fetchSuppliers();
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
        <h2 className="text-lg font-semibold">รายการ Supplier ทั้งหมด</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          <Plus size={16} />
          เพิ่ม Supplier
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
                ชื่อ Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ที่อยู่
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                เบอร์โทร
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                เงื่อนไขการชำระเงิน
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-gray-50">
                {/* <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleView(supplier)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye size={16} />
                  </button>
                </td> */}
                <td className="px-6 py-4 text-sm text-gray-900">
                  {supplier.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {supplier.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {supplier.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {supplier.paymentTerms}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleEdit(supplier)}
                    className="text-gray-600 hover:text-gray-900 mx-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(supplier)}
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

      {suppliers.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          ไม่พบรายการ Supplier
        </div>
      )}
    </div>
  );
};

export default SupplierList;