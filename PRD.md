# Tork Coach - Planning Guide

A comprehensive bodybuilding coaching CRM platform that empowers fitness coaches to manage clients, design hypertrophy-focused programs, track progress, and leverage AI-driven insights for optimized coaching at scale. **Now featuring Firebase authentication and full page navigation for Clients, Programs (with Workouts, Nutrition, and Exercise Database subpages), Check-ins, Messages, and Analytics.**

**Experience Qualities**: 
1. **Professional & Authoritative** - The platform should feel like a sophisticated tool built by experts for experts, instilling confidence in both coaches and clients.
2. **Efficient & Streamlined** - Every interaction should minimize friction, allowing coaches to manage multiple clients effortlessly while clients can log workouts and check-ins quickly.
3. **Intelligent & Insightful** - AI-powered recommendations and data visualizations should surface actionable insights that drive better coaching decisions and client outcomes.

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a multi-faceted CRM system with client management, workout programming, progress tracking, messaging, nutrition logging, AI coaching assistance, analytics dashboards, and workflow automation - requiring sophisticated state management and multiple interconnected feature areas.

## Authentication & Security

### Public Access with Demo Mode
- **Functionality**: Public access with demo mode for instant exploration, plus optional email/password authentication for personalized data persistence using browser storage
- **Purpose**: Allow anyone to try the platform immediately without barriers while offering secure account creation for those who want persistent data
- **Trigger**: App loads; user visits login page
- **Progression**: User visits app → Login page displayed → Click "Try Demo Mode" for instant access OR Enter email/password to create account → Access platform → Data persists in browser storage → Sign out to clear session
- **Success criteria**: Demo mode accessible with single click; no authentication barriers for exploration; accounts can be created easily; data persists between sessions; clear indication of demo vs. authenticated mode

## Essential Features

### Client Dashboard & Management
- **Functionality**: Central hub displaying all active clients with key metrics (compliance rate, last check-in, program progress, alerts), plus activity feed showing real-time client achievements
- **Purpose**: Gives coaches an at-a-glance view of their entire roster to prioritize attention and spot issues
- **Trigger**: Landing page after login; accessible via main navigation
- **Progression**: View client list → Filter/sort by status → Click client card → Navigate to detailed client profile
- **Success criteria**: Coaches can identify which clients need attention within 5 seconds; all critical alerts are surfaced prominently

### Clients Page
- **Functionality**: Dedicated page for viewing all clients with search, filtering, and detailed client cards showing adherence metrics
- **Purpose**: Centralized client management interface
- **Trigger**: Click "Clients" in sidebar navigation
- **Progression**: View all clients → Search/filter → Click client card → Navigate to detailed profile
- **Success criteria**: Fast client lookup; clear visual indicators of client status; smooth navigation

### Client Profile System
- **Functionality**: Comprehensive client profile with personal info, training history, goals, injuries, volume tolerance, nutrition habits, progress photos, body metrics, and timeline of all interactions
- **Purpose**: Single source of truth for all client data enabling personalized coaching decisions
- **Trigger**: Clicking a client from dashboard or search
- **Progression**: View profile overview → Navigate between tabs (Profile, Progress, Workouts, Nutrition, Messages) → Edit fields inline → Save changes automatically
- **Success criteria**: Complete client context available without leaving profile; changes persist immediately; photo comparisons show transformation clearly

### Workout Program Builder
- **Functionality**: Visual program builder with exercise library, drag-and-drop scheduling, superset/circuit creation, progressive overload templates, and auto-populated exercise parameters (sets, reps, RPE, rest periods)
- **Purpose**: Streamline program design with intelligent defaults while maintaining full customization flexibility
- **Trigger**: From client profile or programs section, click "Create Program" or "Edit Program"
- **Progression**: Select template or start blank → Add training days → Search and add exercises → Configure sets/reps/load → Add supersets/notes → Assign to client → Client receives in their app
- **Success criteria**: Can create a full 4-week program in under 10 minutes; AI suggests exercise substitutions based on equipment/goals; client sees program immediately

