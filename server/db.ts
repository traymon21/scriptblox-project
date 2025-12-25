import { and, eq, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, categories, scripts, Category, InsertCategory, Script, InsertScript } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Categories
export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(categories).orderBy(categories.name);
}

export async function getCategoryBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCategory(data: InsertCategory) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(categories).values(data);
  return result;
}

export async function updateCategory(id: number, data: Partial<InsertCategory>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(categories).set(data).where(eq(categories.id, id));
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(categories).where(eq(categories.id, id));
}

// Scripts
export async function getScriptsByCategory(categoryId: number, limit: number = 20, offset: number = 0) {
  const db = await getDb();
  if (!db) return { scripts: [], total: 0 };
  
  const query = db
    .select()
    .from(scripts)
    .where(eq(scripts.categoryId, categoryId))
    .limit(limit)
    .offset(offset);
  
  const result = await query;
  return { scripts: result, total: result.length };
}

export async function searchScripts(query: string, categoryId?: number, limit: number = 20, offset: number = 0) {
  const db = await getDb();
  if (!db) return { scripts: [], total: 0 };
  
  
  const searchTerm = `%${query}%`;
  
  let queryBuilder = db
    .select()
    .from(scripts)
    .where(
      categoryId
        ? and(
            or(
              like(scripts.title, searchTerm),
              like(scripts.description, searchTerm),
              like(scripts.content, searchTerm)
            ),
            eq(scripts.categoryId, categoryId)
          )
        : or(
            like(scripts.title, searchTerm),
            like(scripts.description, searchTerm),
            like(scripts.content, searchTerm)
          )
    )
    .limit(limit)
    .offset(offset);
  
  const result = await queryBuilder;
  return { scripts: result, total: result.length };
}

export async function getScriptBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(scripts).where(eq(scripts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getScriptById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(scripts).where(eq(scripts.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createScript(data: InsertScript) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(scripts).values(data);
  return result;
}

export async function updateScript(id: number, data: Partial<InsertScript>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(scripts).set(data).where(eq(scripts.id, id));
}

export async function deleteScript(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(scripts).where(eq(scripts.id, id));
}

export async function getAllScripts(limit: number = 20, offset: number = 0) {
  const db = await getDb();
  if (!db) return { scripts: [], total: 0 };
  
  const result = await db
    .select()
    .from(scripts)
    .where(eq(scripts.isPublic, 1))
    .limit(limit)
    .offset(offset);
  
  return { scripts: result, total: result.length };
}

export async function incrementScriptViews(id: number) {
  const db = await getDb();
  if (!db) return;
  
  const script = await getScriptById(id);
  if (script) {
    await db.update(scripts).set({ views: (script.views || 0) + 1 }).where(eq(scripts.id, id));
  }
}
