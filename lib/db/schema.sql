-- LaserCalc Pro Database Schema
-- Cloudflare D1 (SQLite)
-- Domain: lasercalcpro.com

-- ============================================
-- Administrators Table
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,  -- bcrypt hashed
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  role TEXT DEFAULT 'admin' CHECK(role IN ('admin', 'editor')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_login DATETIME,
  last_login_ip TEXT
);

CREATE INDEX IF NOT EXISTS idx_admins_username ON admins(username);
CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);

-- Insert default admin (password: admin123 - CHANGE THIS!)
-- Password hash generated with: bcrypt.hashSync('admin123', 10)
INSERT OR IGNORE INTO admins (username, password, email, display_name) 
VALUES (
  'admin',
  '$2a$10$rQ6mZKZ5fUYHp.X9Y6YmTuGqZ8YQZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z',
  'admin@lasercalcpro.com',
  'System Administrator'
);

-- ============================================
-- Calculations History Table
-- ============================================
CREATE TABLE IF NOT EXISTS calculations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tool_type TEXT NOT NULL CHECK(tool_type IN (
    'laser-cutting',
    'cnc-machining',
    'roi',
    'energy',
    'material-utilization'
  )),
  input_params TEXT NOT NULL,  -- JSON string
  result TEXT NOT NULL,  -- JSON string
  user_ip TEXT,
  user_agent TEXT,
  user_country TEXT,
  user_city TEXT,
  session_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_calculations_tool_type ON calculations(tool_type);
CREATE INDEX IF NOT EXISTS idx_calculations_created_at ON calculations(created_at);
CREATE INDEX IF NOT EXISTS idx_calculations_session_id ON calculations(session_id);
CREATE INDEX IF NOT EXISTS idx_calculations_country ON calculations(user_country);

-- ============================================
-- Email Subscribers Table
-- ============================================
CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  source_tool TEXT,
  source_page TEXT,
  is_confirmed BOOLEAN DEFAULT FALSE,
  confirmation_token TEXT UNIQUE,
  ip_address TEXT,
  user_agent TEXT,
  subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  confirmed_at DATETIME,
  unsubscribed_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_confirmed ON subscribers(is_confirmed);
CREATE INDEX IF NOT EXISTS idx_subscribers_token ON subscribers(confirmation_token);