### Programs Page (with Sub-pages)
- **Functionality**: Tabbed interface with three sub-pages: Workouts, Nutrition, and Exercise Database
- **Purpose**: Unified program management for all aspects of coaching
- **Trigger**: Click "Programs" in sidebar navigation
- **Progression**: Land on Workouts tab → Browse templates and active programs → Switch to Nutrition for meal plans → Switch to Exercise Database to manage exercises
- **Success criteria**: Seamless tab switching; all program resources in one location; quick access to templates and databases

#### Workouts Sub-page
- **Functionality**: Workout templates library, active client programs, program builder interface
- **Purpose**: Manage training programs and templates
- **Trigger**: Programs page → Workouts tab (default)
- **Progression**: Browse templates → Select or create program → Assign to clients → Monitor active programs
- **Success criteria**: Templates easily accessible; active programs clearly displayed

#### Nutrition Sub-page
- **Functionality**: Meal plan templates, recipe library, macro calculators, nutrition plans by goal
- **Purpose**: Manage nutrition programs and resources
- **Trigger**: Programs page → Nutrition tab
- **Progression**: Browse meal plans → View recipes → Assign nutrition plan to client
- **Success criteria**: Nutrition resources organized by goal; recipes searchable; macro targets clear

#### Exercise Database Sub-page
- **Functionality**: Searchable exercise library with filters, video demonstrations, custom exercise creation, categorized by muscle group and equipment
- **Purpose**: Central repository for all exercises used in programming
- **Trigger**: Programs page → Exercise Database tab
- **Progression**: Search exercises → Filter by muscle/equipment → Add custom exercises → Add to programs
- **Success criteria**: Fast search; comprehensive exercise info; easy custom exercise creation

### Check-ins Page
- **Functionality**: Dedicated page for reviewing pending and completed client check-ins
- **Purpose**: Centralized check-in review workflow
- **Trigger**: Click "Check-ins" in sidebar navigation
- **Progression**: View pending check-ins → Click to review → Generate AI insights → Edit feedback → Send to client
- **Success criteria**: Clear separation of pending vs completed; quick access to review interface

### Messages Page
- **Functionality**: Full messaging interface with conversation list and message thread view
- **Purpose**: Communicate with clients via text, voice notes, and media
- **Trigger**: Click "Messages" in sidebar navigation
- **Progression**: View conversation list → Select client → Read message history → Compose and send message
- **Success criteria**: Real-time message updates; unread indicators; smooth conversation flow

### Analytics Page
- **Functionality**: Dashboard with key metrics, performance charts, client adherence trends, and top performers
- **Purpose**: High-level overview of coaching business and client performance
- **Trigger**: Click "Analytics" in sidebar navigation
- **Progression**: View summary metrics → Drill into charts → Identify trends → Export reports
- **Success criteria**: Metrics clearly visualized; trends easy to interpret; actionable insights surfaced

### AI Coaching Assistant
- **Functionality**: Context-aware AI that analyzes client data (workout logs, check-ins, adherence, fatigue markers) and generates coaching recommendations, progression adjustments, and weekly summaries
- **Purpose**: Augment coach decision-making with pattern recognition and personalized insights at scale
- **Trigger**: Automated weekly summaries; on-demand from client profile; during program review
- **Progression**: Coach reviews client → Clicks "AI Insights" → AI analyzes recent data → Presents structured recommendations (progression suggestions, deload timing, exercise swaps, adherence patterns) → Coach reviews and applies suggestions
- **Success criteria**: AI identifies overtraining risks before injury; progression recommendations align with hypertrophy principles; summaries save coaches 15+ minutes per client weekly

