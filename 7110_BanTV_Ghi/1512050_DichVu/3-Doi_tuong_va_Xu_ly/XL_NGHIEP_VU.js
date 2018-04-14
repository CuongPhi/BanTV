var File = require("fs");
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;
var Duong_dan_Du_lieu = "..//2-Du_lieu_Luu_tru//Du_lieu.xml";
var Chuoi_Du_lieu_XML = File.readFileSync(Duong_dan_Du_lieu, "UTF-8");

// Cache dữ liệu

class XL_NGHIEP_VU {
  Lay_Danh_sach_Tivi(Du_lieu) {
    var Chuoi_XML="<Du_lieu><Danh_sach_Tivi></Danh_sach_Tivi></Du_lieu>";
    var Data =   new DOMParser().parseFromString(Chuoi_XML, "text/xml")
    console.log("---------------------Lay DS TV------------")
    var Danh_sach_TV = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0];
    var Danh_sach_Tivi = Danh_sach_TV.getElementsByTagName("Tivi");

    for (var i = 0; i < Danh_sach_Tivi.length; i++) {
      var Tivi = Danh_sach_Tivi[i];
      var Ten = Tivi.getAttribute("Ten")
      var Ma= Tivi.getAttribute("Ma_so")
     var Gia_nhap = parseInt(Tivi.getAttribute("Don_gia_Nhap"));
     var Gia_ban = parseInt(Tivi.getAttribute("Don_gia_Ban"));
     var SlTon = parseInt(Tivi.getAttribute("So_luong_Ton"));
     var Doanh_thu = parseInt(Tivi.getAttribute("Doanh_thu"));
      var Trang_thai = Tivi.getAttribute("Trang_thai_Con_hang");

      var DS_TV = Data.getElementsByTagName("Danh_sach_Tivi")[0];

      var newTV = Data.createElement("Tivi");
      newTV.setAttribute("Ten", Ten);
      newTV.setAttribute("Ma_so", Ma);
      newTV.setAttribute("Don_gia_Nhap", Gia_nhap);
      newTV.setAttribute("Don_gia_Ban", Gia_ban);
      newTV.setAttribute("So_luong_Ton", SlTon);
      newTV.setAttribute("Doanh_thu", Doanh_thu);     
      newTV.setAttribute("Trang_thai", Trang_thai);

      var NhomTV = Tivi.getElementsByTagName("Nhom_Tivi")[0]
      var Ma_Nhom = NhomTV.getAttribute("Ma_so");
      var Ten_Nhom = NhomTV.getAttribute("Ten")
      var Sl_Ton_Nhom = parseInt(NhomTV.getAttribute("So_luong_Ton"))

      var newNhomTV= Data.createElement("Nhom_Tivi");
      newNhomTV.setAttribute("Ten", Ten_Nhom);
      newNhomTV.setAttribute("Ma_so", Ma_Nhom);
      newNhomTV.setAttribute("So_luong_Ton", Sl_Ton_Nhom);
      newTV.appendChild(newNhomTV);

      DS_TV.appendChild(newTV);      
    }
    return new XMLSerializer().serializeToString(Data);
  }

  Lay_Du_lieu_XML_Doc(){   
    return new DOMParser().parseFromString(Chuoi_Du_lieu_XML, "text/xml").documentElement;
} 

