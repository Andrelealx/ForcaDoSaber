export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "InÃ­cio", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "HistÃ³rias", href: "/historias" },
  { label: "Como Funciona", href: "/#como-funciona" },
  { label: "Impacto", href: "/#impacto" },
  { label: "Contato", href: "/contato" },
];

export const credibilityPillars = [
  "AtuaÃ§Ã£o local em Guapimirim-RJ",
  "Rede de apoio educacional ativa",
  "Parcerias para ampliar oportunidades",
];

export const impactMetrics = [
  { value: 248, suffix: "+", label: "Bolsas integrais concedidas" },
  { value: 80, suffix: "+", label: "Oportunidades geradas" },
  { value: 86, suffix: "%", label: "PermanÃªncia estudantil apoiada" },
  { value: 34, suffix: "+", label: "Parcerias mobilizadas" },
];

export const impactHighlights = [
  {
    title: "Apoio educacional contÃ­nuo",
    description:
      "OrientaÃ§Ã£o prÃ¡tica, mentoria e incentivo para que cada estudante avance com consistÃªncia e planejamento.",
  },
  {
    title: "TransformaÃ§Ã£o social real",
    description:
      "EducaÃ§Ã£o como estratÃ©gia de mobilidade social e fortalecimento da dignidade das famÃ­lias de Guapimirim.",
  },
  {
    title: "Rede comunitÃ¡ria ativa",
    description:
      "ConexÃ£o entre alunos, lideranÃ§as, apoiadores e instituiÃ§Ãµes para ampliar resultados coletivos e sustentÃ¡veis.",
  },
];

export const howItWorksSteps = [
  {
    title: "Quem pode participar",
    description:
      "Moradores de Guapimirim com interesse em crescimento acadÃªmico e profissional, especialmente estudantes em fase de decisÃ£o educacional.",
  },
  {
    title: "InscriÃ§Ã£o e critÃ©rios",
    description:
      "O ingresso ocorre por cadastro orientado, considerando contexto social, comprometimento com os estudos e alinhamento com os objetivos do projeto.",
  },
  {
    title: "Acompanhamento personalizado",
    description:
      "Cada estudante recebe orientaÃ§Ã£o sobre trilha educacional, organizaÃ§Ã£o da rotina de estudos e acesso a oportunidades.",
  },
  {
    title: "Apoio social e conexÃµes",
    description:
      "O projeto aproxima alunos de bolsas, parceiros, cursos e agentes pÃºblicos para ampliar chances concretas de desenvolvimento.",
  },
];

export const values = [
  "EducaÃ§Ã£o como instrumento de liberdade e progresso",
  "Compromisso com resultados concretos para a comunidade",
  "Acolhimento, escuta e respeito a cada histÃ³ria",
  "Parcerias que multiplicam impacto social",
];

export const partnerGroups = [
  "Empresas locais e regionais",
  "Faculdades e instituiÃ§Ãµes de ensino",
  "Apoiadores individuais e lideranÃ§as comunitÃ¡rias",
  "Agentes pÃºblicos e parceiros sociais",
];
export const studentCardPartnershipPillars = [
  "Descontos para alunos com o Cartão do Aluno Força do Saber",
  "Comércio local engajado com educação e transformação social",
  "Parcerias com visibilidade institucional no site do projeto",
];

export type StudentCardPartner = {
  name: string;
  segment: string;
  benefit: string;
  location: string;
};

export const studentCardPartners: StudentCardPartner[] = [
  {
    name: "Estabelecimento parceiro 01",
    segment: "Alimentação",
    benefit: "Até 10% de desconto com Cartão do Aluno",
    location: "Guapimirim - RJ",
  },
  {
    name: "Estabelecimento parceiro 02",
    segment: "Saúde e bem-estar",
    benefit: "Condições especiais em serviços selecionados",
    location: "Guapimirim - RJ",
  },
  {
    name: "Estabelecimento parceiro 03",
    segment: "Material escolar",
    benefit: "Desconto em itens essenciais para estudo",
    location: "Guapimirim - RJ",
  },
  {
    name: "Estabelecimento parceiro 04",
    segment: "Cursos e capacitação",
    benefit: "Benefícios em cursos livres e extensões",
    location: "Guapimirim - RJ",
  },
  {
    name: "Estabelecimento parceiro 05",
    segment: "Serviços gerais",
    benefit: "Tabela diferenciada para estudantes credenciados",
    location: "Guapimirim - RJ",
  },
  {
    name: "Estabelecimento parceiro 06",
    segment: "Cultura e lazer",
    benefit: "Descontos em atividades culturais selecionadas",
    location: "Guapimirim - RJ",
  },
];