### Progress Tracking & Analytics
- **Functionality**: Visual dashboards with body metric graphs (weight, measurements), photo timelines with overlay comparison, volume load trends, compliance rates, and milestone detection
- **Purpose**: Quantify client progress and identify trends to validate programming effectiveness
- **Trigger**: From client profile "Progress" tab or analytics dashboard
- **Progression**: View default graphs → Filter date range → Compare photos side-by-side with transparency overlay → Export reports → Share with client
- **Success criteria**: Coaches can visually demonstrate progress in client meetings; trends clearly show program effectiveness; red flags (plateaus, regression) are automatically highlighted

### Check-In System
- **Functionality**: Customizable check-in forms (weekly surveys with questions about energy, hunger, adherence, photos, measurements, notes) that clients complete on schedule; coach review queue with AI-generated insights that can be edited before sending; real-time analysis with editable recommendations
- **Purpose**: Maintain consistent coach-client communication loop and capture qualitative + quantitative feedback with AI-assisted analysis
- **Trigger**: Client receives automated reminder; coach navigates to "Check-Ins" queue or clicks notification
- **Progression**: Client fills form → Uploads photos → Submits → Appears in coach queue → Coach clicks to review → AI generates insights (observations, recommendations, concerns, positive feedback) → Coach edits/adds/removes insights → Coach adds personal feedback → Sends to client → Client sees response
- **Success criteria**: 80%+ client completion rate; AI insights are accurate and editable; coaches can process check-ins 3x faster; personalized feedback maintains coaching authenticity

### Activity Feed & Coach Reactions
- **Functionality**: Real-time activity feed displaying client achievements (workouts completed, meals logged, PRs beaten, progressive overload detected, milestones reached); coaches can react with kudos, fire, strong emojis or send encouraging messages directly from the feed
- **Purpose**: Foster motivation and engagement by celebrating client wins and maintaining frequent touchpoints without requiring lengthy conversations
- **Trigger**: Landing on dashboard; activities auto-populate from client actions
- **Progression**: View activity feed → See client achievement → Click reaction button (kudos/fire/strong) for quick encouragement OR click message to write personalized note → Client receives notification with coach's reaction
- **Success criteria**: Coaches respond to 50%+ of client achievements; clients feel consistently supported; average response time under 2 hours for significant achievements

### Workout Logging (Client View)
- **Functionality**: Mobile-optimized interface where clients log each set (weight, reps, RPE, notes), view exercise demos, start rest timers, and see previous performance
- **Purpose**: Capture accurate training data to inform coaching adjustments and track progressive overload
- **Trigger**: Client opens today's workout
- **Progression**: View programmed workout → Start exercise → Log set (input weight/reps/RPE) → Start timer → Log next set → Add notes → Mark workout complete → Data syncs to coach dashboard
- **Success criteria**: Logging a set takes <10 seconds; previous performance displayed for reference; offline logging syncs when reconnected

### Messaging & Communication Hub
- **Functionality**: Threaded 1:1 messaging with support for text, voice notes, video uploads; message scheduling; quick replies; unread indicators
- **Purpose**: Maintain coach-client connection with asynchronous communication that respects both parties' time
- **Trigger**: Client or coach initiates message from profile or messages tab
- **Progression**: Open thread → Compose message (text/voice/video) → Send → Recipient notified → Reply → Conversation history preserved
- **Success criteria**: Messages deliver within 2 seconds; voice notes transcribed automatically; coaches can schedule messages for optimal client engagement times

### Nutrition Dashboard
- **Functionality**: Daily macro targets, meal logging interface, food database with search, barcode scanning, macro/calorie summaries, and coach review feed
- **Purpose**: Track nutritional adherence alongside training for holistic progress management
- **Trigger**: Client logs meals throughout day; coach reviews from nutrition dashboard
- **Progression**: Client searches food → Selects item → Adjusts portion → Logs to meal → Views daily totals → Coach reviews adherence trends weekly
- **Success criteria**: Clients can log meals in under 30 seconds; coach dashboard highlights non-compliant days; macro trends visualized clearly

