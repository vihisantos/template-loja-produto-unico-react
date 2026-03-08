import { useState, useEffect, useRef } from 'react'

const CHECKOUT_LINK = '#'
const WHATSAPP = 'https://wa.me/55XXXXXXXXXXX?text=Olá! Gostaria de mais informações sobre o produto.'

// Custom Reveal Hook
function useReveal() {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return { ref, isVisible, className: `reveal ${isVisible ? 'active' : ''}` };
}

// Security Hook
function useSecurity() {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) || (e.ctrlKey && e.key === 'U')) {
                e.preventDefault();
            }
        };
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
}

const benefits = [
    {
        icon: '💎',
        title: 'Design Transparente',
        desc: 'Sinta a engenharia em cada detalhe com nosso corpo em cristal de safira sintético ultra-resistente.',
        large: true
    },
    {
        icon: '🔇',
        title: 'ANC Adaptativo',
        desc: 'Silêncio absoluto em qualquer ambiente com cancelamento de ruído inteligente de 45dB.',
        large: false
    },
    {
        icon: '🔋',
        title: 'Bateria de 50h',
        desc: 'Uma semana inteira de uso com apenas uma carga ultra-rápida via USB-C.',
        large: false
    },
    {
        icon: '🎵',
        title: 'Áudio Hi-Res',
        desc: 'Drivers de berílio banhados a ouro para uma fidelidade sonora que você nunca ouviu antes.',
        large: true
    }
]

const testimonials = [
    { initial: 'DR', name: 'Dani Ribeiro', role: 'Produtora Musical', text: '"A clareza sonora é absurda. Consigo ouvir nuances que outros fones high-end simplesmente perdem. E o design é uma obra de arte."' },
    { initial: 'GP', name: 'Gustavo Paiva', role: 'Tech Reviewer', text: '"O Aero-X Crystal não é apenas um fone, é um statement técnico. O cancelamento de ruído é o melhor que já testei em 2025."' },
    { initial: 'AL', name: 'Ana Luiza', role: 'Executiva C-Level', text: '"O conforto durante voos longos é incomparável. Além disso, a transparência chama a atenção em qualquer lugar que eu vá."' },
]

