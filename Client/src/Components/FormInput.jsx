import React from 'react'

const FormInput = () => {
   function search(formData) {
    const losNumber = formData.get("losNumber")
    const salaryMonth = formData.get("salaryMonth");
    const applicantName = formData.get("applicantName");
    const applicantPost = formData.get("applicantPost");
    const applicantworkingsince = formData.get("applicantworkingsince");
    const organisation = formData.get("organisation");
    const personMet = formData.get("personMet");
    const personMetPost = formData.get("personMetPost");
    alert(`'${losNumber}'
      Visited At The Given Address As Mentioned On Application Form For Verification Of Salary Slip Of '${applicantName}'
       For The Month Of '${salaryMonth}' Is Verbally Check And Found To Be Ok Confirmed 
       By '${personMetPost}' mr '${personMet}' Who Confirmed That Applicant Is Working 
       In '${organisation}' As A '${applicantPost}' From '${applicantworkingsince}' Hence over all Status is Positive `);
  }
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Salary Remark Generator</h2>
        <p className="text-gray-500 text-sm mt-1">Fill in the details to generate a professional remark instantly.</p>
      </div>
      
      <form action = {search }className="w-full space-y-6">
        {/* Section 1: Application Basics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 ml-1">LOS Number</label>
            <input name="losNumber" className="form-input-style" placeholder="e.g. 123456" />
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold uppercase text-gray-400 mb-1 ml-1">Salary Month</label>
            <input name="salaryMonth" type="month" className="form-input-style" />
          </div>
        </div>

        {/* Section 2: Applicant Details */}
        <div className="space-y-4 pt-2 border-t border-gray-50">
          <input name="applicantName" className="form-input-style" placeholder="Applicant Name" />
          <div className="grid grid-cols-2 gap-4">
            <input name="applicantPost" className="form-input-style" placeholder="Applicant Designation" />
            <input name="organisation" className="form-input-style" placeholder="Organisation Name" />
            <input name="applicantworkingsince" className="form-input-style" placeholder="appliant working since" />
          </div>
        </div>

        {/* Section 3: Verification Details */}
        <div className="space-y-4 pt-2 border-t border-gray-50">
          <div className="grid grid-cols-2 gap-4">
            <input name="personMet" className="form-input-style" placeholder="Person Met" />
            <input name="personMetPost" className="form-input-style" placeholder="Person Met Designation" />
          </div>
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-95">
          Generate Professional Remark
        </button>
      </form>

      {/* Tailwind Utility: We add a custom class for inputs to keep the JSX clean */}
      <style>{`
        .form-input-style {
          @apply w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700;
        }
      `}</style>
    </div>
  )
}

export default FormInput