### Automation & Workflows
- **Functionality**: Automated onboarding sequences, program delivery schedules, check-in reminders, inactive client alerts, and milestone celebrations
- **Purpose**: Scale coaching operations without sacrificing personalization or consistency
- **Trigger**: Time-based (scheduled) or event-based (new client signup, program end approaching)
- **Progression**: Admin configures workflow → Sets triggers and actions → Activates → System executes automatically → Coach receives notifications for manual intervention points
- **Success criteria**: New clients receive welcome sequence without coach action; coaches alerted 1 week before program ends; 95%+ automation reliability

## Edge Case Handling

- **Client Data Loss**: Automatic cloud sync every 5 seconds; offline mode with local storage; conflict resolution prioritizes most recent data with manual review option
- **Incomplete Workouts**: Clients can partially complete workouts; system flags incomplete sessions for coach review; AI identifies patterns in skipped exercises
- **Program Modifications Mid-Cycle**: Coaches can edit active programs; clients see updates in real-time with notification; version history maintained
- **Missed Check-Ins**: Automated escalating reminders (day 1, day 3, day 5); coach receives alert; AI flags potential disengagement risk
- **Exercise Equipment Unavailable**: Exercise library includes equipment tags; AI suggests substitutions maintaining movement pattern and stimulus
- **Injury Reporting**: Clients can flag exercises as causing pain; coach receives immediate alert; AI suggests modified progressions avoiding affected areas
- **Multiple Coaches per Client**: Role-based permissions; activity feed shows which coach made changes; message threads can include multiple coaches
- **Data Export**: Clients can export all personal data; coaches can generate client reports; GDPR/CCPA compliance built-in

## Design Direction

The design should evoke **precision, strength, and professionalism** - like a high-performance training facility translated into digital form. The aesthetic should feel **technical yet approachable**, combining the analytical rigor of sports science with the motivational energy of bodybuilding culture. Colors should be bold and confident, typography should be strong and legible, and data visualizations should make complex metrics instantly understandable.

## Color Selection

The color scheme balances deep, authoritative neutrals with high-energy accent colors that signal action and progress.

- **Primary Color**: Deep Slate Blue `oklch(0.35 0.08 250)` - Conveys professionalism, trust, and technical expertise; used for primary navigation, buttons, and key UI elements
- **Secondary Color**: Charcoal `oklch(0.25 0.01 240)` - Provides visual hierarchy and depth; used for cards, secondary buttons, and backgrounds
- **Accent Color**: Electric Cyan `oklch(0.72 0.15 210)` - High-energy highlight for CTAs, progress indicators, and interactive states; represents growth and forward momentum
- **Success/Progress**: Vibrant Green `oklch(0.65 0.18 145)` - Positive reinforcement for completed actions, adherence metrics, progress milestones
- **Warning/Attention**: Amber `oklch(0.75 0.15 75)` - Flags items needing attention (upcoming program end, missed check-ins) without alarm
- **Destructive**: Crimson Red `oklch(0.55 0.22 25)` - Reserved for destructive actions and critical alerts

**Foreground/Background Pairings**:
- Background (Off-White `oklch(0.98 0.005 240)`): Foreground Slate `oklch(0.20 0.01 240)` - Ratio 13.2:1 ✓
- Primary (Deep Slate Blue `oklch(0.35 0.08 250)`): White `oklch(1 0 0)` - Ratio 7.8:1 ✓
- Accent (Electric Cyan `oklch(0.72 0.15 210)`): Charcoal `oklch(0.25 0.01 240)` - Ratio 7.2:1 ✓
- Success (Vibrant Green `oklch(0.65 0.18 145)`): White `oklch(1 0 0)` - Ratio 4.9:1 ✓

## Font Selection

Typography should communicate **strength, clarity, and modernity** with exceptional readability across dense data tables, workout interfaces, and messaging threads.

