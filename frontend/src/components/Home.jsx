import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Star, ChevronDown, ChevronUp, X, Award, Briefcase, Languages, Code, Send, FileCheck } from 'lucide-react';

const Home = () => {
  const location = useLocation();
  const consultantsData = location.state?.responseData;
  console.log("consultantsData",consultantsData)
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to get a rating (simplified for demo)
  const getRating = (consultant) => {
    if (consultant.metadata.seniority === "Senior") return 5;
    if (consultant.metadata.seniority === "Mid-Level") return 4;
    return 3;
  };

  const toggleCardExpansion = (consultantId) => {
    setExpandedCards(prev => ({
      ...prev,
      [consultantId]: !prev[consultantId]
    }));
  };

  const openModal = (consultant) => {
    setSelectedConsultant(consultant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sendPoints = (consultant) => {
    console.log(`Sending points to ${consultant.metadata.name}`);
    // Implement your API call to send points here
    alert(`Points sent to ${consultant.metadata.name} successfully!`);
  };

  // Render star ratings
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i}
        size={16} 
        className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Matched Consultants</h1>
        
        {consultantsData?.matched_consultants.map((skillGroup, groupIndex) => (
          <div key={groupIndex} className="mb-10">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-lg px-4 py-2 inline-block">
                <h2 className="text-xl font-semibold text-blue-800">{skillGroup.skill}</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillGroup.ranked_candidates.map((consultant, idx) => {
                const consultantId = `${groupIndex}-${idx}`;
                const rating = getRating(consultant);
                const isExpanded = expandedCards[consultantId];
                
                return (
                  <div 
                    key={consultantId}
                    className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-200"
                  >
                    {/* Card Header */}
                    <div className="relative h-32 bg-gradient-to-r from-blue-50 to-blue-100 p-6">
                      <div className="flex justify-between">
                        <h3 className="text-xl font-bold text-gray-800 truncate">
                          {consultant.metadata.name}
                        </h3>
                        <div className="flex">
                          {renderStars(rating)}
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm py-1 px-3 rounded-full">
                          {consultant.metadata.role}
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block bg-gray-100 text-gray-700 text-xs py-1 px-2 rounded-full">
                          {consultant.metadata.seniority}
                        </span>
                      </div>
                    </div>
                    
                    {/* Card Body */}
                    <div className="p-6">
                      {/* Reason Toggle Section */}
                      <div className="mb-4">
                        <button 
                          onClick={() => toggleCardExpansion(consultantId)}
                          className="flex items-center justify-between w-full text-left text-gray-700 hover:text-blue-600 transition-colors"
                        >
                          <span className="font-medium">Match Reason</span>
                          {isExpanded ? 
                            <ChevronUp size={18} /> : 
                            <ChevronDown size={18} />
                          }
                        </button>
                        
                        {isExpanded && (
                          <div className="mt-3 text-sm text-gray-700 bg-gray-100 p-4 rounded-lg">
                            {consultant.reason}
                          </div>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() => openModal(consultant)}
                          className="text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                          View Details
                        </button>
                        
                        <button
                          onClick={() => sendPoints(consultant)}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center text-sm transition-colors"
                        >
                          <Send size={16} className="mr-2" />
                          Send Request
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Detailed Modal */}
      {isModalOpen && selectedConsultant && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">{selectedConsultant.metadata.name}</h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Basic Info */}
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-blue-800">
                    {selectedConsultant.metadata.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <h4 className="text-lg font-semibold text-gray-800 mr-3">{selectedConsultant.metadata.name}</h4>
                    <div className="flex">{renderStars(getRating(selectedConsultant))}</div>
                  </div>
                  <div className="flex items-center mb-1">
                    <Briefcase size={16} className="text-gray-500 mr-2" />
                    <span className="text-gray-700">{selectedConsultant.metadata.role}</span>
                  </div>
                  <div className="flex items-center">
                    <Award size={16} className="text-gray-500 mr-2" />
                    <span className="text-gray-700">{selectedConsultant.metadata.seniority}</span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <h5 className="text-md font-medium text-gray-800 mb-2">Description</h5>
                <p className="text-gray-700 text-sm">
                  {selectedConsultant.metadata.description}
                </p>
              </div>
              
              {/* Languages */}
              <div className="mb-6">
                <h5 className="text-md font-medium text-gray-800 mb-2 flex items-center">
                  <Languages size={16} className="mr-2" />
                  Languages
                </h5>
                <div className="flex flex-wrap gap-2">
                  {selectedConsultant.metadata.languages_spoken?.map((language, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-700 text-sm py-1 px-3 rounded-full">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Technologies */}
              <div className="mb-6">
                <h5 className="text-md font-medium text-gray-800 mb-2 flex items-center">
                  <Code size={16} className="mr-2" />
                  Technologies
                </h5>
                <div className="flex flex-wrap gap-2">
                  {selectedConsultant.metadata.technologies?.map((tech, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 text-sm py-1 px-3 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Certificates */}
              <div className="mb-6">
                <h5 className="text-md font-medium text-gray-800 mb-2 flex items-center">
                  <FileCheck size={16} className="mr-2" />
                  Certificates
                </h5>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {selectedConsultant.metadata.certificates?.map((cert, idx) => (
                    <li key={idx} className="mb-1">{cert}</li>
                  ))}
                </ul>
              </div>
   
              {/* Action Button */}
              <div className="flex justify-end pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    sendPoints(selectedConsultant);
                    closeModal();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg flex items-center transition-colors"
                >
                  <Send size={16} className="mr-2" />
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home