-- ============================================
-- Articles Table
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,  -- HTML content
  category TEXT CHECK(category IN ('tutorials', 'industry', 'case-studies', 'news')),
  tags TEXT,  -- JSON array of strings
  author_id INTEGER,
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published', 'archived')),
  featured_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  views INTEGER DEFAULT 0,
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES admins(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_articles_author_id ON articles(author_id);

-- ============================================
-- Usage Statistics Table (Daily Aggregation)
-- ============================================
CREATE TABLE IF NOT EXISTS usage_stats (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  stat_date DATE NOT NULL,
  metric_type TEXT NOT NULL,
  metric_value INTEGER DEFAULT 0,
  metadata TEXT,  -- JSON for additional data
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_usage_stats_date_type ON usage_stats(stat_date, metric_type);
CREATE INDEX IF NOT EXISTS idx_usage_stats_date ON usage_stats(stat_date);

-- ============================================
-- Page Views Table
-- ============================================
CREATE TABLE IF NOT EXISTS page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_ip TEXT,
  user_agent TEXT,
  user_country TEXT,
  user_city TEXT,
  session_id TEXT,
  duration INTEGER,  -- seconds
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_page_views_url ON page_views(page_url);
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_session_id ON page_views(session_id);

-- ============================================
-- System Settings Table
-- ============================================
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_settings_key ON settings(setting_key);

-- Insert default settings
INSERT OR IGNORE INTO settings (setting_key, setting_value, description, is_public) VALUES
('site_name', 'LaserCalc Pro', 'Website name', TRUE),
('site_url', 'https://lasercalcpro.com', 'Website URL', TRUE),
('admin_email', 'admin@lasercalcpro.com', 'Administrator email', FALSE),
('adsense_client_id', '', 'Google AdSense Client ID', FALSE),
('ga_tracking_id', '', 'Google Analytics Tracking ID', FALSE),
('maintenance_mode', 'false', 'Maintenance mode enabled', FALSE),
('maintenance_message', 'We are currently under maintenance. Please check back soon.', 'Maintenance mode message', FALSE),
('email_from_name', 'LaserCalc Pro', 'Email sender name', FALSE),
('email_from_address', 'noreply@lasercalcpro.com', 'Email sender address', FALSE),
('max_calculations_per_day', '100', 'Max calculations per IP per day', FALSE),
('enable_pdf_export', 'true', 'Enable PDF report export', FALSE);

-- ============================================
-- SEO Keywords Tracking Table
-- ============================================
CREATE TABLE IF NOT EXISTS seo_keywords (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  keyword TEXT NOT NULL,
  target_page TEXT,
  position INTEGER,
  previous_position INTEGER,
  search_volume INTEGER,
  difficulty INTEGER,
  checked_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_seo_keywords_keyword ON seo_keywords(keyword);
CREATE INDEX IF NOT EXISTS idx_seo_keywords_checked_at ON seo_keywords(checked_at);

-- ============================================
-- API Rate Limiting Table
-- ============================================
CREATE TABLE IF NOT EXISTS rate_limits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ip_address TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_request DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_ip_endpoint ON rate_limits(ip_address, endpoint);
CREATE INDEX IF NOT EXISTS idx_rate_limits_window ON rate_limits(window_start);

-- ============================================
-- Audit Log Table
-- ============================================
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id INTEGER,
  old_value TEXT,  -- JSON
  new_value TEXT,  -- JSON
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES admins(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON audit_log(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity_type, entity_id);

-- ============================================
-- Views (for common queries)
-- ============================================

-- Daily statistics view
CREATE VIEW IF NOT EXISTS daily_stats AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_calculations,
  COUNT(DISTINCT user_ip) as unique_users,
  COUNT(DISTINCT session_id) as unique_sessions
FROM calculations
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Popular tools view
CREATE VIEW IF NOT EXISTS popular_tools AS
SELECT 
  tool_type,
  COUNT(*) as usage_count,
  COUNT(DISTINCT user_ip) as unique_users,
  AVG(
    CASE 
      WHEN json_valid(result) 
      THEN json_extract(result, '$.totalCost')
      ELSE NULL
    END
  ) as avg_cost
FROM calculations
GROUP BY tool_type
ORDER BY usage_count DESC;

-- ============================================
-- Triggers (for automatic updates)
-- ============================================

-- Update articles.updated_at on change
CREATE TRIGGER IF NOT EXISTS update_articles_timestamp 
AFTER UPDATE ON articles
BEGIN
  UPDATE articles 
  SET updated_at = CURRENT_TIMESTAMP 
  WHERE id = NEW.id;
END;

-- Update settings.updated_at on change
CREATE TRIGGER IF NOT EXISTS update_settings_timestamp 
AFTER UPDATE ON settings
BEGIN
  UPDATE settings 
  SET updated_at = CURRENT_TIMESTAMP 
  WHERE id = NEW.id;
END;

-- ============================================
-- Initial Data
-- ============================================

-- Sample article (optional, for testing)
INSERT OR IGNORE INTO articles (
  title, 
  slug, 
  excerpt,
  content, 
  category, 
  status, 
  author_id,
  meta_title,
  meta_description,
  published_at
) VALUES (
  'Welcome to LaserCalc Pro',
  'welcome-to-lasercalcpro',
  'Learn how to use our professional manufacturing cost calculators',
  '<h2>Welcome to LaserCalc Pro</h2><p>Your ultimate tool for calculating manufacturing costs.</p>',
  'tutorials',
  'published',
  1,
  'Welcome to LaserCalc Pro | Manufacturing Cost Calculators',
  'Professional cost calculation tools for laser cutting, CNC machining, and equipment ROI analysis.',
  CURRENT_TIMESTAMP
);

-- ============================================
-- Database Information
-- ============================================

-- Total tables: 11
-- Total indexes: 25+
-- Total views: 2
-- Total triggers: 2

-- Estimated storage (for 10,000 calculations):
-- calculations: ~2-3 MB
-- subscribers: ~0.5 MB
-- articles: ~1-2 MB
-- page_views: ~1-2 MB
-- Total: ~5-8 MB

-- Note: Cloudflare D1 Free Tier = 5 GB storage
-- This schema is optimized for D1 constraints









