;(() => {
    "use strict";

    const PAGE_TRANSITION_DELAY = 450;
    const PROJECT_TRANSITION_DELAY = 400;

    let pages = Array.from(document.querySelectorAll('[data-page-name]'));
    let indicators = Array.from(document.querySelectorAll('.indicator'));

    let activePage = document.querySelector('.page.active');

    let projects = Array.from(document.querySelectorAll('.project'));
    //projects.forEach((project) => {project.style.display = 'none'});
    let activeProjects = Array.from(document.querySelectorAll('.project.active'));
    //activeProjects.forEach((aP) => {aP.style.display = 'inline-block'});

    document.querySelector('.project-mover.right').addEventListener('click', projectRightMover);
    document.querySelector('.project-mover.left').addEventListener('click', projectLeftMover);

    document.querySelector('.next-page-handle').addEventListener('click', nextPage);
    indicators.forEach((indicator) => {
        indicator.addEventListener('click', changeToPage);
    });

    function nextPage(ev) {
        let nextPageName = this.getAttribute('data-next-page-name');
        pages.forEach((page) => {
            if(page.getAttribute('data-page-name') === nextPageName) {
                setNewPage(page);
            }
        })
    }

    function setNewPage(page) {
        activePage.classList.remove('active');
        if(page.getAttribute('data-is-end') === 'true') {
            document.querySelector('.next-page-handle').classList.add('hide');
        } else {
            document.querySelector('.next-page-handle').classList.remove('hide');
        }
        setTimeout(() => {
            page.classList.add('active');
            activePage = page;
            setNewCircle(pages.indexOf(page));
            try {
                let nextPageDetails = JSON.parse(page.getAttribute("data-next-page-details"));
                document.querySelector('[data-next-page-name]').setAttribute('data-next-page-name', nextPageDetails['name']);
                document.querySelector('#next-page-name').innerHTML = nextPageDetails['display'];
            } catch (ex) {
                // WHAT? NANI?
            }
        }, PAGE_TRANSITION_DELAY);
    }

    function setNewCircle(index) {
        document.querySelector('.indicator.active').classList.remove('active');
        indicators[index].classList.add('active');
    }

    function changeToPage(ev) {
        let index = indicators.indexOf(this);
        setNewCircle(index);
        setNewPage(pages[index]);
    }

    function projectRightMover(ev) {
        // Get the second active project
        let firstActiveProject = activeProjects[1];

        let index = projects.indexOf(firstActiveProject);
        if(index === projects.length - 1) {
            return;
        }

        let newProject = projects[index + 1];
        projects[index - 1].classList.remove('active');
        newProject.classList.add('active');
        setTimeout(() => {
            activeProjects = Array.from(document.querySelectorAll('.project.active'));
        }, PROJECT_TRANSITION_DELAY);
    }

    function projectLeftMover(ev) {
        let lastActiveProject = activeProjects[0];

        let index = projects.indexOf(lastActiveProject);
        if(index === 0) {
            return;
        }

        let newProject = projects[index - 1];
        projects[index + 1].classList.remove('active');
        newProject.style.display = 'inline-block';
        newProject.classList.add('active');
        setTimeout(() => {
            newProject.classList.add('active');
            activeProjects = Array.from(document.querySelectorAll('.project.active'));
        }, PROJECT_TRANSITION_DELAY);
    }
})();