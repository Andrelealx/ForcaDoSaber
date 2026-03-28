# Deploy no Railway com PostgreSQL

## 1) Criar serviços
- Serviço `web`: este repositório Next.js
- Serviço `PostgreSQL`: adicione no mesmo projeto do Railway

## 2) Variáveis do serviço web
Defina no Railway (service `web`):

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
ADMIN_EMAIL=admin@forcadosaber.org.br
ADMIN_NAME=Administrador Força do Saber
ADMIN_PASSWORD=troque-por-uma-senha-forte
SESSION_TTL_DAYS=7
NEXT_PUBLIC_SITE_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}
UPLOAD_DIR=/data/uploads
UPLOAD_PUBLIC_BASE_URL=/api/uploads
```

Se usar domínio próprio, ajuste `NEXT_PUBLIC_SITE_URL` para a URL final.

## 3) Comandos do Railway (service web)
- Build Command:

```bash
npm ci && npx prisma generate && npm run build
```

- Start Command:

```bash
npm run start:railway
```

## 4) Primeiro deploy
- Faça deploy normalmente
- Após subir, rode uma única vez no shell do serviço web:

```bash
npm run db:seed
```

Isso cria usuário admin e dados iniciais.

## 5) Login admin
- Acesse: `/admin/login`
- Use `ADMIN_EMAIL` e `ADMIN_PASSWORD` definidos nas variáveis do Railway.

## 6) Upload de mídia no Railway (importante)
- Crie um **Volume** no serviço web e monte em `/data`.
- Mantenha:
  - `UPLOAD_DIR=/data/uploads`
  - `UPLOAD_PUBLIC_BASE_URL=/api/uploads`
- Isso garante upload persistente e evita falha de permissão/storage efêmero.

### Teste rápido de infraestrutura
- Com login admin ativo, chame:
  - `GET /api/admin/health`
- Esperado:
  - `database.ok = true`
  - `storage.ok = true`

## Observações importantes
- Se preferir continuar em `public/uploads`, use:
  - `UPLOAD_DIR=./public/uploads`
  - `UPLOAD_PUBLIC_BASE_URL=/uploads`
- Em produção, o ideal de longo prazo é storage externo (S3/Cloudinary), mas o fluxo acima já funciona no Railway com volume.
- As migrations antigas de SQLite foram arquivadas em `prisma/migrations_sqlite_archive/` e não devem ser usadas no Railway.
