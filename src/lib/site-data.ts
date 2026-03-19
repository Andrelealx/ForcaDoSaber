export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Início", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Histórias", href: "/historias" },
  { label: "Como Funciona", href: "/#como-funciona" },
  { label: "Impacto", href: "/#impacto" },
  { label: "Contato", href: "/contato" },
];

export const credibilityPillars = [
  "Atuação local em Guapimirim-RJ",
  "Rede de apoio educacional ativa",
  "Parcerias para ampliar oportunidades",
];

export const impactMetrics = [
  { value: 248, suffix: "+", label: "Bolsas integrais concedidas" },
  { value: 80, suffix: "+", label: "Oportunidades geradas" },
  { value: 86, suffix: "%", label: "Permanência estudantil apoiada" },
  { value: 34, suffix: "+", label: "Parcerias mobilizadas" },
];

export const impactHighlights = [
  {
    title: "Apoio educacional contínuo",
    description:
      "Orientação prática, mentoria e incentivo para que cada estudante avance com consistência e planejamento.",
  },
  {
    title: "Transformação social real",
    description:
      "Educação como estratégia de mobilidade social e fortalecimento da dignidade das famílias de Guapimirim.",
  },
  {
    title: "Rede comunitária ativa",
    description:
      "Conexão entre alunos, lideranças, apoiadores e instituições para ampliar resultados coletivos e sustentáveis.",
  },
];

export const howItWorksSteps = [
  {
    title: "Quem pode participar",
    description:
      "Moradores de Guapimirim com interesse em crescimento acadêmico e profissional, especialmente estudantes em fase de decisão educacional.",
  },
  {
    title: "Inscrição e critérios",
    description:
      "O ingresso ocorre por cadastro orientado, considerando contexto social, comprometimento com os estudos e alinhamento com os objetivos do projeto.",
  },
  {
    title: "Acompanhamento personalizado",
    description:
      "Cada estudante recebe orientação sobre trilha educacional, organização da rotina de estudos e acesso a oportunidades.",
  },
  {
    title: "Apoio social e conexões",
    description:
      "O projeto aproxima alunos de bolsas, parceiros, cursos e agentes públicos para ampliar chances concretas de desenvolvimento.",
  },
];

export const values = [
  "Educação como instrumento de liberdade e progresso",
  "Compromisso com resultados concretos para a comunidade",
  "Acolhimento, escuta e respeito a cada história",
  "Parcerias que multiplicam impacto social",
];

export const partnerGroups = [
  "Empresas locais e regionais",
  "Faculdades e instituições de ensino",
  "Apoiadores individuais e lideranças comunitárias",
  "Agentes públicos e parceiros sociais",
];

export const studentCardPartnershipPillars = [
  "Descontos para alunos com o Cartão do Aluno Força do Saber",
  "Comércio local engajado com educação e transformação social",
  "Parcerias com visibilidade institucional no site oficial do projeto",
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
  "José Augusto é o idealizador do Projeto Força do Saber, iniciativa criada com o propósito de transformar vidas por meio da educação e ampliar o acesso de moradores de Guapimirim a oportunidades reais de crescimento acadêmico e profissional.",
  "Com visão voltada para o impacto social, desenvolveu o projeto com base na crença de que a educação é uma das ferramentas mais poderosas para mudar histórias, abrir caminhos e construir um futuro melhor para a população.",
  "Sob sua liderança, o Projeto Força do Saber se consolidou como uma referência local de incentivo à educação, oferecendo apoio, orientação e oportunidades para estudantes que desejam ingressar no ensino superior e transformar sua realidade por meio do conhecimento.",
];

export const founderPillars = [
  "Liderança com visão social e foco em resultados concretos",
  "Compromisso com a educação como ferramenta de transformação",
  "Atuação próxima da comunidade e das famílias de Guapimirim",
];

