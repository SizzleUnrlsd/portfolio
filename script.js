const textElement = document.getElementById('portfolio-text');
const cursorElement = document.querySelector('.cursor');
const texts = ["Hugo's", "Sizzle's Portfolio"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let stopAnimation = false;

const projects = [
    { name: 'TekSH', img: 'assets/image1.jpg', link: 'https://github.com/SizzleUnrlsd/TekSH' },
    { name: 'TekOS', img: 'assets/image2.png', link: 'https://github.com/SizzleUnrlsd/TekOs' },
    { name: 'P-M', img: 'assets/image3.jpg', link: 'https://github.com/SizzleUnrlsd/Package-manager' },
    { name: 'J-P', img: 'assets/image4.png', link: 'https://github.com/SizzleUnrlsd/jason-parser' },
];

function typeText() {
    if (stopAnimation) return;

    const currentText = texts[textIndex];
    if (isDeleting) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeText, 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        if (textIndex === texts.length - 1) {
            textIndex = 0;
        } else {
            textIndex++;
        }
        setTimeout(typeText, 500);
    } else {
        const typingDelay = isDeleting ? 50 : 150;
        setTimeout(typeText, typingDelay);
    }
  
  const textContainer = document.querySelector('.text');
  textContainer.style.display = 'flex';
  textContainer.style.alignItems = 'center';
  textContainer.style.justifyContent = 'center';
}


function createProjectElement(project) {
    const projectLink = document.createElement('a');
    projectLink.href = project.link;
    projectLink.target = "_blank";
    projectLink.classList.add('project');

    const projectDiv = document.createElement('div');

    const img = document.createElement('img');
    img.src = project.img;
    img.alt = project.name;
    img.classList.add('project-img');

    const projectTitle = document.createElement('h2');
    projectTitle.textContent = project.name;
    projectTitle.classList.add('project-title');

    projectDiv.appendChild(img);
    projectDiv.appendChild(projectTitle);
    projectLink.appendChild(projectDiv);

    return projectLink;
}

function displayProjects() {
    stopAnimation = true;
    cursorElement.style.display = 'none';
    textElement.innerHTML = '';

    const projectContainer = document.createElement('div');
    projectContainer.classList.add('projects-container');

    let groupIndex = 0;
    const groupSize = 2;
    const animationDelay = 3000;

    function createProjectGroup() {
        const projectGroup = projects.slice(groupIndex, groupIndex + groupSize);

        projectGroup.forEach((project) => {
            const projectElement = createProjectElement(project);
            projectContainer.appendChild(projectElement);
        });

        groupIndex += groupSize;

            if (groupIndex < projects.length) {
                setTimeout(createProjectGroup, animationDelay);
            }
    }

    setTimeout(() => {
        createProjectGroup();
        textElement.appendChild(projectContainer);
    }, 1000);
}

function animateTitle() {
    const titleElement = document.createElement('h1');
    titleElement.classList.add('portfolio-title');
    titleElement.textContent = `
    _   _                   _       ____            _    __       _ _       
   | | | |_   _  __ _  ___ ( )___  |  _ \\ ___  _ __| |_ / _| ___ | (_) ___  
   | |_| | | | |/ _\` |/ _ \\|// __| | |_) / _ \\| '__| __| |_ / _ \\| | |/ _ \\ 
   |  _  | |_| | (_| | (_) | \\__ \\ |  __/ (_) | |  | |_|  _| (_) | | | (_) |
   |_| |_|\\__,_|\\__, |\\___/  |___/ |_|   \\___/|_|   \\__|_|  \\___/|_|_|\\___/ 
                |___/                                                       `;

    let isBlinking = true;
    let blinkOpacity = 1;
    let blinkDirection = -1;

    const blinkIntervalId = setInterval(() => {
        if (!isBlinking) return;

        if (blinkOpacity <= 0.3) blinkDirection = 1;
        if (blinkOpacity >= 1) blinkDirection = -1;

        blinkOpacity += 0.05 * blinkDirection;
        titleElement.style.opacity = blinkOpacity.toString();
    }, 100);

    const triggerPosition = 115;

    function updateTitleOpacity() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const scrollOpacity = Math.max(0, 1 - (scrollPosition / triggerPosition));

        if (scrollPosition > 0 && isBlinking) {
            isBlinking = false;
        } else if (scrollPosition === 0 && !isBlinking) {
            isBlinking = true;
        }

        titleElement.style.opacity = (isBlinking ? blinkOpacity : scrollOpacity).toString();
    }

    window.addEventListener('scroll', updateTitleOpacity);
    document.body.prepend(titleElement);

    updateTitleOpacity();
}

let isFirstClick = true;
let isCursorClicked = false;

document.addEventListener('click', function() {
    if (isFirstClick) {
        displayProjects();
        animateTitle();
        isFirstClick = false;
    } else if (!isCursorClicked) {
        isCursorClicked = true;
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

typeText();
