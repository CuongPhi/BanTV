//************** Xử lý Lưu trữ ***********
function Doc_Du_lieu() {
 
  var Du_lieu =  {}
  var Xu_ly_HTTP = new XMLHttpRequest();
  var Dia_chi_Dich_vu = "http://localhost:8888/";
  var Tham_so = "ReqCode=Lay_Du_lieu";
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`;
  Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly, false);
  Xu_ly_HTTP.send("");
  var Chuoi_xml = Xu_ly_HTTP.responseText.trim()
  if (Chuoi_xml != "")
  {
    Du_lieu =  (new DOMParser()).parseFromString(Chuoi_xml,'text/xml');
  }
   var Danh_sach_Mat_hang=Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0]
  return Danh_sach_Mat_hang
}
function LayDuLieuFull()
{
  var Du_lieu =  {}
  var Xu_ly_HTTP = new XMLHttpRequest();
  var Dia_chi_Dich_vu = "http://localhost:8888/";
  var Tham_so = "ReqCode=Lay_Day_Du_Du_Lieu";
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`;
  Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly, false);
  Xu_ly_HTTP.send("");
  var Chuoi_xml = Xu_ly_HTTP.responseText.trim()
  if (Chuoi_xml != "")
  {
    Du_lieu =  (new DOMParser()).parseFromString(Chuoi_xml,'text/xml');
  }
   var Danh_sach_Mat_hang=Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0]
   //alert(Danh_sach_Mat_hang);
  return Danh_sach_Mat_hang;
}

