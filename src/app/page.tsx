'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Dumbbell, Apple, Target, Sparkles, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Amigo Fit
            </span>
          </div>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm" className="gap-2">
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </Link>
            <Link href="/quiz">
              <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                Começar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Seu assistente pessoal de fitness
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Transforme seu corpo com
            <span className="block bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              planos personalizados
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Receba um plano alimentar e de treinos em casa totalmente adaptado aos seus objetivos, 
            preferências e rotina. Tudo em poucos minutos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link href="/quiz">
              <Button 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Criar Meu Plano Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver Como Funciona
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4">
              <Apple className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Plano Alimentar
            </h3>
            <p className="text-gray-600">
              Cardápio personalizado baseado nas suas preferências, restrições e objetivos nutricionais.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Treinos em Casa
            </h3>
            <p className="text-gray-600">
              Exercícios adaptados ao seu nível, sem necessidade de equipamentos caros ou academia.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              100% Personalizado
            </h3>
            <p className="text-gray-600">
              Cada plano é único e criado especialmente para você, considerando sua rotina e metas.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="container mx-auto px-4 py-12 sm:py-16 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl my-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Como Funciona?
          </h2>
          
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Responda o Quiz
              </h3>
              <p className="text-gray-600 text-sm">
                Perguntas simples sobre seus objetivos, preferências e rotina.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Faça Seu Cadastro
              </h3>
              <p className="text-gray-600 text-sm">
                Informe seus dados pessoais para personalizar ainda mais seu plano.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                Comece Hoje
              </h3>
              <p className="text-gray-600 text-sm">
                Receba seu plano completo e comece sua transformação imediatamente.
              </p>
            </div>
          </div>

          <Link href="/quiz">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg mt-6"
            >
              Começar Meu Plano Agora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600 text-sm">
          <p>© 2024 Amigo Fit. Todos os direitos reservados.</p>
          <p className="mt-2">Seu parceiro na jornada fitness 💪</p>
        </div>
      </footer>
    </div>
  );
}
