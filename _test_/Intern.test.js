const Intern = require("../lib/Intern");

test("creates a new Intern", () => {
  const school = "York School";

  const intern = new Intern("Ola", "552455", "olamade@gmail.com", school);

  expect(intern.getRole()).toBe("Intern");
  expect(intern.school).toBe(school);
  expect(intern.getSchool()).toBe(school);
});
