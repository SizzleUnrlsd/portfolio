const { typeText, createProjectElement, displayProjects, animateTitle } = require('./yourFile.js');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

global.document = new JSDOM('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

describe("Portfolio tests", () => {
    test("typeText function", () => {
        typeText();
  });

    test("createProjectElement function", () => {
        const project = {
            name: 'Test project',
            img: 'assets/test_image.jpg',
            link: 'https://github.com/test/test-project'
        };
        const projectElement = createProjectElement(project);
        expect(projectElement.href).toBe(project.link);
        expect(projectElement.querySelector('img').src).toBe(project.img);
        expect(projectElement.querySelector('h2').textContent).toBe(project.name);
    });

    test("displayProjects function", () => {
        displayProjects();
    });

    test("animateTitle function", () => {
        animateTitle();
    });
});
