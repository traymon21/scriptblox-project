import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as db from "./db";
import { InsertScript } from "../drizzle/schema";

describe("Scripts", () => {
  let testScriptId: number | undefined;
  const authorId = 1; // Assuming user with id 1 exists

  beforeAll(async () => {
    // Ensure database is initialized
    await db.getDb();
  });

  it("should create a script", async () => {
    const testData: InsertScript = {
      title: "Test Script",
      slug: "test-script",
      description: "A test script",
      content: "console.log('Hello, World!');",
      language: "javascript",
      authorId: authorId,
      isPublic: 1,
    };

    const result = await db.createScript(testData);
    expect(result).toBeDefined();
  });

  it("should get script by slug", async () => {
    const script = await db.getScriptBySlug("test-script");
    if (script) {
      testScriptId = script.id;
      expect(script.title).toBe("Test Script");
      expect(script.slug).toBe("test-script");
      expect(script.language).toBe("javascript");
    }
  });

  it("should search scripts", async () => {
    const result = await db.searchScripts("Test", undefined, 10, 0);
    expect(result).toBeDefined();
    expect(Array.isArray(result.scripts)).toBe(true);
  });

  it("should get all scripts", async () => {
    const result = await db.getAllScripts(10, 0);
    expect(result).toBeDefined();
    expect(Array.isArray(result.scripts)).toBe(true);
  });

  it("should increment script views", async () => {
    if (testScriptId) {
      const scriptBefore = await db.getScriptById(testScriptId);
      const viewsBefore = scriptBefore?.views || 0;

      await db.incrementScriptViews(testScriptId);

      const scriptAfter = await db.getScriptById(testScriptId);
      const viewsAfter = scriptAfter?.views || 0;

      expect(viewsAfter).toBe(viewsBefore + 1);
    }
  });

  it("should update a script", async () => {
    if (testScriptId) {
      const result = await db.updateScript(testScriptId, {
        title: "Updated Script",
        description: "Updated description",
      });
      expect(result).toBeDefined();
    }
  });

  it("should delete a script", async () => {
    if (testScriptId) {
      const result = await db.deleteScript(testScriptId);
      expect(result).toBeDefined();
    }
  });
});
