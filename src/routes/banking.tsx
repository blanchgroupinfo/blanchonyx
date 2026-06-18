import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Landmark, CreditCard, TrendingUp, Shield, Globe, Zap, Users, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Banking() {
  const services = [
    {
      icon: CreditCard,
      title: "Digital Banking",
      description: "Real-time account management and instant payments",
      features: ["Zero-fee transactions", "Instant settlements", "24/7 operations", "Multi-currency accounts"],
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: Globe,
      title: "Cross-Border Banking",
      description: "International transfers and currency exchange",
      features: ["195+ countries", "150+ currencies", "Real-time conversion", "No hidden fees"],
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: TrendingUp,
      title: "Investment Banking",
      description: "Securities, derivatives, and asset management",
      features: ["T+0 settlement", "Smart contracts", "Automated clearing", "Real-time pricing"],
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Users,
      title: "Corporate Banking",
      description: "Treasury management and trade finance",
      features: ["Cash management", "Letter of credit", "Supply chain finance", "Escrow services"],
      color: "from-orange-600 to-red-600"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "RTGS-Grade Security",
      description: "Bank-level security with deterministic finality and immutable audit trails"
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "2ms transaction finality for real-time banking operations"
    },
    {
      icon: Lock,
      title: "Regulatory Compliance",
      description: "Built-in AML/KYC with automated compliance reporting"
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description: "147K+ nodes providing worldwide coverage and redundancy"
    }
  ];

  const useCases = [
    {
      title: "Retail Banking",
      metrics: "500M+ accounts",
      description: "Consumer banking with instant payments and zero fees",
      benefits: ["Mobile-first experience", "Real-time balance updates", "Instant P2P transfers"]
    },
    {
      title: "Commercial Banking",
      metrics: "50K+ businesses",
      description: "Business accounts with advanced treasury features",
      benefits: ["Multi-user access", "Automated reconciliation", "API integration"]
    },
    {
      title: "Correspondent Banking",
      metrics: "500+ institutions",
      description: "Inter-bank settlement and liquidity management",
      benefits: ["Instant nostro/vostro updates", "Reduced counterparty risk", "24/7 liquidity"]
    },
    {
      title: "torah/Tarah Based Banking",
      metrics: "100+ institutions",
      description: "Shariah-compliant banking solutions",
      benefits: ["Profit-sharing models", "Asset-backed financing", "No interest charges"]
    }
  ];

  const stats = [
    { label: "Banks Connected", value: "500+", icon: Landmark },
    { label: "Daily Transactions", value: "$500T+", icon: TrendingUp },
    { label: "Active Accounts", value: "500M+", icon: Users },
    { label: "Avg Settlement Time", value: "2ms", icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Landmark className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Banking Solutions</h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Next-Generation Banking Infrastructure on Blanch Infinity DLT
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-white/20 text-white text-lg px-6 py-2">500+ Banks</Badge>
              <Badge className="bg-white/20 text-white text-lg px-6 py-2">RTGS Security</Badge>
              <Badge className="bg-white/20 text-white text-lg px-6 py-2">Zero Fees</Badge>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Banking Services</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive banking solutions for the digital age
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-full flex items-center justify-center mb-4`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <p className="text-slate-600">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          <span className="text-sm text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Banking Use Cases</h2>
            <p className="text-xl text-blue-200">
              Transforming traditional banking operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{useCase.title}</h3>
                  <Badge className="bg-green-500">{useCase.metrics}</Badge>
                </div>
                <p className="text-blue-200 mb-4">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute('/banking')({
  component: Banking,
});