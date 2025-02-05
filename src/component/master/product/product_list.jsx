import React, { useState, useEffect } from 'react';
import { Eye, Edit, Plus, Trash2 } from 'lucide-react';
import { mockProducts } from '../../mockdata/mockData';
import { Alert, useAlert } from '../../../Toast/alert';
import ProductForm from './product_create.jsx';



const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [mode, setMode] = useState('view');
  const { alert, showAlert } = useAlert();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mockProducts);
      setError(null);
    } catch (err) {
      setError('ไม่สามารถโหลดข้อมูลได้');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleView = (product) => {
    setSelectedProduct(JSON.parse(JSON.stringify(product)));
    setMode('view');
    setIsFormOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(JSON.parse(JSON.stringify(product)));
    setMode('edit');
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setMode('edit');
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = async (product) => {
    if (window.confirm('คุณต้องการลบสินค้านี้ใช่หรือไม่?')) {
      try {
        // API call would go here
        await new Promise(resolve => setTimeout(resolve, 1000));
        showAlert('ลบข้อมูลสำเร็จ', 'success');
        fetchProducts();
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
        <ProductForm
          product={selectedProduct}
          mode={mode}
          onClose={handleCloseForm}
          onSave={() => {
            showAlert('บันทึกข้อมูลสำเร็จ', 'success');
            handleCloseForm();
            fetchProducts();
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
        <h2 className="text-lg font-semibold">รายการสินค้าทั้งหมด</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          <Plus size={16} />
          เพิ่มสินค้า
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
              {/* <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                ดูข้อมูล
              </th> */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ชื่อสินค้า
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                หมวดหมู่
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                หน่วย
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                ราคา
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Supplier
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                {/* <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleView(product)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye size={16} />
                  </button>
                </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.unit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  {product.price?.toLocaleString('th-TH', {
                    style: 'currency',
                    currency: 'THB'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.supplier}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-gray-600 hover:text-gray-900 mx-2"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
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

      {products.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-500">
          ไม่พบรายการสินค้า
        </div>
      )}
    </div>
  );
};

export default ProductList;