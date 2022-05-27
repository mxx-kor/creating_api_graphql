//express 모듈 불러오기
const express = require("express");
//express 사용
const app = express();
const port = 8080; 

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const users = [
    { id: 1, name: "유저1" },
    { id: 2, name: "유저2" },
    { id: 3, name: "유저3" }
];

// get
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

// post
app.post("/api/users/add", (req, res) => {
    const { id, name } =  req.body
    const user = [...users, { id, name }];

    res.send(user);
})

app.post("/api/newthing", (req, res) => {
    const user4 = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(user4);
    res.send(user4);
})

// 현재의 시스템으로는 작동하지 않음, Postman, insomnia를 사용하는 방법이 편해보인다.
// put 
// postman을 사용해 body에 존재하는 id를 넣으면 수정이 가능함, put을 사용해 전체 수정가능
app.put("/api/users/update", (req, res) => {
    
    const { id, name } = req.body

    const user = users.map(data => {

        if(data.id == id) data.name = name

        return {
            id: data.id,
            name: data.name
        }
    })

    res.json({ok: true, users: user})
})

//patch
// 부분 수정 하지만 put과의 차이점이 있다.
 app.patch("/api/user/update/:user_id", (req, res) => {
    const { user_id } = req.params
    const { name } = req.body

    const user = users.map(data => {

        if(data.id == user_id) data.name = name

        return {
            id: data.id,
            name: data.name
        }
    })

    res.json({ok: true, users: user})
})

// delete
// 쿼리에 작성된 아이디를 제외한 새로운 배열을 리턴함
app.delete("/api/user/delete", (req, res) => {
    const user_id = req.query.user_id
    const user = users.filter(data => data.id != user_id );

    res.json({ok: true, users: user})
})

// http listen port 생성 서버 실행
app.listen(port, () => console.log(`http://localhost:${port}`));