
//---------------------------Dịch vụ phụ, để tải mã của file css, js
var app = require('http')
var fs =require('fs')

app.createServer((Yeu_cau, Dap_ung) => {
    var   header_type = 'text/plain';               

    // Xử lý nếu Yeu_cau chỉ '/Load_scipt_KhachThamQ' thì load nội dung file xuli.js cua khach tham quan
    var Yeu_cau_url = Yeu_cau.url;

    if(Yeu_cau.url == '/Load_scipt_KhachThamQ')
    {
        header_type = 'text/javascript';  
        Duong_dan =  __dirname +  "/../../1512191_KhachThamQuan/2-Doi_tuong_va_Xu_ly/Xu_ly_3L.js"
    }
    else if(Yeu_cau.url == '/Load_css_KhachThamQ')
    {
        Duong_dan =  __dirname +  "/../../1512191_KhachThamQuan/1-Man_hinh_Giao_dien/style.css";
        header_type = 'text/css'
    }
    else if(Yeu_cau.url == '/Load_css_QLNhap')
    {
        Duong_dan =  __dirname +  "/../../1512351_QLNhap/1-Man_hinh_Giao_dien/style.css";
        header_type = 'text/css'
    }
   else  if(Yeu_cau.url == '/Load_scipt_QLNhap')
    {
        header_type = 'text/javascript';  
        Duong_dan =  __dirname +  "/../../1512351_QLNhap/2-Doi_tuong_va_Xu_ly/Xu_ly_3L.js"
    }
    else if(Yeu_cau.url == '/Load_css_QLBan')
    {
        Duong_dan =  __dirname +  "/../../1512191_QLBan/1-Man_hinh_Giao_dien/style.css";
        header_type = 'text/css'
    }
   else  if(Yeu_cau.url == '/Load_scipt_QLBan')
    {
        header_type = 'text/javascript';  
        Duong_dan =  __dirname +  "/../../1512191_QLBan/2-Doi_tuong_va_Xu_ly/Xu_ly_3L.js"
    }
    else if(Yeu_cau.url == '/Load_css_NVBan')
    {
        Duong_dan =  __dirname +  "/../../1512117_NVBan/1-Man_hinh_Giao_dien/style.css";
        header_type = 'text/css'
    }
   else  if(Yeu_cau.url == '/Load_scipt_NVBan')
    {
        header_type = 'text/javascript';  
        Duong_dan =  __dirname +  "/../../1512117_NVBan/2-Doi_tuong_va_Xu_ly/Xu_ly_3L.js"
    }
    else if(Yeu_cau.url == '/Load_css_NVNhap')
    {
        Duong_dan =  __dirname +  "/../../1512117_NVNhap/1-Man_hinh_Giao_dien/style.css";
        header_type = 'text/css'
    }
   else  if(Yeu_cau.url == '/Load_scipt_NVNhap')
    {
        header_type = 'text/javascript';  
        Duong_dan =  __dirname +  "/../../1512117_NVNhap/2-Doi_tuong_va_Xu_ly/Xu_ly_3L.js"
    }
    fs.readFile( Duong_dan, (err, data)=>{
        if (err) {
            // Xử lý phần tìm không thấy Dap_ungource ở Server
            console.log('==> Error: ' + err)
            console.log('==> Error 404: file not found ' + Dap_ung.url)
            
            // Set Header của Dap_ung thành 404 - Not found (thông báo lỗi hiển thị cho Client --> coi trong phần console của Browser nếu có lỗi)
            Dap_ung.writeHead(404, 'Not found')
            Dap_ung.end()
        } else {
            // Set Header cho Dap_ung (phần header_type đã được xử lý tính toán ở dòng code thứ 16 và 17)
            Dap_ung.setHeader('Content-type' , header_type);

            Dap_ung.end(data);
            console.log( Yeu_cau.url, header_type );
        }
    })
}).listen(9999, (err) => {
    if(err != null)
        console.log('==> Error: ' + err)
    else
        console.log('Server is starting at port 9999')
})