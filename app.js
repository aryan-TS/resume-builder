document.addEventListener('DOMContentLoaded', function() {
    // Initialize all sections on page load
    updateAchievements();
    updateExperience();
    updateEducation();
    updateProjects();
    updateSkills();

    // Set default profile picture
    const defaultImageUrl = 'default-profile.jpg'; //path to the default image
    const imagePreview = document.getElementById('image_dsp');
    imagePreview.src = defaultImageUrl;
    imagePreview.style.display = 'block'; // Show the default image preview

    // Delegate event listeners for dynamic elements using event delegation
    document.getElementById('Resume-form').addEventListener('keyup', generateResume);
    document.querySelector('.image').addEventListener('change', previewImage);

    // Event delegation for dynamically added achievement fields
    document.addEventListener('keyup', function(event) {
        if (event.target.matches('.achieve_title') || event.target.matches('.achieve_description')) {
            updateAchievements();
        }
    });

    // Event delegation for dynamically added experience fields
    document.addEventListener('keyup', function(event) {
        if (event.target.matches('.exp_title, .exp_organization, .exp_location, .exp_description')) {
            updateExperience();
        }
    });

    document.addEventListener('change', function(event) {
        if (event.target.matches('.exp_start_date, .exp_end_date')) {
            updateExperience();
        }
    });

    // Event delegation for dynamically added education fields
    document.addEventListener('keyup', function(event) {
        if (event.target.matches('.edu_school, .edu_degree, .edu_city, .edu_description')) {
            updateEducation();
        }
    });

    document.addEventListener('change', function(event) {
        if (event.target.matches('.edu_start_date, .edu_graduation_date')) {
            updateEducation();
        }
    });

    // Event delegation for dynamically added project fields
    document.addEventListener('keyup', function(event) {
        if (event.target.matches('.proj_title, .proj_link, .proj_description')) {
            updateProjects();
        }
    });

    // Event delegation for dynamically added skill fields
    document.addEventListener('keyup', function(event) {
        if (event.target.matches('.skill')) {
            updateSkills();
        }
    });

    // Setup listeners for add buttons
    document.querySelector('.repeater-add-btn-achievement').addEventListener('click', addAchievement);
    document.querySelector('.repeater-add-btn-experience').addEventListener('click', addExperience);
    document.querySelector('.repeater-add-btn-education').addEventListener('click', addEducation);
    document.querySelector('.repeater-add-btn-project').addEventListener('click', addProject);
    document.querySelector('.repeater-add-btn-skill').addEventListener('click', addSkill);
});

function generateResume() {
    // Personal details
    const firstName = document.querySelector('.firstname').value || '-';
    const middleName = document.querySelector('.middlename').value || '';
    const lastName = document.querySelector('.lastname').value || '-';
    const address = document.querySelector('.address').value || '-';
    const email = document.querySelector('.email').value || '-';
    const phoneNo = document.querySelector('.phoneno').value || '-';
    const summary = document.querySelector('.summary').value || '-';

    // Construct the full name and update the preview
    const fullName = `${firstName} ${middleName} ${lastName}`.trim();
    document.getElementById('fullname_dsp').textContent = fullName;
    document.getElementById('address_dsp').textContent = address;
    document.getElementById('email_dsp').textContent = email;
    document.getElementById('phoneno_dsp').textContent = phoneNo;
    document.getElementById('summary_dsp').textContent = summary;
}