const faqs = [
    { q: 'O material de cristal é frágil?', a: 'Não. Utilizamos um composto de vidro saphire reforçado com polímero, projetado para resistir a quedas e arranhões do dia a dia.' },
    { q: 'É compatível com todos os dispositivos?', a: 'Sim. Compatibilidade universal via Bluetooth 5.4 com suporte a LDAC, aptX Adaptive e conexão multiponto em 2 dispositivos.' },
    { q: 'Qual o tempo de garantia?', a: 'O Aero-X Crystal possui garantia premium de 2 anos contra qualquer defeito de fabricação.' },
    { q: 'O led interno desliga?', a: 'Sim. Através do nosso app exclusivo, você pode personalizar as cores do interior ou desligar completamente as luzes.' },
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
    useSecurity();
    const countdown = useCountdown(2 * 3600 + 45 * 60 + 12)
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    // Section Revels
    const heroReveal = useReveal();
    const bentoReveal = useReveal();
    const testimonyReveal = useReveal();
    const faqReveal = useReveal();

    return (
        <div className="sora">
            <div className="urgency-bar">
                ⚡ OFERTA LIMITADA: Os bônus exclusivos expiram em: <span className="countdown">{countdown}</span>
            </div>

            {/* HERO - DARK MODE */}
            <section className="hero--product section--dark" ref={heroReveal.ref}>
                <div className="container">
                    <div className="hero-product-grid">
                        <div className={heroReveal.className}>
                            <span className="badge badge--blue">✦ Aero-X Crystal | Edição Limitada</span>
                            <h1>A Obra-Prima do Som <br /><em className="highlight-product">Em Sua Forma Pura</em></h1>
                            <p className="hero-sub-product">Experimente a fusão perfeita entre engenharia de precisão e design futurista. O primeiro fone de ouvido Hi-Res totalmente transparente do mundo.</p>
                            <a href={CHECKOUT_LINK} className="btn-cta-product">🛒 Quero o Meu Aero-X</a>
                            <p className="guarantee-small" style={{ marginTop: '20px', fontSize: '0.85rem', opacity: 0.6 }}>🔒 Compra 100% Segura · Frete Grátis Especial</p>
                        </div>
                        <div className="product-mockup-wrapper">
                            <img
                                src="/aero-x.png"
                                alt="Aero-X Crystal"
                                className="product-mockup-img"
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    height: 'auto',
                                    filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.3))'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* BENEFITS - LIGHT MODE (BENTO) */}
            <section className="section section--light" ref={bentoReveal.ref}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
                        <span className="section-label">Diferenciais</span>
                        <h2 className="section-title">Por que escolher nossa <em>tecnologia</em>?</h2>
                    </div>

                    <div className="bento-grid">
                        {benefits.map((b, i) => (
                            <div key={i} className={`bento-item ${b.large ? 'bento-item--large' : ''}`}>
                                <div className="bento-icon">{b.icon}</div>
                                <h3>{b.title}</h3>
                                <p className="text-muted">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS - DARK MODE */}
            <section className="section section--dark" ref={testimonyReveal.ref}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
                        <span className="section-label">Resultados Reais</span>
                        <h2 className="section-title">Quem já <em>está no topo</em> aprova</h2>
                    </div>

                    <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                        {testimonials.map((t, i) => (
                            <div key={i} className="testimonial-card">
                                <div className="stars">★★★★★</div>
                                <p className="testi-text">{t.text}</p>
                                <div className="testi-author">
                                    <div className="testi-avatar">{t.initial}</div>
                                    <div>
                                        <strong style={{ display: 'block', color: 'white' }}>{t.name}</strong>
                                        <span className="testi-role">{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ - LIGHT MODE */}
            <section className="section section--light" ref={faqReveal.ref}>
                <div className="container">
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
                        <span className="section-label">Suporte</span>
                        <h2 className="section-title">Ainda tem alguma <em>dúvida</em>?</h2>
                    </div>

                    <div className="faq-list">
                        {faqs.map((faq, i) => (
                            <div key={i} className="faq-item">
                                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    {faq.q}
                                    <span style={{ fontSize: '1.5rem', transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
                                </button>
                                <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                                    <p style={{ paddingTop: '16px', color: 'var(--text-muted)' }}>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA - DARK MODE */}
            <section className="cta-section--product">
                <div className="container text-center" style={{ textAlign: 'center' }}>
                    <h2 className="section-title">O som do futuro em <em>suas mãos</em></h2>
                    <div className="price-box">
                        <div className="price-old">De R$ 2.490,00</div>
                        <div className="price-new">R$ 1.690,00</div>
                        <div className="price-installment">ou 12x de R$ 164,72</div>
                    </div>
                    <a href={CHECKOUT_LINK} className="btn-cta-product">🚀 Adquirir Meu Aero-X Crystal</a>
                    <p style={{ marginTop: '20px', fontSize: '0.9rem', opacity: 0.6 }}>Edição de Lançamento · Envio Prioritário para Todo o Brasil</p>
                </div>
            </section>

            <footer className="footer">
                <div className="container text-center">
                    <p>© {new Date().getFullYear()} Capybara Holding. Todos os direitos reservados.</p>
                    <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>CNPJ: 00.000.000/0001-00 · contato@suporte.com</p>
                </div>
            </footer>

            <a href={WHATSAPP} className="whatsapp-fab" target="_blank" rel="noopener noreferrer" style={{
                position: 'fixed',
                bottom: '32px',
                right: '32px',
                background: '#25D366',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(37, 211, 102, 0.3)',
                zIndex: 1000,
                transition: 'transform 0.3s'
            }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.057 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.025-1.379l-.36-.213-3.757.981 1.001-3.651-.234-.374A9.796 9.796 0 012.182 12c0-5.413 4.41-9.818 9.818-9.818s9.818 4.405 9.818 9.818c0 5.413-4.41 9.818-9.818 9.818z" />
                </svg>
            </a>
        </div>
    )
}
