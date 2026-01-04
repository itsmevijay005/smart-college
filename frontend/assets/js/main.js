// Main JavaScript for handling navigation and interactions

// Store selected branch in session storage
function selectBranch(branchCode) {
    sessionStorage.setItem('selectedBranch', branchCode);
    // Map branch codes to full names
    const branchNames = {
        'cse': 'Computer Science & Engineering',
        'ece': 'Electronics & Communication',
        'eee': 'Electrical & Electronics',
        'civil': 'Civil Engineering',
        'mech': 'Mechanical Engineering',
        'it': 'Information Technology'
    };
    sessionStorage.setItem('branchName', branchNames[branchCode]);
    window.location.href = 'role.html';
}

// Display selected branch info on role page
function displayBranchInfo() {
    const branchName = sessionStorage.getItem('branchName');
    const branchInfo = document.getElementById('branchInfo');
    if (branchInfo && branchName) {
        branchInfo.textContent = `Branch: ${branchName}`;
    }
}

// Store selected role and redirect to appropriate login page
function selectRole(role) {
    const selectedBranch = sessionStorage.getItem('selectedBranch');
    sessionStorage.setItem('selectedRole', role);
    
    const loginPages = {
        'student': 'pages/student-login.html',
        'staff': 'pages/staff-login.html',
        'admin': 'pages/admin-login.html'
    };
    
    window.location.href = loginPages[role];
}

// Handle login form submission
function handleLogin(event, role) {
    event.preventDefault();
    
    // Get form data
    let loginData = {
        role: role,
        branch: sessionStorage.getItem('selectedBranch'),
        branchName: sessionStorage.getItem('branchName'),
        timestamp: new Date().toISOString()
    };
    
    if (role === 'student') {
        loginData.rollNumber = document.getElementById('roll').value;
        loginData.password = document.getElementById('password').value;
    } else if (role === 'staff') {
        loginData.employeeId = document.getElementById('empid').value;
        loginData.password = document.getElementById('password').value;
    } else if (role === 'admin') {
        loginData.adminId = document.getElementById('adminid').value;
        loginData.password = document.getElementById('password').value;
        loginData.department = document.getElementById('department').value;
    }
    
    // Store login data
    sessionStorage.setItem('loginData', JSON.stringify(loginData));
    
    // Show success message or redirect
    alert(`${role.charAt(0).toUpperCase() + role.slice(1)} login attempt submitted!`);
    
    // Here you would normally send data to backend
    console.log('Login Data:', loginData);
    
    // Redirect after login (demo behavior)
    setTimeout(function() {
        if (role === 'student') {
            window.location.href = 'student-dashboard.html';
        } else {
            // fallback demo redirect for other roles
            window.location.href = 'signin.html';
        }
    }, 600);
}

// Go back to previous page
function goBack() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'role.html') {
        window.location.href = 'branches.html';
    } else if (currentPage === 'branches.html') {
        window.location.href = 'signin.html';
    } else if (currentPage.includes('-login.html')) {
        window.location.href = '../role.html';
    } else {
        window.history.back();
    }
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'role.html') {
        displayBranchInfo();
    }
    
    // Add smooth transitions
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    // Press Escape to go back
    if (event.key === 'Escape') {
        goBack();
    }
});
