import React from 'react';
import { Check, X } from 'lucide-react';

const PurchaseOrderPreview = ({ data, onClose, onConfirm, saving, hideActions = false }) => {
    const calculateSubTotal = () => {
        return data.items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
    };

    const calculateVat = () => {
        return calculateSubTotal() * 0.07;
    };

    const calculateTotal = () => {
        return calculateSubTotal() + calculateVat();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                        {hideActions ? <div>ใบสั่งซื้อ : {data.poNumber}</div> : 'ตัวอย่างใบสั่งซื้อ'}
                    </h3>
                    {!hideActions && (
                        <div className="flex gap-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border rounded"
                                disabled={saving}
                            >
                                ยกเลิก
                            </button>

                            <button
                                onClick={onConfirm}
                                disabled={saving}
                                className={`px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2
                  ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {saving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        กำลังบันทึก...
                                    </>
                                ) : (
                                    <>
                                        <Check size={16} />
                                        ยืนยันการบันทึก
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                    {hideActions && (
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>



                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-4">
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
                            {['งานในสัญญา', 'งานตรวจก่อนโอน', 'งานโอนแล้วรอส่งมอบ', 'งานต่อเดิม', 'งานแจ้งซ่อมในประกัน', 'งานขายและการบริการ'].map((type, index) => (
                                <div key={type} className="flex items-center gap-2">
                                    <div className={`w-4 h-4 border rounded ${data.documentType === type ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`} />
                                    <span className="text-sm">{index + 1}. {type}</span>
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
                                    <div className="p-2 bg-gray-50 rounded">{data.supplier || '-'}</div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">ที่อยู่</label>
                                    <div className="p-2 bg-gray-50 rounded">{data.address || '-'}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-gray-600">ติดต่อ</label>
                                        <div className="p-2 bg-gray-50 rounded">{data.contact || '-'}</div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600">โทร.</label>
                                        <div className="p-2 bg-gray-50 rounded">{data.phone || '-'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-600">วันที่</label>
                                    <div className="p-2 bg-gray-50 rounded">{data.date || '-'}</div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">เลขที่ PO</label>
                                    <div className="p-2 bg-gray-50 rounded">{data.poNumber || '-'}</div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">โครงการ</label>
                                    <div className="p-2 bg-gray-50 rounded">{data.project || '-'}</div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">แปลนบ้าน</label>
                                    <div className="p-2 bg-gray-50 rounded">{data.houseplan || '-'}</div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">วันกำหนดส่ง</label>
                                    <div className="p-2 bg-gray-50 rounded">{data.dueDate || '-'}</div>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-600">ติดต่อ</label>
                                    <div className="p-2 bg-gray-50 rounded">{data.projectContact || '-'}</div>
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
                                </tr>
                            </thead>
                            <tbody>
                                {data.items.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="border p-2 text-center">{index + 1}</td>
                                        <td className="border p-2">{item.name || '-'}</td>
                                        <td className="border p-2 text-right">{item.quantity || '-'}</td>
                                        <td className="border p-2 text-center">{item.unit || '-'}</td>
                                        <td className="border p-2 text-right">{item.unitPrice || '-'}</td>
                                        <td className="border p-2 text-right">{item.total || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="4" rowSpan="3" className="border p-2">
                                        <div className="p-2 bg-gray-50 rounded min-h-[80px]">{data.notes || '-'}</div>
                                    </td>
                                    <td className="border p-2 text-right font-semibold text-sm">รวมเงิน</td>
                                    <td className="border p-2 text-right">{calculateSubTotal().toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 text-right font-semibold text-sm">VAT 7%</td>
                                    <td className="border p-2 text-right">{calculateVat().toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="border p-2 text-right font-semibold text-sm">รวมเป็นเงินทั้งสิ้น</td>
                                    <td className="border p-2 text-right">{calculateTotal().toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Signatures */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="relative border-b pb-16 mb-2">
                                {data.controllerSignature && (
                                    <img
                                        src={data.controllerSignature}
                                        alt="Controller Signature"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 object-contain"
                                    />
                                )}
                            </div>
                            <p className="text-sm">ผู้ควบคุมงาน</p>
                            <p className="text-sm text-gray-600">วันที่ {data.controllerDate || '___/___/___'}</p>
                        </div>
                        <div className="text-center">
                            <div className="relative border-b pb-16 mb-2">
                                {data.purchaserSignature && (
                                    <img
                                        src={data.purchaserSignature}
                                        alt="Purchaser Signature"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 object-contain"
                                    />
                                )}
                            </div>
                            <p className="text-sm">ผู้สั่งซื้อ / สั่งซ่อม</p>
                            <p className="text-sm text-gray-600">วันที่ {data.purchaserDate || '___/___/___'}</p>
                        </div>
                        <div className="text-center">
                            <div className="relative border-b pb-16 mb-2">
                                {data.inspectorSignature && (
                                    <img
                                        src={data.inspectorSignature}
                                        alt="Inspector Signature"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 object-contain"
                                    />
                                )}
                            </div>
                            <p className="text-sm">ผู้ตรวจสอบ (Site N)</p>
                            <p className="text-sm text-gray-600">วันที่ {data.inspectorDate || '___/___/___'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PurchaseOrderPreview;