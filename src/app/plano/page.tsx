'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Dumbbell, Apple, Download, Share2, Calendar, Clock, Flame, ChefHat, Info } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { generatePersonalizedPlan } from '@/lib/plan-generator';

export default function PlanoPage() {
  const [plan, setPlan] = useState<any>(null);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [showMealDetails, setShowMealDetails] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const answersStr = localStorage.getItem('quizAnswers');
    if (!answersStr) {
      router.push('/quiz');
      return;
    }

    const answers = JSON.parse(answersStr);
    const generatedPlan = generatePersonalizedPlan(answers);
    setPlan(generatedPlan);
  }, [router]);

  const handleShare = async () => {
    const text = `🎯 Confira meu Plano Personalizado Amigo Fit!\n\n📋 Plano Alimentar e 💪 Treinos em Casa\n\nObjetivo: ${plan.objetivo}\nDuração: ${plan.duracao}\n\nComece sua transformação também! 🚀`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Meu Plano Amigo Fit</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                padding: 40px; 
                max-width: 800px;
                margin: 0 auto;
              }
              h1 { 
                color: #059669; 
                text-align: center;
                margin-bottom: 30px;
              }
              h2 { 
                color: #2563eb; 
                margin-top: 30px;
                border-bottom: 2px solid #2563eb;
                padding-bottom: 10px;
              }
              .meal { 
                margin: 20px 0; 
                padding: 15px; 
                border: 2px solid #ddd; 
                border-radius: 8px;
                background: #f9fafb;
              }
              .meal h3 {
                color: #059669;
                margin-bottom: 10px;
              }
              .exercise { 
                margin: 15px 0; 
                padding: 12px; 
                background: #f3f4f6;
                border-left: 4px solid #2563eb;
              }
              ul { 
                list-style: none; 
                padding-left: 0;
              }
              li { 
                padding: 5px 0;
                padding-left: 20px;
              }
              li:before {
                content: "✓ ";
                color: #059669;
                font-weight: bold;
              }
              .info {
                background: #fef3c7;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <h1>🎯 Meu Plano Amigo Fit</h1>
            <div class="info">
              <p><strong>Objetivo:</strong> ${plan.objetivo}</p>
              <p><strong>Duração:</strong> ${plan.duracao}</p>
              <p><strong>Tempo de Treino:</strong> ${plan.tempo_treino}</p>
            </div>
            
            <h2>🍽️ Plano Alimentar</h2>
            <p>${plan.plano_alimentar.descricao}</p>
            ${plan.plano_alimentar.refeicoes.map((r: any) => `
              <div class="meal">
                <h3>${r.emoji} ${r.nome} - ${r.horario}</h3>
                <ul>
                  ${r.alimentos.map((a: string) => `<li>${a}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
            
            <h2>💪 Plano de Treinos</h2>
            <p>${plan.plano_treino.descricao}</p>
            ${plan.plano_treino.dias.map((d: any) => `
              <div class="meal">
                <h3>${d.dia} - ${d.foco}</h3>
                ${d.exercicios.map((e: any) => `
                  <div class="exercise">
                    <strong>${e.nome}</strong> - ${e.series}<br>
                    ${e.descricao}<br>
                    <em>Tempo: ${e.tempo}</em>
                  </div>
                `).join('')}
              </div>
            `).join('')}
            
            <div class="info">
              <h3>💡 Dicas Importantes</h3>
              <ul>
                ${plan.plano_alimentar.dicas.map((d: string) => `<li>${d}</li>`).join('')}
              </ul>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const handleDownloadComplete = () => {
    let content = `🎯 MEU PLANO AMIGO FIT\n\n`;
    content += `Objetivo: ${plan.objetivo}\n`;
    content += `Duração: ${plan.duracao}\n`;
    content += `Tempo de Treino: ${plan.tempo_treino}\n\n`;
    content += `${'='.repeat(50)}\n\n`;
    
    content += `📋 PLANO ALIMENTAR\n\n`;
    content += `${plan.plano_alimentar.descricao}\n\n`;
    
    plan.plano_alimentar.refeicoes.forEach((r: any) => {
      content += `${r.emoji} ${r.nome.toUpperCase()} - ${r.horario}\n`;
      content += `${'-'.repeat(40)}\n`;
      r.alimentos.forEach((a: string) => {
        content += `  ✓ ${a}\n`;
      });
      content += `\n`;
    });
    
    content += `\n${'='.repeat(50)}\n\n`;
    content += `💪 PLANO DE TREINOS\n\n`;
    content += `${plan.plano_treino.descricao}\n\n`;
    
    plan.plano_treino.dias.forEach((d: any) => {
      content += `${d.dia.toUpperCase()}\n`;
      content += `${d.foco}\n`;
      content += `${'-'.repeat(40)}\n`;
      d.exercicios.forEach((e: any) => {
        content += `\n${e.nome} - ${e.series}\n`;
        content += `${e.descricao}\n`;
        content += `Tempo de descanso: ${e.tempo}\n`;
      });
      content += `\n`;
    });

    content += `\n${'='.repeat(50)}\n\n`;
    content += `💡 DICAS IMPORTANTES\n\n`;
    content += `Alimentação:\n`;
    plan.plano_alimentar.dicas.forEach((d: string) => {
      content += `  ✓ ${d}\n`;
    });
    content += `\nTreino:\n`;
    plan.plano_treino.dicas.forEach((d: string) => {
      content += `  ✓ ${d}\n`;
    });

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meu-plano-amigo-fit.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getMealRecipe = (meal: any) => {
    // Gerar receita detalhada baseada nos alimentos
    const ingredientesDetalhados = meal.alimentos.map((alimento: string) => {
      // Extrair quantidade e ingrediente
      return alimento;
    });

    const preparoDetalhado = [
      {
        passo: 1,
        descricao: 'Separe todos os ingredientes listados e organize-os na bancada',
        tempo: '2 minutos',
      },
      {
        passo: 2,
        descricao: 'Lave bem os vegetais e frutas em água corrente',
        tempo: '3 minutos',
      },
      {
        passo: 3,
        descricao: 'Prepare cada item conforme indicado: cozinhe ovos por 8-10 minutos em água fervente, torre o pão integral por 2-3 minutos, corte frutas em rodelas ou cubos',
        tempo: '10-15 minutos',
      },
      {
        passo: 4,
        descricao: 'Monte o prato de forma equilibrada, distribuindo os alimentos harmoniosamente',
        tempo: '2 minutos',
      },
      {
        passo: 5,
        descricao: 'Sirva imediatamente e aproveite sua refeição saudável!',
        tempo: '1 minuto',
      },
    ];

    const dicas = [
      'Você pode substituir ingredientes por opções similares (ex: frango por peixe, arroz por quinoa)',
      'Ajuste as quantidades conforme sua fome e objetivos específicos',
      'Prepare com antecedência para facilitar sua rotina (meal prep)',
      'Use temperos naturais como alho, cebola, ervas frescas para dar mais sabor',
      'Armazene sobras em potes herméticos na geladeira por até 3 dias',
    ];

    return {
      ingredientes: ingredientesDetalhados,
      preparo: preparoDetalhado,
      dicas,
      tempoTotal: '20-25 minutos',
      porcoes: '1 pessoa',
    };
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center mx-auto animate-pulse mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Carregando seu plano...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Amigo Fit
              </span>
            </Link>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShare}
                className="text-xs sm:text-sm"
              >
                <Share2 className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">Compartilhar</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownloadPDF}
                className="text-xs sm:text-sm"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
                <span className="hidden sm:inline">PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              🎉 Seu Plano Personalizado Está Pronto!
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-emerald-50">
              Criamos um plano completo baseado nas suas respostas. Siga as orientações abaixo para alcançar seus objetivos!
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 pt-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 text-xs sm:text-sm">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">{plan.duracao}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 text-xs sm:text-sm">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{plan.tempo_treino}</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 text-xs sm:text-sm">
                <Flame className="w-4 h-4" />
                <span className="font-medium">{plan.objetivo}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Tabs defaultValue="alimentacao" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
            <TabsTrigger value="alimentacao" className="text-sm sm:text-base">
              <Apple className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Plano Alimentar</span>
              <span className="sm:hidden">Alimentar</span>
            </TabsTrigger>
            <TabsTrigger value="treino" className="text-sm sm:text-base">
              <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Plano de Treinos</span>
              <span className="sm:hidden">Treinos</span>
            </TabsTrigger>
          </TabsList>

          {/* Plano Alimentar */}
          <TabsContent value="alimentacao" className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                📋 Seu Plano Alimentar Personalizado
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {plan.plano_alimentar.descricao}
              </p>

              <div className="space-y-4 sm:space-y-6">
                {plan.plano_alimentar.refeicoes.map((refeicao: any, index: number) => (
                  <Card 
                    key={index} 
                    className="p-4 sm:p-5 bg-gradient-to-br from-emerald-50 to-blue-50 border-2 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      setSelectedMeal(refeicao);
                      setShowMealDetails(true);
                    }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-xl sm:text-2xl">{refeicao.emoji}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2 gap-2">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                            {refeicao.nome}
                          </h3>
                          <Button size="sm" variant="ghost" className="flex-shrink-0 text-xs sm:text-sm">
                            <ChefHat className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            <span className="hidden sm:inline">Ver Receita</span>
                            <span className="sm:hidden">Receita</span>
                          </Button>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{refeicao.horario}</p>
                        <ul className="space-y-1 sm:space-y-2">
                          {refeicao.alimentos.map((alimento: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                              <span className="text-emerald-600 mt-1">•</span>
                              <span>{alimento}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-4 sm:p-5 bg-blue-50 border-2 border-blue-200 mt-4 sm:mt-6">
                <h3 className="text-sm sm:text-base font-bold text-blue-900 mb-2 flex items-center gap-2">
                  💡 Dicas Importantes
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-blue-800">
                  {plan.plano_alimentar.dicas.map((dica: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">✓</span>
                      <span>{dica}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Card>
          </TabsContent>

          {/* Plano de Treinos */}
          <TabsContent value="treino" className="space-y-4 sm:space-y-6">
            <Card className="p-4 sm:p-6 shadow-lg">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                💪 Seu Plano de Treinos em Casa
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                {plan.plano_treino.descricao}
              </p>

              <div className="space-y-4 sm:space-y-6">
                {plan.plano_treino.dias.map((dia: any, index: number) => (
                  <Card key={index} className="p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-purple-50 border-2">
                    <div className="mb-3 sm:mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                        {dia.dia}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">{dia.foco}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      {dia.exercicios.map((exercicio: any, i: number) => (
                        <div key={i} className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                          <div className="flex items-start justify-between mb-2 gap-2">
                            <h4 className="text-sm sm:text-base font-bold text-gray-900">{exercicio.nome}</h4>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
                              {exercicio.series}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">{exercicio.descricao}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {exercicio.tempo}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-4 sm:p-5 bg-purple-50 border-2 border-purple-200 mt-4 sm:mt-6">
                <h3 className="text-sm sm:text-base font-bold text-purple-900 mb-2 flex items-center gap-2">
                  🎯 Dicas de Treino
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-purple-800">
                  {plan.plano_treino.dicas.map((dica: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-purple-600 mt-1">✓</span>
                      <span>{dica}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="p-6 sm:p-8 text-center bg-gradient-to-r from-emerald-600 to-blue-600 text-white mt-6 sm:mt-8 max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Pronto para Começar Sua Transformação?
          </h2>
          <p className="text-sm sm:text-base text-emerald-50 mb-4 sm:mb-6">
            Seu plano está completo! Agora é hora de colocar em prática e alcançar seus objetivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={handleDownloadComplete}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Baixar Plano Completo
            </Button>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white text-sm sm:text-base"
              >
                Ver Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Dialog de Detalhes da Refeição */}
      <Dialog open={showMealDetails} onOpenChange={setShowMealDetails}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedMeal && (() => {
            const recipe = getMealRecipe(selectedMeal);
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl">{selectedMeal.emoji}</span>
                    {selectedMeal.nome}
                  </DialogTitle>
                  <div className="flex gap-4 text-xs sm:text-sm text-gray-600 mt-2">
                    <span>⏱️ {recipe.tempoTotal}</span>
                    <span>👤 {recipe.porcoes}</span>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6 mt-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-3 flex items-center gap-2">
                      <Apple className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                      Ingredientes
                    </h3>
                    <ul className="space-y-2">
                      {recipe.ingredientes.map((ing: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
                          <span className="text-emerald-600 mt-1">✓</span>
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-bold mb-3 flex items-center gap-2">
                      <ChefHat className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      Modo de Preparo
                    </h3>
                    <ol className="space-y-3">
                      {recipe.preparo.map((step: any, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                            {step.passo}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm sm:text-base text-gray-700">{step.descricao}</p>
                            <p className="text-xs text-gray-500 mt-1">⏱️ {step.tempo}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <Card className="p-4 bg-yellow-50 border-2 border-yellow-200">
                    <h3 className="text-sm sm:text-base font-bold text-yellow-900 mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                      Dicas Profissionais
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-yellow-800">
                      {recipe.dicas.map((dica: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-yellow-600 mt-1">💡</span>
                          <span>{dica}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="border-t bg-white mt-8 sm:mt-12">
        <div className="container mx-auto px-4 py-6 sm:py-8 text-center text-gray-600 text-xs sm:text-sm">
          <p>© 2024 Amigo Fit. Todos os direitos reservados.</p>
          <p className="mt-2">Continue firme na sua jornada! 💪</p>
        </div>
      </footer>
    </div>
  );
}
