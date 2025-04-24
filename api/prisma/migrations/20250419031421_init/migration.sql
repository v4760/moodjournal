-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "mood_id" SERIAL NOT NULL,
    "mood_name" TEXT NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("mood_id")
);

-- CreateTable
CREATE TABLE "JournalEntry" (
    "entry_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "mood_id" INTEGER NOT NULL,
    "weather_info" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("entry_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_mood_id_fkey" FOREIGN KEY ("mood_id") REFERENCES "Mood"("mood_id") ON DELETE RESTRICT ON UPDATE CASCADE;
