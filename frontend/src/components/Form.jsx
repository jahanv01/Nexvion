import { useState, useRef, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, ArrowUpCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', or null
  const [isUploading, setIsUploading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setUploadStatus(null);
    } else {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(null), 3000);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setUploadStatus(null);
    } else if (selectedFile) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(null), 3000);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(null), 3000);
      return;
    }

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('http://localhost:5002/submit', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        // Extract the JSON data from the response
        const data = await response.json().catch(async () => {
          console.log("Response is not JSON, getting text instead");
          const text = await response.text();
          return ({ text });
        });
        
        console.log("Response data:", data);
        setResponseData(data);
        setUploadStatus('success');
        
        // Wait 1.5 seconds to show the success message before redirecting
        setTimeout(() => {
          // Pass the response data to the next page via state
          navigate('/home', { state: { responseData: data } });
        }, 1500);
      } else {
        console.error("Server returned an error:", response.status);
        setUploadStatus('error');
        setTimeout(() => setUploadStatus(null), 3000);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus('error');
      setTimeout(() => setUploadStatus(null), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-black p-4">
      <div className="w-full max-w-md">
        {/* Card container */}
        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-slate-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-slate-100">Upload Your PDF</h2>
          </div>
          
          {/* Upload Area */}
          <div className="p-8">
            <div 
              className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                isDragging 
                  ? 'border-slate-400 bg-slate-700' 
                  : 'border-slate-500 bg-slate-800/50 hover:bg-slate-700/50'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={openFileDialog}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="application/pdf"
                className="hidden"
              />
              
              <div className="flex flex-col items-center justify-center py-6 cursor-pointer">
                <div className={`rounded-full p-4 mb-4 transition-all ${
                  isDragging ? 'bg-slate-600 text-slate-200' : 'bg-slate-700 text-slate-300'
                }`}>
                  <Upload size={36} className="animate-pulse duration-2000" />
                </div>
                
                <p className="text-lg font-medium text-center text-slate-300">
                  {file ? file.name : 'Drag & drop your PDF here or click to browse'}
                </p>
                <p className="mt-2 text-sm text-slate-400 text-center">
                  PDF files only (max 10MB)
                </p>
              </div>
            </div>
            
            {/* File Details */}
            {file && (
              <div className="mt-4 bg-slate-700/50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-slate-600 rounded-lg mr-3">
                      <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-200 truncate max-w-xs">
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!file || isUploading || uploadStatus === 'success'}
              className={`mt-6 w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                !file || isUploading || uploadStatus === 'success'
                  ? 'bg-slate-600 text-slate-300 cursor-not-allowed'
                  : 'bg-slate-500 hover:bg-slate-400 text-white'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Processing...
                </>
              ) : uploadStatus === 'success' ? (
                <>
                  <CheckCircle className="mr-2" size={20} />
                  Success
                </>
              ) : file ? (
                <>
                  <ArrowUpCircle className="mr-2" size={20} />
                  Submit
                </>
              ) : (
                <>
                  <Upload className="mr-2" size={20} />
                  Upload PDF
                </>
              )}
            </button>
            
            {/* Status Messages */}
            {uploadStatus && (
              <div className={`mt-4 p-4 rounded-lg flex items-center ${
                uploadStatus === 'success' 
                  ? 'bg-green-900/20 text-green-400' 
                  : 'bg-red-900/20 text-red-400'
              }`}>
                {uploadStatus === 'success' ? (
                  <>
                    <CheckCircle className="mr-2" size={20} />
                    <span>File uploaded successfully! Redirecting...</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="mr-2" size={20} />
                    <span>
                      {!file 
                        ? 'Please select a file first' 
                        : 'Error uploading file. Please try again.'}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Additional info */}
        <p className="text-center text-white text-sm mt-4">
          Make sure your PDF is legible and under 10MB
        </p>
      </div>
      
      {/* Full-screen loader overlay */}
      {isUploading && (
        <div className="fixed inset-0 bg-slate-900/80 flex flex-col items-center justify-center z-50">
          <div className="bg-slate-800 p-8 rounded-xl shadow-2xl flex flex-col items-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-600 border-t-slate-300 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Upload size={24} className="text-slate-300" />
              </div>
            </div>
            <p className="mt-4 text-slate-300 font-medium text-lg">Uploading your document...</p>
            <p className="text-slate-400 text-sm mt-2">This may take a moment</p>
          </div>
        </div>
      )}
    </div>
  );
}