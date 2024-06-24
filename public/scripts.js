document.addEventListener('DOMContentLoaded', function() {
    loadCourses();

    document.getElementById('login-icon').addEventListener('click', function() {
        window.location.href = '/login.html';
    });
});

function loadCourses() {
    fetch('/courses')
        .then(response => response.json())
        .then(data => {
            const coursesDiv = document.getElementById('course-list');
            data.forEach(course => {
                const courseDiv = document.createElement('div');
                courseDiv.className = 'course-card';
                const date = new Date(course.time);
                const options = { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' };
                const formattedDate = date.toLocaleDateString('zh-TW', options);
                courseDiv.innerHTML = `
                    <h3><a href="/course-details.html?id=${course.id}">${course.course}</a></h3>
                    <p>${formattedDate}</p>
                    <p>${course.teacher}</p>
                    <p>${course.location}</p>
                `;
                coursesDiv.appendChild(courseDiv);
            });
        });
}
