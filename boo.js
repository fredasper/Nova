// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        // Extract student name from email
        const studentName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
        
        // Hide login page
        document.getElementById('loginPage').classList.add('hidden');
        
        // Show greeting popup
        showGreeting(studentName);
    }
}

// Show greeting popup
function showGreeting(name) {
    const greetingPopup = document.getElementById('greetingPopup');
    const greetingText = document.getElementById('greetingText');
    const greetingDescription = document.getElementById('greetingDescription');
    
    greetingText.textContent = `Welcome ${name}!`;
    greetingDescription.textContent = `I'm Nova, your AI student support assistant. Ask me anything about enrollment, schedules, and more!`;
    greetingPopup.classList.remove('hidden');
    
    // Show greeting for 3 seconds, then transition to dashboard
    setTimeout(() => {
        greetingPopup.classList.add('hidden');
        document.getElementById('dashboardPage').classList.remove('hidden');
        
        // Set user name in dashboard header
        document.getElementById('dashboardUserName').textContent = name;
        
        // Initialize chatbot with welcome message
        initializeChat();
    }, 3000);
}

// Handle logout
function handleLogout() {
    document.getElementById('dashboardPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('loginForm').reset();
    document.getElementById('chatWindow').innerHTML = '';
}

// Scroll to section with smooth animation
function scrollToSection(sectionId, event) {
    event.preventDefault();
    
    // Remove active class from all nav icons
    document.querySelectorAll('.nav-icon').forEach(icon => {
        icon.classList.remove('active');
    });
    
    // Add active class to clicked icon
    event.target.closest('.nav-icon').classList.add('active');
    
    // Scroll to section
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Toggle FAQ items
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('active');
}

// Initialize chat with welcome message
function initializeChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML = '';
    addMessage('Hello! 👋 I\'m Nova, your student support assistant. How can I help you today?', 'bot');
}

// Chat functionality
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const messageText = chatInput.value.trim();
    
    if (messageText) {
        addMessage(messageText, 'user');
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(messageText);
            addMessage(botResponse, 'bot');
        }, 500);
    }
}

// Handle chat input on Enter key
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Add message to chat window
function addMessage(text, sender) {
    const chatWindow = document.getElementById('chatWindow');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Simple bot responses
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('enroll') || message.includes('class')) {
        return 'To enroll in classes, log in to your student portal and navigate to Course Registration. Let me know if you need more help!';
    } else if (message.includes('schedule')) {
        return 'You can view your class schedule in the student portal under "My Schedule". Your classes run Monday to Friday.';
    } else if (message.includes('policy')) {
        return 'Our main policies include 85% attendance requirement, academic integrity, and professional conduct. Need more details?';
    } else if (message.includes('requirement') || message.includes('gpa')) {
        return 'Academic requirements include maintaining a 2.0 GPA, completing required credit hours, and finishing a capstone project.';
    } else if (message.includes('contact') || message.includes('support')) {
        return 'You can reach support via email (support@school.edu) or phone (555) 123-4567. Office hours: Mon-Fri, 9:00 AM - 5:00 PM.';
    } else if (message.includes('hello') || message.includes('hi')) {
        return 'Hello! 👋 I\'m Nova, your student assistant. How can I help you today?';
    } else {
        return 'That\'s a great question! I\'m here to help with enrollment, schedules, policies, and requirements. What would you like to know?';
    }
}

// Handle announcement item clicks
function handleAnnouncementClick(announcementId, event) {
    event.stopPropagation();
    // Optional: Add specific action for announcement click
    // For now, it just highlights the clicked announcement
    const items = document.querySelectorAll('.announcement-item');
    items.forEach(item => item.style.opacity = '0.6');
    event.target.closest('.announcement-item').style.opacity = '1';
    
    // Reset after 2 seconds
    setTimeout(() => {
        items.forEach(item => item.style.opacity = '1');
    }, 2000);
}

// ===== FOOTER LINKS FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const footerLinks = document.querySelectorAll('.footer-links-list a');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-footer-link');
            handleFooterLink(target);
        });
    });
});

// Handle footer link clicks
function handleFooterLink(linkTarget) {
    const supportData = {
        'css': {
            title: 'CSS Support',
            message: 'CSS (Customer Support Services) - For general student support and assistance. Contact: support@school.edu | Phone: (555) 123-4567'
        },
        'kins': {
            title: 'KINS Support',
            message: 'KINS (Health & Wellness Services) - For health, wellness, and counseling services. Office Hours: Mon-Fri, 9:00 AM - 5:00 PM'
        },
        'finance': {
            title: 'Finance Office',
            message: 'Finance - Tuition payments, billing inquiries, and financial aid. Website: student-finance.school.edu | Email: finance@school.edu'
        },
        'registrar': {
            title: 'Registrar',
            message: 'Registrar - Course registration, transcripts, and academic records. Available 24/7 through student portal.'
        },
        'hr-matters': {
            title: 'HR Matters',
            message: 'HR (Human Resources) - Employee benefits, payroll, and HR services. Contact: hr@school.edu | Ext: 2540'
        },
        'academic-records': {
            title: 'Academic Records',
            message: 'Academic Records - View grades, transcripts, and academic history. Access through student portal under "My Records".'
        },
        'privacy-notice': {
            title: 'Privacy Notice',
            message: 'Privacy Notice - Our institution is committed to protecting your personal information. Review our full privacy policy in the student portal.'
        }
    };
    
    const data = supportData[linkTarget];
    
    if (data) {
        // Show alert with support information
        alert(`${data.title}\n\n${data.message}`);
        
        // Optionally, you can also scroll to chatbot and add a message
        scrollToChatbot();
        setTimeout(() => {
            addMessage(`I'd like to know more about ${data.title}`, 'user');
            setTimeout(() => {
                addMessage(data.message, 'bot');
            }, 500);
        }, 300);
    }
}

// Helper function to scroll to chatbot section
function scrollToChatbot() {
    const chatbotSection = document.getElementById('chatbot');
    if (chatbotSection) {
        // Update nav icon active state
        document.querySelectorAll('.nav-icon').forEach(icon => {
            icon.classList.remove('active');
        });
        document.querySelectorAll('.nav-icon')[1].classList.add('active');
        
        chatbotSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}