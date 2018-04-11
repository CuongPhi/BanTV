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
        var Don_gia_nhap = Tivi.getAttribute("Don_gia_Nhap");
        var So_luong_ton = Tivi.getAttribute("So_luong_Ton");
        var Ma_so = Tivi.getAttribute("Ma_so");

        var Th_Hinh = document.createElement("img");
        Th_Hinh.src = `${Dia_chi_Xu_ly}&Ma_so=${Ma_so}.png`; //http://localhost:8888/Media/TIVI_1.png
        Th_Hinh.className = "image";

        var Th_Thong_tin = document.createElement("div");
        Th_Thong_tin.className = "info";

        Th_Thong_tin.innerHTML = `${Ten}
                                <br/>Đơn giá nhập: 
                                ${Don_gia_nhap + ""}
                                <br/>Số lượng tồn: 
                                ${So_luong_ton + ""}
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
function Nhom_Tivi(Danh_sach_Tivi){

    document.getElementById("quan_ly_nhap_hang").innerHTML = "QUẢN LÝ NHẬP HÀNG"
    var Dia_chi_Dich_vu = "http://localhost:8888/";
    var Tham_so="ReqCode=Lay_anh";
    var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}?${Tham_so}`

    var DS_Ten_nhom = []
    var Nhom_tivi = document.createElement("div")
    var danh_sach = Danh_sach_Tivi.getElementsByTagName("Tivi")
    for(var i = 0;i < danh_sach.length; ++i){
        var nhom = danh_sach[i].getElementsByTagName("Nhom_Tivi")
        if(Kiem_tra_thuoc_mang(DS_Ten_nhom, nhom[0].getAttribute("Ten"))==false)
            DS_Ten_nhom.push(nhom[0].getAttribute("Ten"))
    }
    for(var i = 0; i < DS_Ten_nhom.length; ++i)       // Đưa tên nhóm "Khác" về cuối mảng
        if(DS_Ten_nhom[i]=="Khác")
            DS_Ten_nhom.splice(i, 1)
    DS_Ten_nhom.push("Khác")

    for(var i = 0; i < DS_Ten_nhom.length; ++i){
            var DS = document.createElement("div")
            DS.className="row"
            var Duong_thang = document.createElement("hr")
            var Ten_nhom = document.createElement("h1")
            Nhom_tivi.appendChild(Ten_nhom)
            Nhom_tivi.style.cssText = "margin-left: 50px"
            var Tong_so_luong_ton = 0

            for(var j = 0;j < danh_sach.length; ++j){
                var Tivi = danh_sach[j];
                var nhom = Tivi.getElementsByTagName("Nhom_Tivi")
                if(nhom[0].getAttribute("Ten")==DS_Ten_nhom[i]){
                    var Ten = Tivi.getAttribute("Ten"); 
                    var So_luong_ton = Tivi.getAttribute("So_luong_Ton");
                    if(So_luong_ton==null || isNaN(So_luong_ton)) So_luong_ton=0
                    var Ma_so = Tivi.getAttribute("Ma_so");

                    var Th_Hinh = document.createElement("img");
                    Th_Hinh.src = `${Dia_chi_Xu_ly}&Ma_so=${Ma_so}.png`;
                    Th_Hinh.className = "image";

                    var Th_Thong_tin = document.createElement("div");
                    Th_Thong_tin.className = "info";

                    Th_Thong_tin.innerHTML = `${Ten}
                                <br/>Số lượng tồn: 
                                ${So_luong_ton + ""}
                                `;
        
                    var Th_Tivi = document.createElement("div");
                    Th_Tivi.className = "col-md-3";
                    Th_Tivi.style.cssText = "margin-bottom: 10px";

                    Tong_so_luong_ton += parseInt(So_luong_ton) 

                    Th_Tivi.appendChild(Th_Hinh);
                    Th_Tivi.appendChild(Th_Thong_tin);
                    DS.appendChild(Th_Tivi)
                }
            }
            Ten_nhom.innerHTML = DS_Ten_nhom[i] + " - Số lượng tồn: " + Tong_so_luong_ton + ""
            Nhom_tivi.appendChild(Ten_nhom)
            Nhom_tivi.appendChild(DS)
            Nhom_tivi.appendChild(Duong_thang)
    }

    Xoa_Tat_ca_childNodes_Element(CUA_SO_KET_QUA)
    CUA_SO_KET_QUA.appendChild(Nhom_tivi)
}

