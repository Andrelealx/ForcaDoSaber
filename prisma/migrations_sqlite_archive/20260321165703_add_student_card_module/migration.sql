-- CreateTable
CREATE TABLE "StudentCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "photo" TEXT,
    "enrollment" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "cardCode" TEXT NOT NULL,
    "validityDate" DATETIME NOT NULL,
    "issueDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "cpf" TEXT,
    "birthDate" DATETIME,
    "classGroup" TEXT,
    "level" TEXT,
    "validationToken" TEXT NOT NULL,
    "responsibleName" TEXT,
    "responsibleRole" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentCard_cardCode_key" ON "StudentCard"("cardCode");

-- CreateIndex
CREATE UNIQUE INDEX "StudentCard_validationToken_key" ON "StudentCard"("validationToken");

-- CreateIndex
CREATE INDEX "StudentCard_status_idx" ON "StudentCard"("status");

-- CreateIndex
CREATE INDEX "StudentCard_isArchived_idx" ON "StudentCard"("isArchived");

-- CreateIndex
CREATE INDEX "StudentCard_validityDate_idx" ON "StudentCard"("validityDate");
