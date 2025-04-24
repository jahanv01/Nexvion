import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MapPin, CheckCircle, Clock } from "lucide-react";
import Form from "./Form"; // Ensure this component exists and is styled appropriately

const statusIcons = {
  Submitted: <CheckCircle className="w-4 h-4 mr-1 text-green-400" />,
  "Under Review": <Clock className="w-4 h-4 mr-1 text-yellow-400" />,
  Approved: <CheckCircle className="w-4 h-4 mr-1 text-blue-400" />,
};

const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      projectApplication: {
        applicationStatus: "Submitted",
        businessDetails: {
          name: "AutoTech Innovations GmbH",
          contactPerson: {
            name: "Hans Müller",
            email: "hans.mueller@autotech-innovations.de",
            phone: "+49 170 1234567"
          },
          industry: "Automotive",
          numberOfEmployees: 300,
          location: "Munich, Germany",
          website: "https://autotech-innovations.de"
        },
        projectDetails: {
          projectName: "Smart Vehicle Connectivity Platform",
          description: "AutoTech Innovations GmbH aims to be a pioneer in the automotive sector, focusing on developing a cutting-edge smart vehicle connectivity platform. The project intends to revolutionize the way vehicles communicate by incorporating advanced IoT integration. The platform will facilitate real-time monitoring and predictive maintenance using large-scale data analytics. Furthermore, cybersecurity is a paramount focus, as automakers increasingly face threats that could compromise vehicle functionality and integrity. To enhance driver interaction, the project also plans to deploy user-centric interfaces powered by intuitive design principles. These innovations are expected to elevate both vehicle intelligence and driver engagement.",
          location: "Munich, Germany",
          requirements: [
            {
              skill: "IoT Development",
              amount: 3,
              recommendedSeniority: "Senior"
            },
            {
              skill: "Cybersecurity Analysis",
              amount: 2,
              recommendedSeniority: "Mid-Level"
            },
            {
              skill: "UX/UI Design",
              amount: 1,
              recommendedSeniority: "Junior"
            }
          ],
          budget: 900000,
          startDate: "2023-12-01",
          endDate: "2024-07-01"
        }
      }
    },
    {
      projectApplication: {
        applicationStatus: "Under Review",
        businessDetails: {
          name: "EcoEnergy Solutions AG",
          contactPerson: {
            name: "Marta Schmidt",
            email: "marta.schmidt@ecoenergy-solutions.de"
          },
          industry: "Energy",
          numberOfEmployees: 500,
          location: "Berlin, Germany",
          website: "https://ecoenergy-solutions.de"
        },
        projectDetails: {
          projectName: "Renewable Resource Management System",
          description: "EcoEnergy Solutions AG is focused on enhancing the efficiency of renewable resources through innovative system management. The project will develop a centralized platform for solar and wind energy optimization, using robust data analytics and machine learning algorithms. Integration of predictive analytics will improve resource allocation based on real-time meteorological data. The platform's user interfaces will prioritize accessibility for both industry experts and stakeholders, ensuring seamless navigation and operational transparency. Additionally, the project will address infrastructure scalability, guaranteeing future-proofing against the growing demands of renewable energy consumption.",
          location: "Berlin, Germany",
          requirements: [
            {
              skill: "Data Analytics",
              amount: 4,
              recommendedSeniority: "Senior"
            },
            {
              skill: "Machine Learning",
              amount: 2,
              recommendedSeniority: "Senior"
            },
            {
              skill: "UI/UX Design",
              amount: 1,
              recommendedSeniority: "Mid-Level"
            }
          ],
          budget: 1200000,
          startDate: "2024-01-15",
          endDate: "2024-10-15"
        }
      }
    }
  ];


  return (
    <div className="min-h-screen bg-white text-white flex flex-col items-center px-4 py-30">
   {/*   <h1 className="text-4xl font-bold mb-10 tracking-wide text-center border-b-4 border-slate-600 pb-3 w-full max-w-4xl">
        🚀 Innovative Project Applications
      </h1>
*/}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {projects.map((data, idx) => {
          const [showDesc, setShowDesc] = useState(false);
          const application = data.projectApplication;
          const { applicationStatus, businessDetails, projectDetails } = application;

          return (
            <div
              key={idx}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Header: Project Name + Status */}
              <div className="flex items-center justify-between border-b border-slate-600 pb-2 mb-3">
                <h2 className="text-xl font-semibold text-white">
                  {projectDetails.projectName}
                </h2>
                <div className="flex items-center bg-slate-700/50 text-sm text-white px-3 py-1 rounded-full">
                  {statusIcons[applicationStatus] || <MapPin className="w-4 h-4 mr-1" />}
                  <span className="px-1">{applicationStatus}</span>
                </div>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-2 text-xs font-medium text-white mb-3">
                {projectDetails.requirements.map((req, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/60 px-3 py-1 rounded-full"
                  >
                    {req.amount}x {req.skill} ({req.recommendedSeniority})
                  </div>
                ))}
                <div className="bg-slate-700/60 px-3 py-1 rounded-full">
                  💰 €{projectDetails.budget.toLocaleString()}
                </div>
                <div className="bg-slate-700/60 px-3 py-1 rounded-full">
                  📅 {projectDetails.startDate} → {projectDetails.endDate}
                </div>
              </div>

              {/* Company & Contact Info */}
              <div className="text-sm text-slate-300 space-y-3 mb-4">
                <div className="space-y-0.5">
                  <p className="font-semibold text-lg text-white">{businessDetails.name}</p>
                  <p className="text-slate-400">{businessDetails.industry} | {businessDetails.location}</p>
                  <a
                    href={businessDetails.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-blue-400 hover:underline text-sm"
                  >
                    🌐 Visit Website
                  </a>
                </div>

                <div className="border-t border-slate-600 pt-3 space-y-1">
                  <p className="font-semibold text-white">📞 Contact</p>
                  <p className="text-white">{businessDetails.contactPerson.name}</p>
                  <p className="text-slate-300">{businessDetails.contactPerson.email}</p>
                  {businessDetails.contactPerson.phone && (
                    <p className="text-slate-300">{businessDetails.contactPerson.phone}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <button
                  onClick={() => setShowDesc(!showDesc)}
                  className="text-blue-300 text-sm underline underline-offset-4 hover:text-blue-400 transition-colors"
                >
                  {showDesc ? "Hide Description" : "Show Description"}
                </button>
                {showDesc && (
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    {projectDetails.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Add Project Card */}
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center border-2 border-dashed p-5 border-slate-200 rounded-2xl bg-slate-800  hover:border-slate-400 hover:bg-slate-700/30 transition-all cursor-pointer h-64"
        >
          <Plus className="w-12 h-12 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 p-5 rounded-lg shadow-3xl w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>
            <Form />
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