- **Primary Font**: **Outfit** - A geometric sans-serif with strong, confident letterforms and excellent legibility at all sizes; used for UI elements, buttons, and body text
- **Display Font**: **Space Grotesk** - Angular and technical with a distinctive personality; reserved for headlines, client names, and section titles
- **Monospace Font**: **JetBrains Mono** - For data-heavy contexts like workout logs, nutrition macros, and analytics where alignment and scannability are critical

**Typographic Hierarchy**:
- H1 (Section Titles): Space Grotesk Bold / 32px / -0.02em letter spacing / 1.2 line height
- H2 (Subsection Headers): Space Grotesk Semibold / 24px / -0.01em letter spacing / 1.3 line height
- H3 (Card Headers): Outfit Semibold / 18px / normal letter spacing / 1.4 line height
- Body Large (Primary Content): Outfit Regular / 16px / normal letter spacing / 1.6 line height
- Body (Default): Outfit Regular / 14px / normal letter spacing / 1.5 line height
- Body Small (Secondary Info): Outfit Regular / 13px / normal letter spacing / 1.5 line height
- Caption (Metadata): Outfit Medium / 12px / 0.01em letter spacing / 1.4 line height
- Data/Monospace: JetBrains Mono Medium / 14px / normal letter spacing / 1.4 line height

## Animations

Animations should feel **responsive and purposeful**, reinforcing user actions and guiding attention without delaying workflows. The motion language should reflect physical training principles - **controlled, powerful, and progressive**.

- **Micro-interactions**: Button presses scale down 2% with 100ms duration; toggle switches slide smoothly with spring physics; checkboxes use a satisfying check animation
- **Navigation transitions**: Slide transitions between views (300ms ease-out); fade overlays for modals (200ms); scale + fade for cards appearing in lists
- **Data updates**: Number counters animate upward when values increase; progress bars fill smoothly with easing; graphs animate stroke paths on initial render
- **Feedback**: Success states pulse once with scale 1.05; loading states use minimal spinner or skeleton screens; errors shake gently 2-3 times
- **Gestures**: Swipe-to-delete reveals action with follow physics; drag-to-reorder shows elevation shadow; pull-to-refresh uses elastic resistance

## Component Selection

**Components**:
- **Sidebar**: Primary navigation for coach dashboard with collapsible sections (Clients, Programs, Check-ins, Messages, Analytics, Settings)
- **Card**: Container for client profiles, workout summaries, check-in previews, analytics widgets
- **Avatar**: Client profile pictures with status indicators (active, overdue, inactive)
- **Button**: Primary actions (Save Program, Send Message, Generate AI Summary) with variants for secondary and destructive actions
- **Dialog**: Modal workflows for creating programs, editing exercises, confirming destructive actions
- **Tabs**: Switching between client profile sections (Overview, Progress, Workouts, Nutrition, Messages)
- **Table**: Displaying client rosters, workout logs, nutrition entries with sortable columns
- **Form + Input + Label**: Client intake forms, check-in questionnaires, message composition
- **Select**: Choosing exercises, filtering clients, selecting date ranges
- **Textarea**: Long-form notes, coaching feedback, client messages
- **Progress**: Visual representation of workout completion, nutrition adherence, program duration
- **Badge**: Status indicators (Active, Needs Review, Overdue, Completed)
- **Separator**: Visual dividers between content sections
- **Scroll Area**: Managing long lists of clients, exercises, messages
- **Calendar**: Scheduling workouts, check-ins, coach availability
- **Slider**: Adjusting RPE scales, volume load recommendations, nutrition macro splits
- **Switch**: Toggling visibility of rest timers, enabling notifications, showing/hiding micro nutrients
- **Accordion**: Collapsible exercise details, FAQ sections, workout history
- **Dropdown Menu**: Quick actions on client cards (Edit, Message, View Progress, Archive)
- **Sheet**: Side panel for message threads, AI insights, quick client details
- **Skeleton**: Loading states while fetching client data, workout logs, analytics

