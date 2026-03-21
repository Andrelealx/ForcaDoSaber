# Módulo Administrativo - Força do Saber

## 1. Stack e segurança
- Banco de dados: SQLite com Prisma (`prisma/schema.prisma`)
- Autenticação: sessão em cookie HTTP-only (`fs_admin_session`) + tabela `Session`
- Senha: hash seguro com `bcryptjs`
- Proteção de rotas: `middleware.ts` + checagem server-side em `/admin/(panel)/layout.tsx`
- Upload de mídia: rotas protegidas em `/api/admin/upload` e `/api/admin/media`

## 2. Como executar
1. Instale dependências:
   - `npm install`
2. Configure variáveis de ambiente:
   - copie `.env.example` para `.env` e ajuste `ADMIN_PASSWORD`
3. Aplique schema e seed:
   - `npx prisma migrate dev --name init_admin_module`
   - `npx prisma db seed`
4. Rode o projeto:
   - `npm run dev`

## 3. Acesso ao painel
- URL: `/admin/login`
- Credenciais iniciais (seed):
  - `ADMIN_EMAIL` (padrão: `admin@forcadosaber.org.br`)
  - `ADMIN_PASSWORD` (definida no `.env`)

## 4. Módulos disponíveis
- Dashboard: `/admin`
- Publicações: `/admin/publicacoes`
- Histórias: `/admin/historias`
- Parceiros: `/admin/parceiros`
- Galeria: `/admin/galeria`
- Mídia: `/admin/midia`
- Indicadores: `/admin/indicadores`
- Páginas institucionais: `/admin/paginas`
- Configurações: `/admin/configuracoes`
- Perfil: `/admin/perfil`

## 4.1 Recursos implementados por módulo
- Publicações: CRUD completo, slug único automático, status rascunho/publicado, destaque na home, imagem de capa, galeria, filtro por status/categoria, busca, visualização interna e arquivamento.
- Histórias: CRUD completo com foto, curso, instituição, conquista, ano, ordenação, destaque e status de publicação.
- Parceiros: CRUD completo com logo, tipo, link externo, status ativo/inativo e ordenação.
- Galeria: CRUD completo de álbuns com múltiplas imagens, categoria, destaque, status e ordenação.
- Indicadores: criação/edição/remoção de métricas dinâmicas usadas na Home e na página de Impacto.
- Páginas institucionais: criação, edição e remoção de blocos estratégicos (incluindo Home e Quem Somos).
- Mídia: upload seguro, listagem, busca, cópia de URL e remoção de arquivos.
- Configurações: identidade do site, contatos, redes sociais, links institucionais, SEO básico global e gestão de usuários admin.
- Perfil: edição de nome/e-mail e alteração de senha com validação da senha atual.

## 5. Integração com site público
- Home usa conteúdos editáveis (`PageBlock`), indicadores (`Indicator`) e história destaque (`Story`)
- Página `Histórias` usa depoimentos publicados (`Story`) e galerias dinâmicas (`GalleryAlbum`)
- Página `Parceiros` usa parceiros ativos (`Partner`)
- Página `Impacto` usa indicadores dinâmicos (`Indicator`)
- Página `Publicações` e detalhe (`/publicacoes/[slug]`) usam `Publication`
- Layout global usa configurações dinâmicas de identidade/contato/SEO (`SiteSetting`)

## 6. Estrutura de dados principal
- `User`, `Session`
- `Publication`, `PublicationImage`
- `Story`
- `Partner`
- `GalleryAlbum`, `GalleryImage`
- `Indicator`
- `PageBlock`
- `SiteSetting`
