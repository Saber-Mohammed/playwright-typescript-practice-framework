
import { test } from "@playwright/test";
import { NewUserPage } from "../pages/NewUserPage";

test.describe("New User Registration Form", () => {
  let newUserPage: NewUserPage;

  test.beforeEach(async ({ page }) => {
    newUserPage = new NewUserPage(page);
  });

  test("Should register a new user", async ({ page }) => {
    
    await newUserPage.goTo();

    await newUserPage.fillForm({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@gmail.com",
      country: "United States",
      title: "Mr.",
      dob: "1990-01-01",
      doj: "10/11/2020",
      countryCode: "+91",
      phoneNumber: "1234567890",
      prefCommEmail: true,
      prefCommPhone: false,
    });

    await newUserPage.submitForm();
    
    await newUserPage.verifySuccessMessage();
  });
});