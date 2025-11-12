interface QuizAnswers {
  objetivo: string;
  nivel: string;
  tempo: string;
  frequencia: string;
  restricoes: string;
  refeicoes: string;
  idade: string;
  equipamento: string;
}

export function generatePersonalizedPlan(answers: QuizAnswers) {
  // Gera plano alimentar baseado nas respostas
  const planoAlimentar = generateMealPlan(answers);
  
  // Gera plano de treinos baseado nas respostas
  const planoTreino = generateWorkoutPlan(answers);
  
  return {
    objetivo: getObjetivoLabel(answers.objetivo),
    duracao: '12 semanas',
    tempo_treino: answers.tempo === '15min' ? '15-20 min/dia' : answers.tempo === '30min' ? '30-40 min/dia' : '60+ min/dia',
    plano_alimentar: planoAlimentar,
    plano_treino: planoTreino,
  };
}

function getObjetivoLabel(objetivo: string): string {
  const labels: Record<string, string> = {
    perder_peso: 'Perda de Peso',
    ganhar_massa: 'Ganho de Massa',
    manter_forma: 'Manutenção',
    melhorar_saude: 'Saúde Geral',
  };
  return labels[objetivo] || 'Fitness';
}

function generateMealPlan(answers: QuizAnswers) {
  const isVegetariano = answers.restricoes === 'vegetariano';
  const isVegano = answers.restricoes === 'vegano';
  const semLactose = answers.restricoes === 'sem_lactose';
  const numRefeicoes = parseInt(answers.refeicoes);

  const refeicoes = [
    {
      nome: 'Café da Manhã',
      horario: '7h - 8h',
      emoji: '🍳',
      alimentos: isVegano 
        ? [
            '2 fatias de pão integral',
            '1 colher de pasta de amendoim',
            '1 banana',
            'Suco de laranja natural',
          ]
        : isVegetariano
        ? [
            '2 ovos mexidos',
            '2 fatias de pão integral',
            '1 fatia de queijo branco',
            'Café com leite vegetal',
          ]
        : [
            '2 ovos mexidos ou cozidos',
            '2 fatias de pão integral',
            '1 fatia de queijo branco',
            'Café com leite',
          ],
    },
  ];

  if (numRefeicoes >= 4) {
    refeicoes.push({
      nome: 'Lanche da Manhã',
      horario: '10h - 11h',
      emoji: '🥤',
      alimentos: [
        '1 fruta (maçã, banana ou pera)',
        '1 punhado de castanhas',
        'Água de coco ou chá verde',
      ],
    });
  }

  refeicoes.push({
    nome: 'Almoço',
    horario: '12h - 13h',
    emoji: '🍽️',
    alimentos: isVegano
      ? [
          '1 xícara de arroz integral',
          '1 concha de feijão ou lentilha',
          'Salada verde à vontade',
          'Legumes refogados (brócolis, cenoura)',
          'Tofu grelhado',
        ]
      : isVegetariano
      ? [
          '1 xícara de arroz integral',
          '1 concha de feijão',
          'Salada verde à vontade',
          'Legumes refogados',
          '2 ovos cozidos ou queijo cottage',
        ]
      : [
          '1 xícara de arroz integral',
          '1 concha de feijão',
          'Salada verde à vontade',
          'Legumes refogados',
          '150g de frango, peixe ou carne magra',
        ],
  });

  if (numRefeicoes >= 4) {
    refeicoes.push({
      nome: 'Lanche da Tarde',
      horario: '15h - 16h',
      emoji: '🥗',
      alimentos: semLactose || isVegano
        ? [
            '1 iogurte de coco',
            'Granola sem açúcar',
            '1 fruta',
          ]
        : [
            '1 iogurte natural',
            'Granola sem açúcar',
            '1 fruta',
          ],
    });
  }

  refeicoes.push({
    nome: 'Jantar',
    horario: '19h - 20h',
    emoji: '🍲',
    alimentos: isVegano
      ? [
          'Sopa de legumes',
          'Salada verde',
          'Grão de bico assado',
          'Batata doce cozida',
        ]
      : isVegetariano
      ? [
          'Sopa de legumes',
          'Salada verde',
          'Omelete de 2 ovos',
          'Batata doce cozida',
        ]
      : [
          'Sopa de legumes ou caldo',
          'Salada verde',
          '150g de proteína (frango, peixe)',
          'Batata doce ou mandioca',
        ],
  });

  if (numRefeicoes >= 5) {
    refeicoes.push({
      nome: 'Ceia',
      horario: '21h - 22h',
      emoji: '🥛',
      alimentos: semLactose || isVegano
        ? [
            '1 copo de leite vegetal',
            '2 castanhas do Pará',
          ]
        : [
            '1 copo de leite',
            '2 castanhas do Pará',
          ],
    });
  }

  const dicas = [
    'Beba pelo menos 2 litros de água por dia',
    'Evite alimentos processados e açúcar refinado',
    'Faça as refeições em horários regulares',
    'Mastigue bem os alimentos',
  ];

  if (answers.objetivo === 'perder_peso') {
    dicas.push('Controle as porções e evite repetir');
  } else if (answers.objetivo === 'ganhar_massa') {
    dicas.push('Aumente a ingestão de proteínas em cada refeição');
  }

  return {
    descricao: `Plano alimentar personalizado com ${numRefeicoes} refeições diárias, adaptado para ${getObjetivoLabel(answers.objetivo).toLowerCase()}.`,
    refeicoes,
    dicas,
  };
}

