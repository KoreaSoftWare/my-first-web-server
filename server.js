// server.js
// 서버에 필요한 모듈을 가져온다.
var app = require('http').createServer(handler), 
    io = require('socket.io')(app),
    fs = require('fs');

// 서버 연결을 위한 포트 번호 설정
app.listen(3000);

// 파일을 불러 클라이언트에 보냄
function handler(req, res) {
    fs.readFile('index.html', 'utf8', function (err, data) {
        // 파일을 불러올 수 없는 경우 에러 메시지를 띄우며 응답종료
        if (err) { 
            // 1xx = (정보), 2xx = (성공), 3xx (리다이렉션), 4xx (클라이언트 오류), 5xx (서버 오류)
            res.writehead(500); 
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data); // 파일이 있을 경우 파일을 보내며 응답 종료
    });
}

// 연결 이벤트 발생 시 실행
io.on('connection', function(socket){
    // 클라이언트로 데이터를 보냄
    socket.emit('news', { serverData: "worked server" });
    
    // 로그인 이벤트
    socket.on('client login', function (data) {
        console.log(data);
    });

    // 연결 해제
    socket.on('disconnect', function () {
        console.log('Client Disconnected');
    });
});