export const founderBiography = [
  "JosÃ© Augusto Ã© o idealizador do Projeto ForÃ§a do Saber, iniciativa criada com o propÃ³sito de transformar vidas por meio da educaÃ§Ã£o e ampliar o acesso de moradores de Guapimirim a oportunidades reais de crescimento acadÃªmico e profissional.",
  "Com visÃ£o voltada para o impacto social, desenvolveu o projeto com base na crenÃ§a de que a educaÃ§Ã£o Ã© uma das ferramentas mais poderosas para mudar histÃ³rias, abrir caminhos e construir um futuro melhor para a populaÃ§Ã£o.",
  "Sob sua lideranÃ§a, o ForÃ§a do Saber se consolidou como uma referÃªncia local de incentivo Ã  educaÃ§Ã£o, oferecendo apoio, orientaÃ§Ã£o e oportunidades para estudantes que desejam ingressar no ensino superior e transformar sua realidade por meio do conhecimento.",
];

export const founderPillars = [
  "LideranÃ§a com visÃ£o social e foco em resultados concretos",
  "Compromisso com educaÃ§Ã£o como ferramenta de transformaÃ§Ã£o",
  "AtuaÃ§Ã£o prÃ³xima da comunidade e das famÃ­lias de Guapimirim",
];

export const faqItems = [
  {
    question: "Quem pode procurar o projeto?",
    answer:
      "Estudantes, famÃ­lias, parceiros institucionais e apoiadores que compartilham o compromisso com o desenvolvimento educacional em Guapimirim.",
  },
  {
    question: "Como apoiar o Projeto ForÃ§a do Saber?",
    answer:
      "Ã‰ possÃ­vel apoiar com bolsas, mentoria, estrutura, patrocÃ­nio, divulgaÃ§Ã£o e conexÃµes com oportunidades acadÃªmicas e profissionais.",
  },
  {
    question: "Como iniciar uma conversa institucional?",
    answer:
      "VocÃª pode enviar uma mensagem pelo formulÃ¡rio ou falar diretamente pelo WhatsApp para alinhar a melhor forma de colaboraÃ§Ã£o.",
  },
];

export const contactInfo = {
  whatsappLabel: "WhatsApp: (21) 98318-7863",
  whatsappUrl: "https://wa.me/5521983187863",
  instagramLabel: "@projetoforcadosaberng",
  instagramUrl: "https://www.instagram.com/projetoforcadosaberng/",
  localReference: "Guapimirim - RJ | Atendimento presencial mediante agendamento",
  email: "contato@forcadosaber.org.br",
};

export type StudentTestimonial = {
  name: string;
  title: string;
  summary: string;
  quote: string;
  story: string[];
  primaryPhoto: {
    src: string;
    alt: string;
    caption: string;
  };
  supportingPhotos?: Array<{
    src: string;
    alt: string;
  }>;
};

