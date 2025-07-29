// frontend/main.js

async function loadPosts() {
    try {
        const [usersRes, postsRes] = await Promise.all([
            fetch('http://localhost:3000/api/users'),
            fetch('http://localhost:3000/api/feed')
        ]);

        if (!usersRes.ok || !postsRes.ok) {
            console.error('Ошибка загрузки данных');
            return;
        }

        const users = await usersRes.json();
        const posts = await postsRes.json();

        const usersById = Object.fromEntries(users.map(u => [u.id, u]));
        const container = document.querySelector('.posts-container');
        container.innerHTML = '';

        posts.forEach(post => {
            const user = usersById[post.userId];
            if (!user) return; // пропускаем, если пользователь не найден

            const avatarSrc = user.avatar?.trim()
                ? user.avatar
                : '/public/default-avatar.png';

            const postHTML = `
                <article class="post">
                    <div class="post-header">
                        <img src="${avatarSrc}" alt="${user.username}">
                        <h2>${user.username}</h2>
                    </div>
                    <p class="post-text">${post.content}</p>
                    <div class="post-actions">
                        <button class="like-btn"><img src="/public/Heart.svg" alt=""><span>${post.likes || 0}</span></button>
                        <button class="comment-btn">Комментарии <span>${post.comments?.length || 0}</span></button>
                    </div>
                </article>
            `;
            container.insertAdjacentHTML('beforeend', postHTML);
        });
    } catch (err) {
        console.error('Ошибка при загрузке постов:', err);
    }
}

function updateHeaderForAuth() {
    const token = localStorage.getItem('token');
    const rightSide = document.querySelector('.right-side');

    if (token) {
        rightSide.innerHTML = `
            <a href='/frontend/index.html' id="logout-btn" style="all: --text-gray; unset; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                Выйти <img src="/public/arrow-in-right.svg" alt="">
            </a>
            <a href="/frontend/profile.html">
                <img src="/public/default-avatar.png" alt="Профиль" style="width: 32px; height: 32px; border-radius: 50%; cursor: pointer;">
            </a>
        `;

        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.removeItem('token');
            location.reload();
        });
    }
}

updateHeaderForAuth();
loadPosts();
