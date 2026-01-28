import React from 'react';
import { FileText, Upload, Download, Trash2, Share2 } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const documents = [
  {
    id: 1,
    name: 'Pitch Deck 2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2024-02-15',
    shared: true
  },
  {
    id: 2,
    name: 'Financial Projections.xlsx',
    type: 'Spreadsheet',
    size: '1.8 MB',
    lastModified: '2024-02-10',
    shared: false
  },
  {
    id: 3,
    name: 'Business Plan.docx',
    type: 'Document',
    size: '3.2 MB',
    lastModified: '2024-02-05',
    shared: true
  },
  {
    id: 4,
    name: 'Market Research.pdf',
    type: 'PDF',
    size: '5.1 MB',
    lastModified: '2024-01-28',
    shared: false
  }
];

export const DocumentsPage = () => {
  return (
    
      
        
          Documents
          Manage your startup's important files
        
        
        }>
          Upload Document
        
      
      
      
        {/* Storage info */}
        
          
            Storage
          
          
            
              
                Used
                12.5 GB
              
              
                
              
              
                Available
                7.5 GB
              
            
            
            
              Quick Access
              
                
                  Recent Files
                
                
                  Shared with Me
                
                
                  Starred
                
                
                  Trash
                
              
            
          
        
        
        {/* Document list */}
        
          
            
              All Documents
              
                
                  Sort by
                
                
                  Filter
                
              
            
            
              
                {documents.map(doc => (
                  
                    
                      
                    
                    
                    
                      
                        
                          {doc.name}
                        
                        {doc.shared && (
                          Shared
                        )}
                      
                      
                      
                        {doc.type}
                        {doc.size}
                        Modified {doc.lastModified}
                      
                    
                    
                    
                      
                        
                      
                      
                      
                        
                      
                      
                      
                        
                      
                    
                  
                ))}
              
            
          
        
      
    
  );
};