export const studentTestimonials: StudentTestimonial[] = [
  {
    name: "Thiago de Oliveira Machado",
    title: "GestÃ£o de Recursos Humanos | Bolsista do Projeto",
    summary:
      "SuperaÃ§Ã£o, fÃ© e qualificaÃ§Ã£o profissional depois de uma trajetÃ³ria marcada por desafios familiares e financeiros.",
    quote:
      "O sucesso Ã© ir de fracasso em fracasso, sem perder o entusiasmo. (Winston Churchill)",
    story: [
      "Nasci em 27 de novembro de 1980, no Rio de Janeiro, em uma famÃ­lia humilde. Sou filho de um lanterneiro e de uma dona de casa. Cresci no Complexo do AlemÃ£o, estudei em escola pÃºblica e enfrentei muitas dificuldades financeiras.",
      "Aos 14 anos, perdi minha mÃ£e. Minha avÃ³, minha tia e minhas irmÃ£s assumiram minha criaÃ§Ã£o, enquanto meu pai deixou nossa casa. Ainda adolescente, comecei a trabalhar para ajudar nas despesas. Com o incentivo da minha irmÃ£ mais velha, consegui concluir o ensino mÃ©dio.",
      "Meu primeiro emprego formal foi como ajudante de motorista. Anos depois, me mudei para Guapimirim com minha esposa. Nossa filha nasceu prematura, com apenas 930 gramas, enfrentando desafios de saÃºde, mas, pela graÃ§a de Deus, venceu todas as dificuldades.",
      "Sempre sonhei em me qualificar, porÃ©m a falta de recursos afastava esse objetivo. Tudo mudou quando conheci JosÃ© Augusto, fundador do Projeto ForÃ§a do Saber. Fui contemplado com uma bolsa na UNIFESO e hoje curso GestÃ£o de Recursos Humanos, jÃ¡ atuando na Ã¡rea.",
      "Acredito que Deus coloca pessoas certas no nosso caminho para nos ajudar a realizar sonhos. Essa oportunidade transformou minha histÃ³ria.",
    ],
    primaryPhoto: {
      src: "/images/thiagocomfamilia.jpeg",
      alt: "Thiago com a famÃ­lia em celebraÃ§Ã£o de formatura",
      caption: "Thiago ao lado da famÃ­lia em momento de conquista",
    },
    supportingPhotos: [
      {
        src: "/images/thiagocomjoseaugusto.jpeg",
        alt: "Thiago com JosÃ© Augusto em dia de formatura",
      },
      {
        src: "/images/thiagocomjoseaugusto2.jpeg",
        alt: "Thiago e JosÃ© Augusto celebrando conquista acadÃªmica",
      },
      {
        src: "/images/thiagocomjoseaugusto3.jpeg",
        alt: "Thiago e JosÃ© Augusto em registro de formatura",
      },
      {
        src: "/images/thiagocomopai.jpeg",
        alt: "Thiago com o pai em momento de celebraÃ§Ã£o",
      },
    ],
  },
  {
    name: "Camilo JosÃ© da Silva Cantalejo",
    title: "EducaÃ§Ã£o FÃ­sica | Bolsista Integral",
    summary:
      "HistÃ³ria de persistÃªncia, apoio familiar e conquista de bolsa integral para realizar o sonho da faculdade.",
    quote:
      "Com fÃ©, gratidÃ£o e dedicaÃ§Ã£o, sonhos que pareciam distantes se tornam possÃ­veis.",
    story: [
      "Tenho 32 anos e sou de Guapimirim, no Rio de Janeiro. Fui criado por uma mÃ£e extraordinÃ¡ria que, com muito esforÃ§o, nos sustentou sozinha trabalhando como babÃ¡ e faxineira, com apoio da nossa avÃ³.",
      "Meu pai nos deixou na juventude, e minha mÃ£e seguiu firme atÃ© a aposentadoria. Trabalhei quase cinco anos na CRT e, apÃ³s o fim do contrato, enfrentei um perÃ­odo difÃ­cil de desemprego.",
      "Com fÃ©, surgiu uma grande oportunidade no serviÃ§o pÃºblico, onde atuo atÃ© hoje. Mesmo assim, o sonho de cursar faculdade permanecia distante por causa das condiÃ§Ãµes financeiras.",
      "GraÃ§as ao Projeto ForÃ§a do Saber, liderado por JosÃ© Augusto, fui contemplado com bolsa integral. Hoje estou no quarto perÃ­odo de EducaÃ§Ã£o FÃ­sica, realizando um dos maiores sonhos da minha vida.",
      "Sou grato a Deus, Ã  minha mÃ£e, ao Vitor Fernandez, que me apresentou ao projeto, e ao JosÃ© Augusto por acreditar no meu potencial.",
    ],
    primaryPhoto: {
      src: "/images/alunos/aluno-familia.jpg",
      alt: "Camilo ao lado de familiares em cerimÃ´nia de formatura",
      caption: "Camilo com a famÃ­lia em celebraÃ§Ã£o acadÃªmica",
    },
    supportingPhotos: [
      {
        src: "/images/alunos/formatura-palco.jpg",
        alt: "Formatura com alunos em cerimÃ´nia de colaÃ§Ã£o",
      },
      {
        src: "/images/alunos/familia-unifeso.jpg",
        alt: "Conquista de aluna acompanhada pela famÃ­lia",
      },
    ],
  },
];