// Kiểm tra phần từ item có nằm trong mảng arr chưa
function Kiem_tra_thuoc_mang(arr, item){               
    for(var i = 0; i < arr.length; ++i)
        if(arr[i]==item)
            return true
    return false
}

// Tạo giao diện cập nhật
function Xu_ly_cap_nhat(){
    document.getElementById("quan_ly_nhap_hang").innerHTML = "QUẢN LÝ NHẬP - CẬP NHẬT ĐƠN GIÁ"
    var Cap_nhat = document.createElement("div")

    //------------- Các tiêu đề: tên, đơn giá hiện tại và đơn giá mới
    var Ten_va_Don_gia_nhap = document.createElement("div")
    Ten_va_Don_gia_nhap.className = "row"

    var Ten_san_pham = document.createElement("p")
    var Don_gia_nhap_moi = document.createElement("p")
    Don_gia_nhap_moi.id="ThongBaoCapNhat"
    Ten_san_pham.innerHTML = "Tên sản phẩm"
    Don_gia_nhap_moi.innerHTML = "Cập nhật đơn giá mới"

    Ten_va_Don_gia_nhap.style.cssText = 'height: 80px'
    Ten_san_pham.style.cssText = 'font-size: 25px; margin-left: 200px; font-weight: bold'
    Don_gia_nhap_moi.style.cssText = 'font-size: 25px; margin-left: 350px; font-weight: bold'

    //-------------- input: tên, đơn giá hiện tại và đơn giá mới
    var Input_Ten_va_Don_gia_nhap = document.createElement("div")
    Input_Ten_va_Don_gia_nhap.className = "row"
    // Lây danh sách tên tivi
    var Input_Ten_san_pham = document.createElement("SELECT")
    Input_Ten_san_pham.setAttribute("id", "San_pham")
    Input_Ten_san_pham.id = "DS_Ten"
    Input_Ten_san_pham.style.cssText = 'font-size: 25px; margin-left: 200px'
    Input_Ten_va_Don_gia_nhap.appendChild(Input_Ten_san_pham)

    var Danh_sach_Tivi = Doc_Danh_sach_Tivi()
    var danh_sach = Danh_sach_Tivi.getElementsByTagName("Tivi")
    for(var i=0; i< danh_sach.length; i++){
        var Tivi = danh_sach[i];
        var Ten = Tivi.getAttribute("Ten");
        var option = document.createElement("option")
        var text = document.createTextNode(Ten)
        option.appendChild(text);
        Input_Ten_san_pham.appendChild(option)
    }
    // Input đơn giá mới
    Input_Don_gia_nhap_moi = document.createElement("input")
    Input_Don_gia_nhap_moi.style.cssText = 'font-size: 25px; margin-left: 100px; width:300px'
    Input_Don_gia_nhap_moi.id = "Gia_moi"
    Input_Don_gia_nhap_moi.type = "number"
    // Nút cập nhật
    var Nut_cap_nhap = document.createElement("button")
    Nut_cap_nhap.innerHTML = "Cập nhật"
    Nut_cap_nhap.className = 'btn btn-success'
    Nut_cap_nhap.style.cssText = 'margin-left: 40px; font-size: 25px; font-weight: bold'
    Nut_cap_nhap.onclick = function() {Cap_nhat_gia()};

    //-------- Nút quay về Quản lý nhập hàng
    Nut_Quay_ve = document.createElement("button")
    Nut_Quay_ve.innerHTML = "Quay về"
    Nut_Quay_ve.className = 'btn btn-success'
    Nut_Quay_ve.onclick = function() {Quay_ve()};
    Nut_Quay_ve.style.cssText = 'font-size: 25px; font-weight: bold; margin-left: 45%; margin-top: 100px'

    Ten_va_Don_gia_nhap.appendChild(Ten_san_pham)
    Ten_va_Don_gia_nhap.appendChild(Don_gia_nhap_moi)

    Input_Ten_va_Don_gia_nhap.appendChild(Input_Don_gia_nhap_moi)
    Input_Ten_va_Don_gia_nhap.appendChild(Nut_cap_nhap)

    Cap_nhat.appendChild(Ten_va_Don_gia_nhap)
    Cap_nhat.appendChild(Input_Ten_va_Don_gia_nhap)
    Cap_nhat.appendChild(Nut_Quay_ve)

    Xoa_Tat_ca_childNodes_Element(CUA_SO_KET_QUA)
    CUA_SO_KET_QUA.appendChild(Cap_nhat)
}