export const faqItems = [
  {
    question: "Quem pode procurar o projeto?",
    answer:
      "Estudantes, famílias, parceiros institucionais e apoiadores que compartilham o compromisso com o desenvolvimento educacional em Guapimirim.",
  },
  {
    question: "Como apoiar o Projeto Força do Saber?",
    answer:
      "É possível apoiar com bolsas, mentoria, estrutura, patrocínio, divulgação e conexões com oportunidades acadêmicas e profissionais.",
  },
  {
    question: "Como iniciar uma conversa institucional?",
    answer:
      "Você pode enviar uma mensagem pelo formulário ou falar diretamente pelo WhatsApp para alinhar a melhor forma de colaboração.",
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
    title: "Gestão de Recursos Humanos | Bolsista do projeto",
    summary:
      "Superação, fé e qualificação profissional depois de uma trajetória marcada por desafios familiares e financeiros.",
    quote:
      "O sucesso é ir de fracasso em fracasso, sem perder o entusiasmo. (Winston Churchill)",
    story: [
      "Nasci em 27 de novembro de 1980, no Rio de Janeiro, em uma família humilde. Sou filho de um lanterneiro e de uma dona de casa. Cresci no Complexo do Alemão, estudei em escola pública e enfrentei muitas dificuldades financeiras.",
      "Aos 14 anos, perdi minha mãe. Minha avó, minha tia e minhas irmãs assumiram minha criação, enquanto meu pai deixou nossa casa. Ainda adolescente, comecei a trabalhar para ajudar nas despesas. Com o incentivo da minha irmã mais velha, consegui concluir o ensino médio.",
      "Meu primeiro emprego formal foi como ajudante de motorista. Anos depois, mudei-me para Guapimirim com minha esposa. Nossa filha nasceu prematura, com apenas 930 gramas, enfrentando desafios de saúde, mas, pela graça de Deus, superou todas as dificuldades.",
      "Sempre sonhei em me qualificar, porém a falta de recursos tornava esse objetivo distante. Tudo mudou quando conheci José Augusto, fundador do Projeto Força do Saber. Fui contemplado com uma bolsa na UNIFESO e hoje curso Gestão de Recursos Humanos, já atuando na área.",
      "Acredito que Deus coloca pessoas certas no nosso caminho para nos ajudar a realizar sonhos. Essa oportunidade transformou minha história.",
    ],
    primaryPhoto: {
      src: "/images/thiagocomfamilia.jpeg",
      alt: "Thiago com a família em celebração de formatura",
      caption: "Thiago ao lado da família em momento de conquista",
    },
    supportingPhotos: [
      {
        src: "/images/thiagocomjoseaugusto.jpeg",
        alt: "Thiago com José Augusto em dia de formatura",
      },
      {
        src: "/images/thiagocomjoseaugusto2.jpeg",
        alt: "Thiago e José Augusto celebrando conquista acadêmica",
      },
      {
        src: "/images/thiagocomjoseaugusto3.jpeg",
        alt: "Thiago e José Augusto em registro de formatura",
      },
      {
        src: "/images/thiagocomopai.jpeg",
        alt: "Thiago com o pai em momento de celebração",
      },
    ],
  },
  {
    name: "Camilo José da Silva Cantalejo",
    title: "Educação Física | Bolsista integral",
    summary:
      "História de persistência, apoio familiar e conquista de bolsa integral para realizar o sonho da faculdade.",
    quote:
      "Com fé, gratidão e dedicação, sonhos que pareciam distantes se tornam possíveis.",
    story: [
      "Tenho 32 anos e sou de Guapimirim, no estado do Rio de Janeiro. Fui criado por uma mãe extraordinária que, com muito esforço, nos sustentou sozinha, trabalhando como babá e faxineira, com apoio da nossa avó.",
      "Meu pai nos deixou na juventude, e minha mãe seguiu firme até a aposentadoria. Trabalhei por quase cinco anos na CRT e, após o fim do contrato, enfrentei um período difícil de desemprego.",
      "Com fé, surgiu uma grande oportunidade no serviço público, onde atuo até hoje. Mesmo assim, o sonho de cursar uma faculdade permanecia distante por causa das condições financeiras.",
      "Graças ao Projeto Força do Saber, liderado por José Augusto, fui contemplado com uma bolsa integral. Hoje estou no quarto período de Educação Física, realizando um dos maiores sonhos da minha vida.",
      "Sou grato a Deus, à minha mãe, ao Vitor Fernandez, que me apresentou ao projeto, e ao José Augusto por acreditar no meu potencial.",
    ],
    primaryPhoto: {
      src: "/images/alunos/aluno-familia.jpg",
      alt: "Camilo ao lado de familiares em cerimônia de formatura",
      caption: "Camilo com a família em celebração acadêmica",
    },
    supportingPhotos: [
      {
        src: "/images/alunos/formatura-palco.jpg",
        alt: "Formatura com alunos em cerimônia de colação",
      },
      {
        src: "/images/alunos/familia-unifeso.jpg",
        alt: "Conquista de aluna acompanhada pela família",
      },
    ],
  },
];

