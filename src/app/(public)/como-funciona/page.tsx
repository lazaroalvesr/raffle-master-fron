import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, Search, ShoppingCart, Ticket } from "lucide-react"
import Link from "next/link"

export default function ComoFuncionaPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <h1 className="text-4xl font-bold text-center mb-8">Como Funciona o Rifa Flow</h1>

            <p className="text-xl text-center mb-12">
                Participar de nossas rifas é fácil, divertido e você pode ganhar prêmios incríveis! Siga os passos abaixo para começar.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {steps.map((step, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                                {step.icon}
                            </div>
                            <CardTitle>{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>{step.description}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Perguntas Frequentes</h2>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Pronto para Tentar a Sorte?</h2>
                <p className="mb-6">Explore nossas rifas atuais e encontre a que mais combina com você!</p>
                <Link href="/raffles">
                    <Button size="lg">
                        Ver Rifas Disponíveis
                        <Ticket className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

const steps = [
    {
        icon: <Search className="h-6 w-6 text-primary-foreground" />,
        title: "Escolha uma Rifa",
        description: "Navegue pelas rifas disponíveis e escolha a que mais te interessa."
    },
    {
        icon: <ShoppingCart className="h-6 w-6 text-primary-foreground" />,
        title: "Compre seus Números",
        description: "Selecione quantos números deseja comprar e faça o pagamento de forma segura."
    },
    {
        icon: <Ticket className="h-6 w-6 text-primary-foreground" />,
        title: "Receba seus Bilhetes",
        description: "Após a confirmação do pagamento, você receberá seus números da sorte."
    },
    {
        icon: <Gift className="h-6 w-6 text-primary-foreground" />,
        title: "Aguarde o Sorteio",
        description: "Fique atento à data do sorteio. Boa sorte!"
    }
]

const faqs = [
    {
        question: "Como são realizados os sorteios?",
        answer: "Os sorteios são realizados através de um sistema eletrônico auditado, garantindo total transparência e aleatoriedade na escolha do número vencedor."
    },
    {
        question: "Quanto tempo tenho para retirar o prêmio?",
        answer: "O vencedor tem até 30 dias após a data do sorteio para entrar em contato e reivindicar seu prêmio."
    },
    {
        question: "Posso transferir meu bilhete para outra pessoa?",
        answer: "Não, os bilhetes são intransferíveis e estão vinculados ao CPF do comprador original."
    },
    {
        question: "Como saberei se ganhei?",
        answer: "Notificamos todos os vencedores por e-mail e telefone. Além disso, publicamos os resultados em nosso site e redes sociais."
    },
    {
        question: "Quais são as formas de pagamento aceitas?",
        answer: "Pagamento exclusivamente via PIX para sua conveniência."
    }
]