function previewImage() {
    const input = document.querySelector('.image');
    const imagePreview = document.getElementById('image_dsp');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block'; // Show the image preview
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function updateAchievements() {
    const achievementsDisplay = document.getElementById('achievements_dsp');
    achievementsDisplay.innerHTML = ''; // Clear the display area

    document.querySelectorAll('.Resume-form-row-achievement').forEach(achievement => {
        const title = achievement.querySelector('.achieve_title').value.trim();
        const description = achievement.querySelector('.achieve_description').value.trim();

        if (title || description) {
            const entry = document.createElement('div');
            entry.classList.add('achievement-entry');
            entry.innerHTML = `<strong>${title}</strong>: ${description}`;
            achievementsDisplay.appendChild(entry);
        }
    });
}

function addAchievement() {
    const container = document.getElementById('resume-achievements-section');
    const newAchievement = document.createElement('div');
    newAchievement.classList.add('Resume-form-row', 'Resume-form-row-achievement');
    newAchievement.innerHTML = `
        <div class="cols-2">
            <div class="form-elem">
                <label class="form-label">Title</label>
                <input type="text" class="form-control achieve_title" placeholder="Achievement Title">
            </div>
            <div class="form-elem">
                <label class="form-label">Description</label>
                <textarea class="form-control achieve_description" placeholder="Details"></textarea>
            </div>
        </div>
        <button type="button" class="repeater-remove-btn" onclick="removeAchievement(this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;
    container.appendChild(newAchievement);
}

function removeAchievement(button) {
    button.closest('.Resume-form-row-achievement').remove();
    updateAchievements(); // Update list after removal
}

function updateExperience() {
    const experiences = document.querySelectorAll('.exp_title');
    let experiencesHtml = '';

    experiences.forEach((experience, index) => {
        const title = experience.value;
        const company = document.querySelectorAll('.exp_organization')[index].value;
        const location = document.querySelectorAll('.exp_location')[index].value;
        const startDate = document.querySelectorAll('.exp_start_date')[index].value;
        const endDate = document.querySelectorAll('.exp_end_date')[index].value;
        const description = document.querySelectorAll('.exp_description')[index].value;

        if (title) {
            experiencesHtml += `<div><strong>${title}</strong> at ${company}, ${location} from ${startDate} to ${endDate}<br>${description}</div>`;
        }
    });

    document.getElementById('experiences_dsp').innerHTML = experiencesHtml;
}

function updateEducation() {
    const educations = document.querySelectorAll('.edu_school');
    let educationsHtml = '';

    educations.forEach((education, index) => {
        const school = education.value;
        const degree = document.querySelectorAll('.edu_degree')[index].value;
        const city = document.querySelectorAll('.edu_city')[index].value;
        const startDate = document.querySelectorAll('.edu_start_date')[index].value;
        const graduationDate = document.querySelectorAll('.edu_graduation_date')[index].value;
        const description = document.querySelectorAll('.edu_description')[index].value;

        if (school) {
            educationsHtml += `<div>${degree} from ${school}, ${city} from ${startDate} to ${graduationDate}<br>${description}</div>`;
        }
    });

    document.getElementById('educations_dsp').innerHTML = educationsHtml;
}

function updateProjects() {
    const projects = document.querySelectorAll('.proj_title');
    let projectsHtml = '';

    projects.forEach((project, index) => {
        const title = project.value;
        const link = document.querySelectorAll('.proj_link')[index].value;
        const description = document.querySelectorAll('.proj_description')[index].value;

        if (title) {
            projectsHtml += `<div><strong>${title}</strong>: ${description}<br>Link: <a href="https://${link}" target="_blank" rel="noopener noreferrer">${link}</a></div>`;
        }
    });

    document.getElementById('projects_dsp').innerHTML = projectsHtml;
}

function updateSkills() {
    const skills = document.querySelectorAll('.skill');
    let skillsHtml = '';

    skills.forEach((skill) => {
        const skillName = skill.value;
        if (skillName) {
            skillsHtml += `<span>${skillName}</span><br>`;
        }
    });

    document.getElementById('skills_dsp').innerHTML = skillsHtml;
}

function addExperience() {
    const container = document.getElementById('resume-experiences-section');
    const newExperience = document.createElement('div');
    newExperience.classList.add('Resume-form-row', 'Resume-form-row-experience');
    newExperience.innerHTML = `
        <div class="cols-2">
            <div class="form-elem">
                <label class="form-label">Title</label>
                <input type="text" class="form-control exp_title" placeholder="Experience Title">
            </div>
            <div class="form-elem">
                <label class="form-label">Organization</label>
                <input type="text" class="form-control exp_organization" placeholder="Organization">
            </div>
            <div class="form-elem">
                <label class="form-label">Location</label>
                <input type="text" class="form-control exp_location" placeholder="Location">
            </div>
            <div class="form-elem">
                <label class="form-label">Start Date</label>
                <input type="date" class="form-control exp_start_date">
            </div>
            <div class="form-elem">
                <label class="form-label">End Date</label>
                <input type="date" class="form-control exp_end_date">
            </div>
            <div class="form-elem">
                <label class="form-label">Description</label>
                <textarea class="form-control exp_description" placeholder="Details"></textarea>
            </div>
        </div>
        <button type="button" class="repeater-remove-btn" onclick="removeExperience(this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;
    container.appendChild(newExperience);
}

function removeExperience(button) {
    button.closest('.Resume-form-row-experience').remove();
    updateExperience(); // Update list after removal
}

function addEducation() {
    const container = document.getElementById('resume-education-section');
    const newEducation = document.createElement('div');
    newEducation.classList.add('Resume-form-row', 'Resume-form-row-education');
    newEducation.innerHTML = `
        <div class="cols-2">
            <div class="form-elem">
                <label class="form-label">School</label>
                <input type="text" class="form-control edu_school" placeholder="School">
            </div>
            <div class="form-elem">
                <label class="form-label">Degree</label>
                <input type="text" class="form-control edu_degree" placeholder="Degree">
            </div>
            <div class="form-elem">
                <label class="form-label">City</label>
                <input type="text" class="form-control edu_city" placeholder="City">
            </div>
            <div class="form-elem">
                <label class="form-label">Start Date</label>
                <input type="date" class="form-control edu_start_date">
            </div>
            <div class="form-elem">
                <label class="form-label">Graduation Date</label>
                <input type="date" class="form-control edu_graduation_date">
            </div>
            <div class="form-elem">
                <label class="form-label">Description</label>
                <textarea class="form-control edu_description" placeholder="Details"></textarea>
            </div>
        </div>
        <button type="button" class="repeater-remove-btn" onclick="removeEducation(this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;
    container.appendChild(newEducation);
}

function removeEducation(button) {
    button.closest('.Resume-form-row-education').remove();
    updateEducation(); // Update list after removal
}

function addProject() {
    const container = document.getElementById('resume-projects-section');
    const newProject = document.createElement('div');
    newProject.classList.add('Resume-form-row', 'Resume-form-row-project');
    newProject.innerHTML = `
        <div class="cols-2">
            <div class="form-elem">
                <label class="form-label">Title</label>
                <input type="text" class="form-control proj_title" placeholder="Project Title">
            </div>
            <div class="form-elem">
                <label class="form-label">Link</label>
                <input type="text" class="form-control proj_link" placeholder="Link">
            </div>
            <div class="form-elem">
                <label class="form-label">Description</label>
                <textarea class="form-control proj_description" placeholder="Details"></textarea>
            </div>
        </div>
        <button type="button" class="repeater-remove-btn" onclick="removeProject(this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;
    container.appendChild(newProject);
}

function removeProject(button) {
    button.closest('.Resume-form-row-project').remove();
    updateProjects(); // Update list after removal
}

function addSkill() {
    const container = document.getElementById('resume-skills-section');
    const newSkill = document.createElement('div');
    newSkill.classList.add('Resume-form-row', 'Resume-form-row-skill');
    newSkill.innerHTML = `
        <div class="cols-1">
            <div class="form-elem">
                <label class="form-label">Skill</label>
                <input type="text" class="form-control skill" placeholder="Skill">
            </div>
        </div>
        <button type="button" class="repeater-remove-btn" onclick="removeSkill(this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
    `;
    container.appendChild(newSkill);
}

function removeSkill(button) {
    button.closest('.Resume-form-row-skill').remove();
    updateSkills(); // Update list after removal
}

function printResume() {
    window.print();
}


