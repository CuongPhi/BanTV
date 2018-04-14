/****************** Xử lý thể hiện ***********************/
function Tao_Th_Danh_sach_Tivi(Danh_sach_Tivi){
    // Ten, don gia ban, trang thai con hang
    var Dia_chi_Dich_vu = "http://localhost:8888/";
    var Tham_so="ReqCode=Lay_anh";
    var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}?${Tham_so}`
    
    var Th_Danh_sach = document.createElement("div");
    Th_Danh_sach.className = "row";
    Th_Danh_sach.style.cssText = 'margin-left:50px'

    var danh_sach = Danh_sach_Tivi.getElementsByTagName("Tivi");
    for(var i=0; i< danh_sach.length; i++){
        var Tivi = danh_sach[i];
        var Ten = Tivi.getAttribute("Ten");
        var Don_gia_Nhap = Tivi.getAttribute("Don_gia_Nhap");
        var So_luong_Ton = 0;
        var So_luong_Ban=0;
        var So_luong_Nhap=0;
        var Danh_sach_Ban_hang=Tivi.getElementsByTagName("Ban_hang");
       // alert(Danh_sach_Ban_hang.length);
        var Danh_sach_Nhap_hang=Tivi.getElementsByTagName("Nhap_hang")
        for(var j=0;j<Danh_sach_Ban_hang.length;j++)
        {
          So_luong_Ban=So_luong_Ban+parseInt(Danh_sach_Ban_hang[i].getAttribute("So_luong"));
        }
        for(var j=0;j<Danh_sach_Nhap_hang.length;j++)
        {
          So_luong_Nhap=So_luong_Nhap+parseInt(Danh_sach_Ban_hang[i].getAttribute("So_luong"));
        }
        So_luong_Ton=So_luong_Nhap-So_luong_Ban;
        var Ma_so = Tivi.getAttribute("Ma_so");

        var Th_Hinh = document.createElement("img");
        Th_Hinh.src = `${Dia_chi_Xu_ly}&Ma_so=${Ma_so}.png`; //http://localhost:8888/Media/TIVI_1.png
        Th_Hinh.className = "image";

        var Th_Thong_tin = document.createElement("div");
        Th_Thong_tin.className = "info";

        Th_Thong_tin.innerHTML = `${Ten}
                                <br/>Đơn giá Nhập: 
                                ${Don_gia_Nhap.toLocaleString("vi") + ""}
                                <br/>Số lượng tồn: 
                                ${So_luong_Ton.toLocaleString("vi") + ""}
                                `;
        
        var Th_Tivi = document.createElement("div");
        Th_Tivi.className = "col-md-3";
        Th_Tivi.style.cssText = "margin-bottom: 10px";

        Th_Tivi.appendChild(Th_Hinh);
        Th_Tivi.appendChild(Th_Thong_tin);
        Th_Danh_sach.appendChild(Th_Tivi);
    }
    return Th_Danh_sach;
}
var Da_Co_Nut_Quay_Ve = false;
// Kiểm tra phần từ item có nằm trong mảng arr chưa
function Kiem_tra_thuoc_mang(arr, item){               
    for(var i = 0; i < arr.length; ++i)
        if(arr[i]==item)
            return true
    return false
}
//Xử lí phiếu bán hàng
function Tao_phieu_Nhap()
{
    //set lại body rỗng 
    Xoa_Tat_ca_childNodes_Element(CUA_SO_KET_QUA)
    //Sửa lại tiêu đề
    document.getElementById("quan_ly_nhap_hang").innerHTML = "NHẬP HÀNG THEO PHIẾU NHẬP"
    //Tạo form cho phiếu bán
    var Phieu_nhap=document.createElement("div")
    Phieu_nhap.innerHTML=`<div class="row">
    <div class="col-sm-8" style="text-align: center;"><b>ĐIỀN ĐẦY ĐỦ THÔNG TIN VÀO FORM</b> <br> <br></div>
  </div>
  <div class="row">
    <div class="col-sm-6">
    <form class="form-inline">
    <div class="form-group">
      <label for="ngay">Ngày:</label>
      <input type="date" class="form-control" id="ngay">
    </div>
    <br>
    <div class="form-group">
      <label for="tongtien">Tổng Tiền:</label>
      <input type="number" class="form-control" id="tongtien" placeholder="10000000">
    </div>
    </form>
    </div>
  </div>
  <br>
  <div class="row">
    <div class="col-sm-10">

    <form class="form-inline">
    <div class="form-group">
      <label for="tivi">Tivi:</label>
      <input type="text" class="form-control" id="tivi" placeholder="tivi Loai...">
    </div>

    <div class="form-group">
      <label for="soluong">Số Lượng:</label>
      <input type="number" class="form-control" id="soluong" placeholder="1">
    </div>

    <div class="form-group">
    <label for="dongia">Đơn Giá:</label>
    <input type="number" class="form-control" id="dongia" placeholder="10000000">
  </div>

  <div class="form-group">
  <label for="tien">Tiền:</label>
  <input type="number" class="form-control" id="tien" placeholder="10000000">
