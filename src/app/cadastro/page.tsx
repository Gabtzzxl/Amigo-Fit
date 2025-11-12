'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Loader2, Dumbbell, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CadastroData {
  nome: string;
  idade: string;
  sexo: string;
  pesoAtual: string;
  pesoMeta: string;
}

const steps = [
  {
    id: 'nome',
    question: 'Qual é o seu nome?',
    placeholder: 'Digite seu nome completo',
    type: 'text',
    emoji: '👤',
  },
  {
    id: 'idade',
    question: 'Qual é a sua idade?',
    placeholder: 'Digite sua idade',
    type: 'number',
    emoji: '🎂',
  },
  {
    id: 'sexo',
    question: 'Qual é o seu sexo?',
    type: 'options',
    emoji: '⚧',
    options: [
      { value: 'masculino', label: 'Masculino', emoji: '👨' },
      { value: 'feminino', label: 'Feminino', emoji: '👩' },
      { value: 'outro', label: 'Outro', emoji: '🧑' },
    ],
  },
  {
    id: 'pesoAtual',
    question: 'Qual é o seu peso atual? (kg)',
    placeholder: 'Digite seu peso em kg',
    type: 'number',
    emoji: '⚖️',
  },
  {
    id: 'pesoMeta',
    question: 'Qual é a sua meta de peso? (kg)',
    placeholder: 'Digite sua meta de peso em kg',
    type: 'number',
    emoji: '🎯',
  },
];

export default function CadastroPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [cadastroData, setCadastroData] = useState<CadastroData>({
    nome: '',
    idade: '',
    sexo: '',
    pesoAtual: '',
    pesoMeta: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const currentQuestion = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleInputChange = (value: string) => {
    setCadastroData({
      ...cadastroData,
      [currentQuestion.id]: value,
    });
  };

  const isStepValid = () => {
    const value = cadastroData[currentQuestion.id as keyof CadastroData];
    if (currentQuestion.type === 'options') {
      return value !== '';
    }
    return value.trim() !== '';
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
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
    setIsSubmitting(true);

    // Salva dados do cadastro no localStorage
    localStorage.setItem('userData', JSON.stringify(cadastroData));

    // Simula processamento (1 segundo)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redireciona para o dashboard
    router.push('/dashboard');
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center mx-auto animate-pulse">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Finalizando Cadastro...
            </h2>
            <p className="text-gray-600">
              Estamos preparando tudo para você. Aguarde um momento!
            </p>
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
            Passo {currentStep + 1} de {steps.length}
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

      {/* Cadastro Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 sm:p-8 shadow-xl border-2">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{currentQuestion.emoji}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {currentQuestion.question}
                </h2>
                <p className="text-gray-600 text-sm">
                  {currentQuestion.type === 'options'
                    ? 'Selecione uma opção'
                    : 'Digite sua resposta abaixo'}
                </p>
              </div>

              {currentQuestion.type === 'options' ? (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleInputChange(option.value)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                        cadastroData[currentQuestion.id as keyof CadastroData] ===
                        option.value
                          ? 'border-emerald-600 bg-emerald-50 shadow-md'
                          : 'border-gray-200 hover:border-emerald-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{option.emoji}</span>
                        <span
                          className={`font-medium ${
                            cadastroData[currentQuestion.id as keyof CadastroData] ===
                            option.value
                              ? 'text-emerald-900'
                              : 'text-gray-900'
                          }`}
                        >
                          {option.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <Input
                    type={currentQuestion.type}
                    value={cadastroData[currentQuestion.id as keyof CadastroData]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="text-lg p-6 text-center"
                    autoFocus
                  />
                </div>
              )}

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
                  disabled={!isStepValid()}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
                >
                  {currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Info Card */}
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 mt-6">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-blue-900 mb-1">
                  Por que precisamos dessas informações?
                </h3>
                <p className="text-sm text-blue-800">
                  Esses dados nos ajudam a personalizar ainda mais seu plano de treinos
                  e alimentação, garantindo resultados mais efetivos e seguros para você!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
