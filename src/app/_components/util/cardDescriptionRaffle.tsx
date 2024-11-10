'use client'

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const CardDescriptionRaffle = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="w-full  mx-auto">

      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4 text-center">O que você pode ganhar:</h2>
        <ul className="space-y-4 text-gray-700 mb-6">
          <li className="flex items-center">
            <span className="text-3xl mr-3">🥩</span>
            <span className="text-lg">7 peças suculentas de picanha</span>
          </li>
          <li className="flex items-center">
            <span className="text-3xl mr-3">🍺</span>
            <span className="text-lg">4 chopes gelados</span>
          </li>
        </ul>
        <div className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}>
          <h3 className="text-lg font-semibold mb-3">Detalhes do prêmio:</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Picanha premium de 1,2kg cada peça, perfeita para churrasco</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Chopes artesanais de 500ml cada, incluindo variedades como Pilsen e IPA</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Entrega gratuita na região metropolitana ou retirada no local</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Validade do prêmio: 3 meses após o sorteio</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span>Acompanha kit de temperos especiais para churrasco</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center"
        >
          {isExpanded ? (
            <>
              Mostrar menos <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Mostrar mais <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}