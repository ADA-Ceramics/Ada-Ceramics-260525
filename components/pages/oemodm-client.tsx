"use client"

import Link from "next/link"
import { ArrowRight, Check, Paintbrush, Palette, Box, Truck, Clock, Award, Shield, Users } from "lucide-react"
import { Footer } from "@/components/layout/footer"

export function OemOdmClient() {

  const services = [
    {
      icon: Paintbrush,
      title: "Custom Design",
      desc: "Professional design team to create unique ceramic products according to your requirements.",
      features: [
        "Free design consultation",
        "Custom shape & structure",
        "Logo and pattern customization",
        "3D design preview"
      ],
    },
    {
      icon: Palette,
      title: "Decoration & Glazing",
      desc: "Various decoration techniques to meet different market needs and style preferences.",
      features: [
        "Custom color matching",
        "Multiple glazing options",
        "Decal & printing service",
        "Gold & silver plating",
        "Matte & glossy finish"
      ],
    },
    {
      icon: Box,
      title: "Custom Packaging",
      desc: "Professional packaging solutions to protect products and enhance brand image.",
      features: [
        "Custom gift boxes",
        "Logo printing on package",
        "Safe shipping packaging",
        "Eco-friendly materials"
      ],
    },
    {
      icon: Truck,
      title: "Logistics & Shipping",
      desc: "Complete shipping service to deliver products safely to your destination.",
      features: [
        "Sea & air shipping",
        "Door to door service",
        "Customs clearance support",
        "Full shipping insurance"
      ],
    },
  ]

  const processSteps = [
    { step: 1, title: "Inquiry & Consultation", desc: "Discuss your requirements and project details", duration: "1-2 days" },
    { step: 2, title: "Design & Confirmation", desc: "Create design plan and get your approval", duration: "3-7 days" },
    { step: 3, title: "Sample Making", desc: "Produce samples for your confirmation", duration: "7-15 days" },
    { step: 4, title: "Final Approval", desc: "Confirm sample and place order", duration: "As needed" },
    { step: 5, title: "Mass Production", desc: "Formal production process", duration: "35-45 days" },
    { step: 6, title: "Quality Inspection", desc: "100% inspection before shipment", duration: "3-5 days" },
    { step: 7, title: "Packaging", desc: "Safe and professional packaging", duration: "2-3 days" },
    { step: 8, title: "Shipping", desc: "Deliver products to your destination", duration: "15-30 days" },
  ]

  const advantages = [
    { icon: Clock, title: "20+ Years Experience", desc: "Professional OEM/ODM service for global brands" },
    { icon: Users, title: "Professional Team", desc: "Experienced designers and skilled workers" },
    { icon: Award, title: "Low MOQ", desc: "Accept small trial orders for new projects" },
    { icon: Shield, title: "Strict Quality Control", desc: "Full inspection and certified materials" },
  ]

  const faqs = [
    { question: "What's your MOQ for OEM/ODM?", answer: "Our MOQ is 500pcs per design for custom orders." },
    { question: "How long for sample making?", answer: "Sample lead time is 7-15 days after design confirmation." },
    { question: "What's the production time?", answer: "Mass production takes 35-45 days after sample approval." },
    { question: "Can you use our own designs?", answer: "Yes, we welcome customer designs and patterns." },
    { question: "Do you sign confidentiality agreements?", answer: "Yes, we protect all customer designs and information." },
    { question: "What certifications do you have?", answer: "We provide FDA, LFGB, CA65 certified ceramic products." },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-[#f5f3ef] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span style={{ color: '#1a1a1a' }}>Professional OEM & ODM</span>
              <span className="block" style={{ color: '#8b7355' }}>
                Ceramic Custom Service
              </span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-8" style={{ color: '#6b7280' }}>
              Custom ceramic tableware solutions with low MOQ, professional design, strict quality control, and full-service support.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#1a1a2e] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#1a1a2e]/90 transition-all"
            >
              Start Custom Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold mb-2">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Complete Custom Solutions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold mb-2">Production Flow</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Custom Order Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Clear and efficient workflow from design to delivery, ensuring project quality and timeline.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div key={step.step} className="bg-card rounded-2xl p-6 border border-border relative">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold text-foreground mt-4 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{step.desc}</p>
                <p className="text-xs text-primary font-medium">{step.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary font-semibold mb-2">Our Advantages</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Our OEM/ODM Service
              </h2>
              <p className="text-muted-foreground mb-8">
                We provide reliable, professional, and flexible custom ceramic solutions for global clients.
              </p>
              <div className="space-y-6">
                {advantages.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Information</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-white/10">
                  <span className="text-white/70">MOQ</span>
                  <span className="text-white font-semibold">500 pcs</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-white/10">
                  <span className="text-white/70">Sample Time</span>
                  <span className="text-white font-semibold">7-15 days</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-white/10">
                  <span className="text-white/70">Production Time</span>
                  <span className="text-white font-semibold">35-45 days</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-white/10">
                  <span className="text-white/70">Design Revisions</span>
                  <span className="text-white font-semibold">Unlimited</span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span className="text-white/70">After Service</span>
                  <span className="text-white font-semibold">Lifetime Support</span>
                </div>
              </div>
              <Link
                href="/contact"
                className="w-full mt-8 inline-flex items-center justify-center gap-2 bg-white text-[#1a1a2e] px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold mb-2">Common Questions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Your Custom Project Today
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Contact us now to get professional OEM/ODM service and competitive quotation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1a1a2e] px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all"
            >
              Contact Us Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              View Our Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
