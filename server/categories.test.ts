import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as db from "./db";
import { InsertCategory } from "../drizzle/schema";

describe("Categories", () => {
  let testCategoryId: number | undefined;

  beforeAll(async () => {
    // Ensure database is initialized
    await db.getDb();
  });

  it("should create a category", async () => {
    const testData: InsertCategory = {
      name: "Test Category",
      slug: "test-category",
      description: "A test category",
      color: "#3b82f6",
      icon: "📝",
    };

    const result = await db.createCategory(testData);
    expect(result).toBeDefined();
  });

  it("should retrieve all categories", async () => {
    const categories = await db.getAllCategories();
    expect(Array.isArray(categories)).toBe(true);
  });

  it("should get category by slug", async () => {
    const category = await db.getCategoryBySlug("test-category");
    if (category) {
      testCategoryId = category.id;
      expect(category.name).toBe("Test Category");
      expect(category.slug).toBe("test-category");
    }
  });

  it("should update a category", async () => {
    if (testCategoryId) {
      const result = await db.updateCategory(testCategoryId, {
        name: "Updated Category",
        description: "Updated description",
      });
      expect(result).toBeDefined();
    }
  });

  it("should delete a category", async () => {
    if (testCategoryId) {
      const result = await db.deleteCategory(testCategoryId);
      expect(result).toBeDefined();
    }
  });
});
