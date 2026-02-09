import React, { useState, useRef, useEffect } from 'react';
import { FileText, Upload, Download, Trash2, Share2, Search, MoreVertical, X, PenTool, CheckCircle, Clock, File } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

// Helper Badge Component
const Badge = ({ children, variant, className }) => {
  const variants = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    secondary: "bg-gray-100 text-gray-700",
    primary: "bg-blue-100 text-blue-700"
  };
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${variants[variant] || variants.secondary} ${className}`}>{children}</span>;
}

const initialDocuments = [
  {
    id: 1,
    name: 'Pitch Deck 2024.pdf',
    type: 'PDF',
    size: '2.4 MB',
    lastModified: '2024-02-15',
    status: 'In Review',
    shared: true
  },
  {
    id: 2,
    name: 'Financial Projections.xlsx',
    type: 'Spreadsheet',
    size: '1.8 MB',
    lastModified: '2024-02-10',
    status: 'Draft',
    shared: false
  },
  {
    id: 3,
    name: 'Business Plan.docx',
    type: 'Document',
    size: '3.2 MB',
    lastModified: '2024-02-05',
    status: 'Signed',
    shared: true
  },
  {
    id: 4,
    name: 'Market Research.pdf',
    type: 'PDF',
    size: '5.1 MB',
    lastModified: '2024-01-28',
    status: 'Draft',
    shared: false
  }
];

export const DocumentsPage = () => {
  const [documents, setDocuments] = useState(initialDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Upload Mock
  const handleUpload = () => {
    const newDoc = {
      id: documents.length + 1,
      name: `New Document ${documents.length + 1}.pdf`,
      type: 'PDF',
      size: '1.2 MB',
      lastModified: new Date().toISOString().split('T')[0],
      status: 'Draft',
      shared: false
    };
    setDocuments([newDoc, ...documents]);
  };

  // Preview & Sign Logic
  const openPreview = (doc) => {
    setSelectedDoc(doc);
    setIsSigning(false);
  };

  const closePreview = () => {
    setSelectedDoc(null);
    setIsSigning(false);
  };

  const startSigning = () => {
    setIsSigning(true);
  };

  const saveSignature = () => {
    // Determine new status based on current status
    let newStatus = 'Signed';
    const canvas = canvasRef.current;
    const signatureData = canvas.toDataURL();

    const updatedDocs = documents.map(d =>
      d.id === selectedDoc.id ? { ...d, status: newStatus, signature: signatureData } : d
    );
    setDocuments(updatedDocs);
    // Update selected doc locally to show change
    setSelectedDoc({ ...selectedDoc, status: newStatus, signature: signatureData });
    setIsSigning(false);
  };

  // Canvas Logic for Signature
  useEffect(() => {
    if (isSigning && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'black';
    }
  }, [isSigning]);

  const startDrawing = ({ nativeEvent }) => {
    if (!isSigning) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing || !isSigning) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Signed': return 'success';
      case 'In Review': return 'warning';
      case 'Draft': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Signed': return <CheckCircle size={14} className="mr-1" />;
      case 'In Review': return <Clock size={14} className="mr-1" />;
      case 'Draft': return <File size={14} className="mr-1" />;
      default: return null;
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleShare = (e, id) => {
    e.stopPropagation();
    // Toggle shared status
    setDocuments(documents.map(doc =>
      doc.id === id ? { ...doc, shared: !doc.shared } : doc
    ));
  };

  const handleDownload = (e, doc) => {
    e.stopPropagation();
    alert(`Downloading ${doc.name}...`);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Chamber</h1>
          <p className="text-gray-600">Manage, review, and sign your contracts</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2" onClick={handleUpload}>
          <Upload size={18} />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Storage info */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader border={false}>
              <h3 className="font-semibold text-gray-900">Storage</h3>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-medium text-gray-500 uppercase">
                  <span>Used</span>
                  <span>12.5 GB / 20 GB</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-primary-600 h-full w-[62.5%]"></div>
                </div>

                <div className="pt-4 space-y-2">
                  <button className="w-full flex items-center justify-between p-2 rounded-lg bg-primary-50 text-primary-700 font-medium text-sm">
                    Recent Files
                  </button>
                  <button className="w-full flex items-center justify-between p-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm transition-colors">
                    Shared with Me
                  </button>
                  <button className="w-full flex items-center justify-between p-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm transition-colors">
                    Starred
                  </button>
                  <button className="w-full flex items-center justify-between p-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm transition-colors">
                    Trash
                  </button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Document list */}
        <div className="lg:col-span-3 space-y-4">
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startAdornment={<Search size={18} className="text-gray-400" />}
            fullWidth
          />

          <Card>
            <CardHeader className="flex justify-between items-center bg-gray-50/50">
              <h2 className="text-lg font-semibold text-gray-900">All Documents</h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">Sort</Button>
                <Button variant="ghost" size="sm">Filter</Button>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="divide-y divide-gray-100">
                {documents.map(doc => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => openPreview(doc)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                        <FileText size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900">{doc.name}</p>
                          <Badge variant={getStatusColor(doc.status)} className="flex items-center">
                            {getStatusIcon(doc.status)}
                            {doc.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {doc.type} • {doc.size} • Modified {doc.lastModified}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" className="text-gray-400" onClick={(e) => handleDownload(e, doc)}><Download size={18} /></Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${doc.shared ? 'text-blue-500' : 'text-gray-400'}`}
                        onClick={(e) => handleShare(e, doc.id)}
                      >
                        <Share2 size={18} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 font-bold hover:text-red-500" onClick={(e) => handleDelete(e, doc.id)}><Trash2 size={18} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{selectedDoc.name}</h3>
                  <p className="text-xs text-gray-500">{selectedDoc.status}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {!isSigning && selectedDoc.status !== 'Signed' && (
                  <Button variant="primary" onClick={startSigning} className="flex items-center gap-2">
                    <PenTool size={16} /> Sign Document
                  </Button>
                )}
                <button onClick={closePreview} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center">
              <div className="bg-white shadow-lg w-full max-w-2xl min-h-full p-12 relative">
                <h1 className="text-3xl font-serif text-center mb-8 font-bold text-gray-800">DOCUMENT PREVIEW</h1>
                <p className="text-justify text-gray-600 leading-relaxed mb-6">
                  This is a placeholder for the document content. In a real application, this would render the PDF or document content.
                  <br /><br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  Document Content Placeholder
                </div>

                {/* Signature Area */}
                {(isSigning || selectedDoc.status === 'Signed') && (
                  <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="mb-4 font-semibold text-gray-700">Signature</p>
                    {isSigning ? (
                      <div className="border-2 border-blue-500 rounded-lg bg-white relative">
                        <canvas
                          ref={canvasRef}
                          width={500}
                          height={150}
                          className="w-full h-40 cursor-crosshair touch-none"
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button onClick={clearSignature} className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">Clear</button>
                        </div>
                        <div className="p-2 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => setIsSigning(false)}>Cancel</Button>
                          <Button variant="primary" size="sm" onClick={saveSignature}>Apply Signature</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-24 w-64 border-b border-gray-900 flex items-center justify-center">
                        {selectedDoc.signature ? (
                          <img src={selectedDoc.signature} alt="Signature" className="h-full w-full object-contain" />
                        ) : (
                          <span className="font-handwriting text-2xl text-blue-900 italic bg-blue-50/30">
                            {selectedDoc.status === 'Signed' ? 'Signed Digitally' : ''}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
