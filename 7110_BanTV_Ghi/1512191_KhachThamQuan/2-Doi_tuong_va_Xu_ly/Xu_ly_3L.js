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
//************** Xử lý Nghiệp vụ ***********
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
		var Trang_thai = Mat_hang.getAttribute("Trang_thai_Con_hang");
		if(Trang_thai == 'false')
		{
			Trang_thai ='Hết hàng';
		}
		else
		{
			Trang_thai ='Còn hàng';
		}
        var Th_Hinh=document.createElement("img")      
        Th_Hinh.src=`${Dia_chi_Xu_ly}&Ma_so=${Ma_so}.png`
        Th_Hinh.style.cssText=`width:150px;height:150px;`

         var Th_Thong_tin=document.createElement("div")
         Th_Thong_tin.className=`btn`
         Th_Thong_tin.style.cssText=`text-align:left; color:red`
         Th_Thong_tin.innerHTML=`<b style="font-size: 20px;">${Ten} </b>
                  <br />Đơn giá Bán 
                  <b> ${Don_gia_Ban.toLocaleString("vi")}</b><br /> Trạng thái <b>${Trang_thai}</b>`
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
		var Trang_thai = Danh_sach_Kq[i].getAttribute("Trang_thai_Con_hang");
		if(Trang_thai == 'false')
		{
			Trang_thai ='Hết hàng';
		}
		else
		{
			Trang_thai ='Còn hàng';
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
				   <br /> Trạng thái <b>${Trang_thai}</b>`
         var Th_Mat_hang=document.createElement("div")
         Th_Mat_hang.className=`col-md-3`
         Th_Mat_hang.style.cssText=`margin-bottom:10px`
         Th_Mat_hang.appendChild(Th_Hinh)
         Th_Mat_hang.appendChild(Th_Thong_tin)
         
         Th_Danh_sach.appendChild(Th_Mat_hang)
 
		
	}
return Th_Danh_sach;
}



 
 