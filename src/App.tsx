import { useState, useEffect } from 'react'

const CHECKOUT_LINK = '[LINK-DO-CHECKOUT]'
const WHATSAPP = 'https://wa.me/55XXXXXXXXXXX?text=Olá! Tenho dúvidas sobre o produto.'

const benefits = [
    { icon: '⚡', title: '[Benefício 1]', desc: '[Descrição. Foque no resultado, não na funcionalidade.]' },
    { icon: '🎯', title: '[Benefício 2]', desc: '[Descrição com dados ou resultados reais se tiver.]' },
    { icon: '🏆', title: '[Benefício 3]', desc: '[Diferencial competitivo ou garantia de resultado.]' },
    { icon: '🔒', title: '[Garantia]', desc: '[Mencione a garantia para reduzir fricção da compra.]' },
]

const testimonials = [
    { initial: 'A', name: '[Nome 1]', role: '[Profissão/cidade]', text: '"[Depoimento com resultado específico.]"' },
    { initial: 'B', name: '[Nome 2]', role: '[Profissão/cidade]', text: '"[Depoimento superando objeção comum.]"' },
    { initial: 'C', name: '[Nome 3]', role: '[Profissão/cidade]', text: '"[Depoimento sobre facilidade ou suporte.]"' },
]

const faqs = [
    { q: 'Para quem é indicado?', a: '[Descreva o cliente ideal. Seja específico para gerar identificação.]' },
    { q: 'Como funciona a garantia?', a: '[Explique claramente. Ex: Se em [X] dias não estiver satisfeito, devolvemos 100%.]' },
    { q: '[Objeção mais comum]', a: '[Responda de forma empática e convincente.]' },
    { q: 'Como realizarei o pagamento?', a: '[Descreva os métodos aceitos: cartão, Pix, boleto.]' },
]

function useCountdown(seconds: number) {
    const [remaining, setRemaining] = useState(seconds)
    useEffect(() => {
        if (remaining <= 0) return
        const t = setTimeout(() => setRemaining(r => r - 1), 1000)
        return () => clearTimeout(t)
    }, [remaining])
    const h = Math.floor(remaining / 3600)
    const m = Math.floor((remaining % 3600) / 60)
    const s = remaining % 60
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function App() {
    const countdown = useCountdown(4 * 3600 + 23 * 60 + 59)
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    return (
        <>
            <div className="urgency-bar">
                🔥 Oferta especial encerra em: <span className="countdown">{countdown}</span>
            </div>

            <section className="hero hero--product">
                <div className="container">
                    <div className="hero-product-grid">
                        <div>
                            <span className="badge badge--purple">✦ [Categoria]</span>
                            <h1>[Headline Principal —<br /><em className="highlight-product">Benefício em destaque!</em>]</h1>
                            <p className="hero-sub-product">[Subheadline: o que entrega, para quem e qual resultado.]</p>
                            <a href={CHECKOUT_LINK} className="btn-cta-product">🛒 Quero Comprar Agora!</a>
                            <p className="guarantee-small">🔒 Compra segura · Garantia de [X] dias · Acesso imediato</p>
                        </div>
                        <div className="product-mockup">🖼️<br />[Foto/Mockup]</div>
                    </div>
                </div>
            </section>

            <section className="section section--dark-product">
                <div className="container">
                    <div className="section-label-product">Por que [Produto]?</div>
                    <h2 className="section-title white">Tudo o que você vai <em>conquistar</em></h2>
                    <div className="grid-2">
                        {benefits.map((b, i) => (
                            <div key={i} className="benefit-card">
                                <div className="benefit-icon">{b.icon}</div>
                                <h3>{b.title}</h3>
                                <p className="muted-light">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="section-label-product dark">Depoimentos</div>
                    <h2 className="section-title">Quem já <em>comprou</em> aprovou</h2>
                    <div className="grid-3">
                        {testimonials.map((t, i) => (
                            <div key={i} className="testimonial-card">
                                <div className="stars">★★★★★</div>
                                <p className="testi-text">{t.text}</p>
                                <div className="testi-author">
                                    <div className="testi-avatar testi-avatar--purple">{t.initial}</div>
                                    <div><strong>{t.name}</strong><span className="testi-role">{t.role}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section section--dark-product">
                <div className="container">
                    <div className="section-label-product">Dúvidas Frequentes</div>
                    <h2 className="section-title white">Respondendo suas <em>dúvidas</em></h2>
                    <div className="faq-list">
                        {faqs.map((faq, i) => (
                            <div key={i} className="faq-item faq-item--dark">
                                <button className="faq-question faq-question--dark" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    {faq.q}<span className={`faq-icon ${openFaq === i ? 'open' : ''}`}>+</span>
                                </button>
                                <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                                    <p className="muted-light">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-section cta-section--product">
                <div className="container text-center">
                    <h2>Pronto para [resultado prometido]?</h2>
                    <div className="price-old">De R$ [RISCADO]</div>
                    <div className="price-new">R$ [ATUAL]</div>
                    <div className="price-installment">ou [X]x de R$ [PARCELA]</div>
                    <a href={CHECKOUT_LINK} className="btn-checkout">🛒 Garantir Meu Acesso Agora</a>
                    <p className="guarantee-small light">🔒 Pagamento 100% seguro · Garantia de [X] dias</p>
                </div>
            </section>

            <footer className="footer footer--dark">
                <p>© {new Date().getFullYear()} [Empresa]. Todos os direitos reservados.</p>
                <p>[CNPJ] · [contato@email.com]</p>
            </footer>

            <a href={WHATSAPP} className="whatsapp-fab" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.025-1.379l-.36-.213-3.757.981 1.001-3.651-.234-.374A9.796 9.796 0 012.182 12c0-5.413 4.41-9.818 9.818-9.818s9.818 4.405 9.818 9.818c0 5.413-4.41 9.818-9.818 9.818z" />
                </svg>
            </a>
        </>
    )
}
