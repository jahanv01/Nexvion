import { useLocation, useNavigate } from "react-router-dom";
import {  ArrowLeft } from 'lucide-react';
const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sentRequests = location.state?.data?.sentRequests;
  console.log("sentRequests",sentRequests)

  const redirectToResult = () => {
    navigate("/home", { state: { data: {sentRequests} } });
  };

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <div className="bg-white text-black rounded-xl shadow-md p-6 max-w-6xl mx-auto">
        <div className="text-xl font-semibold mb-6">Consultant(s)</div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="pb-4">Name</th>
                <th colSpan="4" className="pb-4 text-center">Progress</th>
              </tr>
              <tr className="text-left text-sm text-gray-600">
                <th></th>
                <th>Invitation Sent</th>
                <th>Acceptance</th>
                <th>Fitment Meeting</th>
                <th>Confirmation</th>
              </tr>
            </thead>
            <tbody>
              {sentRequests.map((consultant) => (
                <tr key={consultant.name} className="border-t border-gray-200">
                  <td className="py-6 font-medium">{consultant.name}</td>
                  <td colSpan="4">
                    <div className="flex items-center justify-between px-4">
                      {[0, 1, 2, 3].map((stageIndex) => {
                        const isActive = stageIndex === 0 && consultant.isEmailSent;
                        return (
                          <div key={stageIndex} className="flex items-center flex-1 relative">
                            {/* Dot */}
                            <div
                              className={`w-4 h-4 rounded-full z-10 ${
                                isActive ? "bg-green-600" : "bg-gray-300"
                              }`}
                            ></div>
                            {/* Line (skip after last dot) */}
                            {stageIndex < 3 && (
                              <div className="flex-1 h-1 bg-gray-300 mx-1"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
      onClick={redirectToResult}
      className="
        group
        fixed
        left-8
        top-1/2
        -translate-y-1/2
        flex
        items-center
        gap-2
        px-3
        py-3
        rounded-full
        bg-gradient-to-r
        from-blue-600
        to-blue-400
        text-white
        font-semibold
        shadow-lg
        overflow-hidden
        transition-all
        duration-300
        ease-out
        hover:shadow-2xl
        hover:from-purple-600
        hover:to-pink-500
        focus:outline-none
        z-50
      "
    >
          <ArrowLeft
        className="
          w-5 h-5
          relative z-10
          transition-transform
          duration-300
          group-hover:translate-x-1.5
        "
      />
      <span className="relative z-10">Previous</span>
  
      {/* Animated background overlay */}
      <span
        className="
          absolute inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
          bg-gradient-to-r
          from-purple-600
          to-pink-500
          z-0
        "
        aria-hidden="true"
      />
    </button>
    </div>
  );
};

export default Result;