</div>
  </form>

    </div>
  </div>
  <br>
  <div class="row">
  <div class="col-sm-8"><button type="button" class="btn btn-primary" onclick="Xu_li_Nhap_hang()">Submit</button></div>
</div>
  `
    CUA_SO_KET_QUA.appendChild(Phieu_nhap)
}
function Xu_ly_phieu_nhap()
{
    //Tạo DS sản phẩm cho Tivi trong form
  var DS=document.getElementById("tien")
  alert(DS)
  var Danh_sach_Tivi = Doc_Danh_sach_Tivi()
  var danh_sach = Danh_sach_Tivi.getElementsByTagName("Tivi")
  //tivi.innerHTML="<option selected>Open this select menu</option>"
 /* for(var i=1; i< danh_sach.length; i++){
      var Tivi = danh_sach[i];
      var Ten = Tivi.getAttribute("Ten");
      DS.innerHTML+="<option value="+danh_sach[i].getAttribute("Ten")+">"+danh_sach[i].getAttribute("Ten")+"</option>"
  }*/
}
function Xu_li_Nhap_hang()
{
    var Ten_tivi = document.getElementById("tivi").value
    var So_luong = document.getElementById("soluong").value
    var Ngay=document.getElementsByClassName("Ngay").value
    var Don_gia=document.getElementsByClassName(Don_gia).value
    var Tien=document.getElementsByClassName(Tien).value
    var Xu_ly_HTTP = new XMLHttpRequest();
    var Dia_chi_Dich_vu = "http://localhost:8888/"; // truyền tham số theo định dạng sau để thực hiện chức năng nhập hàng:
    var Tham_so = `ReqCode=NV_Nhap&Ten=${Ten_tivi}&Ngay=${Ngay}&Don_gia=${Don_gia}&So_luong=${So_luong}&Tien=${Tien}`;
    var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`;
    Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly, false);
    Xu_ly_HTTP.send("");
}

// Tạo sự kiên quay về
function Xem_Danh_sach(){
    document.getElementById("quan_ly_nhap_hang").innerHTML = "XEM CỬA HÀNG"
    Xoa_Tat_ca_childNodes_Element(CUA_SO_KET_QUA)    
     var Danh_sach_Tivi = Doc_Danh_sach_Tivi();
     var Th_Danh_sach_Tivi = Tao_Th_Danh_sach_Tivi(Danh_sach_Tivi);  
     CUA_SO_KET_QUA.appendChild(Th_Danh_sach_Tivi)
}
function Tao_nut_Xem(){
    var Nut_quay_ve = document.createElement("button")
    Nut_quay_ve.innerHTML = "CẬP NHẬP"
    Nut_quay_ve.id = "btn_quay_ve"
    Nut_quay_ve.onclick = function() {Xem_Danh_sach()}
    return Nut_quay_ve
}
function Tao_phieu_Nhap_hang()
{
    var Nut_phieu_nhap = document.createElement("button")
    Nut_phieu_nhap.innerHTML = "PHIẾU NHẬP"
    Nut_phieu_nhap.id = "btn_tao_phieu_nhap"
    Nut_phieu_nhap.onclick = function() {Tao_phieu_Nhap()}
    return Nut_phieu_nhap
}

function Xoa_Tat_ca_childNodes_Element(node_element){
    var node_list = node_element.childNodes
    for(var i = node_list.length - 1; i >= 0; i--){
        node_element.removeChild(node_list[i])
    }
}

/***********Xử lý với dữ liệu từ Internet*****************/
function Doc_Danh_sach_Tivi(){
    var Xu_ly_HTTP = new XMLHttpRequest();
    var Dia_chi_Dich_vu = "http://localhost:8888/";
    var Tham_so="ReqCode=Lay_Day_Du_Du_Lieu"
    var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly, false);
    Xu_ly_HTTP.send("");

    var Chuoi_XML = Xu_ly_HTTP.responseText;
    var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement;
    Danh_sach_Tivi = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0];
    return Danh_sach_Tivi;
}
