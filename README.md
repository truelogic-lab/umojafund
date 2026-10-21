# Umoja Fund

A trusted digital chama platform where members make small daily contributions, track their financial activity, and receive monthly payouts according to transparent rules.

## Architecture

Frontend: React + Vite + Tailwind CSS
Backend: Django + Django REST Framework
Database: PostgreSQL (Supabase in production, SQLite in dev)
Payments: Safaricom M-Pesa Daraja API
Background jobs: Celery + Redis

## Local development

Backend:

cd umoja-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py seed_accounts
python manage.py ensure_open_period
python manage.py runserver 0.0.0.0:8000

Frontend:

npm install
cp .env.example .env
npm run dev

The frontend runs at http://localhost:5173 and proxies /api to http://localhost:8000.

## Deployment

Frontend: Vercel (vercel.json included)
Backend: Render (umoja-backend/render.yaml included)
Database: Supabase PostgreSQL

## Financial model

Every contribution is recorded in a double-entry ledger. Every payout requires maker-checker approval. Every shilling is auditable.

See umoja-backend/apps/ledger/ for the core financial engine.
