# Deploy (currentProject2 + origProject1 config)

## Ubuntu: febedev / febeprod

Set `cdcurrent` to this repo root (or your clone path on the server), then use the aliases below.

**One-time alias setup** (add to `~/.bashrc` on each webserver, e.g. xbox3–xbox7):

```bash
# Point to this project root (e.g. after git clone)
alias cdcurrent='cd ~/code/adaptCurrentToOrig/currentProject2'

alias feclean='cdcurrent; cd ./fe; sudo rm -rfv ./node_modules; sudo rm -rfv ./dist; sudo rm -rfv package-lock.json'
alias beclean='cdcurrent; cd ./be; rm -rf node_modules; rm -rf package-lock.json'
alias resetpm2='clear; pm2 stop all; pm2 delete all'

alias cleancompilebuildfedev='feclean; cdcurrent && cd ./fe && npm i && npm run builddev'
alias cleancompileresetrunbedev='beclean; cdcurrent && cd ./be && npm i && pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save'

alias febedev='cleancompilebuildfedev; cleancompileresetrunbedev'
```

**Production:**

```bash
alias cleancompilebuildfeprod='feclean; cdcurrent && cd ./fe && npm i && npm run buildprod'
alias cleancompileresetrunbeprod='beclean; cdcurrent && cd ./be && npm i && pm2 kill && rm -rf ~/.pm2 && pm2 list && npm run pm2:start && pm2 save'
alias febeprod='cleancompilebuildfeprod; cleancompileresetrunbeprod'
```

**Flow:** Pull code → `febedev` (or `febeprod`) → app runs under PM2 on port 40000. HAProxy on xbox2 load-balances vsingles.club to these backends.

**Production (vsingles.club) – API URL:** On **Ubuntu**, use `npm run builddev` or `npm run buildprod` (they set `VITE_API_BASE_URL=http://vsingles.club`). On **Mac**, use `npm run build` (it uses `fe/.env`, where you keep `VITE_API_BASE_URL=http://localhost:40000`).

## Mac: febemac / runmac

currentProject2 uses **`server_be.js`** (no `bin/www`). Point aliases at this repo and start the backend with `npm start` (or `node server_be.js`).

**One-time alias setup** (add to `~/.bashrc` or `~/.zshrc` on Mac):

```bash
# Point to this project root (currentProject2)
alias cdcurrent='cd ~/code/adaptCurrentToOrig/currentProject2'

# Same path for Mac fe/be clean (do not use cdorig = latestgreatest)
alias feclean='cdcurrent && cd ./fe && rm -rf ./node_modules ./dist package-lock.json'
alias beclean='cdcurrent && cd ./be && rm -rf node_modules package-lock.json'

kill40000() {
  pids=$(lsof -ti :40000)
  if [ -z "$pids" ]; then echo "No process is using port 40000"; else echo "Killing: $pids"; kill -9 $pids; fi
}
alias openurl='open -a "Google Chrome" http://localhost:40000'

# Build fe + be (Mac: npm run build uses fe/.env with localhost:40000), then start backend and open browser
alias febemac='clear; feclean && cdcurrent && cd ./fe && npm i && npm run build && ls ./dist && beclean && cdcurrent && cd ./be && npm i && kill40000 && npm start & openurl'

# Just start backend and open browser (after code already built)
alias runmac='clear; cdcurrent && cd ./be && kill40000 && openurl && npm start &'
```

**Why your old aliases failed:**

- `cdorig` points to `~/code/latestgreatest`, which doesn’t exist on your Mac; use **`cdcurrent`** pointing at **currentProject2**.
- `runmac` used `cd /be` (absolute `/be`) and `node ./bin/www`; currentProject2 has no `bin/www`. Use **`cd ./be`** and **`npm start`** (runs `server_be.js`).

**“Database connection test failed” and login fail**

