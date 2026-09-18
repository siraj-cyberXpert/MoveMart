# MoveMart Full-Stack MVP

A runnable moving-service marketplace prototype with:
- Landing page
- Customer signup/login
- Provider signup/login
- Admin login
- Customer dashboard
- Provider dashboard
- Admin panel
- Move request creation
- Provider quotations
- Quote acceptance / booking
- Basic API backend
- Local in-memory data storage

## Run locally
1. Install Node.js 18+
2. In this folder run: `npm install`
3. Run: `npm start`
4. Open `http://localhost:3000`

## Important production notes
This is a deployable MVP/prototype, not a production marketplace. Data is stored in memory and resets when the server restarts. Before real public use, add a persistent database, secure authentication/OTP, password hashing, authorization middleware, file storage, payment gateway, official WhatsApp Business API, validation/rate limiting, HTTPS, backups, logging, and legal/privacy pages.

## Deployment
Use a Node.js hosting service (not a static-only Netlify site) because this package includes an Express backend. Set the start command to `npm start`.
