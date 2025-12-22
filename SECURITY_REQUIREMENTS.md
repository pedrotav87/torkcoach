# Tork Coach - Security Requirements & Implementation Guide

This document outlines mandatory security practices for Tork Coach, a bodybuilding coaching CRM platform handling sensitive client health data, training programs, and coach-client communications.

---

## Table of Contents

1. [Authentication & Authorization](#1-authentication--authorization)
2. [Data Protection](#2-data-protection)
3. [Backups & Recovery](#3-backups--recovery)
4. [Dependency & Package Management](#4-dependency--package-management)
5. [API & Backend Security](#5-api--backend-security)
6. [Environment Separation](#6-environment-separation)
7. [Logging & Auditing](#7-logging--auditing)
8. [AI Usage Constraints](#8-ai-usage-constraints)
9. [Frontend Security](#9-frontend-security)
10. [Build & Release Safety](#10-build--release-safety)
11. [Data Ownership & Compliance](#11-data-ownership--compliance)
12. [Incident Response](#12-incident-response)

---

## 1. Authentication & Authorization

### Requirements

#### ✅ Use Managed Authentication Provider
- **MUST NOT** implement custom authentication logic
- **RECOMMENDED PROVIDERS**: Auth0, Clerk, Supabase Auth, Firebase Auth, AWS Cognito
- **RATIONALE**: Custom auth is error-prone and difficult to secure correctly

#### ✅ Role-Based Access Control (RBAC)
Three distinct roles with clear boundaries:

| Role | Permissions | Access Level |
|------|------------|--------------|
| `user` (Client) | View own workouts, log exercises, submit check-ins, message assigned trainer | Own data only |
| `trainer` (Coach) | View assigned clients, create programs, review check-ins, AI insights | Assigned clients only |
| `admin` (Platform) | Manage trainers, view analytics, configure system settings | Organization-wide |

#### ✅ Row-Level Data Isolation
- Every data entity MUST have ownership (`user_id`, `trainer_id`, `organization_id`)
- Database queries MUST include ownership filters
- Use database-level Row-Level Security (RLS) where possible (Supabase, PostgreSQL)

**Example RLS Policy (Supabase)**:
```sql
-- Clients can only see their own check-ins
CREATE POLICY "Users can view own check-ins"
ON check_ins FOR SELECT
USING (auth.uid() = client_id);

-- Trainers can only see check-ins for assigned clients
CREATE POLICY "Trainers can view assigned client check-ins"
ON check_ins FOR SELECT
USING (
  auth.jwt()->>'role' = 'trainer' 
  AND trainer_id = auth.uid()
);
```

#### ✅ Never Trust Client-Side Role Flags
- **WRONG**: `if (user.role === 'admin') { showAdminPanel() }`
- **CORRECT**: Server validates JWT claims before returning admin data
- Frontend role checks are for UX only; backend enforces security

#### ✅ Session Management
- **Session Expiration**: 24 hours for users, 8 hours for trainers/admins
- **Token Rotation**: Issue new access token on refresh; rotate refresh tokens every 7 days
- **Revocation**: Immediately invalidate tokens on logout; maintain token blacklist
- **Concurrent Sessions**: Limit to 3 active sessions per user; revoke oldest on 4th login

#### ✅ Multi-Factor Authentication (MFA)
- **Optional** for clients (encourage but don't mandate)
- **Mandatory** for trainers and admins (enforce during onboarding)
- **Supported Methods**: TOTP (Authenticator apps), SMS (backup only)

---

## 2. Data Protection

### Requirements

#### ✅ Encryption at Rest
- **Database**: Enable AES-256 encryption at database level
  - AWS RDS: Enable encryption on instance creation
  - Supabase/PostgreSQL: Enabled by default on paid plans
- **File Storage**: Enable encryption for user uploads (progress photos, documents)
  - AWS S3: Use SSE-KMS or SSE-S3
  - Cloudflare R2: Enable encryption in bucket settings

#### ✅ Encryption in Transit
- **HTTPS/TLS 1.3**: Enforce for all API requests; reject HTTP
- **Certificate Management**: Use Let's Encrypt or managed certificates; auto-renewal
- **HSTS Header**: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`

#### ✅ No Secrets in Frontend Code
**NEVER commit or deploy**:
- API keys, database credentials, JWT secrets
- Third-party service tokens (OpenAI, Stripe, SendGrid)
- Encryption keys, signing keys

**Detection**: Use `git-secrets` or `truffleHog` to scan commits

#### ✅ Environment Variables
- **Development**: Use `.env.local` (in `.gitignore`)
- **Production**: Use platform-specific secret management
  - Vercel: Environment Variables UI (encrypted at rest)
  - AWS: Secrets Manager or Parameter Store
  - Self-hosted: HashiCorp Vault, Doppler

#### ✅ Soft Deletes
- Implement `deleted_at` timestamp instead of hard deletes
- Archive data for 30 days before permanent removal (user-initiated deletions)
- Maintain trainer-client relationships even after account deletion (compliance/audit trail)

```typescript
// Example soft delete implementation
async function deleteUser(userId: string) {
  await db.users.update({
    where: { id: userId },
    data: { 
      deleted_at: new Date(),
      email: `deleted_${userId}@tombstone.local`, // Free up email for re-registration
      status: 'deleted'
    }
  })
}
```

#### ✅ Data Minimization
- Only collect data necessary for core functionality
- Don't request SSN, full DOB, or medical history unless legally required
- Allow users to skip optional fields

#### ✅ PII Protection
- Mask PII in logs: `email: "u***r@example.com"`, `ip: "192.168.***"`
- Redact from error messages: Never show raw database errors to users

---

## 3. Backups & Recovery

### Requirements

#### ✅ Automated Daily Backups
- **Frequency**: Full backup every 24 hours at 2 AM UTC
- **Encryption**: Backups must be encrypted with separate key from production data
- **Verification**: Automated integrity checks post-backup

#### ✅ Point-in-Time Recovery (PITR)
- **Retention**: 30 days minimum, 90 days recommended
- **Granularity**: Transaction log backups every 5-15 minutes
- **Use Cases**: Recover from accidental data deletion, corruption, or ransomware

**Provider Setup**:
- **AWS RDS**: Enable automated backups + PITR in console
- **Supabase**: PITR available on Pro plan and above
- **Self-hosted PostgreSQL**: Use `wal-e` or `pgBackRest`

#### ✅ Geographic Separation
- Store backups in different region than primary database
- Protects against regional outages, natural disasters, data center failures

**Example**:
- Primary: `us-east-1`
- Backup: `us-west-2`

#### ✅ Zero-Downtime Recovery
- Use read replicas for failover
- Test restore to staging environment (not production)
- Document restore procedures (runbook)

#### ✅ Backup Testing
- **Quarterly Drills**: Restore full backup to staging; validate data integrity
- **Metrics**: Time to restore, data completeness, application functionality post-restore

#### ✅ Retention Policy
- **Hot Storage** (fast access): 90 days
- **Cold Storage** (archived): 7 years for compliance (HIPAA, GDPR)
- **Automated Lifecycle**: Move backups to cold storage after 90 days

---

## 4. Dependency & Package Management

### Requirements

#### ✅ Always Use Latest Stable Versions
- Update dependencies quarterly at minimum
- Track release notes for major versions before upgrading
- Prioritize security patches (apply within 7 days)

#### ✅ Automated Vulnerability Scanning
**Tools**:
- **Dependabot** (GitHub): Auto-creates PRs for vulnerable dependencies
- **Snyk**: Continuous monitoring with Slack/email alerts
- **npm audit**: Run on every commit via pre-commit hook

**Configuration** (`.github/dependabot.yml`):
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
      - "security"
```

#### ✅ Block Builds on Vulnerabilities
**CI/CD Check** (GitHub Actions):
```yaml
- name: Security Audit
  run: |
    npm audit --audit-level=high
    if [ $? -ne 0 ]; then
      echo "Critical vulnerabilities found. Build blocked."
      exit 1
    fi
```

**Thresholds**:
- **Critical**: Block build immediately; fix before merge
- **High**: Block build; fix within 7 days
- **Moderate**: Warning only; fix within 30 days
- **Low**: Informational; address in next maintenance cycle

#### ✅ Block Deprecated Packages
- Use tools like `npm-check` or `depcheck` to find deprecated dependencies
- Replace or remove deprecated packages before they become security risks

#### ✅ Avoid Unmaintained Libraries
**Red Flags**:
- No commits in 2+ years
- Unresponsive to critical security issues
- Ownership transferred to unknown maintainer

**Action**: Find actively maintained alternatives; budget time for migration

---

## 5. API & Backend Security

### Requirements

#### ✅ Input Validation & Sanitization
**Validation** (using Zod):
```typescript
import { z } from 'zod'

const CreateWorkoutSchema = z.object({
  clientId: z.string().uuid(),
  exercises: z.array(z.object({
    name: z.string().min(1).max(100),
    sets: z.number().int().min(1).max(10),
    reps: z.number().int().min(1).max(100),
    weight: z.number().min(0).max(1000)
  })).max(20)
})

// In API route
const result = CreateWorkoutSchema.safeParse(req.body)
if (!result.success) {
  return res.status(400).json({ error: result.error.format() })
}
```

**Sanitization** (for rich text fields):
```typescript
import DOMPurify from 'isomorphic-dompurify'

const sanitizedFeedback = DOMPurify.sanitize(coachFeedback, {
  ALLOWED_TAGS: ['b', 'i', 'u', 'em', 'strong', 'p', 'br'],
  ALLOWED_ATTR: []
})
```

#### ✅ Rate Limiting
**Implementation** (using `express-rate-limit`):
```typescript
import rateLimit from 'express-rate-limit'

// Standard endpoints
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many requests, please try again later'
})

// Authentication endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 login attempts per hour
  skipSuccessfulRequests: true
})

app.use('/api/', apiLimiter)
app.use('/api/auth/login', authLimiter)
```

#### ✅ Prevent Mass Assignment
**WRONG**:
```typescript
// Vulnerable: User can set any field including 'role'
await db.users.update({
  where: { id: userId },
  data: req.body // ⚠️ DANGER
})
```

**CORRECT**:
```typescript
// Explicit allowlist
const { name, email, bio } = req.body
await db.users.update({
  where: { id: userId },
  data: { name, email, bio } // Only allowed fields
})
```

#### ✅ Generic Error Messages
**WRONG**:
```typescript
catch (error) {
  res.status(500).json({ error: error.message, stack: error.stack }) // ⚠️ Leaks internals
}
```

**CORRECT**:
```typescript
catch (error) {
  logger.error('Database query failed', { error, userId, query })
  res.status(500).json({ error: 'An unexpected error occurred. Please try again.' })
}
```

#### ✅ SQL Injection Prevention
**ALWAYS use parameterized queries**:
```typescript
// ✅ Safe (parameterized)
const clients = await db.query(
  'SELECT * FROM clients WHERE trainer_id = $1',
  [trainerId]
)

// ⚠️ VULNERABLE (string concatenation)
const clients = await db.query(
  `SELECT * FROM clients WHERE trainer_id = '${trainerId}'`
)
```

---

## 6. Environment Separation

### Requirements

#### ✅ Maintain Separate Environments

| Environment | Purpose | Database | API Keys | Users |
|------------|---------|----------|----------|-------|
| **Development** | Local testing | Local/seed data | Dev keys | Test accounts |
| **Staging** | Pre-production validation | Staging replica | Staging keys | Realistic test data |
| **Production** | Live users | Production DB | Production keys | Real users |

#### ✅ Never Use Production Credentials in Development
- Each environment has separate database credentials
- Separate API keys for third-party services (Stripe test mode, OpenAI dev org)
- Different OAuth redirect URIs for each environment

#### ✅ Prevent AI Access to Production
- AI coding assistants (Copilot, Cursor) must never connect to production databases
- Use mock data generators for development
- Implement IP allowlists on production databases

#### ✅ Environment Tagging
**Visual Indicators**:
```tsx
// Add environment banner in development/staging
{process.env.NODE_ENV !== 'production' && (
  <div className="bg-warning text-warning-foreground text-center py-1 text-sm font-semibold">
    🚧 {process.env.NODE_ENV.toUpperCase()} ENVIRONMENT 🚧
  </div>
)}
```

---

## 7. Logging & Auditing

### Requirements

#### ✅ Log Security Events
**Events to Log**:
- Authentication: Login success/failure, logout, password reset, MFA events
- Authorization: Permission denied errors, role changes
- Data Access: Client profile views, check-in reviews, AI insight generation
- Configuration: System setting changes, feature flag toggles

**Example Log Entry**:
```json
{
  "timestamp": "2024-01-15T14:32:00Z",
  "level": "info",
  "event": "client_profile_viewed",
  "actor_id": "trainer_123",
  "actor_role": "trainer",
  "resource_type": "client",
  "resource_id": "client_456",
  "ip_address": "192.168.1.100",
  "user_agent": "Mozilla/5.0..."
}
```

#### ✅ Never Log Sensitive Data
**EXCLUDE**:
- Passwords (even hashed—no need to log)
- Session tokens, JWTs, API keys
- Credit card numbers, CVV codes
- Full SSN, passport numbers
- Health conditions, injury details (HIPAA)

**REDACT** when necessary:
```typescript
function sanitizeForLog(data: any) {
  const sanitized = { ...data }
  if (sanitized.email) sanitized.email = maskEmail(sanitized.email)
  if (sanitized.password) delete sanitized.password
  if (sanitized.token) sanitized.token = sanitized.token.slice(0, 8) + '...'
  return sanitized
}
```

#### ✅ Retention & Archival
- **Hot Storage** (searchable): 1 year
- **Cold Storage** (archived): 7 years for compliance
- **Automated Rotation**: Use log aggregation tools (Datadog, Splunk, ELK)

---

## 8. AI Usage Constraints

### Requirements

#### ✅ Read-Only Mode
- AI can query databases but cannot execute `INSERT`, `UPDATE`, `DELETE` directly
- All AI-suggested changes require explicit coach approval

#### ✅ AI Must Not Modify
**Protected Systems**:
- Authentication logic (login, signup, password reset)
- Encryption implementations
- Access control policies (RLS, RBAC)
- Database schemas (migrations)
- Payment processing logic

#### ✅ Human-in-the-Loop
**All AI outputs require review**:
```typescript
async function generateCheckInInsights(checkIn: CheckIn) {
  const aiInsights = await aiService.analyzeCheckIn(checkIn)
  
  // Store as draft, not sent to client yet
  await db.checkInDrafts.create({
    data: {
      checkInId: checkIn.id,
      aiGeneratedInsights: aiInsights,
      status: 'pending_review', // Coach must review before sending
      generatedAt: new Date()
    }
  })
  
  return aiInsights
}
```

**Coach Review UI**:
- Display AI insights as editable draft
- Allow coaches to modify, delete, or add sections
- Require explicit "Approve & Send" action

---

## 9. Frontend Security

### Requirements

#### ✅ Prevent XSS
**React Default Escaping** (automatic):
```tsx
// ✅ Safe: React escapes by default
<div>{userInput}</div>
```

**Sanitize Rich Text**:
```tsx
import DOMPurify from 'isomorphic-dompurify'

function CoachFeedback({ html }: { html: string }) {
  const sanitized = DOMPurify.sanitize(html)
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}
```

#### ✅ Content Security Policy (CSP)
**Headers** (configure in hosting platform):
```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  style-src 'self' 'nonce-{random}' https://fonts.googleapis.com;
  img-src 'self' data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://api.yourdomain.com;
  frame-ancestors 'none';
```

#### ✅ Secure Cookies
**Configuration**:
```typescript
res.cookie('session', token, {
  httpOnly: true,      // Not accessible via JavaScript
  secure: true,        // HTTPS only
  sameSite: 'strict',  // CSRF protection
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  path: '/'
})
```

---

## 10. Build & Release Safety

### Requirements

#### ✅ Automated Security Checks
**GitHub Actions Workflow**:
```yaml
name: Security Checks
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint Security Plugin
        run: npm run lint:security
      
      - name: Dependency Audit
        run: npm audit --audit-level=high
      
      - name: SAST Scan
        uses: returntocorp/semgrep-action@v1
      
      - name: Secret Scanning
        run: npx truffleHog --regex --entropy=False .
```

#### ✅ Pre-Release Checklist
- [ ] All security checks passing
- [ ] No critical or high vulnerabilities
- [ ] Code review completed by senior engineer
- [ ] Tested in staging environment
- [ ] Database migrations tested
- [ ] Rollback plan documented

---

## 11. Data Ownership & Compliance

### Requirements

#### ✅ User Data Export
**Endpoint** (`/api/user/export`):
```typescript
async function exportUserData(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } })
  const workouts = await db.workouts.findMany({ where: { clientId: userId } })
  const checkIns = await db.checkIns.findMany({ where: { clientId: userId } })
  const messages = await db.messages.findMany({ where: { clientId: userId } })
  
  return {
    personal_info: user,
    workouts,
    check_ins: checkIns,
    messages,
    exported_at: new Date().toISOString()
  }
}
```

#### ✅ Account Deletion
**30-Day Grace Period**:
```typescript
async function requestAccountDeletion(userId: string) {
  await db.user.update({
    where: { id: userId },
    data: {
      deletion_requested_at: new Date(),
      status: 'pending_deletion'
    }
  })
  
  // Schedule permanent deletion after 30 days
  await scheduleJob({
    runAt: addDays(new Date(), 30),
    job: 'permanent_delete_user',
    data: { userId }
  })
}
```

---

## 12. Incident Response

### Requirements

#### ✅ Security Incident Plan
1. **Detect**: Monitoring alerts trigger incident
2. **Contain**: Disable affected accounts/endpoints
3. **Investigate**: Review logs, identify scope
4. **Remediate**: Patch vulnerability, rotate credentials
5. **Notify**: Inform affected users within 72 hours (GDPR)
6. **Post-Mortem**: Document root cause, prevention measures

#### ✅ Breach Notification
**72-Hour Rule** (GDPR):
- Send email to affected users
- Explain what data was compromised
- Describe steps taken to prevent recurrence
- Offer resources (credit monitoring if applicable)

#### ✅ Security Contact
- **Email**: `security@torkcoach.com`
- **Response SLA**: Acknowledge within 24 hours
- **Disclosure**: Publish security advisories after patch deployed

---

## 🔒 Non-Negotiable Rule

**Security must be enforced by infrastructure and backend policies, not only by frontend or AI-generated logic.**

- Frontend role checks are for UX only; backend enforces authorization
- Encryption, authentication, and access control cannot be disabled
- When in doubt, deny access rather than permit it
- Security is everyone's responsibility, not just the security team

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2024-01-15 | Tork Coach Team | Initial security requirements |