// Tạo sự kiện cập nhật
function Cap_nhat_gia(){
    var Thong_bao= ""   
    var Ten_tivi = document.getElementById("DS_Ten").value
    var Gia_moi = document.getElementById("Gia_moi").value
    if(Gia_moi == "")
        Thong_bao = "Hãy nhập thông tin đơn giá mới"
    else if(isNaN(parseFloat(Gia_moi)) == true)
        Thong_bao = "Số đã nhập không hợp lệ"
    else {      
        Thong_bao = "Cập nhật thành công"
        // Gửi dữ liệu cập nhật lên server:
        var Xu_ly_HTTP = new XMLHttpRequest();
        var Dia_chi_Dich_vu = "http://localhost:8888/"; // truyền tham số theo định dạng sau để thực hiện chức năng nhập hàng:
        var Tham_so = `ReqCode=QL_Nhap&Ten=${Ten_tivi}&Don_gia_Nhap=${Gia_moi}`;
        var Dia_chi_Xu_ly = `${Dia_chi_Dich_vu}?${Tham_so}`;
        Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly, false);
        Xu_ly_HTTP.send("");
    }
    document.getElementById("ThongBaoCapNhat").innerHTML=Thong_bao
}

// Tạo sự kiên quay về
function Quay_ve(){
    document.getElementById("quan_ly_nhap_hang").innerHTML = "QUẢN LÝ NHẬP HÀNG"
    Xoa_Tat_ca_childNodes_Element(CUA_SO_KET_QUA)    
     var Danh_sach_Tivi = Doc_Danh_sach_Tivi();
     var Th_Danh_sach_Tivi = Tao_Th_Danh_sach_Tivi(Danh_sach_Tivi);  
     CUA_SO_KET_QUA.appendChild(Th_Danh_sach_Tivi)
}
function Tao_nut_Xem(){
    var Nut_quay_ve = document.createElement("button")
    Nut_quay_ve.className = 'btn btn-success'
    Nut_quay_ve.innerHTML = "DANH SÁCH TV"
    Nut_quay_ve.id = "btn_quay_ve"
    Nut_quay_ve.onclick = function() {Quay_ve()}
    return Nut_quay_ve
}

// Tạo các nút chức năng
function Tao_nut_Sua(){
    var Nut_cap_nhat = document.createElement("button")
    Nut_cap_nhat.className = 'btn btn-success'
    Nut_cap_nhat.innerHTML = "SỬA GIÁ NHẬP"
    Nut_cap_nhat.id = "btn_cap_nhat"
    Nut_cap_nhat.onclick = function() {Xu_ly_cap_nhat()}
    return Nut_cap_nhat
}

function Tao_nut_Nhom_TV(Danh_sach_Tivi){ 
    var Nut_nhom_tivi = document.createElement("button")
    Nut_nhom_tivi.className = 'btn btn-success'
    Nut_nhom_tivi.innerHTML = "XEM NHÓM TV"
    Nut_nhom_tivi.id = "btn_nhom_tivi"
    Nut_nhom_tivi.onclick = function() {Nhom_Tivi(Danh_sach_Tivi)}
    return Nut_nhom_tivi
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
    var Tham_so="ReqCode=Lay_Du_lieu"
    var Dia_chi_Xu_ly=`${Dia_chi_Dich_vu}?${Tham_so}`
    Xu_ly_HTTP.open("GET", Dia_chi_Xu_ly, false);
    Xu_ly_HTTP.send("");

    var Chuoi_XML = Xu_ly_HTTP.responseText;
    var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement;
    Danh_sach_Tivi = Du_lieu.getElementsByTagName("Danh_sach_Tivi")[0];
    return Danh_sach_Tivi;
}
