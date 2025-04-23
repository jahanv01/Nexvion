import React from 'react'

const consultants = [
  {
    name: 'Mira Hoffmann',
    role: 'DevOps Engineer',
    seniority: 'Senior',
    description:
      'Seasoned DevOps engineer with a passion for scalable infrastructure and automation. Contributed to a cloud migration project at Bosch, improving deployment pipelines and infrastructure reliability. Implemented a dynamic rollback strategy that prevented service disruption during critical updates.',
    certificates: [
      'AWS Certified DevOps Engineer',
      'Certified Kubernetes Administrator',
    ],
    technologies: [
      'AWS',
      'Docker',
      'Kubernetes',
      'Terraform',
      'GitLab CI/CD',
      'Prometheus',
      'Grafana',
      'Linux',
      'Ansible',
    ],
    languages_spoken: ['German', 'English'],
  },
  {
    name: 'Tobias Richter',
    role: 'Software Architect',
    seniority: 'Lead',
    description:
      'Lead architect with deep experience in designing scalable microservice ecosystems. Led a software modernization initiative at Deutsche Bank, focusing on breaking down monoliths into manageable services. Designed a new API layer that significantly improved system resilience under peak load.',
    certificates: [
      'Certified Scrum Master',
      'Oracle Certified Professional: Java SE',
    ],
    technologies: [
      'Java',
      'Spring Boot',
      'Kafka',
      'PostgreSQL',
      'Docker',
      'Kubernetes',
      'Azure',
      'REST APIs',
    ],
    languages_spoken: ['German', 'English'],
  },
]

const Home = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Available Consultants
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {consultants.map((consultant, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {consultant.name}
            </h2>
            <p className="text-sm text-gray-500">
              {consultant.role} • {consultant.seniority}
            </p>
           {/* <p className="mt-3 text-gray-700 text-sm">{consultant.description}</p>*/}

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {consultant.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Certificates</h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {consultant.certificates.map((cert, i) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Languages Spoken</h3>
              <div className="flex gap-2">
                {consultant.languages_spoken.map((lang, i) => (
                  <span
                    key={i}
                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
