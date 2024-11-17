// MOCK TESTING FOR INDEXED DB
import {test, expect} from "@playwright/test";

const mockAppl1 = {
    id: 1,
    company: "Google",
    position: "Software Engineer",
    description: "This is a really great job because it's awesome."
};

const mockAppl2 = {
    id: 2,
    company: "Amazon",
    position: "Roboticist",
    description: "This is a really cool job. You get to work with robots."
};

test.describe("Test suite for Database", () => {

    // Before each test, set up an html where indexed DB can be used
    test.beforeEach(async ({page}) => {
        await page.goto("http://127.0.0.1:5500/frontend/pages/homepage.html");
    });

    test("Opens database successfully", async ({page}) => {
        const db = await page.evaluate(async () => {
            const appDB = new window.Database("ApplicationsDB");
            return await appDB.openDB();
          });
          expect(db).toBeDefined();
    });

    //TODO: test crud operations on mock data

});