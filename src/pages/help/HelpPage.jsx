import React, { useState } from 'react';
import { Search, Book, MessageCircle, Phone, Mail, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

const faqs = [
  {
    question: 'How do I connect with investors?',
    answer: 'You can browse our investor directory and send connection requests. Once an investor accepts, you can start messaging them directly through our platform.'
  },
  {
    question: 'What should I include in my startup profile?',
    answer: 'Your startup profile should include a compelling pitch, funding needs, team information, market opportunity, and any traction or metrics that demonstrate your progress.'
  },
  {
    question: 'How do I share documents securely?',
    answer: 'You can upload documents to your secure document vault and selectively share them with connected investors. All documents are encrypted and access-controlled.'
  },
  {
    question: 'What are collaboration requests?',
    answer: 'Collaboration requests are formal expressions of interest from investors. They indicate that an investor wants to learn more about your startup and potentially discuss investment opportunities.'
  }
];

export const HelpPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-2">Find answers to common questions or get in touch with our support team</p>
      </div>
      
      {/* Search */}
      <div className="max-w-2xl mx-auto">
        <Input 
          placeholder="Search for help articles..." 
          fullWidth
          size="lg"
          startAdornment={<Search size={22} className="text-gray-400" />}
        />
      </div>
      
      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center p-6 border-b-4 border-b-blue-500">
          <CardBody className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              <Book size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Documentation</h3>
            <p className="text-sm text-gray-600">Browse our detailed documentation and guides</p>
            <Button variant="outline" fullWidth>View Docs</Button>
          </CardBody>
        </Card>
        
        <Card className="text-center p-6 border-b-4 border-b-green-500">
          <CardBody className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <MessageCircle size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Live Chat</h3>
            <p className="text-sm text-gray-600">Chat with our support team in real-time</p>
            <Button variant="outline" fullWidth>Start Chat</Button>
          </CardBody>
        </Card>
        
        <Card className="text-center p-6 border-b-4 border-b-purple-500">
          <CardBody className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
              <Mail size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Contact Us</h3>
            <p className="text-sm text-gray-600">Get help via email or phone support</p>
            <Button variant="outline" fullWidth>Contact Support</Button>
          </CardBody>
        </Card>
      </div>
      
      {/* FAQs */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 px-2">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <button 
                className="w-full text-left px-6 py-4 flex justify-between items-center transition-colors hover:bg-gray-50"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4 text-gray-600 text-sm animate-in slide-in-from-top-2 duration-200">
                  {faq.answer}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
      
      {/* Contact form */}
      <Card className="bg-gray-900 text-white border-none p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-gray-400 mb-6">Our team of experts is ready to assist you with any questions or technical issues you might have.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-primary-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-primary-500" />
                <span>support@businessnexus.com</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Input placeholder="Your Email" fullWidth className="bg-gray-800 border-gray-700 text-white" />
            <textarea 
              className="w-full h-32 bg-gray-800 border-gray-700 border rounded-lg p-3 text-white focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all"
              placeholder="How can we help you?"
            ></textarea>
            <Button variant="primary" fullWidth size="lg">Send Message</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
