var form = document.getElementById("resume-form");
var resume = document.getElementById("resume");
var shareableLinkContainer = document.getElementById("link-container");
var shareableLinkElement = document.getElementById("link");
var downloadPdfButton = document.getElementById("download");
// Handle form Submission
form.addEventListener("submit", function (event) {
    event.preventDefault(); // prevent from page reload
    // collecting data
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var education = document.getElementById("education").value;
    var experience = document.getElementById("experience").value;
    var skills = document.getElementById("skills").value;
    // Create a username for unique URL (use name without spaces and lowercase)
    var username = name.replace(/\s+/g, '').toLowerCase();
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    // Generate the resume content dynamically
    var HTMLResume = "\n    <h2>Editable Resume</h2>\n    <h3>Personal Information:</h3>\n    <p><b>Name:</b> <span contenteditable =\"true\">".concat(name, "</span></p>\n    <p><b>Email:</b> <span contenteditable =\"true\">").concat(email, "</span></p>\n    <p><b>Phone:</b> <span contenteditable =\"true\">").concat(phone, "</span></p>\n\n    <h3>Education:</h3>\n    <p contenteditable =\"true\"> ").concat(education, "</p>\n\n    <h3>Experience:</h3>\n    <p contenteditable =\"true\"> ").concat(experience, "</p>\n\n    <h3>Skills:</h3>\n    <p contenteditable =\"true\"> ").concat(skills, "</p>\n    \n    ");
    // Display the Generated Resume
    resume.innerHTML = HTMLResume;
    // Generate a shareable URL with the username as a query parameter
    var shareableURL = "".concat(window.location.origin).concat(window.location.pathname, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener("click", function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
            // Automatically display the saved resume
            var resumeHTML = "\n                <h2>Editable Resume</h2>\n                <h3>Personal Information</h3>\n                <p><b>Name:</b> <span contenteditable=\"true\">".concat(resumeData.name, "</span></p>\n                <p><b>Email:</b> <span contenteditable=\"true\">").concat(resumeData.email, "</span></p>\n                <p><b>Phone:</b> <span contenteditable=\"true\">").concat(resumeData.phone, "</span></p>\n                <h3>Education</h3>\n                <p contenteditable=\"true\">").concat(resumeData.education, "</p>\n                <h3>Experience</h3>\n                <p contenteditable=\"true\">").concat(resumeData.experience, "</p>\n                <h3>Skills</h3>\n                <p contenteditable=\"true\">").concat(resumeData.skills, "</p>\n            ");
            resume.innerHTML = resumeHTML;
            // Display the shareable link with the correct username
            var shareableURL = "".concat(window.location.origin).concat(window.location.pathname, "?username=").concat(encodeURIComponent(username));
            shareableLinkContainer.style.display = 'block';
            shareableLinkElement.href = shareableURL;
            shareableLinkElement.textContent = shareableURL;
        }
    }
});
