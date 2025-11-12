'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Upload, X, Loader2, Flame, Apple, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Dumbbell } from 'lucide-react';

interface FoodAnalysis {
  nome: string;
  calorias: number;
  proteinas: number;
  carboidratos: number;
  gorduras: number;
  fibras: number;
  avaliacao: 'excelente' | 'bom' | 'moderado' | 'evitar';
  recomendacao: string;
  substituicoes: string[];
}

export default function ScannerPage() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<FoodAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzeFood();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeFood = () => {
    setAnalyzing(true);
    // Simulação de análise (em produção, usar API de visão computacional)
    setTimeout(() => {
      setAnalysis({
        nome: 'Prato Misto',
        calorias: 650,
        proteinas: 35,
        carboidratos: 75,
        gorduras: 18,
        fibras: 8,
        avaliacao: 'bom',
        recomendacao: 'Seu prato está equilibrado! Boa quantidade de proteínas e carboidratos. Considere adicionar mais vegetais para aumentar as fibras.',
        substituicoes: [
          'Substitua o arroz branco por arroz integral para mais fibras',
          'Adicione uma porção maior de salada verde',
          'Reduza a quantidade de óleo no preparo',
        ],
      });
      setAnalyzing(false);
    }, 2000);
  };

  const resetScanner = () => {
    setImage(null);
    setAnalysis(null);
    setAnalyzing(false);
  };

  const getAvaliacaoColor = (avaliacao: string) => {
    switch (avaliacao) {
      case 'excelente':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'bom':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'moderado':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'evitar':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAvaliacaoIcon = (avaliacao: string) => {
    switch (avaliacao) {
      case 'excelente':
      case 'bom':
        return <CheckCircle className="w-6 h-6" />;
      case 'moderado':
        return <AlertCircle className="w-6 h-6" />;
      case 'evitar':
        return <X className="w-6 h-6" />;
      default:
        return null;
    }
  };

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
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Scanner de Alimentos 📸
          </h1>
          <p className="text-gray-600">
            Tire uma foto do seu prato e receba análise nutricional completa
          </p>
        </div>

        {!image ? (
          <Card className="p-12 text-center border-2 border-dashed border-gray-300 hover:border-emerald-500 transition-colors">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Adicione uma Foto do Seu Prato
            </h2>
            <p className="text-gray-600 mb-6">
              Tire uma foto ou selecione uma imagem da galeria
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-blue-600"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-5 h-5 mr-2" />
                Selecionar Foto
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Imagem */}
            <Card className="p-4">
              <div className="relative">
                <img
                  src={image}
                  alt="Alimento"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={resetScanner}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Loading */}
            {analyzing && (
              <Card className="p-8 text-center">
                <Loader2 className="w-12 h-12 text-emerald-600 mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Analisando seu prato...
                </h3>
                <p className="text-gray-600">
                  Estamos identificando os alimentos e calculando os valores nutricionais
                </p>
              </Card>
            )}

            {/* Análise */}
            {analysis && !analyzing && (
              <div className="space-y-6">
                {/* Avaliação Geral */}
                <Card className={`p-6 border-2 ${getAvaliacaoColor(analysis.avaliacao)}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getAvaliacaoIcon(analysis.avaliacao)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">
                        {analysis.nome}
                      </h3>
                      <p className="text-sm">
                        {analysis.recomendacao}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Informações Nutricionais */}
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-600" />
                    Informações Nutricionais
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600">
                        {analysis.calorias}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Calorias</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">
                        {analysis.proteinas}g
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Proteínas</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center border border-purple-200">
                      <div className="text-2xl font-bold text-purple-600">
                        {analysis.carboidratos}g
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Carboidratos</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-200">
                      <div className="text-2xl font-bold text-yellow-600">
                        {analysis.gorduras}g
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Gorduras</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                      <div className="text-2xl font-bold text-green-600">
                        {analysis.fibras}g
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Fibras</div>
                    </div>
                  </div>
                </Card>

                {/* Substituições Recomendadas */}
                {analysis.substituicoes.length > 0 && (
                  <Card className="p-6 bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Apple className="w-5 h-5 text-emerald-600" />
                      Sugestões de Melhoria
                    </h3>
                    <ul className="space-y-3">
                      {analysis.substituicoes.map((sub, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-700">
                          <span className="text-emerald-600 mt-1">✓</span>
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Ações */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={resetScanner}
                    className="flex-1"
                  >
                    Analisar Outro Prato
                  </Button>
                  <Link href="/dashboard" className="flex-1">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-emerald-600 to-blue-600"
                    >
                      Voltar ao Dashboard
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Dicas */}
        <Card className="p-6 bg-blue-50 border-2 border-blue-200 mt-8">
          <h3 className="font-bold text-blue-900 mb-3">
            💡 Dicas para Melhor Análise
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Tire a foto de cima, mostrando todo o prato</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Certifique-se de que há boa iluminação</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Evite sombras sobre os alimentos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Quanto mais clara a foto, melhor a análise</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
