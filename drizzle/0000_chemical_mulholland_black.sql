CREATE TABLE `admins` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`name` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admins_email_unique` ON `admins` (`email`);--> statement-breakpoint
CREATE TABLE `contact_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'NEW',
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`postcode` text NOT NULL,
	`message` text,
	`admin_notes` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `coverage_areas` (
	`id` text PRIMARY KEY NOT NULL,
	`postcode_prefix` text NOT NULL,
	`area_name` text DEFAULT '' NOT NULL,
	`is_active` integer DEFAULT true,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `coverage_packages` (
	`id` text PRIMARY KEY NOT NULL,
	`coverage_area_id` text NOT NULL,
	`package_id` text NOT NULL,
	FOREIGN KEY (`coverage_area_id`) REFERENCES `coverage_areas`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`package_id`) REFERENCES `packages`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` text PRIMARY KEY NOT NULL,
	`order_number` text NOT NULL,
	`status` text DEFAULT 'PENDING',
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`address` text NOT NULL,
	`postcode` text NOT NULL,
	`package_id` text NOT NULL,
	`package_name` text,
	`package_price` text,
	`payment_url` text,
	`gc_billing_request_id` text,
	`gc_mandate_id` text,
	`notes` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orders_order_number_unique` ON `orders` (`order_number`);--> statement-breakpoint
CREATE TABLE `packages` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`speed` text NOT NULL,
	`price` real NOT NULL,
	`description` text NOT NULL,
	`features` text NOT NULL,
	`is_popular` integer DEFAULT false,
	`is_active` integer DEFAULT true,
	`sort_order` integer DEFAULT 0,
	`created_at` integer,
	`updated_at` integer
);
