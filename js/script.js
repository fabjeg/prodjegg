document.addEventListener("DOMContentLoaded", () => {
    const homeSection = document.querySelector(".home");
    const projetsSection = document.querySelector("#section-projets");
    const btnGoToProjets = document.getElementById("goToProjets");
    const btnGoBack = document.getElementById("goBack");
    const projetsContainer = document.querySelector('.projets');

    const videos = [
        {
            id: 'FOPQcTXj5Bo',
            title: 'Ma première vidéo',
            description: 'Une démonstration de mon projet 1.'
        },
        {
            id: 'fT3RJVhjdPI',
            title: 'Deuxième projet',
            description: 'Présentation de mon second projet.'
        },
        {
            id: 'TkKVY7am_HM',
            title: 'Troisième projet',
            description: 'Présentation de mon troisième projet.'
        }
    ];

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const isSectionVisible = projetsSection.classList.contains("active");

            if (entry.isIntersecting && isSectionVisible) {
                entry.target.querySelector(".card__line")?.classList.add("animate-line");
                entry.target.querySelector(".card__content")?.classList.add("animate-content");
            }
        });
    }, { threshold: 0.2 });

    function creerModalVideo(videoId) {
        const modal = document.createElement('div');
        modal.classList.add('video-modal');
        modal.innerHTML = `
            <div class="video-modal__content">
                <button class="video-modal__close">&times;</button>
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&fs=1&modestbranding=1"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.video-modal__close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    function afficherVideos() {
        projetsContainer.innerHTML = '';

        videos.forEach(video => {
            const card = document.createElement('div');
            card.classList.add('card');

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('card__image-container');

            const img = document.createElement('img');
            img.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
            img.alt = 'Aperçu vidéo';
            img.classList.add('card__image');

            const playButton = document.createElement('div');
            playButton.classList.add('play-button');
            playButton.innerHTML = '▶';

            const ouvrirVideo = () => {
                creerModalVideo(video.id);
            };

            img.addEventListener('click', ouvrirVideo);
            playButton.addEventListener('click', ouvrirVideo);
            card.addEventListener('click', ouvrirVideo);

            imageContainer.appendChild(img);
            imageContainer.appendChild(playButton);

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('class', 'card__svg');
            svg.setAttribute('viewBox', '0 0 800 500');
            svg.innerHTML = `
                <path d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 
                         C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                      stroke="transparent" fill="#333" />
                <path class="card__line"
                      d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 
                         C 400 250 550 150 650 300 Q 750 450 800 400"
                      stroke="pink" stroke-width="3" fill="transparent" />
            `;

            const content = document.createElement('div');
            content.classList.add('card__content');
            content.innerHTML = `
                <h1 class="card__title">${video.title}</h1>
                <p>${video.description}</p>
            `;

            card.appendChild(imageContainer);
            card.appendChild(svg);
            card.appendChild(content);

            projetsContainer.appendChild(card);

            observer.observe(card);
        });
    }

    btnGoToProjets.addEventListener("click", () => {
        homeSection.classList.remove("active");
        projetsSection.classList.remove("hidden");

        setTimeout(() => {
            projetsSection.classList.add("active");
            afficherVideos();
        }, 50);
    });

    btnGoBack.addEventListener("click", () => {
        projetsSection.classList.remove("active");

        setTimeout(() => {
            projetsSection.classList.add("hidden");
            homeSection.classList.add("active");

            document.querySelectorAll('.card').forEach(card => {
                card.querySelector(".card__line")?.classList.remove("animate-line");
                card.querySelector(".card__content")?.classList.remove("animate-content");
                observer.unobserve(card);
            });

            projetsContainer.innerHTML = '';
        }, 800);
    });
});
