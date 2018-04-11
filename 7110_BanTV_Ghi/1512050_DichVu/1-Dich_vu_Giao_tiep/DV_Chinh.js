console.log("Xin chờ ...");
var NodeJs_Dich_vu = require("http");
var Luu_tru = require("../3-Doi_tuong_va_Xu_ly/XL_LUU_TRU.js");
var Nghiep_vu = require("../3-Doi_tuong_va_Xu_ly/XL_NGHIEP_VU.js");
var Xu_ly_Tham_so = require("querystring");
var fs = require("fs");
var sttCode=200

var Xml_Doc = Nghiep_vu.Lay_Du_lieu_XML_Doc();
var Xml_Dom = Nghiep_vu.Lay_Du_lieu_XML_DOM();

// chạy dịch vụ
var Dich_vu = NodeJs_Dich_vu.createServer((Yeu_cau, Dap_ung) => {
  var Chuoi_Nhan = "";
  var Dia_chi_Xu_ly = Yeu_cau.url.replace("/", "");
  var Tham_so = Xu_ly_Tham_so.parse(Dia_chi_Xu_ly.replace("?", ""));
  var Ma_so_Xu_ly = Tham_so.Ma_so_Xu_ly;
  var Chuoi_Kq = "";
  contentType = "text/html";
 var IP = Yeu_cau.headers['x-forwarded-for'] || Yeu_cau.connection.remoteAddress; // IP của client
  Yeu_cau.on("data", chunk => {
    Chuoi_Nhan += chunk;
  });
  Yeu_cau.on("end", () => {
    //nếu là yêu cầu tải trang ứng dụng
    if (Yeu_cau.url == "/" || Yeu_cau.url == "/KhachHang") {
      //tải trang khách tham quan
      Chuoi_Kq = Nghiep_vu.Dap_Ung_Yeu_Cau("Khach_Tham_Quan");
    } else if (Yeu_cau.url == "/QLNhap") {
      //tải trang quản lí nhập
      Chuoi_Kq = Nghiep_vu.Dap_Ung_Yeu_Cau("QLNhap");
    } else if (Yeu_cau.url == "/QLBan") {
      //tải trang quản lí bán
      Chuoi_Kq = Nghiep_vu.Dap_Ung_Yeu_Cau("QLBan");
    } else if (Yeu_cau.url == "/NVNhap") {
      //tải trang nhân viên nhập
      Chuoi_Kq = Nghiep_vu.Dap_Ung_Yeu_Cau("NVNhap");
    } else if (Yeu_cau.url == "/NVBan") {
      //tải trang nhân viên bán
      Chuoi_Kq = Nghiep_vu.Dap_Ung_Yeu_Cau("NVBan");
    } else if (Ma_so_Xu_ly == "Doc_Du_lieu") {
      Chuoi_Kq = Nghiep_vu.Lay_Danh_sach_Tivi(Xml_Doc);
      contentType = "text/xml";
    } else if (Ma_so_Xu_ly == "Doc_hinh") {
      Chuoi_Kq = Nghiep_vu.Doc_Hinh_Anh(Tham_so.Ma_so);
      contentType = "image/png";
    } else if (Ma_so_Xu_ly == "Doc_Danh_sach_Ten_Tivi") {
      Chuoi_Kq = Nghiep_vu.Lay_Danh_sach_Ten_Tivi(Xml_Doc);;
      contentType = "text/plain";
    } else if (Ma_so_Xu_ly == "NV_Nhap_hang") {
      Luu_tru.Them_Danh_sach_Nhap_hang(
        Du_lieu_xml,
        Data_XML,
        Tham_so.TenTV,
        Tham_so.Ngay,
        Tham_so.Don_gia,
        Tham_so.So_luong,
        Tham_so.Tien
      );
      Chuoi_Kq = "Cập nhật thành công!";
      contentType = "text/plain";
    } else if (Ma_so_Xu_ly == "Quan_ly_Nhap_hang") {
      Luu_tru.Cap_nhat_Don_gia(
        Du_lieu_xml,
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
    } else if (Ma_so_Xu_ly == "Quan_ly_Ban_hang") {
      Chuoi_Kq = "Not found!";

      Nghiep_vu.Cap_nhat_Don_gia(
        Du_lieu_xml,
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
        sttCode= 404
        Chuoi_Kq= "<h1>Not found!</h1>"
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
