import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const Project = () => {
  const navigate = useNavigate();

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
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {projects.map((data, idx) => {
        const [showDesc, setShowDesc] = useState(false);
        const application = data.projectApplication;
        const { applicationStatus, businessDetails, projectDetails } = application;

        return (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200 text-sm"
          >
            <h2 className="text-lg font-semibold mb-1">{projectDetails.projectName}</h2>
            <p className="text-gray-500 mb-2">Status: {applicationStatus}</p>

            <div className="mb-2">
              <h3 className="font-medium">Company</h3>
              <p className="text-gray-700">{businessDetails.name}</p>
              <p className="text-gray-500">
                {businessDetails.industry} | {businessDetails.location}
              </p>
              <a
                href={businessDetails.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                Website
              </a>
            </div>

            <div className="mb-2">
              <h3 className="font-medium">Contact</h3>
              <p>{businessDetails.contactPerson.name}</p>
              <p className="text-gray-500">{businessDetails.contactPerson.email}</p>
              {businessDetails.contactPerson.phone && (
                <p className="text-gray-500">{businessDetails.contactPerson.phone}</p>
              )}
            </div>

            <div className="mb-2">
              <button
                onClick={() => setShowDesc(!showDesc)}
                className="text-blue-600 hover:underline"
              >
                {showDesc ? "Hide Description" : "Show Description"}
              </button>
              {showDesc && (
                <p className="text-gray-700 mt-1 whitespace-pre-line">
                  {projectDetails.description}
                </p>
              )}
            </div>

            <div className="mb-2">
              <h3 className="font-medium">Requirements</h3>
              <ul className="list-disc list-inside">
                {projectDetails.requirements.map((req, index) => (
                  <li key={index}>
                    {req.amount}x {req.skill} ({req.recommendedSeniority})
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-1 text-gray-600">
              <p><strong>Budget:</strong> €{projectDetails.budget.toLocaleString()}</p>
              <p><strong>Duration:</strong> {projectDetails.startDate} to {projectDetails.endDate}</p>
            </div>
          </div>
        );
      })}

      {/* Add Project Card */}
      <div
        onClick={() => navigate("/form")}
        className="flex items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all"
      >
        <Plus className="w-10 h-10 text-gray-400" />
      </div>
    </div>
  );
};

export default Project;
