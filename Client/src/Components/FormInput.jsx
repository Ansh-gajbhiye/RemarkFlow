import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

// Pure function – easy to test and reuse
const generateRemark = (values) => {
  
  const {
    losNumber = '______',
    applicantName = '______',
    salaryMonth = '______',
    personMetPost = '______',
    personMet = '______',
    organisation = '______',
    applicantPost = '______',
    applicantworkingsince = '______',
  } = values;

  return `${losNumber} Visited At The Given Address As Mentioned On Application Form For Verification Of Salary Slip Of ${applicantName} For The Month Of ${salaryMonth} Is Verbally Check And Found To Be Ok Confirmed By ${personMetPost} mr ${personMet} Who Confirmed That Applicant Is Working In ${organisation} As A ${applicantPost} From ${applicantworkingsince} Hence over all Status is Positive.`;
};


const FormInput = () => {
  const { register, watch } = useForm();
  const values = watch();
  
const navigate = useNavigate();
  return (
    // Minimal layout: two columns side by side on large screens
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '2rem' }}>
      {/* Left Column: Form */}
      <div>
        <h2>Salary Remark Generator</h2>
        <form>
          <div>
            <label>LOS Number: </label>
            <input {...register('losNumber')} placeholder="e.g. 123456" />
          </div>
          <div>
            <label>Salary Month: </label>
            <input {...register('salaryMonth')} type="month" />
          </div>
          <div>
            <label>Applicant Name: </label>
            <input {...register('applicantName')} placeholder="Applicant Name " />
          </div>
          <div>
            <label>Designation: </label>
            <input {...register('applicantPost')} placeholder="Applicant Designation" />
          </div>
          <div>
            <label>Organisation: </label>
            <input {...register('organisation')} placeholder="Organisation Name" />
          </div>
          <div>
            <label>Working Since: </label>
            <input {...register('applicantworkingsince')} placeholder="Year/Month" />
          </div>
          <div>
            <label>Person Met: </label>
            <input {...register('personMet')} placeholder="Person Met" />
          </div>
          <div>
            <label>Met Designation: </label>
            <input {...register('personMetPost')} placeholder="Person Met Designation" />
          </div>
        </form>
      </div>

      {/* Right Column: Live Preview */}
      <div style={{ position: 'sticky', top: '2rem' }}>
        <h3>Live Preview</h3>
        <div style={{ background: '#f9f9f9', padding: '1rem', border: '1px solid #ccc' }}>
          <p style={{ fontFamily: 'serif' }}>{generateRemark(values)}</p>
        </div>
        <button type="button" onClick={() => alert('Generate PDF')}>
          Generate Report
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default FormInput;