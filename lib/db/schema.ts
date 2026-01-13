import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// Admin users for the admin panel
export const admins = sqliteTable('admins', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Broadband packages
export const packages = sqliteTable('packages', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  speed: text('speed').notNull(), // e.g., "150 Mbps"
  price: real('price').notNull(), // Monthly price
  description: text('description').notNull(),
  features: text('features').notNull(), // JSON string of features array
  isPopular: integer('is_popular', { mode: 'boolean' }).default(false),
  isActive: integer('is_active', { mode: 'boolean' }).default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Customer orders
export const orders = sqliteTable('orders', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  orderNumber: text('order_number').notNull().unique(),
  status: text('status', { enum: ['PENDING', 'PENDING_PAYMENT', 'PAYMENT_COMPLETE', 'CONTACTED', 'SCHEDULED', 'INSTALLED', 'CANCELLED'] }).default('PENDING'),

  // Customer details
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  postcode: text('postcode').notNull(),

  // Package details (stored at time of order)
  packageId: text('package_id').notNull(),
  packageName: text('package_name'),
  packagePrice: text('package_price'),

  // GoCardless payment details
  paymentUrl: text('payment_url'),
  gcBillingRequestId: text('gc_billing_request_id'),
  gcMandateId: text('gc_mandate_id'),

  // Additional info
  notes: text('notes'),

  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Contact requests for areas without coverage
export const contactRequests = sqliteTable('contact_requests', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  status: text('status', { enum: ['NEW', 'CONTACTED', 'RESOLVED', 'ARCHIVED'] }).default('NEW'),

  // Contact details
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  postcode: text('postcode').notNull(),
  message: text('message'),

  // Admin notes
  adminNotes: text('admin_notes'),

  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});

// Type exports
export type Admin = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;

export type Package = typeof packages.$inferSelect;
export type NewPackage = typeof packages.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type ContactRequest = typeof contactRequests.$inferSelect;
export type NewContactRequest = typeof contactRequests.$inferInsert;
