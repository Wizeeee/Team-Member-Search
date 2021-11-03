const Manager = require("../lib/Manager");

test("creates a new Manager", () => {
  const officeNumber = "251";

  const manager = new Manager(
    "David",
    "655856",
    "david123@gmail.com",
    officeNumber
  );

  expect(manager.getRole()).toBe("Manager");
  expect(manager.officeNumber).toBe(officeNumber);
  expect(manager.getOfficeNumber()).toBe(officeNumber);
});
