//express 모듈 불러오기
const express = require("express");
//express 사용
const app = express();
const port = 3000; 

app.get("/", (req, res) => {
    res.send("Hello World");
});
  
// http listen port 생성 서버 실행
app.listen(port, () => console.log(`http://localhost:${port}`));