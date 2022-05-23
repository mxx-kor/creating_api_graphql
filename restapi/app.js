//express 모듈 불러오기
const express = require("express");
const { add } = require("nodemon/lib/rules");
//express 사용
const app = express();
const port = 8080; 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
    { id: 1, name: "유저1" },
    { id: 2, name: "유저2" },
    { id: 3, name: "유저3" }
];

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/users", (req, res) => {
    res.json({ok: true, users: users});
})

//http://localhost:8080/api/users/user?user_id=1 이러한 방식으로 조건부로 쿼리를 찾아올 수 있다.
app.get("/api/users/user", (req, res) => {
    const user_id =  req.query.user_id
    const user =  users.filter(data => data.id == user_id);

    res.json({ok: false, user: user})
})

//데이터의 body를 가져온다
app.get("/api/users/userBody", (req, res) => {
    const user_id = req.body.user_id
    const user = users.filter(data => data.id == user_id);

    res.json({ok: false, user: user})
})

// 보편적으로 많이 사용하는 params를 이용하는 방법
app.get("/api/users/:user_id", (req, res) => {
    const user_id = req.params.user_id
    const user = users.filter(data => data.id == user_id);

    res.json({ok: true, user: user})
})
// http listen port 생성 서버 실행
app.listen(port, () => console.log(`http://localhost:${port}`));