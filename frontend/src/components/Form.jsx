import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Form = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    projectName: '',
    projectDescription: '',
    budget: '',
    startDate: '',
    endDate: '',
    requirements: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRequirementChange = (index, field, value) => {
    const updated = [...formData.requirements]
    updated[index][field] = value
    setFormData((prev) => ({ ...prev, requirements: updated }))
  }

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, { skill: '', amount: '', recommendedSeniority: 'Junior' }],
    }))
  }

  const removeRequirement = (index) => {
    const updated = [...formData.requirements]
    updated.splice(index, 1)
    setFormData((prev) => ({ ...prev, requirements: updated }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);
    console.log("form data", formData)
    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Something went wrong')

      const result = await response.json()
     
      alert('Submitted successfully!')
      console.log(result)
      if(result){
        navigate("/home")
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Submission failed. Try again.')
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Submit Project Application</h2>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-lg">
        {/* Basic Fields */}
        {['name', 'industry', 'projectName', 'projectDescription', 'budget'].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
              {field.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={field === 'budget' ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Requirements Section */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3">Requirements</label>
          {formData.requirements.map((req, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end">
              <input
                type="text"
                placeholder="Skill"
                value={req.skill}
                onChange={(e) => handleRequirementChange(index, 'skill', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
              <input
                type="number"
                placeholder="Amount"
                value={req.amount}
                onChange={(e) => handleRequirementChange(index, 'amount', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
              <select
                value={req.recommendedSeniority}
                onChange={(e) => handleRequirementChange(index, 'recommendedSeniority', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              >
                <option value="Junior">Junior</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior</option>
              </select>
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="text-sm text-red-600 hover:underline ml-1 mt-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRequirement}
            className="mt-2 text-blue-600 hover:underline text-sm"
          >
            + Add Requirement
          </button>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['startDate', 'endDate'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type="date"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded-xl transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form
