
import hillton1 from '../../../public/images/3โครงการ/hillton/3.png';
import hillton2 from '../../../public/images/3โครงการ/hillton/4_1.jpg';
import hillton3 from '../../../public/images/3โครงการ/hillton/310540111_194787002934505_7212663915766555420_n.jpg';
import hillton4 from '../../../public/images/3โครงการ/hillton/310593283_194787016267837_4187648500976461274_n.jpg';
import hillton5 from '../../../public/images/3โครงการ/hillton/5.png';
import hillton6 from '../../../public/images/3โครงการ/220709_0.jpg';

import hampton1 from '../../../public/images/3โครงการ/hampton/1.jpg';
import hampton2 from '../../../public/images/3โครงการ/hampton/2.jpg';
import hampton3 from '../../../public/images/3โครงการ/hampton/3.jpg';
import hampton4 from '../../../public/images/3โครงการ/hampton/4.jpg';
import hampton5 from '../../../public/images/3โครงการ/hampton/5.jpg';
import hampton6 from '../../../public/images/3โครงการ/220708_0.jpg';

export const slides = [
  {
    url: '/images/1 เปิดตัว/1.jpg',
    id: 1,
    text: "บ้านกลางเมืองที่ให้คุณใกล้ชิดธรรมชาติ เหนือระดับ อบอุ่น ปลอดภัย และ สบายใจ"
  },
  {
    url: '/images/1 เปิดตัว/2.jpg',
    id: 2,
    text: "แรงบันดาลใจจากงานออกแบบสู่ความสำเร็จ สู่รสนิยมอันเหนือระดับ หล่อหลอมให้เกิดบ้านสุดแสนพิเศษ"
  },
  {
    url: '/images/1 เปิดตัว/3.2.jpg',
    id: 4,
    text: "เอกสิทธิ์แห่งการใช้ชีวิตเหนือระดับ ที่ผ่านความใส่ใจในทุกรายละเอียด"
  },
  {
    url: '/images/1 เปิดตัว/4.jpg',
    id: 5,
    text: "บ้านที่ออกแบบมาเพื่อคุณ ที่เป็นจุดเริ่มต้นถึงความสัมพันธ์ของคำว่า ครอบครัว"
  },
  {
    url: '/images/1 เปิดตัว/5.jpg',
    id: 6,
    text: "เมื่อวิถีชีวิต การเวลา และประสบการณ์ ผสานออกมาเป็นโครงการบ้านที่ออกแบบมาเพื่อคุณ"
  },
  {
    url: '/images/1 เปิดตัว/6.jpg',
    id: 7,
    text: "บ้านที่รองรับทุก Generations เหมาะกับสังคมเมือง บนทำเลศักยภาพ"
  },
];

export const properties = [
  {
    id: 1,
    status: "SOLD OUT",
    title: "Hillton",
    image: [hillton3, hillton4, hillton1, hillton2, hillton5, hillton6],
    price: 'ปิดโครงการ',
    description: "บ้านเดี่ยวสุดหรูใจกลางราชบุรี เอกสิทธิ์ แห่งการใช้ชีวิตเหนือระดับ 24หลัง หลังจากไกรเลิศ พร้อมบรรยากาศ โครงการวิวภูเขา บนถนนเจดีย์หัก"
  },
  {
    id: 2,
    status: "NEW PROJECT",
    title: "Hampton",
    image: [hampton1, hampton5, hampton3, hampton4, hampton2, hampton6],
    price: 'เริ่มต้นที่ 2.79-3.99 ล้านบาท',
    description: "เหนือกว่าด้วยการออกแบบทุกองศาของ การอยู่อาศัย เพิ่มพื้นที่ที่เติมเต็ม ชีวิตดีๆ ในแบบของคุณกับบ้านเดี่ยว บ้านแฝด และ บ้านอิสระ ใจกลางเมืองราชบุรี ติด ถนนเพชรเกษม"

  },
];


export const houseData = {
  single: {
    title: 'King บ้านเดี่ยว 2 ชั้น',
    features:
    {
      bedroom: '4 ห้องนอน',
      bathroom: '3 ห้องน้ำ',
      garage: '2 ที่จอดรถ',
      kitchen: '1 ห้องครัว',
      area: 'เนื้อที่ 57 - 75 ตร.ว.',
      useable: 'พื้นที่ใช้สอย 170 ตร.ม.',
    },
    house: [
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/บ้านเดี่ยว 2 ชั้น KING/King.jpg', },
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/10.jpg', },
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/11.jpg', },
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/12.jpg', },
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/13.jpg', },
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/14.jpg', },
    ],
    plan: [
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/บ้านเดี่ยว 2 ชั้น KING/King1.jpg' },
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/บ้านเดี่ยว 2 ชั้น KING/King2.jpg' }
    ]
  },
  double: {
    title: 'Queen บ้านแฝด 2 ชั้น',
    features:
    {
      bedroom: '4 ห้องนอน',
      bathroom: '3 ห้องน้ำ',
      garage: '2 ที่จอดรถ',
      kitchen: '1 ห้องครัว',
      area: 'เนื้อที่ 44 - 74 ตร.ว.',
      useable: 'พื้นที่ใช้สอย 160 ตร.ม.',
    },
    house: [
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/บ้านแฝด 2 ชั้น QUEEN/Queen.jpg', },
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/10.jpg', },
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/11.jpg', },
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/12.jpg', },
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/13.jpg', },
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/14.jpg', },
    ],
    plan: [
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/บ้านแฝด 2 ชั้น QUEEN/Queen1.jpg', id: 2 },
      { url: '/images/4 โครงการที่ดำเนินการอยู่/hampton/บ้านแฝด 2 ชั้น QUEEN/Queen2.jpg', id: 3 }
    ]
  }
};