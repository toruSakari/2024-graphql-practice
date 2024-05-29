CREATE TABLE IF NOT EXISTS "posts" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"id" bigserial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"author_id" bigint
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
