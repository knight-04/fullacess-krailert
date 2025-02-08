import { Check } from 'lucide-react';
import React, { forwardRef } from 'react';

const PurchaseOrderPDF = forwardRef(({ data, calculateSubTotal, calculateVat, calculateTotal }, ref) => {
    return (
        <div
            ref={ref}
            className="w-[210mm] h-[297mm] mx-auto bg-white"
            style={{
                fontSize: '12pt'
            }}
        >
            <div className="flex flex-col h-full">
                {/* Main content wrapper with flex-grow */}
                <div className="flex-grow p-6">
                    {/* Header section */}
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-24 h-24 rounded flex items-center justify-center mt-4">
                                <img src='/images/626.jpg' alt="Company Logo" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold mb-1">บริษัท ไกรเลิศ แลนด์ จำกัด</h1>
                                <p className="text-xs text-gray-600 ">7/10 ถนนสรุปราชัย แขวงดังบูรพา เขตบานนา</p>
                                <p className="text-xs text-gray-600 ">กรุงเทพมหานคร 10120</p>
                                <p className="text-xs text-gray-600 ">เลขประจำตัวผู้เสียภาษี 0105564136941</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            {['งานในสัญญา', 'งานตรวจก่อนโอน', 'งานโอนแล้วรอส่งมอบ', 'งานต่อเดิม', 'งานแจ้งซ่อมในประกัน', 'งานขายและการบริการ'].map((type, index) => (
                                <div key={type} className="flex items-center gap-2">
                                    <div className={`mt-3 w-3 h-3 border rounded-sm relative ${data.documentType === type ? 'border-green-600' : 'border-gray-300'}`}>
                                        {data.documentType === type && (
                                            <Check
                                                size={12}
                                                className="absolute items-center text-green-600"
                                            />
                                        )}
                                    </div>
                                    <span className="text-xs">{index + 1}. {type}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-6">
                        <h2 className="text-lg font-semibold">ใบสั่งซื้อ (Purchase Order)</h2>
                    </div>

                    {/* PO Details */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="border rounded p-4">
                            <div className="space-y-2">
                                <div>
                                    <label className="text-xs text-gray-600">ชื่อบริษัท</label>
                                    <div className="p-2 rounded text-xs">{data.supplier || '-'}</div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600">ที่อยู่</label>
                                    <div className="p-2 rounded text-xs">{data.address || '-'}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="text-xs text-gray-600">ติดต่อ</label>
                                        <div className="p-2 rounded text-xs">{data.contact || '-'}</div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-600">โทร.</label>
                                        <div className="p-2 rounded text-xs">{data.phone || '-'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded p-4">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-xs text-gray-600">วันที่</label>
                                    <div className="p-2 rounded text-xs">{new Date(data.date).toLocaleDateString('th-TH') || '-'}</div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600">เลขที่ PO</label>
                                    <div className="p-2 rounded text-xs">{data.poNumber || '-'}</div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600">โครงการ</label>
                                    <div className="p-2 rounded text-xs">{data.project || '-'}</div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600">แปลนบ้าน</label>
                                    <div className="p-2 rounded text-xs">{data.houseplan || '-'}</div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600">วันกำหนดส่ง</label>
                                    <div className="p-2 rounded text-xs">{new Date(data.dueDate).toLocaleDateString('th-TH') || '-'}</div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600">ติดต่อ</label>
                                    <div className="p-2 rounded text-xs">{data.projectContact || '-'}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="flex-grow">
                        <table className="w-full border-collapse border text-xs">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border py-2 px-1 w-12">ลำดับ</th>
                                    <th className="border py-2 px-1">รายการสินค้า</th>
                                    <th className="border py-2 px-1 w-16">จำนวน</th>
                                    <th className="border py-2 px-1 w-16">หน่วย</th>
                                    <th className="border py-2 px-1 w-24">ราคา/หน่วย</th>
                                    <th className="border py-2 px-1 w-24">จำนวนเงิน</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.items.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="border py-2 px-1 text-center">{index + 1}</td>
                                        <td className="border py-2 px-1">{item.name || '-'}</td>
                                        <td className="border py-2 px-1 text-right">{item.quantity || '-'}</td>
                                        <td className="border py-2 px-1 text-center">{item.unit || '-'}</td>
                                        <td className="border py-2 px-1 text-right">{item.unitPrice || '-'}</td>
                                        <td className="border py-2 px-1 text-right">{item.total || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="4" rowSpan="3" className="border p-1">
                                        <div className="p-1 rounded min-h-[60px] text-xs">{data.notes || '-'}</div>
                                    </td>
                                    <td className="border py-2 px-1 text-right font-semibold">รวมเงิน</td>
                                    <td className="border py-2 px-1 text-right">{calculateSubTotal().toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="border py-2 px-1 text-right font-semibold">VAT 7%</td>
                                    <td className="border py-2 px-1 text-right">{calculateVat().toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td className="border py-2 px-1 text-right font-semibold">รวมเป็นเงินทั้งสิ้น</td>
                                    <td className="border py-2 px-1 text-right">{calculateTotal().toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Signatures section fixed at bottom */}
                <div className="p-8 mt-auto">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                            <div className="relative border-b ">
                                {data.controllerSignature && (
                                    <img
                                        src={data.controllerSignature}
                                        alt="Controller Signature"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 object-contain"
                                    />
                                )}
                            </div>
                            <p className="text-xs">ผู้ควบคุมงาน</p>
                            <p className="text-xs text-gray-600">วันที่ {data.controllerDate || '___/___/___'}</p>
                        </div>
                        <div className="text-center">
                            <div className="relative border-b ">
                                {data.purchaserSignature && (
                                    <img
                                        src={data.purchaserSignature}
                                        alt="Purchaser Signature"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 object-contain"
                                    />
                                )}
                            </div>
                            <p className="text-xs">ผู้สั่งซื้อ / สั่งซ่อม</p>
                            <p className="text-xs text-gray-600">วันที่ {data.purchaserDate || '___/___/___'}</p>
                        </div>
                        <div className="text-center">
                            <div className="relative border-b ">
                                {data.inspectorSignature && (
                                    <img
                                        src={data.inspectorSignature}
                                        alt="Inspector Signature"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 object-contain"
                                    />
                                )}
                            </div>
                            <p className="text-xs">ผู้ตรวจสอบ (Site N)</p>
                            <p className="text-xs text-gray-600">วันที่ {data.inspectorDate || '___/___/___'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

PurchaseOrderPDF.displayName = 'PurchaseOrderPDF';

export default PurchaseOrderPDF;