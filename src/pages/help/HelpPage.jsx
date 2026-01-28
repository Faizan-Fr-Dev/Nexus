import React from 'react';
import { Search, Book, MessageCircle, Phone, Mail, ExternalLink } from 'lucide-react';
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
  return (
    
      
        Help & Support
        Find answers to common questions or get in touch with our support team
      
      
      {/* Search */}
      
        }
          fullWidth
        />
      
      
      
        {/* Quick links */}
        
          
            
              
            
            Documentation
            
              Browse our detailed documentation and guides
            
            }
            >
              View Docs
            
          
        
        
        
          
            
              
            
            Live Chat
            
              Chat with our support team in real-time
            
            
              Start Chat
            
          
        
        
        
          
            
              
            
            Contact Us
            
              Get help via email or phone
            
            }
            >
              Contact Support
            
          
        
      
      
      {/* FAQs */}
      
        
          Frequently Asked Questions
        
        
          
            {faqs.map((faq, index) => (
              
                
                  {faq.question}
                
                
                  {faq.answer}
                
              
            ))}
          
        
      
      
      {/* Contact form */}
      
        
          Still need help?
        
        
          
            
              
              
              
            
            
            
              
                Message
              
              
            
            
            
              
                Send Message
              
            
          
        
      
    
  );
};