export const joseRootsStory = [
  "Nascido e criado em Guapimirim, José Augusto foi moldado por valores de honestidade, integridade e dedicação ao trabalho. Filho do pedreiro Sr. José e da dona de casa Sra. Conceição, cresceu ao lado da irmã Lilian em uma realidade simples, porém repleta de aprendizado.",
  "Na infância, viveu momentos marcantes entre as ruas e cachoeiras da cidade. Ao mesmo tempo, conviveu com desafios que fortaleceram sua visão de mundo e sua determinação para construir um futuro melhor.",
  "Estudando na rede pública, contou com professores que plantaram a semente da curiosidade e do conhecimento. Em casa, porém, a prioridade era o sustento da família, e a faculdade parecia uma realidade distante.",
  "Com o amadurecimento, compreendeu que a educação poderia quebrar ciclos e ampliar oportunidades. Esse despertar aconteceu aos poucos, ao observar histórias de transformação por meio do ensino superior.",
  "A partir desse entendimento, decidiu desafiar crenças limitantes e trilhar um caminho de estudo e persistência, convicto de que qualquer pessoa, independentemente da origem, pode transformar a própria realidade por meio do conhecimento.",
];

export const joseProjectStory = [
  "Em 2020, ao retornar para Guapimirim, José Augusto definiu como prioridade levar mais educação para a cidade. Com recursos próprios, adquiriu 10 bolsas de pós-graduação e deu início ao Projeto Força do Saber - Nova Guapimirim.",
  "Após a primeira turma, reuniu cinco amigos para viabilizar 12 novas bolsas de pós-graduação. Esse movimento consolidou o projeto e abriu caminho para um programa mais amplo de bolsas integrais no ensino superior.",
  "Com experiência em educação e gestão, e à frente da empresa J. A. Cordeiro, atuou como articulador entre instituições de ensino superior e lideranças locais, fortalecendo a oferta de bolsas filantrópicas e o suporte aos candidatos.",
  "Hoje, o projeto já ultrapassou 248 bolsas de ensino superior, consolidando-se como um movimento de transformação social em Guapimirim. Cada aluno beneficiado representa uma nova semente de desenvolvimento para toda a cidade.",
];

export const freeLearningCenterStory = [
  "Em 2025, foi inaugurado o Centro de Ensino Gratuito: um espaço estruturado para oferecer oportunidades educacionais aos jovens de Guapimirim e ampliar o alcance do impacto social do projeto.",
  "A iniciativa nasceu da percepção de que muitos talentos ficam invisíveis por falta de incentivo financeiro, psicológico e estrutural. O centro foi pensado para transformar essa realidade, com foco em capacitação e geração de oportunidades.",
  "A experiência de José Augusto como sócio-administrador de um polo educacional ajudou a mapear necessidades reais dos estudantes e a definir uma estrutura adequada para o aprendizado.",
  "O espaço conta com banheiros masculinos e femininos, área de repouso, cozinha, sala de reunião para alunos, sala de coordenação e equipamentos de apoio acadêmico.",
  "A história do imóvel começou em 2011. A convicção de que aquele espaço serviria a um movimento voluntário ligado à educação foi mantida por anos, até se concretizar como Centro de Ensino Gratuito.",
];

