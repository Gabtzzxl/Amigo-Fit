'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Loader2, Dumbbell } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface QuizAnswer {
  question: string;
  answer: string;
}

const questions = [
  {
    id: 'objetivo',
    question: 'Qual é o seu principal objetivo?',
    options: [
      { value: 'perder_peso', label: 'Perder peso', emoji: '🎯' },
      { value: 'ganhar_massa', label: 'Ganhar massa muscular', emoji: '💪' },
      { value: 'manter_forma', label: 'Manter a forma', emoji: '✨' },
      { value: 'melhorar_saude', label: 'Melhorar saúde geral', emoji: '❤️' },
    ],
  },
  {
    id: 'nivel',
    question: 'Qual é o seu nível de condicionamento físico?',
    options: [
      { value: 'iniciante', label: 'Iniciante', emoji: '🌱' },
      { value: 'intermediario', label: 'Intermediário', emoji: '🏃' },
      { value: 'avancado', label: 'Avançado', emoji: '🏆' },
    ],
  },
  {
    id: 'tempo',
    question: 'Quanto tempo você tem disponível para treinar por dia?',
    options: [
      { value: '15min', label: '15-20 minutos', emoji: '⏱️' },
      { value: '30min', label: '30-40 minutos', emoji: '⏰' },
      { value: '60min', label: '60+ minutos', emoji: '🕐' },
    ],
  },
  {
    id: 'frequencia',
    question: 'Quantos dias por semana você pode treinar?',
    options: [
      { value: '2-3', label: '2-3 dias', emoji: '📅' },
      { value: '4-5', label: '4-5 dias', emoji: '📆' },
      { value: '6-7', label: '6-7 dias', emoji: '🗓️' },
    ],
  },
  {
    id: 'restricoes',
    question: 'Você tem alguma restrição alimentar?',
    options: [
      { value: 'nenhuma', label: 'Nenhuma', emoji: '🍽️' },
      { value: 'vegetariano', label: 'Vegetariano', emoji: '🥗' },
      { value: 'vegano', label: 'Vegano', emoji: '🌱' },
      { value: 'sem_lactose', label: 'Sem lactose', emoji: '🥛' },
      { value: 'sem_gluten', label: 'Sem glúten', emoji: '🌾' },
    ],
  },
  {
    id: 'refeicoes',
    question: 'Quantas refeições você faz por dia?',
    options: [
      { value: '3', label: '3 refeições', emoji: '🍳' },
      { value: '4', label: '4 refeições', emoji: '🥙' },
      { value: '5', label: '5-6 refeições', emoji: '🍱' },
    ],
  },
  {
    id: 'idade',
    question: 'Qual é a sua faixa etária?',
    options: [
      { value: '18-25', label: '18-25 anos', emoji: '👤' },
      { value: '26-35', label: '26-35 anos', emoji: '👨' },
      { value: '36-45', label: '36-45 anos', emoji: '👨‍💼' },
      { value: '46+', label: '46+ anos', emoji: '👴' },
    ],
  },
  {
    id: 'equipamento',
    question: 'Você tem algum equipamento em casa?',
    options: [
      { value: 'nenhum', label: 'Nenhum (só peso corporal)', emoji: '🤸' },
      { value: 'basico', label: 'Básico (halteres, elásticos)', emoji: '🏋️' },
      { value: 'completo', label: 'Equipamento completo', emoji: '🏋️‍♂️' },
    ],
  },
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    
    // Simula geração do plano (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Salva respostas no localStorage
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    
    // Redireciona para página de cadastro
    router.push('/cadastro');
  };

  const isAnswered = answers[currentQuestion.id] !== undefined;

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center mx-auto animate-pulse">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Analisando Suas Respostas...
            </h2>
            <p className="text-gray-600">
              Estamos processando suas informações para criar o plano perfeito para você!
            </p>
          </div>
          <div className="space-y-2 text-sm text-gray-500">
            <p>✓ Analisando objetivos</p>
            <p>✓ Calculando necessidades</p>
            <p>✓ Preparando próxima etapa</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Amigo Fit
            </span>
          </Link>
          <div className="text-sm text-gray-600">
            Passo {currentStep + 1} de {questions.length}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-600 to-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 sm:p-8 shadow-xl border-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {currentQuestion.question}
                </h2>
                <p className="text-gray-600 text-sm">
                  Selecione a opção que melhor se adequa a você
                </p>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                      answers[currentQuestion.id] === option.value
                        ? 'border-emerald-600 bg-emerald-50 shadow-md'
                        : 'border-gray-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.emoji}</span>
                      <span className={`font-medium ${
                        answers[currentQuestion.id] === option.value
                          ? 'text-emerald-900'
                          : 'text-gray-900'
                      }`}>
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
                >
                  {currentStep === questions.length - 1 ? 'Continuar' : 'Próximo'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
