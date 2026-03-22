'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CheckIcon, XMarkIcon, Bars3Icon } from 'lucide-react'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      title: "Professional Invoices",
      description: "Create beautiful, branded invoices in minutes. Customize templates to match your business identity.",
      icon: "📄"
    },
    {
      title: "Client Management",
      description: "Keep track of all your clients in one place. Store contact details, payment preferences, and billing history.",
      icon: "👥"
    },
    {
      title: "Payment Tracking",
      description: "Monitor payment status, send automated reminders, and track outstanding balances effortlessly.",
      icon: "💰"
    },
    {
      title: "Multi-Currency Support",
      description: "Work with clients globally. Support for multiple currencies and automatic tax calculations.",
      icon: "🌍"
    },
    {
      title: "Automated Reminders",
      description: "Never chase payments again. Set up automatic reminder emails for overdue invoices.",
      icon: "⏰"
    },
    {
      title: "Detailed Reports",
      description: "Get insights into your business with comprehensive reports on revenue, outstanding payments, and more.",
      icon: "📊"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Freelance Designer",
      content: "InvoicePro has completely transformed how I handle billing. Creating professional invoices is now a breeze, and I love the automated reminders feature.",
      initials: "SJ"
    },
    {
      name: "Mike Chen",
      role: "Consulting Firm Owner",
      content: "The client management features are fantastic. I can track all my clients and their payment history in one place. Highly recommend for any small business.",
      initials: "MC"
    },
    {
      name: "Emma Davis",
      role: "Marketing Agency",
      content: "We've been using InvoicePro for over a year now. The multi-currency support and professional templates have helped us work with international clients seamlessly.",
      initials: "ED"
    }
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Up to 5 invoices per month",
        "2 client contacts",
        "Basic invoice templates",
        "Email support"
      ],
      limitations: [
        "No automated reminders",
        "No payment tracking",
        "Basic reporting only"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$15",
      period: "per month",
      description: "Everything you need to grow",
      features: [
        "Unlimited invoices",
        "Unlimited clients",
        "Custom invoice templates",
        "Automated payment reminders",
        "Payment tracking",
        "Multi-currency support",
        "Advanced reporting",
        "Priority support"
      ],
      limitations: [],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For larger organizations",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Advanced user management",
        "White-label options",
        "Dedicated account manager",
        "SLA guarantee"
      ],
      limitations: [],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-white">
                InvoicePro
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="#features" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Features
                </Link>
                <Link href="#pricing" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Pricing
                </Link>
                <Link href="#testimonials" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors">
                  Testimonials
                </Link>
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link 
                href="/signup" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-400 hover:text-white"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="#features" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                Testimonials
              </Link>
              <Link 
                href="/signup" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white block px-3 py-2 text-base font-medium rounded-lg mt-4"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            Simple Invoicing for
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Small Businesses</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Create professional invoices, track payments, and manage clients all in one place. 
            Get paid faster with automated reminders and seamless payment processing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/signup" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/login" 
              className="border border-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>

          <p className="text-gray-500 text-sm">
            🚀 Join 1,000+ teams who trust InvoicePro for their invoicing needs
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything you need to get paid faster
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to streamline your invoicing process and help you focus on what matters most - your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose the perfect plan for your business
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Start free and upgrade as you grow. All plans include our core features with no hidden fees.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-white/5 border rounded-2xl p-8 ${
                  plan.popular 
                    ? 'border-purple-500 bg-gradient-to-b from-purple-500/10 to-transparent' 
                    : 'border-white/10'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-gray-400 ml-2">{plan.period}</span>}
                  </div>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <li key={limitationIndex} className="flex items-center">
                      <XMarkIcon className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-500">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/signup" 
                  className={`block w-full text-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                      : 'border border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Loved by thousands of businesses
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See what our customers have to say about their experience with InvoicePro.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to streamline your invoicing?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of businesses who have simplified their invoicing process with InvoicePro.
            </p>
            <Link 
              href="/signup" 
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <h3 className="text-2xl font-bold text-white mb-4">InvoicePro</h3>
              <p className="text-gray-400 mb-4">
                Simple invoicing for small businesses. Get paid faster with professional invoices and automated reminders.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/signup" className="text-gray-400 hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 InvoicePro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}