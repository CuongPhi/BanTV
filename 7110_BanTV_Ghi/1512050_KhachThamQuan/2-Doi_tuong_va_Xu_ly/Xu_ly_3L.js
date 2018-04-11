/****************** Xử lý thể hiện ***********************/
function Tao_Th_Danh_sach_Tivi(Danh_sach_Tivi){
    // Ten, don gia ban, trang thai con hang

    var Dia_chi_Dich_vu = "http://localhost:8888/";
    var Tham_so="ReqCode=Lay_anh";
    var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}?${Tham_so}` //định dạng lấy ảnh
    
    var Th_Danh_sach = document.createElement("div");
    Th_Danh_sach.className = "row";

    var danh_sach = Danh_sach_Tivi.getElementsByTagName("Tivi");
    for(var i=0; i< danh_sach.length; i++){
        var Tivi = danh_sach[i];
        var Ten = Tivi.getAttribute("Ten");
        var Don_gia = Tivi.getAttribute("Don_gia_Ban");
        var Trang_thai_Con_hang = Tivi.getAttribute("Trang_thai_Con_hang");
        var Ma_so = Tivi.getAttribute("Ma_so");

        var Th_Hinh = document.createElement("img");
        Th_Hinh.src = `${Dia_chi_Xu_ly}&Ma_so=${Ma_so}.png`; // http://localhost:8888/Media/TIVI_1.png
        Th_Hinh.className = "image";

        var Th_Thong_tin = document.createElement("div");
        Th_Thong_tin.className = "info";

        var Th_Con_hang = "";
        if(Trang_thai_Con_hang == null){
            Th_Con_hang = "Hết hàng";
        }else{
            if(Trang_thai_Con_hang == "false"){
                Th_Con_hang = "Hết hàng";
            }else if(Trang_thai_Con_hang == "true"){
                Th_Con_hang = "Còn hàng";
            }
        }

        Th_Thong_tin.innerHTML = `${Ten}
                                <br/>Đơn giá bán: 
                                ${Don_gia.toLocaleString("vi")}
                                <br/>Trạng thái: 
                                ${Th_Con_hang}
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







/***********Xử lý với dữ liệu từ Internet*****************/
function Doc_Danh_sach_Tivi(){
    var Xu_ly_HTTP = new XMLHttpRequest();
    var Dia_chi_Dich_vu = "http://localhost:8888/";
    var Tham_so="ReqCode=Lay_Du_lieu"
    var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly, false);
    Xu_ly_HTTP.send("");

    var Chuoi_XML = Xu_ly_HTTP.responseText;
    var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement;
    Danh_sach_Tivi = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0];
    return Danh_sach_Tivi;
}
