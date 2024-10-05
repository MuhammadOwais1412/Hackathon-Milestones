const form = document.getElementById("resume-form") as HTMLFormElement
const resume = document.getElementById("resume") as HTMLDivElement

const shareableLinkContainer = document.getElementById("link-container") as HTMLDivElement
const shareableLinkElement = document.getElementById("link") as HTMLAnchorElement
const downloadPdfButton = document.getElementById("download") as HTMLButtonElement

// Handle form Submission
form.addEventListener("submit", (event:Event) => {
    event.preventDefault(); // prevent from page reload

    // collecting data
    const name = (document.getElementById("name") as HTMLInputElement).value
    const email = (document.getElementById("email") as HTMLInputElement).value
    const phone = (document.getElementById("phone") as HTMLInputElement).value
    const education= (document.getElementById("education") as HTMLInputElement).value
    const experience = (document.getElementById("experience") as HTMLInputElement).value
    const skills = (document.getElementById("skills") as HTMLInputElement).value


    // Create a username for unique URL (use name without spaces and lowercase)
    const username = name.replace(/\s+/g, '').toLowerCase();

    // Save form data in localStorage with the username as the key
    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills
    };

    localStorage.setItem(username, JSON.stringify(resumeData));

    // Generate the resume content dynamically
    const HTMLResume = `
    <h2>Editable Resume</h2>
    <h3>Personal Information:</h3>
    <p><b>Name:</b> <span contenteditable ="true">${name}</span></p>
    <p><b>Email:</b> <span contenteditable ="true">${email}</span></p>
    <p><b>Phone:</b> <span contenteditable ="true">${phone}</span></p>

    <h3>Education:</h3>
    <p contenteditable ="true"> ${education}</p>

    <h3>Experience:</h3>
    <p contenteditable ="true"> ${experience}</p>

    <h3>Skills:</h3>
    <p contenteditable ="true"> ${skills}</p>
    
    `;

    // Display the Generated Resume
    resume.innerHTML = HTMLResume;


    // Generate a shareable URL with the username as a query parameter
    const shareableURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(username)}`;

    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;

})

// Handle PDF download

downloadPdfButton.addEventListener("click", () => {
    window.print()  // This will open the print dialog and allow the user to save as PDF
})

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);

        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;

            // Automatically display the saved resume
            const resumeHTML = `
                <h2>Editable Resume</h2>
                <h3>Personal Information</h3>
                <p><b>Name:</b> <span contenteditable="true">${resumeData.name}</span></p>
                <p><b>Email:</b> <span contenteditable="true">${resumeData.email}</span></p>
                <p><b>Phone:</b> <span contenteditable="true">${resumeData.phone}</span></p>
                <h3>Education</h3>
                <p contenteditable="true">${resumeData.education}</p>
                <h3>Experience</h3>
                <p contenteditable="true">${resumeData.experience}</p>
                <h3>Skills</h3>
                <p contenteditable="true">${resumeData.skills}</p>
            `;
            resume.innerHTML = resumeHTML;

            // Display the shareable link with the correct username
            const shareableURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(username)}`;
            shareableLinkContainer.style.display = 'block';
            shareableLinkElement.href = shareableURL;
            shareableLinkElement.textContent = shareableURL;
        }
    }
});
