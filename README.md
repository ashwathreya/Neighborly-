# Animal Sitting - Monorepo

This is an MVP scaffold for a pet-sitting marketplace with:
- Next.js web app (`apps/web`)
- Express + TypeScript API (`apps/api`)

## Prerequisites
- Node.js 18+ (download from https://nodejs.org/)
- After installing Node.js, **restart your terminal/PowerShell** so npm is recognized

## Troubleshooting

### PowerShell Execution Policy Error
If you see: `npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled`

**Quick fix (for current session only):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
npm install
```

**Permanent fix (requires admin PowerShell):**
```powershell
# Run PowerShell as Administrator, then:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Alternative: Use Command Prompt instead**
- Open Command Prompt (cmd.exe) instead of PowerShell
- Run `npm install` there (no execution policy restrictions)

### npm command not found
- Make sure Node.js is installed: https://nodejs.org/
- **Close and reopen your terminal** after installing Node.js
- Verify installation: `node -v` and `npm -v` should show version numbers

## Setup
```bash
npm install
```

## Development
Run both apps together:
```bash
npm run dev
```
- Web: http://localhost:3000
- API: http://localhost:4000

Optional environment variable for the web app to reach the API:
```bash
# apps/web
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## API Endpoints (MVP)
- `GET /sitters` - list sitters with optional `petType`
- `GET /sitters/:id` - sitter profile
- `GET /bookings/quote?days=3&baseRate=40` - transparent pricing
- `POST /bookings` - create a booking (in-memory)
- `POST /auth/login` - placeholder login
- `POST /auth/register` - placeholder register
- `POST /reviews` - create review and update sitter rating
- `GET/POST /messages` - simple messaging (polling)
- `POST /payments/intent` - placeholder Stripe intent
- `POST /payments/payout` - placeholder payout

## Database
- `db/schema.sql` documents the intended PostgreSQL schema.
- Current API uses in-memory arrays for simplicity.

## Notes on Plan Alignment
- Trust & Safety: verified sitters, policies, and structured reviews are represented in data and UI copy; background checks to integrate later.
- Communication: messaging MVP included; real-time and notifications to follow.
- Booking Reliability: price breakdown + policy surfaced; calendar sync to follow.
- Pricing Transparency: quote endpoint returns breakdown and cancellation policy.

## Build
```bash
npm run build
```

## Production
Use a process manager or containerize both apps; configure envs and a reverse proxy (e.g., Nginx) to route `/api`.

```text
/apps
  /api        # Express API
  /web        # Next.js web
/db
  schema.sql
```
