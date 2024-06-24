document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('manage-courses-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const courseId = document.getElementById('course-id').value;
        const courseName = document.getElementById('course-name').value;
        const courseTeacher = document.getElementById('course-teacher').value;
        const courseTime = document.getElementById('course-time').value;
        const courseLocation = document.getElementById('course-location').value;
        const courseDescription = document.getElementById('course-description').value;
        const courseImage = document.getElementById('course-image').value;

        const course = {
            id: courseId ? parseInt(courseId) : Date.now(),
            course: courseName,
            teacher: courseTeacher,
            time: courseTime,
            location: courseLocation,
            description: courseDescription,
            image: courseImage
        };

        fetch('/manage-courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: 'admin', password: 'adminpass', course })
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            window.location.reload();
        })
        .catch(error => console.error('Error:', error));
    });
});
