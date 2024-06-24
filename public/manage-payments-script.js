document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const paymentStatus = document.getElementById('payment-status').value === 'true';

    fetch('/update-payment-status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, paymentStatus })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('繳費狀態更新成功');
        } else {
            alert('更新失敗，請稍後再試');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('發生錯誤，請稍後再試');
    });
});
