const Employee = require("../lib/Employee");

test("creates a new Employee", () => {
  const name = "Wizeeee";
  const email = "wizeman22@outlook.com";
  const id = "55448";

  const employee = new Employee(name, id, email);

  expect(employee.name).toEqual(name);
  expect(employee.getRole()).toBe("Employee");
  expect(employee.email).toEqual(email);
  expect(employee.id).toEqual(id);
  expect(employee.getName()).toEqual(name);
});
