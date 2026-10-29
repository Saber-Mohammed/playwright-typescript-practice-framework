import {expect, type Locator, type Page } from '@playwright/test';
export class NewUserPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailAddress: Locator;
    readonly countryOfResidence: Locator;
    readonly title: Locator;
    readonly dob: Locator;
    readonly doj: Locator;
    readonly countryCode: Locator;
    readonly phoneNumber: Locator;
    readonly prefCommEmail: Locator;
    readonly prefCommPhone: Locator;
    readonly clearButton: Locator;
    readonly submitButton: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
    this.page = page;
    // Text inputs
    this.firstNameInput = page.locator('[data-testid="forms-first-name"]');
    this.lastNameInput = page.locator('[data-testid="forms-last-name"]');
    this.emailAddress = page.locator('[data-testid="forms-email"]');

    // Dropdowns
    this.countryOfResidence = page.locator('[data-testid="forms-country"]');
    this.title = page.locator('[data-testid="forms-title"]');
    this.countryCode = page.locator('[data-testid="forms-phone-code"]');

    // Date inputs
    this.dob = page.locator('#forms-dob');
    this.doj = page.locator('[data-testid="forms-doj"]');

    // Phone number
    this.phoneNumber = page.locator('[data-testid="forms-phone-number"]');

    // Communication preferences
    this.prefCommEmail = page.locator('[data-testid="forms-comm-email"]');
    this.prefCommPhone = page.locator('[data-testid="forms-comm-phone"]');

    // Buttons
    this.clearButton = page.locator('[data-testid="forms-clear"]');
    this.submitButton = page.locator('[data-testid="forms-submit"]');
    this.successMessage = page.locator('[data-testid="forms-success"]');
    }

    // Navigate to the New User Registration Form page
    async goTo() {
        await this.page.goto('https://www.qapractice.com/practice-forms');
    }
    
    // Fill the form with provided user data
    async fillForm(userData: { firstName: string; lastName: string; email: string; country: string; title: string; dob: string; doj: string; countryCode: string; phoneNumber: string; prefCommEmail: boolean; prefCommPhone: boolean }) {
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.emailAddress.fill(userData.email);
        await this.countryOfResidence.selectOption({ label: userData.country });
        await this.title.selectOption({ label: userData.title });
        await this.dob.fill(userData.dob);
        await this.doj.fill(userData.doj);
        await this.countryCode.selectOption({ label: userData.countryCode });
        await this.phoneNumber.fill(userData.phoneNumber);
        if (userData.prefCommEmail) {
            await this.prefCommEmail.check();
        } else {
            await this.prefCommEmail.uncheck();
        }
        if (userData.prefCommPhone) {
            await this.prefCommPhone.check();
        } else {
            await this.prefCommPhone.uncheck();
        }
    }
   
    // Submit the form
    async submitForm() {
        await this.submitButton.click();
    }
    
    // Verify that the success message is displayed after form submission
    async verifySuccessMessage() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successMessage)
      .toHaveText("Details Successfully Added!");
    }
}