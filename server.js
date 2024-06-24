const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let courses = [
    { id: 1, time: '2024-06-24T09:00:00', course: 'Docker', teacher: '張老師', location: '101教室', description: '這是一門Docker課程。', image: 'docker.png' },
    { id: 2, time: '2024-06-24T10:00:00', course: '資料庫', teacher: '李老師', location: '102教室', description: '這是一門資料庫課程。', image: 'database.png' },
    { id: 3, time: '2024-06-24T11:00:00', course: '架網站', teacher: '王老師', location: '103教室', description: '這是一門架網站課程。', image: 'website.png' }
];

let users = {
    'admin': { password: 'adminpass', role: 'admin' }
};

let userProfiles = {
    'admin': { paymentStatus: true, name: '管理員', department: '資訊系', studentId: '0000' }
};

// 創建帳戶
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (users[username]) {
        res.json({ success: false, message: '此帳號已有人註冊' });
    } else {
        users[username] = { password, role: 'user' };
        userProfiles[username] = { paymentStatus: false, name: '', department: '', studentId: '' };
        res.json({ success: true });
    }
});

// 登入
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (users[username] && users[username].password === password) {
        res.json({ success: true, role: users[username].role, username: username });
    } else {
        res.json({ success: false });
    }
});

// 獲取使用者資料
app.get('/user-profile', (req, res) => {
    const username = req.query.username;
    const profile = userProfiles[username];
    if (profile) {
        res.json(profile);
    } else {
        res.status(404).send('User not found');
    }
});

// 修改使用者資料
app.post('/update-profile', (req, res) => {
    const { username, name, department, studentId } = req.body;
    if (userProfiles[username]) {
        userProfiles[username].name = name;
        userProfiles[username].department = department;
        userProfiles[username].studentId = studentId;
        res.json({ success: true });
    } else {
        res.status(404).send('User not found');
    }
});

// 修改繳費狀態
app.post('/update-payment-status', (req, res) => {
    const { username, paymentStatus } = req.body;
    if (userProfiles[username]) {
        userProfiles[username].paymentStatus = paymentStatus;
        res.json({ success: true });
    } else {
        res.status(404).send('User not found');
    }
});

// 刪除使用者資料
app.post('/delete-user', (req, res) => {
    const { username } = req.body;
    if (users[username]) {
        delete users[username];
        delete userProfiles[username];
        res.json({ success: true });
    } else {
        res.status(404).send('User not found');
    }
});

// 管理課程（新增或修改）
app.post('/manage-courses', (req, res) => {
    const { username, password, course } = req.body;
    if (users[username] && users[username].password === password && users[username].role === 'admin') {
        const index = courses.findIndex(c => c.id === course.id);
        if (index !== -1) {
            courses[index] = course;  // 更新現有課程
        } else {
            courses.push(course);    // 新增課程
        }
        res.send('Course updated successfully');
    } else {
        res.status(403).send('Unauthorized');
    }
});

// 獲取課程安排
app.get('/courses', (req, res) => {
    res.json(courses);
});

// 獲取課程詳細資訊
app.get('/course-details', (req, res) => {
    const courseId = parseInt(req.query.id);
    const course = courses.find(c => c.id === courseId);
    if (course) {
        res.json(course);
    } else {
        res.status(404).send('Course not found');
    }
});

// 啟動伺服器
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
