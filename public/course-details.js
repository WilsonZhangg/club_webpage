document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('id');

    fetch(`/course-details?id=${courseId}`)
        .then(response => response.json())
        .then(data => {
            const courseDetailsDiv = document.getElementById('course-details');
            const date = new Date(data.time);
            const options = { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' };
            const formattedDate = date.toLocaleDateString('zh-TW', options);
            courseDetailsDiv.innerHTML = `
                <div class="course-details-text">
                    <h2>${data.course}</h2>
                    <p>講者：${data.teacher}</p>
                    <p>時間：${formattedDate}</p>
                    <p>地點：${data.location}</p>
                    <p>介紹：${data.description}</p>
                </div>
                <img src="${data.image}" alt="${data.course}">
            `;
        });
});
