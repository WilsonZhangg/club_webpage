const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
});

// 定義用戶和課程的 Schema 和 Model
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});

const courseSchema = new mongoose.Schema({
    id: Number,
    time: String,
    course: String,
    teacher: String,
    location: String,
    description: String,
    image: String
});

const User = mongoose.model('User', userSchema);
const Course = mongoose.model('Course', courseSchema);
