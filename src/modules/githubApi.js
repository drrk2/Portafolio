export async function syncGitHubContent() {
    const username = 'drrk2';
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const repos = await response.json();

        // If API fails or limit exceeded, we keep current (static) content as fallback
        if (!Array.isArray(repos)) return;

        projectsGrid.innerHTML = ''; // Clear static content

        repos.forEach(repo => {
            if (repo.fork) return; // Skip forks

            const card = document.createElement('div');
            card.className = 'glass-card project-card reveal-element';
            card.innerHTML = `
                <div class="project-header">
                    <div class="icon-3d">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    </div>
                    <h3 class="project-name">${repo.name}</h3>
                </div>
                <p class="project-desc">${repo.description || 'Enterprise-grade engineering solution and logic engine.'}</p>
                <div class="project-tags">
                    <span class="tag">${repo.language || 'Software'}</span>
                    <span class="tag">★ ${repo.stargazers_count}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" class="project-link">View Protocol →</a>
            `;
            projectsGrid.appendChild(card);
        });

    } catch (error) {
        console.error('GitHub Sync Failed:', error);
    }
}
