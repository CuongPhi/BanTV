var File = require("fs");
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;

class XL_LUU_TRU{
    Them_Danh_sach_Nhap_hang(
        Du_lieu,
        Data_XML,
        Ten_Tivi_Arg,
        Ngay_Arg,
        Don_gia_Arg,
        So_luong_Arg,
        Tien_Arg
      ) {
        var Danh_sach_TV = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0];
        var Danh_sach_Tivi = Danh_sach_TV.getElementsByTagName("Tivi");
        for (var i = 0; i < Danh_sach_Tivi.length; i++) {
          var Tivi = Danh_sach_Tivi[i];
          var Ten_Tivi = Tivi.getAttribute("Ten");
          if (Ten_Tivi == Ten_Tivi_Arg) {
            var Danh_sach_Nhap_hang = Tivi.getElementsByTagName(
              "Danh_sach_Nhap_hang"
            )[0];
            var nodeNhap = Data_XML.createElement("Nhap_hang");
            nodeNhap.setAttribute("Ngay", Ngay_Arg);
            nodeNhap.setAttribute("Don_gia", Don_gia_Arg);
            nodeNhap.setAttribute("So_luong", So_luong_Arg);
            nodeNhap.setAttribute("Tien", Tien_Arg);
            Danh_sach_Nhap_hang.appendChild(nodeNhap);
            this.Luu_lai_Du_lieu(Du_lieu);
            break;
          }
        }
      }
    
      Cap_nhat_Don_gia(Du_lieu, Ten_Tivi_Arg, Don_gia_Moi_Arg, Thuoc_tinh) {
        var Danh_sach_TV = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0];
        var Danh_sach_Tivi = Danh_sach_TV.getElementsByTagName("Tivi");
        for (var i = 0; i < Danh_sach_Tivi.length; i++) {
          var Tivi = Danh_sach_Tivi[i];
          var Ten_Tivi = Tivi.getAttribute("Ten");
          if (Ten_Tivi == Ten_Tivi_Arg) {
            Tivi.setAttribute(Thuoc_tinh, Don_gia_Moi_Arg);
            this.Luu_lai_Du_lieu(Du_lieu);
            break;
          }
        }
      }
    // ghi đè lên dữ liệu cũ
      Luu_lai_Du_lieu(data) {
        File.writeFile("../2-Du_lieu_Luu_tru/Du_lieu.xml", data, function(err) {
          if (!err) {
            console.log("Luu du lieu thanh cong");
          }
        });
      }
}

module.exports =  new XL_LUU_TRU;