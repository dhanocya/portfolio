// GitHub का यूजरनाम (इसे आप बदल भी सकते हैं)
const UserName = "dhanocya";
const api_url = `https://api.github.com/users/${UserName}/repos?sort=updated`;

// HTML से प्रोजेक्ट दिखाने वाला div उठाया
const projectContainer = document.getElementById("project-container");

// यह फंक्शन GitHub API से आपके सारे प्रोजेक्ट्स लाएगा
async function fetchProjects() {
    try {
        // API को कॉल करके डेटा का इंतज़ार
        const response = await fetch(api_url);
        const repos = await response.json(); // डेटा को JSON में बदला

        // अगर कोई रिपॉजिटरी नहीं मिली तो मैसेज दिखाओ
        if (repos.length === 0) {
            projectContainer.innerHTML = "<p>No public repos found.</p>";
            return;
        }

        // पुराने कंटेंट को खाली करो
        projectContainer.innerHTML = "";

        // हर रिपॉजिटरी के लिए एक कार्ड बनाओ
        repos.forEach(repo => {
            // एक नया div बनाया जिसे 'project-card' क्लास दी
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card"); // यह क्लास हम CSS में स्टाइल करेंगे

            // कार्ड के अंदर का HTML कंटेंट
            projectCard.innerHTML = `
                <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
                <p>${repo.description || "No description available."}</p>
                <div class="repo-meta">
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
                    <span>${repo.language || "N/A"}</span>
                </div>
            `;

            // बने हुए कार्ड को HTML के main container में जोड़ दिया
            projectContainer.appendChild(projectCard);
        });

    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        projectContainer.innerHTML = '<p>Failed to load projects. Please try again.</p>';
    }
}

// जैसे ही वेबसाइट लोड हो, यह फंक्शन अपने-आप चल जाएगा
document.addEventListener("DOMContentLoaded", fetchProjects);
