import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_columns_block_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_block_align" AS ENUM('left', 'center', 'right');
  CREATE TABLE "pages_blocks_process_timeline_phases_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"detail" varchar
  );
  
  CREATE TABLE "pages_blocks_process_timeline_phases" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "pages_blocks_process_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_timeline_phases_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"detail" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_timeline_phases" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "block_align" "enum_pages_blocks_content_columns_block_align" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "block_align" "enum__pages_v_blocks_content_columns_block_align" DEFAULT 'left';
  ALTER TABLE "pages_blocks_process_timeline_phases_details" ADD CONSTRAINT "pages_blocks_process_timeline_phases_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_timeline_phases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_timeline_phases" ADD CONSTRAINT "pages_blocks_process_timeline_phases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_timeline" ADD CONSTRAINT "pages_blocks_process_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_timeline_phases_details" ADD CONSTRAINT "_pages_v_blocks_process_timeline_phases_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_timeline_phases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_timeline_phases" ADD CONSTRAINT "_pages_v_blocks_process_timeline_phases_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_timeline" ADD CONSTRAINT "_pages_v_blocks_process_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_process_timeline_phases_details_order_idx" ON "pages_blocks_process_timeline_phases_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_timeline_phases_details_parent_id_idx" ON "pages_blocks_process_timeline_phases_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_timeline_phases_order_idx" ON "pages_blocks_process_timeline_phases" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_timeline_phases_parent_id_idx" ON "pages_blocks_process_timeline_phases" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_timeline_order_idx" ON "pages_blocks_process_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_timeline_parent_id_idx" ON "pages_blocks_process_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_timeline_path_idx" ON "pages_blocks_process_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_timeline_phases_details_order_idx" ON "_pages_v_blocks_process_timeline_phases_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_timeline_phases_details_parent_id_idx" ON "_pages_v_blocks_process_timeline_phases_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_timeline_phases_order_idx" ON "_pages_v_blocks_process_timeline_phases" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_timeline_phases_parent_id_idx" ON "_pages_v_blocks_process_timeline_phases" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_timeline_order_idx" ON "_pages_v_blocks_process_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_timeline_parent_id_idx" ON "_pages_v_blocks_process_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_timeline_path_idx" ON "_pages_v_blocks_process_timeline" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_process_timeline_phases_details" CASCADE;
  DROP TABLE "pages_blocks_process_timeline_phases" CASCADE;
  DROP TABLE "pages_blocks_process_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_process_timeline_phases_details" CASCADE;
  DROP TABLE "_pages_v_blocks_process_timeline_phases" CASCADE;
  DROP TABLE "_pages_v_blocks_process_timeline" CASCADE;
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "block_align";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "block_align";
  DROP TYPE "public"."enum_pages_blocks_content_columns_block_align";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_block_align";`)
}
