import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_columns_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_media_position" AS ENUM('above', 'below');
  CREATE TYPE "public"."enum_pages_blocks_content_heading_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_content_background_color" AS ENUM('primary', 'secondary', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_media_carousel_slide_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum_pages_blocks_media_carousel_slide_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_media_carousel_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_media_carousel_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_section_content_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_contact_us_background_color" AS ENUM('primary', 'secondary', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_media_position" AS ENUM('above', 'below');
  CREATE TYPE "public"."enum__pages_v_blocks_content_heading_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_content_background_color" AS ENUM('primary', 'secondary', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_media_carousel_slide_aspect_ratio" AS ENUM('16:9', '4:3', '1:1');
  CREATE TYPE "public"."enum__pages_v_blocks_media_carousel_slide_size" AS ENUM('small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_media_carousel_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_media_carousel_button_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_section_content_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_us_background_color" AS ENUM('primary', 'secondary', 'custom');
  ALTER TYPE "public"."enum_pages_blocks_section_section_height" ADD VALUE 'full';
  ALTER TYPE "public"."enum__pages_v_blocks_section_section_height" ADD VALUE 'full';
  CREATE TABLE "pages_blocks_media_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"description" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_media_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"slide_aspect_ratio" "enum_pages_blocks_media_carousel_slide_aspect_ratio" DEFAULT '16:9',
  	"slide_size" "enum_pages_blocks_media_carousel_slide_size" DEFAULT 'medium',
  	"loop_slides" boolean DEFAULT true,
  	"button_link_type" "enum_pages_blocks_media_carousel_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"button_link_label" varchar,
  	"button_link_appearance" "enum_pages_blocks_media_carousel_button_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Got an Idea?',
  	"subheading" varchar DEFAULT 'Contact Us Today',
  	"form_heading" varchar,
  	"contact_info_heading" varchar,
  	"form_id" integer,
  	"phone_number" varchar,
  	"email" varchar,
  	"address" varchar,
  	"map_embed_url" varchar,
  	"background_color" "enum_pages_blocks_contact_us_background_color" DEFAULT 'primary',
  	"custom_background_color" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_carousel_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"description" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" jsonb,
  	"slide_aspect_ratio" "enum__pages_v_blocks_media_carousel_slide_aspect_ratio" DEFAULT '16:9',
  	"slide_size" "enum__pages_v_blocks_media_carousel_slide_size" DEFAULT 'medium',
  	"loop_slides" boolean DEFAULT true,
  	"button_link_type" "enum__pages_v_blocks_media_carousel_button_link_type" DEFAULT 'reference',
  	"button_link_new_tab" boolean,
  	"button_link_url" varchar,
  	"button_link_label" varchar,
  	"button_link_appearance" "enum__pages_v_blocks_media_carousel_button_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Got an Idea?',
  	"subheading" varchar DEFAULT 'Contact Us Today',
  	"form_heading" varchar,
  	"contact_info_heading" varchar,
  	"form_id" integer,
  	"phone_number" varchar,
  	"email" varchar,
  	"address" varchar,
  	"map_embed_url" varchar,
  	"background_color" "enum__pages_v_blocks_contact_us_background_color" DEFAULT 'primary',
  	"custom_background_color" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  DROP INDEX "pages_filename_idx";
  DROP INDEX "_pages_v_version_version_filename_idx";
  DROP INDEX "posts_filename_idx";
  DROP INDEX "_posts_v_version_version_filename_idx";
  DROP INDEX "categories_filename_idx";
  DROP INDEX "users_filename_idx";
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "text_align" "enum_pages_blocks_content_columns_text_align" DEFAULT 'left';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "media_id" integer;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "media_position" "enum_pages_blocks_content_columns_media_position" DEFAULT 'above';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "heading" varchar;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "heading_align" "enum_pages_blocks_content_heading_align" DEFAULT 'left';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "background_color" "enum_pages_blocks_content_background_color" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_content" ADD COLUMN "custom_background_color" varchar;
  ALTER TABLE "pages_blocks_section" ADD COLUMN "content_position" "enum_pages_blocks_section_content_position" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "text_align" "enum__pages_v_blocks_content_columns_text_align" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "media_id" integer;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "media_position" "enum__pages_v_blocks_content_columns_media_position" DEFAULT 'above';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "heading" varchar;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "heading_align" "enum__pages_v_blocks_content_heading_align" DEFAULT 'left';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "background_color" "enum__pages_v_blocks_content_background_color" DEFAULT 'primary';
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "custom_background_color" varchar;
  ALTER TABLE "_pages_v_blocks_section" ADD COLUMN "content_position" "enum__pages_v_blocks_section_content_position" DEFAULT 'left';
  ALTER TABLE "pages_blocks_media_carousel_slides" ADD CONSTRAINT "pages_blocks_media_carousel_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_carousel_slides" ADD CONSTRAINT "pages_blocks_media_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_carousel" ADD CONSTRAINT "pages_blocks_media_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us" ADD CONSTRAINT "pages_blocks_contact_us_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us" ADD CONSTRAINT "pages_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_media_carousel_slides_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_carousel_slides" ADD CONSTRAINT "_pages_v_blocks_media_carousel_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_carousel" ADD CONSTRAINT "_pages_v_blocks_media_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us" ADD CONSTRAINT "_pages_v_blocks_contact_us_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us" ADD CONSTRAINT "_pages_v_blocks_contact_us_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_media_carousel_slides_order_idx" ON "pages_blocks_media_carousel_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_carousel_slides_parent_id_idx" ON "pages_blocks_media_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_carousel_slides_media_idx" ON "pages_blocks_media_carousel_slides" USING btree ("media_id");
  CREATE INDEX "pages_blocks_media_carousel_order_idx" ON "pages_blocks_media_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_carousel_parent_id_idx" ON "pages_blocks_media_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_carousel_path_idx" ON "pages_blocks_media_carousel" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_us_order_idx" ON "pages_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_us_parent_id_idx" ON "pages_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_us_path_idx" ON "pages_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_us_form_idx" ON "pages_blocks_contact_us" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_media_carousel_slides_order_idx" ON "_pages_v_blocks_media_carousel_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_carousel_slides_parent_id_idx" ON "_pages_v_blocks_media_carousel_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_carousel_slides_media_idx" ON "_pages_v_blocks_media_carousel_slides" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_media_carousel_order_idx" ON "_pages_v_blocks_media_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_carousel_parent_id_idx" ON "_pages_v_blocks_media_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_carousel_path_idx" ON "_pages_v_blocks_media_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_us_order_idx" ON "_pages_v_blocks_contact_us" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_us_parent_id_idx" ON "_pages_v_blocks_contact_us" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_us_path_idx" ON "_pages_v_blocks_contact_us" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_us_form_idx" ON "_pages_v_blocks_contact_us" USING btree ("form_id");
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_columns_media_idx" ON "pages_blocks_content_columns" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_content_columns_media_idx" ON "_pages_v_blocks_content_columns" USING btree ("media_id");
  ALTER TABLE "pages" DROP COLUMN "url";
  ALTER TABLE "pages" DROP COLUMN "thumbnail_u_r_l";
  ALTER TABLE "pages" DROP COLUMN "filename";
  ALTER TABLE "pages" DROP COLUMN "mime_type";
  ALTER TABLE "pages" DROP COLUMN "filesize";
  ALTER TABLE "pages" DROP COLUMN "width";
  ALTER TABLE "pages" DROP COLUMN "height";
  ALTER TABLE "pages" DROP COLUMN "focal_x";
  ALTER TABLE "pages" DROP COLUMN "focal_y";
  ALTER TABLE "_pages_v" DROP COLUMN "version_url";
  ALTER TABLE "_pages_v" DROP COLUMN "version_thumbnail_u_r_l";
  ALTER TABLE "_pages_v" DROP COLUMN "version_filename";
  ALTER TABLE "_pages_v" DROP COLUMN "version_mime_type";
  ALTER TABLE "_pages_v" DROP COLUMN "version_filesize";
  ALTER TABLE "_pages_v" DROP COLUMN "version_width";
  ALTER TABLE "_pages_v" DROP COLUMN "version_height";
  ALTER TABLE "_pages_v" DROP COLUMN "version_focal_x";
  ALTER TABLE "_pages_v" DROP COLUMN "version_focal_y";
  ALTER TABLE "posts" DROP COLUMN "url";
  ALTER TABLE "posts" DROP COLUMN "thumbnail_u_r_l";
  ALTER TABLE "posts" DROP COLUMN "filename";
  ALTER TABLE "posts" DROP COLUMN "mime_type";
  ALTER TABLE "posts" DROP COLUMN "filesize";
  ALTER TABLE "posts" DROP COLUMN "width";
  ALTER TABLE "posts" DROP COLUMN "height";
  ALTER TABLE "posts" DROP COLUMN "focal_x";
  ALTER TABLE "posts" DROP COLUMN "focal_y";
  ALTER TABLE "_posts_v" DROP COLUMN "version_url";
  ALTER TABLE "_posts_v" DROP COLUMN "version_thumbnail_u_r_l";
  ALTER TABLE "_posts_v" DROP COLUMN "version_filename";
  ALTER TABLE "_posts_v" DROP COLUMN "version_mime_type";
  ALTER TABLE "_posts_v" DROP COLUMN "version_filesize";
  ALTER TABLE "_posts_v" DROP COLUMN "version_width";
  ALTER TABLE "_posts_v" DROP COLUMN "version_height";
  ALTER TABLE "_posts_v" DROP COLUMN "version_focal_x";
  ALTER TABLE "_posts_v" DROP COLUMN "version_focal_y";
  ALTER TABLE "categories" DROP COLUMN "url";
  ALTER TABLE "categories" DROP COLUMN "thumbnail_u_r_l";
  ALTER TABLE "categories" DROP COLUMN "filename";
  ALTER TABLE "categories" DROP COLUMN "mime_type";
  ALTER TABLE "categories" DROP COLUMN "filesize";
  ALTER TABLE "categories" DROP COLUMN "width";
  ALTER TABLE "categories" DROP COLUMN "height";
  ALTER TABLE "categories" DROP COLUMN "focal_x";
  ALTER TABLE "categories" DROP COLUMN "focal_y";
  ALTER TABLE "users" DROP COLUMN "url";
  ALTER TABLE "users" DROP COLUMN "thumbnail_u_r_l";
  ALTER TABLE "users" DROP COLUMN "filename";
  ALTER TABLE "users" DROP COLUMN "mime_type";
  ALTER TABLE "users" DROP COLUMN "filesize";
  ALTER TABLE "users" DROP COLUMN "width";
  ALTER TABLE "users" DROP COLUMN "height";
  ALTER TABLE "users" DROP COLUMN "focal_x";
  ALTER TABLE "users" DROP COLUMN "focal_y";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_media_carousel_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_us" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media_carousel_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media_carousel" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_us" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_media_carousel_slides" CASCADE;
  DROP TABLE "pages_blocks_media_carousel" CASCADE;
  DROP TABLE "pages_blocks_contact_us" CASCADE;
  DROP TABLE "_pages_v_blocks_media_carousel_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_media_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us" CASCADE;
  ALTER TABLE "pages_blocks_content_columns" DROP CONSTRAINT "pages_blocks_content_columns_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_content_columns" DROP CONSTRAINT "_pages_v_blocks_content_columns_media_id_media_id_fk";
  
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "section_height" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "section_height" SET DEFAULT 'medium'::text;
  DROP TYPE "public"."enum_pages_blocks_section_section_height";
  CREATE TYPE "public"."enum_pages_blocks_section_section_height" AS ENUM('small', 'medium', 'large');
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "section_height" SET DEFAULT 'medium'::"public"."enum_pages_blocks_section_section_height";
  ALTER TABLE "pages_blocks_section" ALTER COLUMN "section_height" SET DATA TYPE "public"."enum_pages_blocks_section_section_height" USING "section_height"::"public"."enum_pages_blocks_section_section_height";
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "section_height" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "section_height" SET DEFAULT 'medium'::text;
  DROP TYPE "public"."enum__pages_v_blocks_section_section_height";
  CREATE TYPE "public"."enum__pages_v_blocks_section_section_height" AS ENUM('small', 'medium', 'large');
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "section_height" SET DEFAULT 'medium'::"public"."enum__pages_v_blocks_section_section_height";
  ALTER TABLE "_pages_v_blocks_section" ALTER COLUMN "section_height" SET DATA TYPE "public"."enum__pages_v_blocks_section_section_height" USING "section_height"::"public"."enum__pages_v_blocks_section_section_height";
  DROP INDEX "pages_blocks_content_columns_media_idx";
  DROP INDEX "_pages_v_blocks_content_columns_media_idx";
  ALTER TABLE "pages" ADD COLUMN "url" varchar;
  ALTER TABLE "pages" ADD COLUMN "thumbnail_u_r_l" varchar;
  ALTER TABLE "pages" ADD COLUMN "filename" varchar;
  ALTER TABLE "pages" ADD COLUMN "mime_type" varchar;
  ALTER TABLE "pages" ADD COLUMN "filesize" numeric;
  ALTER TABLE "pages" ADD COLUMN "width" numeric;
  ALTER TABLE "pages" ADD COLUMN "height" numeric;
  ALTER TABLE "pages" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "pages" ADD COLUMN "focal_y" numeric;
  ALTER TABLE "_pages_v" ADD COLUMN "version_url" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_thumbnail_u_r_l" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_filename" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_mime_type" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_filesize" numeric;
  ALTER TABLE "_pages_v" ADD COLUMN "version_width" numeric;
  ALTER TABLE "_pages_v" ADD COLUMN "version_height" numeric;
  ALTER TABLE "_pages_v" ADD COLUMN "version_focal_x" numeric;
  ALTER TABLE "_pages_v" ADD COLUMN "version_focal_y" numeric;
  ALTER TABLE "posts" ADD COLUMN "url" varchar;
  ALTER TABLE "posts" ADD COLUMN "thumbnail_u_r_l" varchar;
  ALTER TABLE "posts" ADD COLUMN "filename" varchar;
  ALTER TABLE "posts" ADD COLUMN "mime_type" varchar;
  ALTER TABLE "posts" ADD COLUMN "filesize" numeric;
  ALTER TABLE "posts" ADD COLUMN "width" numeric;
  ALTER TABLE "posts" ADD COLUMN "height" numeric;
  ALTER TABLE "posts" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "posts" ADD COLUMN "focal_y" numeric;
  ALTER TABLE "_posts_v" ADD COLUMN "version_url" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_thumbnail_u_r_l" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_filename" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_mime_type" varchar;
  ALTER TABLE "_posts_v" ADD COLUMN "version_filesize" numeric;
  ALTER TABLE "_posts_v" ADD COLUMN "version_width" numeric;
  ALTER TABLE "_posts_v" ADD COLUMN "version_height" numeric;
  ALTER TABLE "_posts_v" ADD COLUMN "version_focal_x" numeric;
  ALTER TABLE "_posts_v" ADD COLUMN "version_focal_y" numeric;
  ALTER TABLE "categories" ADD COLUMN "url" varchar;
  ALTER TABLE "categories" ADD COLUMN "thumbnail_u_r_l" varchar;
  ALTER TABLE "categories" ADD COLUMN "filename" varchar;
  ALTER TABLE "categories" ADD COLUMN "mime_type" varchar;
  ALTER TABLE "categories" ADD COLUMN "filesize" numeric;
  ALTER TABLE "categories" ADD COLUMN "width" numeric;
  ALTER TABLE "categories" ADD COLUMN "height" numeric;
  ALTER TABLE "categories" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "categories" ADD COLUMN "focal_y" numeric;
  ALTER TABLE "users" ADD COLUMN "url" varchar;
  ALTER TABLE "users" ADD COLUMN "thumbnail_u_r_l" varchar;
  ALTER TABLE "users" ADD COLUMN "filename" varchar;
  ALTER TABLE "users" ADD COLUMN "mime_type" varchar;
  ALTER TABLE "users" ADD COLUMN "filesize" numeric;
  ALTER TABLE "users" ADD COLUMN "width" numeric;
  ALTER TABLE "users" ADD COLUMN "height" numeric;
  ALTER TABLE "users" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "users" ADD COLUMN "focal_y" numeric;
  CREATE UNIQUE INDEX "pages_filename_idx" ON "pages" USING btree ("filename");
  CREATE INDEX "_pages_v_version_version_filename_idx" ON "_pages_v" USING btree ("version_filename");
  CREATE UNIQUE INDEX "posts_filename_idx" ON "posts" USING btree ("filename");
  CREATE INDEX "_posts_v_version_version_filename_idx" ON "_posts_v" USING btree ("version_filename");
  CREATE UNIQUE INDEX "categories_filename_idx" ON "categories" USING btree ("filename");
  CREATE UNIQUE INDEX "users_filename_idx" ON "users" USING btree ("filename");
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "text_align";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "media_id";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "media_position";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "heading_align";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "background_color";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "custom_background_color";
  ALTER TABLE "pages_blocks_section" DROP COLUMN "content_position";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "text_align";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "media_id";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "media_position";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "heading";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "heading_align";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "background_color";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "custom_background_color";
  ALTER TABLE "_pages_v_blocks_section" DROP COLUMN "content_position";
  DROP TYPE "public"."enum_pages_blocks_content_columns_text_align";
  DROP TYPE "public"."enum_pages_blocks_content_columns_media_position";
  DROP TYPE "public"."enum_pages_blocks_content_heading_align";
  DROP TYPE "public"."enum_pages_blocks_content_background_color";
  DROP TYPE "public"."enum_pages_blocks_media_carousel_slide_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_media_carousel_slide_size";
  DROP TYPE "public"."enum_pages_blocks_media_carousel_button_link_type";
  DROP TYPE "public"."enum_pages_blocks_media_carousel_button_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_section_content_position";
  DROP TYPE "public"."enum_pages_blocks_contact_us_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_text_align";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_media_position";
  DROP TYPE "public"."enum__pages_v_blocks_content_heading_align";
  DROP TYPE "public"."enum__pages_v_blocks_content_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_media_carousel_slide_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_media_carousel_slide_size";
  DROP TYPE "public"."enum__pages_v_blocks_media_carousel_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_media_carousel_button_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_section_content_position";
  DROP TYPE "public"."enum__pages_v_blocks_contact_us_background_color";`)
}