**Customizations**:
- **Client Status Card**: Custom compound component combining Avatar, name, metrics preview, status badge, and quick action buttons - includes hover elevation and click-through to profile
- **Workout Builder Grid**: Drag-and-drop interface for ordering exercises with visual indicators for supersets and circuits - uses Framer Motion for smooth reordering
- **Progress Photo Comparison**: Custom component with before/after images, slider overlay for comparison, zoom/pan controls, and annotation tools
- **AI Insight Panel**: Distinctive styling with gradient border, icon indicator, collapsible sections for different insight types (progression, fatigue, adherence)
- **Set Logger**: Optimized input grid for rapid logging - weight and reps in adjacent inputs with quick increment buttons, RPE selector, timer integration
- **Metric Graph Cards**: Recharts-based visualizations with custom tooltips showing historical context, trend lines, and goal markers

**States**:
- **Buttons**: Default with subtle shadow → Hover with lift and brightness increase → Active with scale-down press → Focus with cyan ring → Disabled with 50% opacity and no hover
- **Inputs**: Default with border → Focus with cyan ring and slight scale → Error with red border and shake → Success with green check icon → Disabled with muted background
- **Cards**: Default flat → Hover with elevation shadow and scale 1.01 → Selected with cyan border and slight background tint → Dragging with stronger shadow and 5° rotation

**Icon Selection**:
- **Navigation**: House (Dashboard), Users (Clients), Barbell (Programs), ClipboardText (Check-ins), ChatCircle (Messages), ChartLine (Analytics), Gear (Settings)
- **Actions**: Plus (Add), PencilSimple (Edit), Trash (Delete), ArrowRight (Next), Check (Complete), X (Cancel/Close)
- **Client Status**: CheckCircle (Compliant), Warning (Needs Attention), Clock (Overdue), Pause (Inactive)
- **Workout**: Play (Start Workout), Stop (End Session), Timer (Rest Period), Repeat (Superset), TrendUp (Progression)
- **Progress**: Camera (Photos), ChartLineUp (Metrics), CalendarBlank (History), Target (Goals)
- **Communication**: PaperPlaneRight (Send), Microphone (Voice Note), VideoCamera (Video), Bell (Notifications)

**Spacing**:
- Container padding: p-6 (24px) for main content areas
- Card internal padding: p-4 (16px) for standard cards, p-6 for feature cards
- Section spacing: gap-8 (32px) between major sections, gap-4 (16px) between related elements
- Grid gaps: gap-6 for client cards grid, gap-3 for form fields
- Button padding: px-6 py-3 for primary, px-4 py-2 for secondary
- Vertical rhythm: space-y-6 for stacked sections, space-y-3 for form groups

**Mobile**:
- **Sidebar**: Collapses to bottom tab bar with 5 key sections (Dashboard, Clients, Messages, Workouts, Profile)
- **Client Cards**: Stack vertically at full width with condensed metric display
- **Workout Builder**: Switches to vertical list view; drag handles more prominent; bottom drawer for exercise search
- **Tables**: Transform to card-based layouts with key info prioritized; full details available on tap-through
- **Forms**: Single column layout; sticky submit button at bottom; larger touch targets (min 44px)
- **Navigation**: Breadcrumbs become back button; overflow menus consolidate actions; swipe gestures for navigation
- **Photos**: Full-width comparison slider; pinch-to-zoom enabled; landscape orientation encouraged
- **Set Logging**: Optimized keyboard-first interface; quick-add buttons for common weight increments; auto-advance after RPE selection

## Security Best Practices - Mandatory Requirements

### 1. Authentication & Authorization
- **Use managed authentication provider** - No custom authentication implementations; leverage established providers (Auth0, Clerk, Supabase Auth, Firebase Auth)
- **Role-based access control (RBAC)** - Enforce distinct roles: `user` (client), `trainer` (coach), `admin` (platform administrator)
- **Row-level data isolation** - Users can only access their own data; trainers can only access data for their assigned clients; admins have full access within organizational boundaries
- **Never trust client-side role flags** - All authorization checks must be performed server-side with cryptographically verified tokens
- **Session management** - Enforce session expiration (24 hours default); implement token rotation on refresh; revoke tokens on logout
- **Multi-factor authentication (MFA)** - Optional for users, mandatory for trainers and admins

