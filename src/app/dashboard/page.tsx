'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dumbbell, 
  Apple, 
  Camera, 
  MessageCircle, 
  TrendingDown, 
  Target, 
  Award,
  Scale,
  Flame
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [pesoAtual, setPesoAtual] = useState(85);
  const [pesoInicial, setPesoInicial] = useState(95);
  const [pesoMeta, setPesoMeta] = useState(75);
  const [editandoPeso, setEditandoPeso] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      setUserName(userData.nome);
      setPesoAtual(Number(userData.pesoAtual));
      setPesoInicial(Number(userData.pesoAtual)); // Peso inicial é o peso atual no cadastro
      setPesoMeta(Number(userData.pesoMeta));
    } else {
      // Se não tem dados, redireciona para o quiz
      router.push('/quiz');
    }
  }, [router]);

  const quilosPerdidos = pesoInicial - pesoAtual;
  const quilosFaltando = pesoAtual - pesoMeta;
  const progressoPercentual = ((quilosPerdidos / (pesoInicial - pesoMeta)) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
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
          {userName && (
            <div className="text-sm text-gray-600">
              Olá, <span className="font-semibold">{userName}</span>! 👋
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Tabs defaultValue="progreso" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-8 h-auto">
            <TabsTrigger value="progreso" className="text-xs sm:text-sm py-2 sm:py-3">
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Progreso</span>
              <span className="sm:hidden">Prog.</span>
            </TabsTrigger>
            <TabsTrigger value="plano" className="text-xs sm:text-sm py-2 sm:py-3">
              <Apple className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Plano
            </TabsTrigger>
            <TabsTrigger value="scanner" className="text-xs sm:text-sm py-2 sm:py-3">
              <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Scanner
            </TabsTrigger>
            <TabsTrigger value="prof-amigo" className="text-xs sm:text-sm py-2 sm:py-3">
              <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Prof Amigo</span>
              <span className="sm:hidden">Prof</span>
            </TabsTrigger>
          </TabsList>

          {/* Área Progreso */}
          <TabsContent value="progreso" className="space-y-4 sm:space-y-6">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Seu Progresso 🎯
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Acompanhe sua jornada de transformação
              </p>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Peso Atual */}
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  <span className="text-xs sm:text-sm font-medium text-blue-700">Peso Atual</span>
                </div>
                {editandoPeso ? (
                  <div className="space-y-2">
                    <Input
                      type="number"
                      value={pesoAtual}
                      onChange={(e) => setPesoAtual(Number(e.target.value))}
                      className="text-xl sm:text-2xl font-bold text-center"
                    />
                    <Button
                      size="sm"
                      onClick={() => setEditandoPeso(false)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                    >
                      Salvar
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="text-3xl sm:text-4xl font-bold text-blue-900 mb-2">
                      {pesoAtual} kg
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditandoPeso(true)}
                      className="w-full text-xs sm:text-sm"
                    >
                      Atualizar Peso
                    </Button>
                  </>
                )}
              </Card>

              {/* Quilos Perdidos */}
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                  <span className="text-xs sm:text-sm font-medium text-emerald-700">Já Perdeu</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-emerald-900 mb-2">
                  {quilosPerdidos} kg
                </div>
                <div className="text-xs sm:text-sm text-emerald-700">
                  🎉 Parabéns pelo progresso!
                </div>
              </Card>

              {/* Quilos Faltando */}
              <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                  <span className="text-xs sm:text-sm font-medium text-purple-700">Falta Perder</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-purple-900 mb-2">
                  {quilosFaltando} kg
                </div>
                <div className="text-xs sm:text-sm text-purple-700">
                  💪 Continue firme!
                </div>
              </Card>
            </div>

            {/* Barra de Progresso Interativa */}
            <Card className="p-6 sm:p-8 bg-gradient-to-br from-orange-50 to-pink-50 border-2 border-orange-200">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Meta de Peso 🎯
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  De {pesoInicial}kg para {pesoMeta}kg
                </p>
              </div>

              {/* Barra de Progresso Visual */}
              <div className="relative h-10 sm:h-12 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 transition-all duration-1000 ease-out flex items-center justify-end pr-3 sm:pr-4"
                  style={{ width: `${Math.min(Number(progressoPercentual), 100)}%` }}
                >
                  <span className="text-white font-bold text-xs sm:text-sm">
                    {progressoPercentual}%
                  </span>
                </div>
              </div>

              {/* Marcos de Progresso */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl sm:text-2xl">🚀</span>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">Início</div>
                  <div className="text-xs text-gray-500">{pesoInicial}kg</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl sm:text-2xl">💪</span>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">Atual</div>
                  <div className="text-xs text-gray-500">{pesoAtual}kg</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl sm:text-2xl">🏆</span>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-gray-700">Meta</div>
                  <div className="text-xs text-gray-500">{pesoMeta}kg</div>
                </div>
              </div>

              {/* Mensagem Motivacional */}
              <Card className="p-3 sm:p-4 bg-white/80 backdrop-blur-sm mt-4 sm:mt-6 border-2 border-orange-300">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                      {Number(progressoPercentual) < 25 && "Você está começando bem! 🌟"}
                      {Number(progressoPercentual) >= 25 && Number(progressoPercentual) < 50 && "Ótimo progresso! Continue assim! 🔥"}
                      {Number(progressoPercentual) >= 50 && Number(progressoPercentual) < 75 && "Você está na metade do caminho! 💪"}
                      {Number(progressoPercentual) >= 75 && Number(progressoPercentual) < 100 && "Quase lá! Não desista agora! 🚀"}
                      {Number(progressoPercentual) >= 100 && "Parabéns! Você alcançou sua meta! 🏆"}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {Number(progressoPercentual) < 100 
                        ? `Faltam apenas ${quilosFaltando}kg para alcançar seu objetivo!`
                        : "Você é incrível! Considere definir uma nova meta."}
                    </p>
                  </div>
                </div>
              </Card>
            </Card>

            {/* Dicas de Progresso */}
            <Card className="p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                Dicas para Acelerar seu Progresso
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                  <span className="text-orange-600 mt-1">✓</span>
                  <span>Atualize seu peso semanalmente para acompanhar melhor</span>
                </li>
                <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                  <span className="text-orange-600 mt-1">✓</span>
                  <span>Tire fotos mensais para ver a transformação visual</span>
                </li>
                <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                  <span className="text-orange-600 mt-1">✓</span>
                  <span>Celebre cada conquista, por menor que seja!</span>
                </li>
                <li className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                  <span className="text-orange-600 mt-1">✓</span>
                  <span>Use o Prof Amigo para tirar dúvidas e manter a motivação</span>
                </li>
              </ul>
            </Card>
          </TabsContent>

          {/* Plano Alimentar */}
          <TabsContent value="plano">
            <Card className="p-6 sm:p-8 text-center">
              <Apple className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Plano Alimentar</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4">Acesse seu plano completo de alimentação e treinos</p>
              <Link href="/plano">
                <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 w-full sm:w-auto">
                  Ver Plano Completo
                </Button>
              </Link>
            </Card>
          </TabsContent>

          {/* Scanner de Alimentos */}
          <TabsContent value="scanner">
            <Card className="p-6 sm:p-8 text-center">
              <Camera className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Scanner de Alimentos</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4">Tire foto do seu prato e receba análise nutricional</p>
              <Link href="/scanner">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 w-full sm:w-auto">
                  Abrir Scanner
                </Button>
              </Link>
            </Card>
          </TabsContent>

          {/* Prof Amigo */}
          <TabsContent value="prof-amigo">
            <Card className="p-6 sm:p-8 text-center">
              <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Prof Amigo</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4">Converse com seu assistente pessoal de fitness</p>
              <Link href="/prof-amigo">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 w-full sm:w-auto">
                  Iniciar Conversa
                </Button>
              </Link>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