export const joseRootsStory = [
  "Nascido e criado em Guapimirim, JosÃ© Augusto foi moldado por valores de honestidade, integridade e dedicaÃ§Ã£o ao trabalho. Filho do pedreiro Sr. JosÃ© e da dona de casa Sra. ConceiÃ§Ã£o, cresceu ao lado da irmÃ£ Lilian em uma realidade simples, porÃ©m repleta de aprendizado.",
  "Na infÃ¢ncia, viveu momentos marcantes entre as ruas e cachoeiras da cidade. Ao mesmo tempo, conviveu com desafios que fortaleceram sua visÃ£o de mundo e sua determinaÃ§Ã£o para construir um futuro melhor.",
  "Estudando na rede pÃºblica, contou com professores que plantaram a semente da curiosidade e do conhecimento. Em casa, porÃ©m, a prioridade era o sustento da famÃ­lia, e a faculdade parecia uma realidade distante.",
  "Com o amadurecimento, compreendeu que a educaÃ§Ã£o poderia quebrar ciclos e ampliar oportunidades. Esse despertar ocorreu aos poucos, ao observar histÃ³rias de transformaÃ§Ã£o por meio do ensino superior.",
  "A partir desse entendimento, decidiu desafiar crenÃ§as limitantes e trilhar um caminho de estudo e persistÃªncia, convicto de que qualquer pessoa, independentemente da origem, pode transformar a prÃ³pria realidade por meio do conhecimento.",
];

export const joseProjectStory = [
  "Em 2020, ao retornar para Guapimirim, JosÃ© Augusto definiu como prioridade levar mais educaÃ§Ã£o para a cidade. Com recursos prÃ³prios, adquiriu 10 bolsas de pÃ³s-graduaÃ§Ã£o e deu inÃ­cio ao Projeto ForÃ§a do Saber â€“ Nova Guapimirim.",
  "ApÃ³s a primeira turma, reuniu cinco amigos para viabilizar 12 novas bolsas de pÃ³s-graduaÃ§Ã£o. Esse movimento consolidou o projeto e abriu caminho para um programa mais amplo de bolsas integrais no ensino superior.",
  "Com experiÃªncia em educaÃ§Ã£o e gestÃ£o, e Ã  frente da empresa J. A. Cordeiro, atuou como articulador entre instituiÃ§Ãµes de ensino superior e lideranÃ§as locais, fortalecendo a oferta de bolsas filantrÃ³picas e o suporte aos candidatos.",
  "Hoje, o projeto jÃ¡ ultrapassou 248 bolsas de ensino superior, consolidando-se como um movimento de transformaÃ§Ã£o social em Guapimirim. Cada aluno beneficiado representa uma nova semente de desenvolvimento para toda a cidade.",
];

export const freeLearningCenterStory = [
  "Em 2025, foi inaugurado o Centro de Ensino Gratuito: um espaÃ§o estruturado para oferecer oportunidades educacionais aos jovens de Guapimirim e ampliar o alcance do impacto social do projeto.",
  "A iniciativa nasceu da percepÃ§Ã£o de que muitos talentos ficam invisÃ­veis por falta de incentivo financeiro, psicolÃ³gico e estrutural. O centro foi pensado para transformar essa realidade, com foco em capacitaÃ§Ã£o e geraÃ§Ã£o de oportunidades.",
  "A experiÃªncia de JosÃ© Augusto como sÃ³cio-administrador de polo educacional ajudou a mapear necessidades reais dos estudantes e a definir uma estrutura adequada para o aprendizado.",
  "O espaÃ§o conta com banheiros masculino e feminino, Ã¡rea de repouso, cozinha, sala de reuniÃ£o para alunos, sala de coordenaÃ§Ã£o e equipamentos de apoio acadÃªmico.",
  "A histÃ³ria do imÃ³vel comeÃ§ou em 2011. A convicÃ§Ã£o de que aquele espaÃ§o serviria a um movimento voluntÃ¡rio ligado Ã  educaÃ§Ã£o foi mantida por anos, atÃ© se concretizar como Centro de Ensino Gratuito.",
];

