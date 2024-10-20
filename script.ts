
// Get references to the form and display area
const resumeForm = document.getElementById('resumeForm');
const resumedisplayelement = document.getElementById('resume-display');
const shareablelinkContainer = document.getElementById('shareable-link-container');
const shareablelinkElement = document.getElementById('shareable-link');
const downloadpdfButton = document.getElementById('download-pdf');

// Handle form submission
resumeForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent page reload
  // Collect input values
  const username = (document.getElementById('username')as HTMLInputElement).value;
  const name = (document.getElementById('name')as HTMLInputElement).value;
  const email = (document.getElementById('email')as HTMLInputElement).value;
  const phone = (document.getElementById('phone')as HTMLInputElement).value;
  const education = (document.getElementById('education')as HTMLInputElement).value;
  const experience = (document.getElementById('experience')as HTMLInputElement).value;
  const skills = (document.getElementById('skills')as HTMLInputElement).value;

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
  const resumeHTML = `
    <h2>Editable Resume</h2>
    <h3>Personal Information</h3>
    <p><b>Name:</b> <span contenteditable="true">${name}</span></p>
    <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
    <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
    <h3>Education</h3>
    <p contenteditable="true">${education}</p>
    <h3>Experience</h3>
    <p contenteditable="true">${experience}</p>
    <h3>Skills</h3>
    <p contenteditable="true">${skills}</p>
  `;
  
  resumedisplayelement.innerHTML = resumeHTML;

  // Generate a shareable URL with the username only
  const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;
  // Display the shareable link
  shareablelinkContainer.style.display = 'block';
  shareablelinkElement.href = shareableURL;
  shareablelinkElement.textContent = shareableURL;
});

// Handle PDF download
downloadpdfButton.addEventListener('click', () => {
  window.print(); // This will open the print dialog and allow the user to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  
  if (username) {
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);
      (document.getElementById('username')as HTMLInputElement).value = username;
      (document.getElementById('name')as HTMLInputElement).value = resumeData.name;
      (document.getElementById('email')as HTMLInputElement).value = resumeData.email;
      (document.getElementById('phone')as HTMLInputElement).value = resumeData.phone;
      (document.getElementById('education')as HTMLInputElement).value = resumeData.education;
      (document.getElementById('experience')as HTMLInputElement).value = resumeData.experience;
      (document.getElementById('skills')as HTMLInputElement).value = resumeData.skills;
    }
  }
});