### 2. Data Protection
- **Encryption at rest** - Enable AES-256 encryption for all stored data using database provider's native encryption
- **Encryption in transit** - Enforce HTTPS/TLS 1.3 for all API traffic; reject non-secure connections
- **No secrets in frontend code** - Never store API keys, tokens, or credentials in client-side code or repositories
- **Environment variables** - Use secure environment variable management for all configuration secrets
- **Soft deletes** - Implement soft deletion (archive/deactivate) for all user data; retain for recovery and compliance
- **Data minimization** - Only collect and store data necessary for core functionality
- **PII protection** - Mask sensitive personal information in logs and error messages

### 3. Backups & Recovery
- **Automated daily backups** - Schedule encrypted full database backups every 24 hours
- **Point-in-time recovery (PITR)** - Enable transaction log backups for recovery to any point within retention window (30 days minimum)
- **Geographic separation** - Store backups in separate region or availability zone from primary database
- **Zero-downtime recovery** - Design restore processes that don't require application downtime
- **Backup testing** - Quarterly restoration drills to validate backup integrity
- **Retention policy** - Maintain backups for 90 days; archive critical snapshots for 7 years (compliance)

### 4. Dependency & Package Management
- **Always use latest stable versions** - Keep React, Vite, all UI libraries, and backend frameworks current
- **Automated vulnerability scanning** - Enable Dependabot, Snyk, or equivalent for continuous dependency monitoring
- **Block builds on vulnerabilities** - CI/CD pipeline must fail if critical or high-severity vulnerabilities detected
- **Block deprecated packages** - Prevent builds if dependencies are marked deprecated or unmaintained
- **Audit frequency** - Run `npm audit` or equivalent weekly; address findings within 7 days for critical, 30 days for high-severity
- **Avoid unmaintained libraries** - Remove dependencies with no updates in 2+ years or transferred ownership

### 5. API & Backend Security
- **Input validation & sanitization** - Validate all user inputs against strict schemas (Zod, Joi); sanitize for XSS/injection
- **Rate limiting** - Implement per-endpoint rate limits (e.g., 100 requests/minute per user); stricter limits on auth endpoints (5 login attempts/hour)
- **Prevent mass assignment** - Use explicit allowlists for updatable fields; never accept raw request bodies into database models
- **Generic error messages** - Return user-friendly errors to clients; log detailed stack traces server-side only
- **Request schema enforcement** - Reject requests that don't match expected structure; validate Content-Type headers
- **CORS policy** - Restrict cross-origin requests to known domains; never use wildcard (`*`) in production
- **SQL injection prevention** - Use parameterized queries exclusively; never concatenate user input into SQL strings

### 6. Environment Separation
- **Maintain separate environments** - Development, Staging, Production with isolated databases and configurations
- **Never use production credentials in development** - Generate separate API keys, database credentials, and service accounts per environment
- **Prevent AI access to production** - AI tools (Copilot, ChatGPT) must never access production databases, API keys, or real user data
- **Environment tagging** - Clearly label all environments in UI (corner ribbon, header color) to prevent accidental production changes
- **Access control by environment** - Restrict production access to senior engineers and DevOps; all others use staging

### 7. Logging & Auditing
- **Log security events** - Record all authentication attempts (success/failure), authorization failures, data access, role changes, trainer assignments
- **Audit trainer actions** - Log when trainers view client data, edit programs, send messages, generate AI insights
- **AI suggestion tracking** - Record when AI-generated recommendations are accepted, modified, or rejected by coaches
- **Never log sensitive data** - Exclude passwords, tokens, credit cards, health data (HIPAA), and full API keys from logs
- **Structured logging** - Use JSON format with consistent fields (timestamp, user_id, action, resource, ip_address)
- **Retention & archival** - Retain audit logs for 1 year in hot storage, 7 years in cold storage (compliance)
- **Log monitoring** - Set up alerts for suspicious patterns (repeated auth failures, mass data access, privilege escalation)