//************** Xử lý Nghiệp vụ ***********
//Phân loại nhóm Tivi
function phanLoai()
{
  var dulieu = Doc_Du_lieu();
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
//Tính số lượng tồn và doanh thu của nhóm Tivi theo ngày hiện hành
function tinhSoLuongTonVaDoanhThu(Ngay_tra_cuu)
{
  var Du_lieu =  {}
  var Xu_ly_HTTP = new XMLHttpRequest();
  var Dia_chi_Dich_vu = "http://localhost:8888/";
  var Tham_so = `ReqCode=tinh_doanh_thu&Ngay_tra_cuu=${Ngay_tra_cuu}`;
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`;
  Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly, false);
  Xu_ly_HTTP.send("");
  var Chuoi_xml = Xu_ly_HTTP.responseText.trim()
  return Chuoi_xml;
}
//Tra cứu TiVi
function Tra_cuu_Mat_hang(Chuoi_Tra_cuu){
	
	var dulieu = Doc_Du_lieu();
	Chuoi_Tra_cuu=Chuoi_Tra_cuu.toUpperCase()
	var Danh_sach_Kq= [];
	for(var i = 0; i < dulieu.getElementsByTagName("Tivi").length; i++)
	{
		var Mat_hang = dulieu.getElementsByTagName("Tivi")[i];
		var Ten = Mat_hang.getAttribute("Ten");
		Ten=Ten.toUpperCase()
         if ( Ten.indexOf(Chuoi_Tra_cuu,0)>=0 )
		 {
            Danh_sach_Kq.push(Mat_hang)
			
		 }
	}
	return Danh_sach_Kq
}
//Tính số lượng bán được theo ngày hiện hành
function tinhSoLuong(Ngay_tra_cuu)
{
  var dulieu = LayDuLieuFull();
  Ngay_tra_cuu = Ngay_tra_cuu.trim();
  var tong_So = 0
  for(var i = 0 ; i <dulieu.getElementsByTagName('Ban_hang').length; i++)
  {
    var Ban_hang = dulieu.getElementsByTagName('Ban_hang')[i];
    var Ngay_ban = Ban_hang.getAttribute('Ngay');
    var soLuong=Ban_hang.getAttribute('So_luong');
    soLuong = parseInt(soLuong);
    Ngay_ban = Ngay_ban.trim();
    if(Ngay_ban==Ngay_tra_cuu)
    {
      tong_So+= soLuong;
    }
  }
  return tong_So;
}
//Tính doanh thu của cả cửa hàng theo ngày hiện hành
function tinhDoanhThu(Ngay_tra_cuu)
{
  var dulieu = LayDuLieuFull();
  Ngay_tra_cuu = Ngay_tra_cuu.trim();
  var Doanh_thu =0;
  for(var i = 0 ; i <dulieu.getElementsByTagName('Ban_hang').length; i++)
  {
    var Ban_hang = dulieu.getElementsByTagName('Ban_hang')[i];
    var Ngay_ban = Ban_hang.getAttribute('Ngay');
    var Tien = Ban_hang.getAttribute('Tien');
    Tien = parseFloat(Tien);
    Ngay_ban = Ngay_ban.trim();
    if(Ngay_ban==Ngay_tra_cuu)
    {
      Doanh_thu+= Tien;
    }
    // else
    // {

    //   Doanh_thu = 0;
    //   var Th_Danh_sach=document.createElement("div");
    //   Th_Danh_sach.style.cssText=`text-align:center; color:red`
    //   Th_Danh_sach.innerHTML=`Ngày ${Ngay_tra_cuu} không tìm thấy!`;
    //   var Th_kq=document.createElement("div");
    //   Th_kq.appendChild(Th_Danh_sach);
    // }
  }

  return Doanh_thu;
}

// ****** Xử lý Thể hiện ********
function Tao_Th_Danh_sach_Mat_hang(Danh_sach){
  var Dia_chi_Dich_vu = "http://localhost:8888/";
  var Tham_so = "ReqCode=Lay_anh";
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`;
  var Th_Danh_sach=document.createElement("div")
  Th_Danh_sach.className="row" 
for(var i = 0; i < Danh_sach.getElementsByTagName("Tivi").length; i++)
{  
		var Mat_hang = Danh_sach.getElementsByTagName("Tivi")[i];
		var Ten = Mat_hang.getAttribute("Ten");
		var Ma_so = Mat_hang.getAttribute("Ma_so");
		var Don_gia_Ban = Mat_hang.getAttribute("Don_gia_Ban");
		var So_luong_ton = Mat_hang.getAttribute("So_luong_Ton");
    So_luong_ton = parseInt(So_luong_ton);
    if(Number.isNaN(So_luong_ton))
    {
      So_luong_ton = 0;
    }
        var Th_Hinh=document.createElement("img")      
        Th_Hinh.src=`${Dia_chi_Xu_ly}&Ma_so=${Ma_so}.png`
        Th_Hinh.style.cssText=`width:150px;height:150px;`

         var Th_Thong_tin=document.createElement("div")
         Th_Thong_tin.className=`btn`
         Th_Thong_tin.style.cssText=`text-align:left; color:red`
         Th_Thong_tin.innerHTML=`<b style="font-size: 20px;">${Ten} </b>
                  <br />Đơn giá Bán 
                  <b> ${Don_gia_Ban.toLocaleString("vi")}</b><br /> Số lượng tồn <b>${So_luong_ton}</b>`
         var Th_Mat_hang=document.createElement("div")
         Th_Mat_hang.className=`col-md-3`
         Th_Mat_hang.style.cssText=`margin-bottom:10px`
         Th_Mat_hang.appendChild(Th_Hinh)
         Th_Mat_hang.appendChild(Th_Thong_tin)
         
         Th_Danh_sach.appendChild(Th_Mat_hang)
 
}
 return Th_Danh_sach
}

function Hien_thi(Chuoi_Tra_cuu)
{
	var Danh_sach_Kq = Tra_cuu_Mat_hang(Chuoi_Tra_cuu)
	var Dia_chi_Dich_vu = "http://localhost:8888/";
  var Tham_so = "ReqCode=Lay_anh";
  var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`;
  
	var Th_Danh_sach=document.createElement("div")
	Th_Danh_sach.className="row" 
	for(var i = 0; i < Danh_sach_Kq.length; i++)
	{
		var ten = Danh_sach_Kq[i].getAttribute("Ten");
		var Ma_so = Danh_sach_Kq[i].getAttribute("Ma_so");
		var Don_gia_Ban = Danh_sach_Kq[i].getAttribute("Don_gia_Ban");
    var So_luong_ton = Danh_sach_Kq[i].getAttribute("So_luong_Ton");
    So_luong_ton = parseInt(So_luong_ton);
    if(So_luong_ton.isNaN())
    {
      So_luong_ton = 0;
    }
         var Th_Hinh=document.createElement("img")      
         Th_Hinh.src=`${Dia_chi_Xu_ly}&Ma_so=${Ma_so}.png`
         Th_Hinh.style.cssText=`width:150px;height:150px;`
         var Th_Thong_tin=document.createElement("div")
         Th_Thong_tin.className=`btn`
         Th_Thong_tin.style.cssText=`text-align:left; color:red`
         Th_Thong_tin.innerHTML=`<b style="font-size: 20px;">${ten}</b>
                  <br />Đơn giá Bán 
                   <b>${Don_gia_Ban.toLocaleString("vi")}</b>
				   <br /> Số lượng tồn <b>${So_luong_ton}</b>`
         var Th_Mat_hang=document.createElement("div")
         Th_Mat_hang.className=`col-md-3`
         Th_Mat_hang.style.cssText=`margin-bottom:10px`
         Th_Mat_hang.appendChild(Th_Hinh)
         Th_Mat_hang.appendChild(Th_Thong_tin)
         
         Th_Danh_sach.appendChild(Th_Mat_hang)
 
		
	}
return Th_Danh_sach;
}



 
 