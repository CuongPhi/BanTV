﻿console.log("Xin chờ ...");
var NodeJs_Dich_vu = require("http");
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;
var Luu_tru = require("../3-Doi_tuong_va_Xu_ly/XL_LUU_TRU.js");
var Nghiep_vu = require("../3-Doi_tuong_va_Xu_ly/XL_NGHIEP_VU.js");
var Xu_ly_Tham_so = require("querystring");
var fs = require("fs");
var sttCode = 200;

var Xml_Doc = Nghiep_vu.Lay_Du_lieu_XML_Doc();
var Xml_Dom = Nghiep_vu.Lay_Du_lieu_XML_DOM();

// chạy dịch vụ
var Dich_vu = NodeJs_Dich_vu.createServer((Yeu_cau, Dap_ung) => {
  var Chuoi_Nhan = "";
  var Dia_chi_Xu_ly = Yeu_cau.url.replace("/", "");
  var Tham_so = Xu_ly_Tham_so.parse(Dia_chi_Xu_ly.replace("?", ""));
  var ReqCode = Tham_so.ReqCode;
  var Chuoi_Kq = "";
  contentType = "text/html";
  var IP =
    Yeu_cau.headers["x-forwarded-for"] || Yeu_cau.connection.remoteAddress; // IP của client
  Yeu_cau.on("data", chunk => {
    Chuoi_Nhan += chunk;
  });
  Yeu_cau.on("end", () => {
    //nếu là yêu cầu tải trang ứng dụng
    if (Yeu_cau.url == "/" || Yeu_cau.url == "/KhachHang") { //nếu url là localhost:8888/ thì trả lại trang của khách hàng
      //tải trang khách tham quan
      Chuoi_Kq = Nghiep_vu.Dap_Ung_Yeu_Cau("Khach_Tham_Quan"); 
    } else if (Yeu_cau.url == "/QLNhap") {//nếu url là localhost:8888/QLNhap thì trả lại trang của quản lí nhập
      //tải trang quản lí nhập
      Chuoi_Kq = Nghiep_vu.Dap_Ung_Yeu_Cau("QLNhap");
    } else if (Yeu_cau.url == "/QLBan") {//nếu url là localhost:8888/QLBan thì trả lại trang của quản lí bán
      Chuoi_Kq = Nghiep_vu.Dap_Ung_Yeu_Cau("QLBan"); 
    } else if (Yeu_cau.url == "/NVNhap") {  //nếu url là localhost:8888/NVNhap thì trả lại trang của nhân viên nhập
      //tải trang nhân viên nhập
      Chuoi_Kq = Nghiep_vu.Dap_Ung_Yeu_Cau("NVNhap"); 
    } else if (Yeu_cau.url == "/NVBan") {//nếu url là localhost:8888/NVBan thì trả lại trang của nhân viên bán
      //tải trang nhân viên bán
      Chuoi_Kq = Nghiep_vu.Dap_Ung_Yeu_Cau("NVBan");
    } else if (ReqCode == "Lay_Day_Du_Du_Lieu") { // lấy toàn bộ dữ liệu ->> nặng, chậm
      Chuoi_Kq = new XMLSerializer().serializeToString(Xml_Doc);
      contentType = "text/xml";
    } else if (ReqCode == "Lay_Du_lieu") {    // chỉ lấy các thẻ Tivi và thẻ Nhom_Tivi của nó
      Chuoi_Kq = Nghiep_vu.Lay_Danh_sach_Tivi(Xml_Doc);
      contentType = "text/xml";
    }    else if(ReqCode == "tinh_doanh_thu" )// cái reqcode zậy thôi hak,
    {
      Chuoi_Kq = Nghiep_vu.tinhSoLuongTonVaDoanhThu(Tham_so.Ngay_tra_cuu,Xml_Doc)
      contentType = "text";
      console.log(Chuoi_Kq);
    }
else if (ReqCode == "Lay_anh") {    // lấy hỉnh ảnh theo tên hình
      Chuoi_Kq = Nghiep_vu.Doc_Hinh_Anh(Tham_so.Ma_so);
      contentType = "image/png";
    } else if (ReqCode == "Doc_Danh_sach_Ten_Tivi") { // chỉ lấy ra danh sách tên các tivi
      Chuoi_Kq = Nghiep_vu.Lay_Danh_sach_Ten_Tivi(Xml_Doc);
      contentType = "text/plain";
    } else if (ReqCode == "NV_Nhap") {
      Luu_tru.Them_Danh_sach_Nhap_hang(
        Xml_Doc,
        Xml_Dom,
        Tham_so.TenTV,
        Tham_so.Ngay,
        Tham_so.Don_gia,
        Tham_so.So_luong,
        Tham_so.Tien
      );
      Chuoi_Kq = "Cập nhật thành công!";
      contentType = "text/plain";
    } else if (ReqCode == "NV_Ban") {
      console.log("ok")
      Luu_tru.Cap_nhap_Du_lieu_Theo_Phieu_ban(
        Xml_Doc,
        Tham_so.TenTV,
        Tham_so.Ngay,
        Tham_so.Don_gia,
        Tham_so.So_luong,
        Tham_so.Tien
      );
      Chuoi_Kq = "Cập nhật thành công!";
      contentType = "text/plain";
    } else if (ReqCode == "QL_Nhap") {
      console.log("ok QL Nhap")
      Luu_tru.Cap_nhat_Don_gia(
        Xml_Doc,
        Tham_so.Ten,
        Tham_so.Don_gia_Nhap,
        "Don_gia_Nhap"
      );

      Chuoi_Kq =
        "Cập nhật " +
        Tham_so.Ten +
        "Giá nhập " +
        Tham_so.Don_gia_Nhap +
        " thành công!";
      contentType = "text/plain";
    } else if (ReqCode == "QL_Ban") {
      Chuoi_Kq = "Not found!";

      Nghiep_vu.Cap_nhat_Don_gia(
        Xml_Doc,
        Tham_so.TenTV,
        Tham_so.Don_gia_Ban,
        "Don_gia_Ban"
      );
      Chuoi_Kq =
        "Cập nhật " +
        Tham_so.Ten +
        "Giá bán " +
        Tham_so.Don_gia_Ban +
        " thành công!";

      contentType = "text/plain";
    } else {
      sttCode = 404;
      Chuoi_Kq = "<h1>Not found!</h1>";
      contentType = "text/html";
    }

    Dap_ung.writeHead(sttCode, {
      "Content-Type": contentType,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    });
    Dap_ung.end(Chuoi_Kq);
  });
}).listen(8888, () => {
  console.clear();
  console.log("Dịch vụ lắng nghe ở cổng ", 8888);
});
