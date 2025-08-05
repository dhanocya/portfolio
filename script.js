const UserName = "dhanocya";
const api_url = `https://api.github.com/users/${UserName}/repos`;

const projectContainer = document.getElementById("project-container");

async function fetchProjects() {
    try {
        const response = await fetch(api_url);
        const repos = await response.json(); // Fixed: Added 'await'

        if (repos.length === 0) { // Fixed: Corrected 'lenth' to 'length'
            projectContainer.innerHTML = "<p>No public repos found.</p>"; // Fixed: Corrected 'pojectContainer'
            return;
        }

        projectContainer.innerHTML = ""; // Fixed: Corrected 'pojectContainer'

        repos.forEach(repo => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");

            projectCard.innerHTML = `<h3><a href="${repo.html_url}" target="_blank"> ${repo.name}</a></h3>
            <p>${repo.description || "No description available"}</p>
            <div class="repo-meta">
                <span>⭐ ${repo.stargazers_count}</span>
                <span> 🍴 ${repo.forks_count} </span>
                <span>${repo.language || "N/A"}</span>
            </div>`;

            projectContainer.appendChild(projectCard); // Fixed: Added this line to display the card
        });

    } catch (error) {
        console.error('Error fetching GitHub projects:', error); // Fixed: Changed 'console.clear' to 'console.error'
        projectContainer.innerHTML = '<p>Failed to load projects. Please try again.</p>';
    }
}

document.addEventListener("DOMContentLoaded", fetchProjects);