function generateWorkoutPlan(answers: QuizAnswers) {
  const nivel = answers.nivel;
  const tempo = answers.tempo;
  const frequencia = answers.frequencia;
  const equipamento = answers.equipamento;

  const dias = [];

  // Dia 1 - Corpo Superior
  dias.push({
    dia: 'Dia 1 - Segunda-feira',
    foco: 'Treino de Corpo Superior',
    exercicios: [
      {
        nome: 'Flexões',
        series: nivel === 'iniciante' ? '3x8-10' : nivel === 'intermediario' ? '3x12-15' : '4x15-20',
        descricao: 'Flexões tradicionais ou de joelhos para iniciantes',
        tempo: '30 segundos de descanso',
      },
      {
        nome: 'Tríceps no Banco',
        series: nivel === 'iniciante' ? '3x8' : nivel === 'intermediario' ? '3x12' : '4x15',
        descricao: 'Use uma cadeira ou banco para apoiar as mãos',
        tempo: '30 segundos de descanso',
      },
      {
        nome: 'Prancha',
        series: nivel === 'iniciante' ? '3x20s' : nivel === 'intermediario' ? '3x40s' : '3x60s',
        descricao: 'Mantenha o corpo reto e abdômen contraído',
        tempo: '30 segundos de descanso',
      },
      {
        nome: 'Superman',
        series: '3x12-15',
        descricao: 'Deitado de barriga para baixo, levante braços e pernas',
        tempo: '30 segundos de descanso',
      },
    ],
  });

  // Dia 2 - Corpo Inferior
  dias.push({
    dia: 'Dia 2 - Quarta-feira',
    foco: 'Treino de Corpo Inferior',
    exercicios: [
      {
        nome: 'Agachamento',
        series: nivel === 'iniciante' ? '3x10' : nivel === 'intermediario' ? '3x15' : '4x20',
        descricao: 'Agachamento livre ou com peso corporal',
        tempo: '45 segundos de descanso',
      },
      {
        nome: 'Afundo',
        series: nivel === 'iniciante' ? '3x8 cada perna' : nivel === 'intermediario' ? '3x12 cada' : '4x15 cada',
        descricao: 'Alterne as pernas mantendo o equilíbrio',
        tempo: '30 segundos de descanso',
      },
      {
        nome: 'Elevação de Panturrilha',
        series: '3x15-20',
        descricao: 'Suba na ponta dos pés e desça lentamente',
        tempo: '30 segundos de descanso',
      },
      {
        nome: 'Ponte de Glúteo',
        series: '3x15',
        descricao: 'Deitado, eleve o quadril contraindo o glúteo',
        tempo: '30 segundos de descanso',
      },
    ],
  });

  // Dia 3 - Cardio e Core
  dias.push({
    dia: 'Dia 3 - Sexta-feira',
    foco: 'Cardio e Abdômen',
    exercicios: [
      {
        nome: 'Polichinelos',
        series: nivel === 'iniciante' ? '3x30s' : nivel === 'intermediario' ? '3x45s' : '4x60s',
        descricao: 'Saltos abrindo e fechando pernas e braços',
        tempo: '30 segundos de descanso',
      },
      {
        nome: 'Mountain Climbers',
        series: nivel === 'iniciante' ? '3x20s' : nivel === 'intermediario' ? '3x30s' : '4x45s',
        descricao: 'Posição de prancha, alternando joelhos ao peito',
        tempo: '30 segundos de descanso',
      },
      {
        nome: 'Abdominal Crunch',
        series: '3x15-20',
        descricao: 'Deitado, contraia o abdômen elevando o tronco',
        tempo: '30 segundos de descanso',
      },
      {
        nome: 'Prancha Lateral',
        series: '3x20s cada lado',
        descricao: 'Apoie-se no antebraço mantendo corpo alinhado',
        tempo: '30 segundos de descanso',
      },
    ],
  });

  const dicas = [
    'Faça aquecimento de 5 minutos antes de cada treino',
    'Mantenha a postura correta durante os exercícios',
    'Respire corretamente: expire no esforço, inspire no relaxamento',
    'Alongue-se por 5-10 minutos após o treino',
    'Descanse 1-2 dias entre os treinos para recuperação',
  ];

  if (nivel === 'iniciante') {
    dicas.push('Comece devagar e aumente a intensidade gradualmente');
  }

  return {
    descricao: `Plano de treinos em casa de ${frequencia} dias por semana, adaptado para nível ${nivel} com duração de ${tempo === '15min' ? '15-20 minutos' : tempo === '30min' ? '30-40 minutos' : '60+ minutos'} por sessão.`,
    dias,
    dicas,
  };
}
