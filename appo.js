const repositoriesContainer = document.getElementById('repositories');
const paginationContainer = document.getElementById('pagination');
let currentPage = 1;
let perPage = 10;

async function fetchRepositories() {
    const username = document.getElementById('username').value;
    perPage = parseInt(document.getElementById('perPage').value);
    
    // Clear previous results and pagination
    repositoriesContainer.innerHTML = '';
    paginationContainer.innerHTML = '';

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${perPage}`);
        const repositories = await response.json();

        repositories.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            repositoriesContainer.appendChild(repoElement);
        });

        // Add pagination
        const totalPages = Math.ceil(repositories.length / perPage);
        createPagination(totalPages);
    } catch (error) {
        repositoriesContainer.innerHTML = 'Error fetching repositories. Please check the username and try again.';
    }
}

function createPagination(totalPages) {
    const pagination = document.getElementById('pagination');

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('span');
        pageLink.innerHTML = `<a href="#" onclick="changePage(${i})">${i}</a>`;
        pagination.appendChild(pageLink);
    }
}

function changePage(newPage) {
    currentPage = newPage;
    fetchRepositories();
}