Both usually share the same cause: the app can’t reach PostgreSQL with the settings in `be/.env`. The startup test runs `SELECT NOW()` and logs “Database connection test failed” if it fails. Login then fails because the same pool can’t run the login query. Fix by making `be/.env` match your Postgres (host, port, database name, user, password). After fixing, restart the backend and try login again.

**“Database connection test failed” on Mac**

The backend expects PostgreSQL and a `be/.env` file. On Mac:

1. **Install & start PostgreSQL** (if needed):
   ```bash
   brew install postgresql@16
   brew services start postgresql@16
   # or: brew services start postgresql
   ```

2. **Create `be/.env`** from the example:
   ```bash
   cd ~/code/adaptCurrentToOrig/currentProject2/be
   cp .env.example .env
   ```
   Edit `.env`: set `DB_NAME` (e.g. `postgres` or a DB you create), `DB_USER`, and `DB_PASSWORD` if your Postgres uses a password.

3. **Create a database** (if not using default `postgres`):
   ```bash
   createdb yourdbname
   # then set DB_NAME=yourdbname in be/.env
   ```

4. Run **`runmac`** or **`febemac`** again. The server will still start if the DB test fails; API routes that need the DB will error until Postgres and `.env` are correct.

## Frontend scripts

- `npm run builddev` and `npm run buildprod` both run `vite build` so the aliases work without changes.
- If your frontend uses **yarn**, run `yarn install` and `yarn build` (or add `builddev`/`buildprod` and use yarn in the aliases).

## Backend

- `npm run pm2:start` starts the API from `ecosystem.config.cjs` (2 instances, port 40000).
- Ensure `be/.env` exists (copy from `be/.env.example`) with DB and other vars per server.

## Test login (login / password)

The app uses the **`singles`** table (not `users`) for login: **email** and **password_hash**. Login supports both bcrypt hashes and plain-text passwords (for dev).

**If login still fails after DB connects:** The app uses the database named in `be/.env` as **DB_NAME**. If you ran `select * from user_summary` in the **vsingles** database but `DB_NAME=postgres`, the app is querying the **postgres** database (different data). Set **DB_NAME=vsingles** (or whichever DB has your `singles` table) in `be/.env` and restart the backend.

**Option A – Set a known plain password for an existing email** (e.g. in `vsingles` DB):

```bash
psql -h 127.0.0.1 -p 50010 -U postgres -d vsingles -c "UPDATE singles SET password_hash = 'test123' WHERE email = 'phoebe@example.com';"
```

Then log in with:

- **Email:** `phoebe@example.com`
- **Password:** `test123`

(Use your DB host/port from `be/.env`: e.g. `-h 127.0.0.1 -p 5432` if Postgres is local on default port.)

**Option B – Use founderceo@vsingles.club**

If that email exists in **`singles`**, set a known password:

```bash
psql -h 127.0.0.1 -p 50010 -U postgres -d vsingles -c "UPDATE singles SET password_hash = 'bbbb' WHERE email = 'founderceo@vsingles.club';"
```

Then log in with **founderceo@vsingles.club** / **bbbb**.  
If `founderceo@vsingles.club` is only in **`users`** (not in `singles`), add a row to `singles` or use Option A with an email that exists in `singles`.

## Verify (command line)

**On a webserver (e.g. xbox3) – backend on this host:**

```bash
curl -s http://localhost:40000/
# expect: {"status":"ok"}

curl -s http://localhost:40000/health
# expect: {"status":"ok"}
```

**From any machine – direct to a webserver (no HAProxy):**

```bash
curl -s http://192.168.222.203:40000/
curl -s http://192.168.222.204:40000/
# ... 205, 206, 207
```

**Through HAProxy / vsingles.club (HTTPS):**

```bash
curl -s https://vsingles.club/
# expect: {"status":"ok"} or HTML depending on HAProxy routing

curl -sI https://vsingles.club/
# check HTTP status (200, 301, etc.)
```

**PM2 on a webserver:**

```bash
pm2 list
pm2 logs
```