export const bibleVerse = {
  quote: "Instruir-te-ei e ensinar-te-ei o caminho que deves seguir; guiar-te-ei com os meus olhos.",
  reference: "Salmos 32:8",
};

export const studentGallerySlots = [
  {
    src: "/images/alunos/formatura-palco.jpg",
    alt: "CerimÃ´nia de formatura com alunos bolsistas",
    caption: "CerimÃ´nia de formatura e conquista acadÃªmica",
  },
  {
    src: "/images/alunos/familia-unifeso.jpg",
    alt: "Aluna com familiares em celebraÃ§Ã£o de formatura",
    caption: "FamÃ­lia presente em momentos de vitÃ³ria",
  },
  {
    src: "/images/alunos/aluno-familia.jpg",
    alt: "Aluno bolsista com familiares durante a formatura",
    caption: "Formatura com participaÃ§Ã£o da famÃ­lia",
  },
  {
    src: "/images/alunos/jose-selfie-1.jpg",
    alt: "JosÃ© Augusto celebrando conquista de aluno",
    caption: "LideranÃ§a prÃ³xima e celebrando resultados",
  },
  {
    src: "/images/alunos/jose-selfie-2.jpg",
    alt: "JosÃ© Augusto e aluno em cerimÃ´nia de graduaÃ§Ã£o",
    caption: "Acompanhamento atÃ© a realizaÃ§Ã£o do sonho",
  },
  {
    src: "/images/alunos/aluna-laboratorio.jpg",
    alt: "Aluna em atividade de laboratÃ³rio",
    caption: "PrÃ¡tica acadÃªmica e formaÃ§Ã£o profissional",
  },
  {
    src: "/images/alunos/aluno-pai.jpg",
    alt: "Aluno e familiar em dia de conquista",
    caption: "Conquistas que fortalecem geraÃ§Ãµes",
  },
  {
    src: "/images/alunos/jose-casal.jpg",
    alt: "JosÃ© Augusto com apoiadores e parceiros",
    caption: "Parcerias e rede de apoio social",
  },
  {
    src: "/images/alunos/jose-amigo.jpg",
    alt: "JosÃ© Augusto ao lado de aluno beneficiado",
    caption: "Compromisso com a transformaÃ§Ã£o de vidas",
  },
];

export const tutoringCenterGallery = [
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/turma-inicial.jpeg",
    alt: "Turma reunida na tutoria acadÃªmica do Centro de Ensino Gratuito",
    caption: "Alunos iniciando uma nova etapa acadÃªmica",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-01.jpeg",
    alt: "Atendimento de tutoria acadÃªmica individual",
    caption: "Acompanhamento individual com orientaÃ§Ã£o prÃ¡tica",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-02.jpeg",
    alt: "Momento de orientaÃ§Ã£o para ingresso no ensino superior",
    caption: "Mentoria para organizar metas e prÃ³ximos passos",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-03.jpeg",
    alt: "Tutoria para planejamento de estudos",
    caption: "Planejamento acadÃªmico no dia a dia do centro",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-04.jpeg",
    alt: "Aula de apoio e orientaÃ§Ã£o educacional",
    caption: "Suporte tÃ©cnico e humano para os estudantes",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-05.jpeg",
    alt: "Tutoria acadÃªmica em andamento no centro de ensino",
    caption: "Ambiente estruturado para fortalecer resultados",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-06.jpeg",
    alt: "Atendimento com aluno no centro de ensino gratuito",
    caption: "OrientaÃ§Ã£o contÃ­nua para permanÃªncia na faculdade",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-07.jpeg",
    alt: "Mentoria no Centro de Ensino Gratuito de Guapimirim",
    caption: "Proximidade, escuta e direcionamento acadÃªmico",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-08.jpeg",
    alt: "Registro de tutoria acadÃªmica com estudantes",
    caption: "EducaÃ§Ã£o com acolhimento e foco em transformaÃ§Ã£o",
  },
];

