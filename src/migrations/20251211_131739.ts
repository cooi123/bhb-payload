import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_media_block_layout" AS ENUM('single', 'grid', 'flex');
  CREATE TYPE "public"."enum_pages_blocks_media_block_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_media_block_gallery_aspect_ratio" AS ENUM('1:1', '4:3', '3:2', '16:9');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_layout" AS ENUM('single', 'grid', 'flex');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_media_block_gallery_aspect_ratio" AS ENUM('1:1', '4:3', '3:2', '16:9');
  CREATE TABLE "pages_blocks_content_property_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_property_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_content" ADD COLUMN "property_table_enabled" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "property_table_area" varchar;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "property_table_completion_year" varchar;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "property_table_architect" varchar;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "property_table_specs_beds" numeric;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "property_table_specs_baths" numeric;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "property_table_specs_cars" numeric;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "layout" "enum_pages_blocks_media_block_layout" DEFAULT 'single';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "columns" "enum_pages_blocks_media_block_columns" DEFAULT '3';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "gallery_aspect_ratio" "enum_pages_blocks_media_block_gallery_aspect_ratio" DEFAULT '3:2';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "property_table_enabled" boolean DEFAULT false;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "property_table_area" varchar;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "property_table_completion_year" varchar;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "property_table_architect" varchar;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "property_table_specs_beds" numeric;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "property_table_specs_baths" numeric;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "property_table_specs_cars" numeric;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "layout" "enum__pages_v_blocks_media_block_layout" DEFAULT 'single';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "columns" "enum__pages_v_blocks_media_block_columns" DEFAULT '3';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "gallery_aspect_ratio" "enum__pages_v_blocks_media_block_gallery_aspect_ratio" DEFAULT '3:2';
  ALTER TABLE "pages_blocks_content_property_table_rows" ADD CONSTRAINT "pages_blocks_content_property_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block_gallery" ADD CONSTRAINT "pages_blocks_media_block_gallery_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block_gallery" ADD CONSTRAINT "pages_blocks_media_block_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_property_table_rows" ADD CONSTRAINT "_pages_v_blocks_content_property_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block_gallery" ADD CONSTRAINT "_pages_v_blocks_media_block_gallery_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block_gallery" ADD CONSTRAINT "_pages_v_blocks_media_block_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_property_table_rows_order_idx" ON "pages_blocks_content_property_table_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_property_table_rows_parent_id_idx" ON "pages_blocks_content_property_table_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_gallery_order_idx" ON "pages_blocks_media_block_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_gallery_parent_id_idx" ON "pages_blocks_media_block_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_gallery_media_idx" ON "pages_blocks_media_block_gallery" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_content_property_table_rows_order_idx" ON "_pages_v_blocks_content_property_table_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_property_table_rows_parent_id_idx" ON "_pages_v_blocks_content_property_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_gallery_order_idx" ON "_pages_v_blocks_media_block_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_gallery_parent_id_idx" ON "_pages_v_blocks_media_block_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_gallery_media_idx" ON "_pages_v_blocks_media_block_gallery" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_content_property_table_rows" CASCADE;
  DROP TABLE "pages_blocks_media_block_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_content_property_table_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block_gallery" CASCADE;
  ALTER TABLE "pages_blocks_content" DROP COLUMN "property_table_enabled";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "property_table_area";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "property_table_completion_year";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "property_table_architect";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "property_table_specs_beds";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "property_table_specs_baths";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "property_table_specs_cars";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "layout";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "columns";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "gallery_aspect_ratio";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "property_table_enabled";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "property_table_area";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "property_table_completion_year";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "property_table_architect";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "property_table_specs_beds";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "property_table_specs_baths";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "property_table_specs_cars";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "layout";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "columns";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "gallery_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_media_block_layout";
  DROP TYPE "public"."enum_pages_blocks_media_block_columns";
  DROP TYPE "public"."enum_pages_blocks_media_block_gallery_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_layout";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_columns";
  DROP TYPE "public"."enum__pages_v_blocks_media_block_gallery_aspect_ratio";`)
}