export const bibleVerse = {
  quote: "Instruir-te-ei e ensinar-te-ei o caminho que deves seguir; guiar-te-ei com os meus olhos.",
  reference: "Salmos 32:8",
};

export const studentGallerySlots = [
  {
    src: "/images/alunos/formatura-palco.jpg",
    alt: "Cerimônia de formatura com alunos bolsistas",
    caption: "Cerimônia de formatura e conquista acadêmica",
  },
  {
    src: "/images/alunos/familia-unifeso.jpg",
    alt: "Aluna com familiares em celebração de formatura",
    caption: "Família presente em momentos de vitória",
  },
  {
    src: "/images/alunos/aluno-familia.jpg",
    alt: "Aluno bolsista com familiares durante a formatura",
    caption: "Formatura com participação da família",
  },
  {
    src: "/images/alunos/jose-selfie-1.jpg",
    alt: "José Augusto celebrando conquista de aluno",
    caption: "Liderança próxima e celebrando resultados",
  },
  {
    src: "/images/alunos/jose-selfie-2.jpg",
    alt: "José Augusto e aluno em cerimônia de graduação",
    caption: "Acompanhamento até a realização do sonho",
  },
  {
    src: "/images/alunos/aluna-laboratorio.jpg",
    alt: "Aluna em atividade de laboratório",
    caption: "Prática acadêmica e formação profissional",
  },
  {
    src: "/images/alunos/aluno-pai.jpg",
    alt: "Aluno e familiar em dia de conquista",
    caption: "Conquistas que fortalecem gerações",
  },
  {
    src: "/images/alunos/jose-casal.jpg",
    alt: "José Augusto com apoiadores e parceiros",
    caption: "Parcerias e rede de apoio social",
  },
  {
    src: "/images/alunos/jose-amigo.jpg",
    alt: "José Augusto ao lado de aluno beneficiado",
    caption: "Compromisso com a transformação de vidas",
  },
];

export const tutoringCenterGallery = [
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/turma-inicial.jpeg",
    alt: "Turma reunida na tutoria acadêmica do Centro de Ensino Gratuito",
    caption: "Alunos iniciando uma nova etapa acadêmica",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-01.jpeg",
    alt: "Atendimento de tutoria acadêmica individual",
    caption: "Acompanhamento individual com orientação prática",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-02.jpeg",
    alt: "Momento de orientação para ingresso no ensino superior",
    caption: "Mentoria para organizar metas e próximos passos",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-03.jpeg",
    alt: "Tutoria para planejamento de estudos",
    caption: "Planejamento acadêmico no dia a dia do centro",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-04.jpeg",
    alt: "Aula de apoio e orientação educacional",
    caption: "Suporte técnico e humano para os estudantes",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-05.jpeg",
    alt: "Tutoria acadêmica em andamento no centro de ensino",
    caption: "Ambiente estruturado para fortalecer resultados",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-06.jpeg",
    alt: "Atendimento com aluno no Centro de Ensino Gratuito",
    caption: "Orientação contínua para permanência na faculdade",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-07.jpeg",
    alt: "Mentoria no Centro de Ensino Gratuito de Guapimirim",
    caption: "Proximidade, escuta e direcionamento acadêmico",
  },
  {
    src: "/images/tutoria-centro-de-ensino-gratuito/tutoria-08.jpeg",
    alt: "Registro de tutoria acadêmica com estudantes",
    caption: "Educação com acolhimento e foco em transformação",
  },
];