Lay_Du_lieu_XML_DOM(){
     return new DOMParser().parseFromString(Chuoi_Du_lieu_XML, "text/xml");
} 
layTheBanHang(dulieu)
{
  var Ban_hang = dulieu.getElementsByTagName('Ban_hang');
  return new XMLSerializer().serializeToString(Ban_hang);
}
phanLoai(dulieu)
{
  var DSKQ=[];
  for(var  i = 0;  i < dulieu.getElementsByTagName('Tivi').length; i++)
  {
    var Mat_hang = dulieu.getElementsByTagName('Tivi')[i];
    var nhomTivi = Mat_hang.getElementsByTagName('Nhom_Tivi')[0];
    var ten = nhomTivi.getAttribute('Ten');
    DSKQ.push(ten);
  }
  var obj = {};
  var ret_arr = [];
  for (var i = 0; i < DSKQ.length; i++) 
  {
      obj[DSKQ[i]] = true;
  }
    for (var key in obj) 
    {
        ret_arr.push(key);
    }
    return ret_arr;
    
}
tinhSoLuongTonVaDoanhThu(Ngay_tra_cuu, dulieu)
{
  var mang = this.phanLoai(dulieu);
  var doanh_Thu = 0;
  for(var i = 0; i <mang.length; i++)
  {
    var count = 0;
    var Doanh_thu =0;
    for(var k=0; k <dulieu.getElementsByTagName('Tivi').length; k++)
    {
      var Mat_hang=dulieu.getElementsByTagName('Tivi')[k];
      var DSBan_hang= Mat_hang.getElementsByTagName('Danh_sach_Ban_hang')[0];
      var Ban_hang = DSBan_hang.getElementsByTagName('Ban_hang');
      
      var soLuongTon = Mat_hang.getAttribute('So_luong_Ton');
      soLuongTon = parseInt(soLuongTon);
      
      var nhomTivi = Mat_hang.getElementsByTagName('Nhom_Tivi')[0];
      var ten = nhomTivi.getAttribute('Ten');
      
      if(mang[i] == ten)
      {
        // for(var m = 0; m < Ban_hang.length; m ++)
        // {
        //   var Tien = Ban_hang[m].getAttribute('Tien');
        //   var Ngay_ban = Ban_hang[m].getAttribute('Ngay');
        //   Tien = parseFloat(Tien);
        //   if(Ngay_tra_cuu == Ngay_ban)
        //   {
        //     Doanh_thu += Tien;
        //   }
        // }
        if(Number.isNaN(soLuongTon))
          count += 0;
        else
          count +=soLuongTon;
       
      }
    }
  }
  return soLuongTon;
}
Doc_Hinh_Anh(path){
    var Duong_dan = "..//Media//" + path;
    return File.readFileSync(Duong_dan);
    
}

  Lay_Danh_sach_Ten_Tivi(Du_lieu){
    var Chuoi_ten = "";
    var Danh_sach_TV = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0];
    var Danh_sach_Tivi = Danh_sach_TV.getElementsByTagName("Tivi");
    for(var i =0; i< Danh_sach_Tivi.length; i++){      
      Chuoi_ten += (Danh_sach_Tivi[i].getAttribute("Ten") + ",");
    }
    return Chuoi_ten;
}
 

  Dap_Ung_Yeu_Cau(Loai_Yeu_Cau) {
    var Duong_dan = "";
    if (Loai_Yeu_Cau == "Khach_Tham_Quan") {
      Duong_dan =
        __dirname +
        "/../../1512191_KhachThamQuan/1-Man_hinh_Giao_dien/MH_Chinh.html";
    } else if (Loai_Yeu_Cau == "QLNhap") {
      Duong_dan =
        __dirname + "/../../1512351_QLNhap/1-Man_hinh_Giao_dien/MH_Chinh.html";
    } else if (Loai_Yeu_Cau == "QLBan") {
      Duong_dan =
        __dirname + "/../../1512191_QLBan/1-Man_hinh_Giao_dien/MH_Chinh.html";
    } else if (Loai_Yeu_Cau == "NVNhap") {
      Duong_dan =
        __dirname + "/../../1512117_NVNhap/1-Man_hinh_Giao_dien/MH_Chinh.html";
    } else if (Loai_Yeu_Cau == "NVBan") {
      Duong_dan =
        __dirname + "/../../1512117_NVBan/1-Man_hinh_Giao_dien/MH_Chinh.html";
    }
    return File.readFileSync(Duong_dan, "UTF-8");
  }
}

module.exports = new XL_NGHIEP_VU();
