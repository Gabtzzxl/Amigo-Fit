'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Dumbbell, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ProfAmigoPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá, amigo! 👋 Sou o Prof Amigo, seu assistente pessoal de fitness baseado em ciência! Estou aqui para te ajudar com dúvidas sobre treinos, alimentação, receitas e muito mais. Todas as minhas respostas são fundamentadas em estudos científicos, artigos de médicos, nutricionistas e profissionais da saúde. Como posso te ajudar hoje?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simular resposta da IA (em produção, usar API real)
    setTimeout(() => {
      const response = generateIntelligentResponse(input);
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 1500);
  };

  const generateIntelligentResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    // Respostas sobre treino com base científica
    if (lowerQuestion.includes('flexão') || lowerQuestion.includes('flexões')) {
      return '💪 **Flexões - Guia Completo Baseado em Ciência**\n\n**Execução Correta:**\n1. Posição inicial: mãos na largura dos ombros, corpo em linha reta\n2. Desça controladamente até o peito quase tocar o chão (90° nos cotovelos)\n3. Empurre com força, mantendo o core contraído\n4. Expire ao subir, inspire ao descer\n\n**Benefícios Científicos:**\n• Ativa 20+ músculos simultaneamente (peitoral, tríceps, deltoides, core)\n• Estudo da Harvard Medical School: 40+ flexões = 96% menos risco cardiovascular\n• Melhora densidade óssea e postura\n\n**Progressões:**\n• Iniciante: flexões de joelhos ou na parede\n• Intermediário: flexões tradicionais\n• Avançado: flexões diamante, declinadas ou com peso\n\n**Dica Pro:** Faça 3-4 séries até a falha, 3x por semana para resultados ótimos!';
    }

    if (lowerQuestion.includes('proteína') || lowerQuestion.includes('proteina')) {
      return '🥩 **Proteína - Guia Científico Completo**\n\n**Quantidade Recomendada (baseado em estudos):**\n• Sedentário: 0.8g/kg de peso corporal\n• Ativo/Fitness: 1.6-2.2g/kg\n• Atletas: 2.0-2.5g/kg\n• Exemplo: pessoa de 70kg ativa = 112-154g/dia\n\n**Melhores Fontes (biodisponibilidade):**\n1. Whey protein (absorção rápida)\n2. Ovos (proteína completa, 6g/ovo)\n3. Frango (31g/100g)\n4. Peixe (20-25g/100g)\n5. Leguminosas (feijão, lentilha - veganos)\n\n**Timing Ideal (Journal of International Society):**\n• Pós-treino: 20-40g em até 2h\n• Distribuir ao longo do dia (4-5 refeições)\n• Antes de dormir: caseína (absorção lenta)\n\n**Mito Derrubado:** Excesso de proteína NÃO prejudica rins saudáveis (estudo JAMA 2020)';
    }

    if (lowerQuestion.includes('emagrecer') || lowerQuestion.includes('perder peso') || lowerQuestion.includes('gordura')) {
      return '🔥 **Perda de Peso - Protocolo Científico**\n\n**Fundamento (Termodinâmica):**\nPara perder 1kg de gordura = déficit de 7.700 calorias\n\n**Estratégia Comprovada:**\n1. **Déficit Calórico Moderado:** 300-500 cal/dia\n   • Perda saudável: 0.5-1kg/semana\n   • Preserva massa muscular\n\n2. **Macronutrientes Ideais:**\n   • Proteína: 2g/kg (saciedade + preserva músculo)\n   • Carboidratos: 40-45% (energia)\n   • Gorduras: 25-30% (hormônios)\n\n3. **Exercícios (Estudo ACSM):**\n   • Musculação 3x/semana (aumenta metabolismo)\n   • Cardio 150min/semana (moderado)\n   • HIIT 2x/semana (queima pós-treino)\n\n4. **Fatores Críticos:**\n   • Sono 7-9h (regula leptina/grelina)\n   • Hidratação 35ml/kg\n   • Reduzir estresse (cortisol)\n\n**Evidência:** Estudo NEJM 2009 - combinação dieta + exercício = 2x mais eficaz';
    }

    if (lowerQuestion.includes('hipertrofia') || lowerQuestion.includes('ganhar massa') || lowerQuestion.includes('músculo')) {
      return '💪 **Hipertrofia Muscular - Ciência Aplicada**\n\n**Princípios Fundamentais:**\n\n**1. Tensão Mecânica (mais importante)**\n• Cargas: 60-85% 1RM\n• Repetições: 6-12 (hipertrofia)\n• Séries: 3-5 por exercício\n• Frequência: cada músculo 2x/semana\n\n**2. Estresse Metabólico**\n• Tempo sob tensão: 40-70s por série\n• Descanso: 60-90s entre séries\n• Técnicas: drop sets, rest-pause\n\n**3. Dano Muscular Controlado**\n• Fase excêntrica lenta (3-4s)\n• Amplitude completa de movimento\n• Variação de exercícios a cada 4-6 semanas\n\n**Nutrição para Hipertrofia:**\n• Superávit: +300-500 cal/dia\n• Proteína: 1.8-2.2g/kg\n• Carbos: 4-6g/kg (energia)\n• Refeição pós-treino em 2h\n\n**Suplementos com Evidência:**\n• Creatina 5g/dia (+8-14% força)\n• Whey protein (conveniência)\n• Cafeína pré-treino (performance)\n\n**Fonte:** Position Stand ACSM 2021';
    }

    if (lowerQuestion.includes('treino') || lowerQuestion.includes('exercício')) {
      return '🏋️ **Treino Eficiente - Baseado em Evidências**\n\n**Princípios FITT (ACSM):**\n• **F**requência: 3-5x/semana\n• **I**ntensidade: 60-80% capacidade\n• **T**empo: 30-60 min/sessão\n• **T**ipo: resistência + cardio\n\n**Estrutura Ideal de Treino:**\n1. Aquecimento (5-10min)\n   • Mobilidade articular\n   • Cardio leve\n   • Ativação muscular\n\n2. Treino Principal (30-45min)\n   • Exercícios compostos primeiro\n   • Progressão de carga semanal\n   • Técnica > peso\n\n3. Desaquecimento (5-10min)\n   • Alongamento estático\n   • Respiração profunda\n\n**Divisão Recomendada (Iniciante):**\n• ABC: Peito/Tríceps, Costas/Bíceps, Pernas/Ombro\n• Full Body: 3x/semana (eficiente)\n\n**Progressão Segura:**\n• Aumente carga 2-5% quando conseguir fazer 2 reps extras\n• Deload a cada 4-6 semanas (50% volume)\n\nQuer um treino específico para algum grupo muscular?';
    }

    if (lowerQuestion.includes('aliment') || lowerQuestion.includes('comida') || lowerQuestion.includes('dieta')) {
      return '🍎 **Nutrição Inteligente - Guia Científico**\n\n**Pirâmide Alimentar Moderna:**\n\n**Base (80% da dieta):**\n• Vegetais: 400-500g/dia (OMS)\n• Frutas: 2-3 porções/dia\n• Grãos integrais: arroz, aveia, quinoa\n• Proteínas magras: frango, peixe, ovos\n• Gorduras boas: azeite, abacate, castanhas\n\n**Princípios Fundamentais:**\n1. **Comida de Verdade** (Michael Pollan)\n   • Evite ultraprocessados\n   • Se tem mais de 5 ingredientes, evite\n   • Prefira alimentos in natura\n\n2. **Equilíbrio de Macros**\n   • Proteína: 25-30% (saciedade)\n   • Carboidratos: 40-50% (energia)\n   • Gorduras: 20-30% (hormônios)\n\n3. **Micronutrientes Essenciais**\n   • Vitamina D: sol + suplemento\n   • Ômega-3: peixes, linhaça\n   • Magnésio: castanhas, espinafre\n   • Zinco: carnes, leguminosas\n\n**Hidratação (ACSM):**\n• 35ml/kg de peso\n• +500ml a cada hora de treino\n• Urina clara = bem hidratado\n\n**Dica de Ouro:** Prato colorido = nutrientes variados!';
    }

    if (lowerQuestion.includes('receita')) {
      return '👨‍🍳 **Receitas Saudáveis e Práticas**\n\n**🥗 Salada Proteica Completa**\n• 150g frango grelhado\n• Mix de folhas verdes\n• 1/2 abacate\n• Tomate cereja\n• Grão de bico\n• Azeite + limão\n**Macros:** 450 cal, 45g prot, 30g carb, 18g gord\n\n**🍳 Omelete Fitness**\n• 3 ovos inteiros\n• Espinafre\n• Tomate\n• Queijo cottage\n• Temperos naturais\n**Macros:** 320 cal, 28g prot, 8g carb, 20g gord\n\n**🥤 Smoothie Pós-Treino**\n• 1 banana\n• 30g whey protein\n• 200ml leite\n• 1 col aveia\n• Canela\n**Macros:** 380 cal, 35g prot, 45g carb, 8g gord\n\n**🍗 Frango Teriyaki Fit**\n• 200g peito de frango\n• Molho shoyu light\n• Gengibre + alho\n• Brócolis no vapor\n• Arroz integral\n**Macros:** 520 cal, 55g prot, 50g carb, 10g gord\n\nQuer receita específica para alguma refeição?';
    }

    if (lowerQuestion.includes('motivação') || lowerQuestion.includes('desanima') || lowerQuestion.includes('desistir')) {
      return '🌟 **Motivação - Psicologia do Sucesso**\n\n**Ciência da Motivação:**\n\n**1. Estabeleça Metas SMART**\n• Específicas\n• Mensuráveis\n• Atingíveis\n• Relevantes\n• Temporais\n\n**2. Sistema de Recompensas (Dopamina)**\n• Celebre pequenas vitórias\n• Registre progresso (fotos, medidas)\n• Recompense-se a cada marco\n\n**3. Hábitos > Motivação**\n• Motivação é temporária\n• Hábitos são permanentes\n• Regra dos 21 dias (mínimo)\n• Consistência > Intensidade\n\n**4. Suporte Social (Estudo Stanford)**\n• Treinar com amigo = +95% aderência\n• Compartilhe objetivos\n• Grupo de apoio\n\n**Frases Científicas:**\n• "Disciplina é liberdade" - Jocko Willink\n• "1% melhor todo dia = 37x melhor em 1 ano"\n• "Progresso, não perfeição"\n\n**Lembre-se:** Dias ruins fazem parte. O importante é não desistir. Você está construindo uma versão melhor de si mesmo! 💪\n\nEstou aqui para te apoiar sempre que precisar!';
    }

    if (lowerQuestion.includes('suplemento')) {
      return '💊 **Suplementos - Guia Baseado em Evidências**\n\n**Tier 1 - Evidência Forte:**\n\n**1. Creatina Monohidratada**\n• Dose: 3-5g/dia\n• Benefícios: +8-14% força, +2-4% massa magra\n• Segurança: estudos de 30+ anos\n• Melhor custo-benefício\n\n**2. Whey Protein**\n• Dose: 20-40g pós-treino\n• Benefícios: conveniência, absorção rápida\n• Quando: se não atingir proteína na dieta\n\n**3. Cafeína**\n• Dose: 3-6mg/kg (pré-treino)\n• Benefícios: +3-7% performance\n• Timing: 30-60min antes\n\n**Tier 2 - Evidência Moderada:**\n\n**4. Ômega-3 (EPA/DHA)**\n• Dose: 2-3g/dia\n• Benefícios: anti-inflamatório, saúde cardiovascular\n\n**5. Vitamina D**\n• Dose: 2000-4000 UI/dia\n• Benefícios: imunidade, ossos, humor\n• 90% da população tem deficiência\n\n**6. Multivitamínico**\n• Seguro alimentar\n• Preenche gaps nutricionais\n\n**❌ Evite (sem evidência):**\n• Termogênicos milagrosos\n• Detox/emagrecedores\n• BCAAs (se come proteína suficiente)\n\n**Fonte:** Examine.com, ISSN Position Stands';
    }

    if (lowerQuestion.includes('sono') || lowerQuestion.includes('dormir') || lowerQuestion.includes('descanso')) {
      return '😴 **Sono e Recuperação - Ciência do Descanso**\n\n**Importância Científica:**\n• 7-9h/noite = ideal (National Sleep Foundation)\n• Sono < 6h = -11% performance atlética\n• Recuperação muscular acontece 70% durante sono\n\n**Fases do Sono:**\n1. **REM** (memória, aprendizado)\n2. **Profundo** (recuperação física, GH)\n3. **Leve** (transição)\n\n**Protocolo para Sono de Qualidade:**\n\n**2h Antes:**\n• Desligue telas (luz azul ↓ melatonina)\n• Temperatura ambiente: 18-21°C\n• Evite cafeína após 14h\n• Refeição leve\n\n**1h Antes:**\n• Rotina relaxante (leitura, meditação)\n• Banho morno\n• Quarto escuro e silencioso\n• Suplemento: magnésio 400mg\n\n**Benefícios do Sono Adequado:**\n• +20% síntese proteica\n• Regula hormônios (testosterona, cortisol)\n• Melhora foco e humor\n• Acelera perda de gordura\n\n**Dica Pro:** Mantenha horário fixo (mesmo fins de semana)\n\n**Estudo:** Atletas que dormem 10h = +9% precisão, +12% velocidade';
    }

    // Resposta padrão inteligente
    return '🤔 **Ótima pergunta!**\n\nEstou aqui para te ajudar com informações baseadas em ciência sobre:\n\n💪 **Treinos:** Exercícios, técnicas, periodização\n🍎 **Nutrição:** Dietas, macros, timing nutricional\n👨‍🍳 **Receitas:** Opções saudáveis e práticas\n💊 **Suplementos:** O que funciona (com evidências)\n😴 **Recuperação:** Sono, descanso, overtraining\n🎯 **Objetivos:** Emagrecimento, hipertrofia, performance\n🧠 **Motivação:** Psicologia, hábitos, consistência\n\n**Todas as minhas respostas são fundamentadas em:**\n• Estudos científicos revisados por pares\n• Guidelines de organizações (ACSM, ISSN, OMS)\n• Consenso de especialistas (médicos, nutricionistas)\n\nPode perguntar qualquer coisa específica! Quanto mais detalhes você der, melhor posso te ajudar. 😊';
  };

  const suggestedQuestions = [
    'Como fazer flexões corretamente?',
    'Quanto de proteína devo comer?',
    'Melhor treino para hipertrofia',
    'Receita de café da manhã fitness',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Amigo Fit
            </span>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto px-4 py-6 sm:py-8 max-w-4xl flex flex-col">
        <div className="text-center mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Prof Amigo 🤝
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Seu assistente pessoal de fitness baseado em ciência
          </p>
        </div>

        {/* Messages Container */}
        <Card className="flex-1 p-4 mb-4 overflow-y-auto max-h-[500px] space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-medium text-purple-600">Prof Amigo</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-emerald-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </Card>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Perguntas sugeridas:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto py-2 px-3"
                  onClick={() => setInput(question)}
                >
                  <span className="text-xs">{question}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua pergunta..."
            className="flex-1"
            disabled={loading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>

        {/* Info Card */}
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 mt-4">
          <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Respostas Baseadas em Ciência
          </h3>
          <ul className="space-y-2 text-sm text-purple-800">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">🔬</span>
              <span>Estudos científicos revisados por pares</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">👨‍⚕️</span>
              <span>Consenso de médicos e nutricionistas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">📊</span>
              <span>Guidelines de organizações internacionais</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">💡</span>
              <span>Informações práticas e aplicáveis</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
