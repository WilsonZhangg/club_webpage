document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const username = params.get('username');

    const paymentStatusEl = document.getElementById('payment-status');
    const userNameEl = document.getElementById('user-name');
    const userDepartmentEl = document.getElementById('user-department');
    const userIdEl = document.getElementById('user-id');
    const editButton = document.getElementById('edit-button');
    const confirmButton = document.getElementById('confirm-button');

    fetch(`/user-profile?username=${username}`)
    .then(response => response.json())
    .then(data => {
        paymentStatusEl.innerText = data.paymentStatus ? '已繳費' : '未繳費';
        paymentStatusEl.style.color = data.paymentStatus ? 'black' : 'red';
        userNameEl.innerText = data.name;
        userDepartmentEl.innerText = data.department;
        userIdEl.innerText = data.studentId;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('發生錯誤，請稍後再試');
    });

    editButton.addEventListener('click', function() {
        userNameEl.innerHTML = `<input type="text" id="edit-name" class="user-profile-input" value="${userNameEl.innerText}">`;
        userDepartmentEl.innerHTML = `<input type="text" id="edit-department" class="user-profile-input" value="${userDepartmentEl.innerText}">`;
        userIdEl.innerHTML = `<input type="text" id="edit-id" class="user-profile-input" value="${userIdEl.innerText}">`;
        editButton.style.display = 'none';
        confirmButton.style.display = 'inline-block';
    });

    confirmButton.addEventListener('click', function() {
        const newName = document.getElementById('edit-name').value;
        const newDepartment = document.getElementById('edit-department').value;
        const newId = document.getElementById('edit-id').value;

        fetch('/update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, name: newName, department: newDepartment, studentId: newId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                userNameEl.innerText = newName;
                userDepartmentEl.innerText = newDepartment;
                userIdEl.innerText = newId;
                confirmButton.style.display = 'none';
                editButton.style.display = 'inline-block';
            } else {
                alert('更新失敗，請稍後再試');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('發生錯誤，請稍後再試');
        });
    });
});
