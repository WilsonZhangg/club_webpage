document.getElementById('delete-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('delete-username').value;

    fetch('/delete-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('使用者資料刪除成功');
        } else {
            alert('刪除失敗，請稍後再試');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('發生錯誤，請稍後再試');
    });
});
