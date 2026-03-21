-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Publication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "category" TEXT,
    "authorName" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "featuredOnHome" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME,
    "createdById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Publication_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Publication" ("authorName", "category", "content", "coverImage", "createdAt", "createdById", "featuredOnHome", "id", "publishedAt", "slug", "status", "summary", "title", "updatedAt") SELECT "authorName", "category", "content", "coverImage", "createdAt", "createdById", "featuredOnHome", "id", "publishedAt", "slug", "status", "summary", "title", "updatedAt" FROM "Publication";
DROP TABLE "Publication";
ALTER TABLE "new_Publication" RENAME TO "Publication";
CREATE UNIQUE INDEX "Publication_slug_key" ON "Publication"("slug");
CREATE INDEX "Publication_status_idx" ON "Publication"("status");
CREATE INDEX "Publication_isArchived_idx" ON "Publication"("isArchived");
CREATE INDEX "Publication_featuredOnHome_idx" ON "Publication"("featuredOnHome");
CREATE INDEX "Publication_publishedAt_idx" ON "Publication"("publishedAt");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
