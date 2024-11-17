// MOCK TESTING FOR INDEXED DB
import { test, expect } from "@playwright/test";

// Mock application data
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
  // Before each test, set up an HTML where IndexedDB can be used
  test.beforeEach(async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/frontend/pages/homepage.html");
  });

  test("Opens database successfully", async ({ page }) => {
    const db = await page.evaluate(async () => {
      const appDB = new window.Database("ApplicationsDB");
      return await appDB.openDB();
    });
    expect(db).toBeDefined();
  });

  test("Adds an application to the database", async ({ page }) => {
    const result = await page.evaluate(async (mockAppl1) => {
      const appDB = new window.Database("ApplicationsDB");
      await appDB.openDB();
      return await appDB.addApp(mockAppl1);
    }, mockAppl1);
    expect(result).toBe("Application added successfully!");
  });

  test("Retrieves all applications from the database", async ({ page }) => {
    const result = await page.evaluate(async (mockAppl1, mockAppl2) => {
      const appDB = new window.Database("ApplicationsDB");
      await appDB.openDB();
      await appDB.addApp(mockAppl1);
      await appDB.addApp(mockAppl2);
      return await appDB.getApps();
    }, mockAppl1, mockAppl2);
    expect(result).toEqual([mockAppl1, mockAppl2]);
  });

  test("Retrieves a single application by ID", async ({ page }) => {
    const result = await page.evaluate(async (mockAppl1) => {
      const appDB = new window.Database("ApplicationsDB");
      await appDB.openDB();
      await appDB.addApp(mockAppl1);
      return await appDB.getAppByID(mockAppl1.id);
    }, mockAppl1);
    expect(result).toEqual(mockAppl1);
  });

  test("Updates an application in the database", async ({ page }) => {
    const updatedAppl = {
      id: 1,
      company: "Google",
      position: "Senior Software Engineer",
      description: "Updated job description."
    };

    const result = await page.evaluate(async (mockAppl1, updatedAppl) => {
      const appDB = new window.Database("ApplicationsDB");
      await appDB.openDB();
      await appDB.addApp(mockAppl1);
      await appDB.updateApp(mockAppl1.id, updatedAppl);
      return await appDB.getAppByID(mockAppl1.id);
    }, mockAppl1, updatedAppl);

    expect(result).toEqual(updatedAppl);
  });

  test("Deletes an application from the database", async ({ page }) => {
    const result = await page.evaluate(async (mockAppl1) => {
      const appDB = new window.Database("ApplicationsDB");
      await appDB.openDB();
      await appDB.addApp(mockAppl1);
      await appDB.deleteApp(mockAppl1.id);
      return await appDB.getApps();
    }, mockAppl1);
    expect(result).toEqual([]); // Expect no applications to remain
  });
});
