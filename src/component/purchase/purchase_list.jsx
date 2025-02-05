import React, { useState, useEffect } from 'react';
import { Eye, Edit, Plus, BookCheck, FileCheck, Delete, Trash2, Hourglass, CalendarClock, ClockAlert, ListCheck } from 'lucide-react';
import PurchaseOrderForm from './purchase_order';
import PurchaseOrderPreview from './purchase_preview';
import { purchaseOrders } from '../mockdata/mockData';
import { Alert, useAlert } from '../../Toast/alert';
import ReceiptChecklist from './receipt_checklist';


const PurchaseOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mode, setMode] = useState('view');
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const { alert, showAlert } = useAlert();
  const [statusFilter, setStatusFilter] = useState('all')
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const handleSave = async () => {
    try {
      // setSaving(true);

      // ให้ดู Preview ก่อนบันทึก
      setShowPreview(true);
    } catch (error) {
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      console.error('Error saving:', error);
    }
  };

  const handlePreview = () => {
    if (formData) {
      setShowPreview(true);
    }
  };

  const handleConfirmPurchase = async () => {
    try {
      setSaving(true);

      // API call สำหรับบันทึก
      // await fetch('/api/purchase-orders', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      await new Promise(resolve => setTimeout(resolve, 3000));

      // ปิด Preview
      setShowPreview(false);

      // แสดง success toast
      // toast.success('บันทึกข้อมูลสำเร็จ');
      showAlert('บันทึกข้อมูลสำเร็จ', 'success');

      // Refresh หน้ารายการ
      setSelectedReceipt(null);
      handleCloseForm();
      fetchOrders();

    } catch (error) {
      showAlert('เกิดข้อผิดพลาด กรุณาลองใหม่', 'error');
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmReceipt = async () => {
    try {
      setSaving(true);

      // API call สำหรับบันทึก
      // await fetch('/api/purchase-orders', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // });

      await new Promise(resolve => setTimeout(resolve, 3000));

      // ปิด Preview
      setShowReceipt(false);

      // แสดง success toast
      // toast.success('บันทึกข้อมูลสำเร็จ');
      showAlert('บันทึกข้อมูลสำเร็จ', 'success');

      // Refresh หน้ารายการ
      setFormData(null);
      handleCloseForm();
      fetchOrders();

    } catch (error) {
      showAlert('เกิดข้อผิดพลาด กรุณาลองใหม่', 'error');
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      // const response = await fetch('/api/purchase-orders');
      // const data = await response.json();
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrders(purchaseOrders);
      setError(null);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลได้');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleView = (order) => {
    // Deep clone order เพื่อป้องกันการแก้ไขข้อมูลต้นฉบับ
    setSelectedOrder(JSON.parse(JSON.stringify(order)));
    setMode('view');
    setIsFormOpen(true);
  };

  const handleEdit = (order) => {
    // Deep clone order เพื่อป้องกันการแก้ไขข้อมูลต้นฉบับ
    setSelectedOrder(JSON.parse(JSON.stringify(order)));
    setMode('edit');
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedOrder(null);
    setMode('edit');
    setIsFormOpen(true);
  };

  const handleDelete = async (supplier) => {
    if (window.confirm('คุณต้องการลบ Supplier นี้ใช่หรือไม่?')) {
      try {
        // API call would go here
        await new Promise(resolve => setTimeout(resolve, 1000));
        showAlert('ลบข้อมูลสำเร็จ', 'success');
        fetchOrders();
      } catch (error) {
        showAlert('เกิดข้อผิดพลาด กรุณาลองใหม่', 'error');
      }
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedOrder(null);
  };

  const getStatusCounts = () => {
    const counts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
    counts.all = orders.length;
    return counts;
  };

  // เพิ่มฟังก์ชันกรองรายการตามสถานะ
  const filteredOrders = orders.filter(order => {
    if (statusFilter === 'all') return true;
    return order.status === statusFilter;
  });

  const handleShowReceipt = (order) => {
    setSelectedReceipt(order);
    setShowReceipt(true);
  };


  // PurchaseOrderList.jsx
  if (isFormOpen) {
    // ถ้าเป็นโหมด view ให้แสดง Preview แทน Form
    if (mode === 'view') {
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
          <PurchaseOrderPreview
            data={selectedOrder}  // ใช้ selectedOrder แทน formData
            onClose={handleCloseForm}
            saving={false}
            hideActions={true}  // เพิ่ม prop นี้เพื่อซ่อนปุ่มบันทึก
          />
        </div>
      );
    }

    // ถ้าเป็นโหมด edit ให้แสดง Form เหมือนเดิม
    return (
      <div>
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={handleCloseForm}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 flex items-center gap-2"
          >
            ← กลับไปหน้ารายการ
          </button>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ดูตัวอย่างและบันทึก
            </button>
          </div>
        </div>

        {showPreview && (
          <PurchaseOrderPreview
            data={formData}
            onClose={() => setShowPreview(false)}
            onConfirm={handleConfirmPurchase}
            saving={saving}
          />
        )}

        <PurchaseOrderForm
          order={selectedOrder}
          mode={mode}
          onChange={setFormData}
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
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">รายการใบสั่งซื้อทั้งหมด</h2>
        <div className="flex gap-2">
          {/* <button
            onClick={() => fetchOrders()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <RefreshCw size={16} />
            รีเฟรช
          </button> */}
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            <Plus size={16} />
            สร้างใบสั่งซื้อ
          </button>
        </div>
      </div>

      <div className="p-4 flex gap-2 border-b">
        {[
          { key: 'all', label: 'ทั้งหมด', icon : <ListCheck size={16} /> },
          { key: 'ใกล้ครบกำหนด', label: 'ใกล้ครบกำหนด', icon: <CalendarClock size={16} /> },
          { key: 'ครบกำหนดแล้ว', label: 'ครบกำหนดแล้ว', icon: <ClockAlert size={16} /> },
          { key: 'ยังไม่ครบกำหนด', label: 'ยังไม่ครบกำหนด', icon: <Hourglass size={16} /> },
        ].map(({ key, label, icon }) => {
          const count = getStatusCounts()[key] || 0;
          return (
            <button
              key={key}
              onClick={() => setStatusFilter(key)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm
                ${statusFilter === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {icon}
              {label}
              <span className={`px-2 py-0.5 rounded-full text-xs
                ${statusFilter === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Error message */}
      {error && (
        <div className="p-4 text-red-600 text-center bg-red-50">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                ใบสั่งซื้อ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                วันที่
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                เลขที่ PO
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                โครงการ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ยอดรวม
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                สถานะการชำระเงิน
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                ใบรับสินค้า
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleView(order)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye size={16} />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(order.date).toLocaleDateString('th-TH')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.poNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.project}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.supplier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.total?.toLocaleString('th-TH', {
                    style: 'currency',
                    currency: 'THB'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {/* <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${order.status === 'ใกล้ครบกำหนด' ? 'bg-green-100' :
                      order.status === 'ครบกำหนดแล้ว' ? 'bg-red-100' :
                        'bg-yellow-100 text-yellow-800'}
                        `}> */}
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full'>
                    {order.status === 'ใกล้ครบกำหนด' ? <div><CalendarClock size={16} className='text-blue-500' /></div> :
                      order.status === 'ครบกำหนดแล้ว' ? <div><ClockAlert size={16} className='text-red-500' /></div> :
                        <div><Hourglass size={16} className='text-yellow-500' /></div>}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleShowReceipt(order)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FileCheck size={16} />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleEdit(order)}
                    className="text-gray-600 hover:text-gray-900 mx-5"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(order)}
                    className="text-red-600 hover:text-gray-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          ไม่พบรายการที่ตรงกับเงื่อนไขที่เลือก
        </div>
      )}

      {showReceipt && (
        <ReceiptChecklist
          data={selectedReceipt}
          onConfirm={handleConfirmReceipt}
          saving={saving}
          onClose={() => {
            setShowReceipt(false);
            setSelectedReceipt(null);
          }}
        />
      )}

    </div>
  );
};

export default PurchaseOrderList;