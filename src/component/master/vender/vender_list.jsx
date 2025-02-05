import React, { useState, useEffect } from 'react';
import { Eye, Edit, Plus, Trash2, Tags } from 'lucide-react';
import VendorForm from './vender_create';
import { Alert, useAlert } from '../../../Toast/alert';

// Mock data
const mockVendors = [
  {
    id: 1,
    name: 'หจก. รุ่งเรืองการช่าง',
    address: '123/45 ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310',
    phone: '02-123-4567',
    paymentTerms: 'เครดิต 30 วัน',
    services: ['งานระบบไฟฟ้า', 'งานระบบประปา']
  },
  {
    id: 2,
    name: 'บริษัท พร้อมติดตั้ง จำกัด',
    address: '89/10 ถนนวิภาวดีรังสิต แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900',
    phone: '02-987-6543',
    paymentTerms: 'เครดิต 45 วัน',
    services: ['งานติดตั้งเฟอร์นิเจอร์', 'งานตกแต่งภายใน']
  }
];

const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mode, setMode] = useState('view');
  const { alert, showAlert } = useAlert();

  const fetchVendors = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVendors(mockVendors);
      setError(null);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลได้');
      console.error('Error fetching vendors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleView = (vendor) => {
    setSelectedVendor(JSON.parse(JSON.stringify(vendor)));
    setMode('view');
    setIsFormOpen(true);
  };

  const handleEdit = (vendor) => {
    setSelectedVendor(JSON.parse(JSON.stringify(vendor)));
    setMode('edit');
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedVendor(null);
    setMode('edit');
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedVendor(null);
  };

  const handleDelete = async (vendor) => {
    if (window.confirm('คุณต้องการลบ Vendor นี้ใช่หรือไม่?')) {
      try {
        // API call would go here
        await new Promise(resolve => setTimeout(resolve, 1000));
        showAlert('ลบข้อมูลสำเร็จ', 'success');
        fetchVendors();
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
        <VendorForm
          vendor={selectedVendor}
          mode={mode}
          onClose={handleCloseForm}
          onSave={() => {
            showAlert('บันทึกข้อมูลสำเร็จ', 'success');
            handleCloseForm();
            fetchVendors();
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
        <h2 className="text-lg font-semibold">รายการ Vendor ทั้งหมด</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          <Plus size={16} />
          เพิ่ม Vendor
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
                ชื่อ Vendor
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ประเภทงาน
              </th> */}
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
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-gray-50">
                {/* <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleView(vendor)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye size={16} />
                  </button>
                </td> */}
                <td className="px-6 py-4 text-sm text-gray-900">
                  {vendor.name}
                </td>
                {/* <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex flex-wrap gap-1">
                    {vendor.services.map((service, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </td> */}
                <td className="px-6 py-4 text-sm text-gray-900">
                  {vendor.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {vendor.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {vendor.paymentTerms}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleEdit(vendor)}
                    className="text-gray-600 hover:text-gray-900 mx-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(vendor)}
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

      {vendors.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          ไม่พบรายการ Vendor
        </div>
      )}
    </div>
  );
};

export default VendorList;