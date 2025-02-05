export const supplierOptions = [
  { value: 'บริษัท วัสดุก่อสร้าง จำกัด', label: 'บริษัท วัสดุก่อสร้าง จำกัด' },
  { value: 'บริษัท เหล็กไทย จำกัด', label: 'บริษัท เหล็กไทย จำกัด' },
  { value: 'บริษัท ไม้ไทย จำกัด', label: 'บริษัท ไม้ไทย จำกัด' },
];

export const itemOptions = [
  { value: 'ปูนซีเมนต์', label: 'ปูนซีเมนต์' },
  { value: 'อิฐบล็อก', label: 'อิฐบล็อก' },
  { value: 'เหล็กเส้น DB12', label: 'เหล็กเส้น DB12' },
  { value: 'ไม้แบบ', label: 'ไม้แบบ' },
];

export const purchaseOrders = [
  {
    id: 1,
    date: '2024-02-01',
    poNumber: 'PO-2024-001',
    project: 'โครงการบ้านสวย 1',
    supplier: 'บริษัท วัสดุก่อสร้าง จำกัด',
    status: 'ใกล้ครบกำหนด',
    total: 150000,
    address: '123/456 ถ.พระราม 9 กรุงเทพฯ 10400',
    contact: 'คุณสมชาย',
    phone: '02-123-4567',
    dueDate: '2024-02-15',
    projectContact: 'คุณสมศรี',
    houseplan: 'Type A',
    notes: 'เร่งด่วน',
    documentType: 'งานในสัญญา',
    items: [
      {
        id: 1,
        name: 'ปูนซีเมนต์',
        quantity: 50,
        unit: 'ถุง',
        unitPrice: 150,
        total: 7500
      },
      {
        id: 2,
        name: 'อิฐบล็อก',
        quantity: 1000,
        unit: 'ก้อน',
        unitPrice: 10,
        total: 10000
      }
    ]
  },
  {
    id: 2,
    date: '2024-02-02',
    poNumber: 'PO-2024-002',
    project: 'โครงการบ้านสวย 2',
    supplier: 'บริษัท เหล็กไทย จำกัด',
    status: 'ครบกำหนดแล้ว',
    total: 85000,
    address: '789/123 ถ.เพชรเกษม กรุงเทพฯ 10160',
    contact: 'คุณวิชัย',
    phone: '02-987-6543',
    dueDate: '2024-02-20',
    projectContact: 'คุณสมหมาย',
    houseplan: 'Type B',
    notes: 'ส่งของในเวลาราชการเท่านั้น',
    documentType: 'งานตรวจก่อนโอน',
    items: [
      {
        id: 1,
        name: 'เหล็กเส้น DB12',
        quantity: 100,
        unit: 'เส้น',
        unitPrice: 500,
        total: 50000
      }
    ]
  },
  {
    id: 3,
    date: '2024-02-03',
    poNumber: 'PO-2024-003',
    project: 'โครงการบ้านสวย 3',
    supplier: 'บริษัท ไม้ไทย จำกัด',
    status: 'ยังไม่ครบกำหนด',
    total: 45000,
    address: '456/789 ถ.รัชดาภิเษก กรุงเทพฯ 10310',
    contact: 'คุณสมศักดิ์',
    phone: '02-345-6789',
    dueDate: '2024-02-25',
    projectContact: 'คุณสมใจ',
    houseplan: 'Type C',
    notes: '',
    documentType: 'งานโอนแล้วรอส่งมอบ',
    items: [
      {
        id: 1,
        name: 'ไม้แบบ',
        quantity: 30,
        unit: 'แผ่น',
        unitPrice: 1000,
        total: 30000
      }
    ]
  }
];


//   export const initialFormState = {
//     poNumber: '',
//     date: '',
//     project: '',
//     supplier: '',
//     address: '',
//     contact: '',
//     phone: '',
//     dueDate: '',
//     projectContact: '',
//     houseplan: '',
//     notes: '',
//     documentType: '',
//     items: [{ id: 1, name: '', quantity: '', unit: '', unitPrice: '', total: '' }],
//     controllerSignature: '',
//     controllerDate: '',
//     purchaserSignature: '',
//     purchaserDate: '',
//     inspectorSignature: '',
//     inspectorDate: '',
//   };


export const projectOptions = [
  { value: 'โครงการบ้านสวย 1', label: 'โครงการบ้านสวย 1' },
  { value: 'โครงการบ้านสวย 2', label: 'โครงการบ้านสวย 2' },
  { value: 'โครงการบ้านสวย 3', label: 'โครงการบ้านสวย 3' },
];

export const houseplanOptions = [
  { value: 'Type A', label: 'Type A - บ้านเดี่ยว 2 ชั้น' },
  { value: 'Type B', label: 'Type B - บ้านเดี่ยว 3 ชั้น' },
  { value: 'Type C', label: 'Type C - ทาวน์โฮม' },
];


export const mockProducts = [
  {
    id: 1,
    name: 'สายไฟ THW 1x4 sq.mm.',
    category: 'วัสดุไฟฟ้า',
    unit: 'ม้วน',
    price: 1580,
    supplier: 'บริษัท ไทยไฟฟ้า จำกัด'
  },
  {
    id: 2,
    name: 'ปูนซีเมนต์ตราเสือ',
    category: 'วัสดุก่อสร้าง',
    unit: 'ถุง',
    price: 150,
    supplier: 'บริษัท สยามซีเมนต์ จำกัด'
  }
];


export const mockSuppliers = [
  {
    id: 1,
    name: 'บริษัท ไทยไฟฟ้า จำกัด',
    address: '123/45 ถนนพระราม 9 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310',
    phone: '02-123-4567',
    paymentTerms: 'เครดิต 30 วัน'
  },
  {
    id: 2,
    name: 'บริษัท สยามซีเมนต์ จำกัด',
    address: '89/10 ถนนวิภาวดีรังสิต แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900',
    phone: '02-987-6543',
    paymentTerms: 'เครดิต 45 วัน'
  }
];

export const mockHousePlans = [
  {
    id: 1,
    project: 'หมู่บ้านกรีนวิลล์',
    houseName: 'บ้านพฤกษา',
    planName: 'Type A - 150 sq.m.',
    address: '123/45 ซอยสุขุมวิท 101/1 ถนนสุขุมวิท แขวงบางนา เขตบางนา กรุงเทพฯ 10260'
  },
  {
    id: 2,
    project: 'หมู่บ้านเดอะพาร์ค',
    houseName: 'บ้านการ์เด้น',
    planName: 'Type B - 180 sq.m.',
    address: '789/12 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพฯ 10240'
  }
];