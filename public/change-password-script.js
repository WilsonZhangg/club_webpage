document.getElementById('change-password-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('change-username').value;
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;

    fetch('/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, oldPassword, newPassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('密碼修改成功！');
            window.location.href = '/login.html';
        } else {
            alert('密碼修改失敗，請檢查帳號和密碼。');
        }
    })
    .catch(error => console.error('Error:', error));
});