### 8. AI Usage Constraints
- **Read-only mode** - AI must operate in read-only mode on production data; cannot execute write operations without human approval
- **AI must not modify** - Authentication logic, encryption implementations, access control rules, or database schemas
- **AI cannot access** - Production secrets, API keys, user passwords, payment details, or PII beyond test data
- **No destructive operations** - AI cannot delete users, purge data, drop tables, or execute irreversible actions
- **Respect access control** - AI-generated suggestions must respect row-level security; cannot suggest exposing data across user boundaries
- **Human-in-the-loop** - All AI-generated coaching insights, program modifications, or client communications require coach review and approval before delivery

### 9. Frontend Security
- **Prevent XSS (Cross-Site Scripting)** - Sanitize all user-generated content before rendering; use React's built-in escaping; avoid `dangerouslySetInnerHTML`
- **Content Security Policy (CSP)** - Implement strict CSP headers blocking inline scripts and restricting resource origins
- **No inline scripts** - Move all JavaScript to external files; use nonces or hashes for necessary inline code
- **Avoid unsafe evaluations** - Never use `eval()`, `Function()`, or `setTimeout(string)`; use safe alternatives
- **CSRF protection** - Use anti-CSRF tokens for state-changing operations; verify Origin/Referer headers
- **Secure cookies** - Set `HttpOnly`, `Secure`, and `SameSite=Strict` flags on session cookies
- **Dependency integrity** - Use Subresource Integrity (SRI) for CDN resources

### 10. Build & Release Safety
- **Automated security checks** - Run linters (ESLint with security plugins), SAST tools (Semgrep), and dependency scans on every commit
- **Pre-release checklist** - Security scan pass, no critical vulnerabilities, all tests passing, code review completed
- **Build failure on critical issues** - CI/CD must block merges if security linters fail or vulnerabilities exceed threshold
- **No direct production deploys** - All changes must go through staging environment first; require approval for prod releases
- **Rollback capability** - Maintain ability to instantly rollback to previous stable version
- **Deployment auditing** - Log who deployed, what changed, when, and from which commit

### 11. Data Ownership & Compliance
- **User data export** - Provide users ability to export all their data in portable format (JSON, CSV) within 48 hours
- **Account deletion (soft delete)** - Users can delete accounts; implement soft delete with 30-day grace period before permanent removal
- **Trainer data boundaries** - Trainers cannot bulk export user data; must get explicit per-client consent for data sharing
- **Clear ownership** - Every data entity must have explicit ownership (user_id, trainer_id); enforce at database constraint level
- **GDPR/CCPA compliance** - Support right to access, right to deletion, right to portability, right to rectification
- **Data retention policies** - Define and enforce how long different data types are retained; auto-purge after expiration
- **Consent management** - Track user consent for data processing activities; allow granular consent withdrawal

### 12. Incident Response
- **Security incident plan** - Document procedures for detecting, responding to, and recovering from security breaches
- **Breach notification** - Process for notifying affected users within 72 hours of confirmed breach (GDPR requirement)
- **Security contacts** - Maintain security@yourdomain.com for vulnerability reports; acknowledge within 24 hours
- **Vulnerability disclosure policy** - Publish responsible disclosure policy; offer bug bounty for critical findings

### 🔒 Non-Negotiable Rule

**Security must be enforced by infrastructure and backend policies, not only by frontend or AI-generated logic.**

- Never rely on frontend validation alone; always validate server-side
- Authorization checks must occur on every API request, not just UI rendering
- Encryption, authentication, and access control are non-negotiable—they cannot be disabled for "convenience" or "debugging"
- When in doubt, default to the most secure option; err on the side of denying access rather than permitting it
