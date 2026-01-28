'use client';

import { useState, useRef } from 'react';
import { Upload, Loader, AlertCircle, CheckCircle, AlertTriangle, X } from 'lucide-react';

// Medicine database
const medicineDatabase = {
  'aspirin': {
    medicineName: 'Aspirin',
    dosage: '325-500 mg tablets',
    activeIngredients: ['Acetylsalicylic Acid'],
    generalUse: 'Pain reliever, fever reducer, and blood thinner. Used for headaches, muscle aches, colds, and heart disease prevention.',
    commonSideEffects: ['Stomach upset', 'Heartburn', 'Nausea', 'Easy bruising'],
    precautions: ['Take with food or milk', 'Do not use if allergic to NSAIDs', 'Avoid in children with flu-like symptoms'],
    ageRestrictions: {
      children: 'Avoid',
      elderly: 'Use with caution',
      pregnancy: 'Avoid'
    },
    conditionRisks: {
      highBloodPressure: 'Safe',
      diabetes: 'Safe',
      asthma: 'Avoid',
      kidneyIssues: 'Use with caution',
      liverIssues: 'Use with caution'
    },
    drugInteractions: ['May interact with blood thinners', 'Reduces effectiveness of some blood pressure medications'],
    safetyLevel: 'Safe',
    safetyReason: 'Well-established safety profile when used as directed. Avoid in certain conditions.',
    disclaimer: 'This analysis is for informational purposes only and is not medical advice. Always consult with a healthcare professional before taking any medicine.'
  },
  'paracetamol': {
    medicineName: 'Paracetamol (Acetaminophen)',
    dosage: '500 mg tablets',
    activeIngredients: ['Paracetamol (Acetaminophen)'],
    generalUse: 'Pain reliever and fever reducer. Used for mild to moderate pain and fever management.',
    commonSideEffects: ['Rare when used correctly', 'Liver damage with overdose', 'Allergic reactions (rare)'],
    precautions: ['Do not exceed 4000 mg per day', 'Avoid alcohol consumption', 'Check combination medicines for paracetamol'],
    ageRestrictions: {
      children: 'Safe',
      elderly: 'Safe',
      pregnancy: 'Safe'
    },
    conditionRisks: {
      highBloodPressure: 'Safe',
      diabetes: 'Safe',
      asthma: 'Safe',
      kidneyIssues: 'Use with caution',
      liverIssues: 'Avoid'
    },
    drugInteractions: ['Avoid combining with other paracetamol-containing products'],
    safetyLevel: 'Safe',
    safetyReason: 'Very safe when used as directed. Main risk is liver damage from overdose.',
    disclaimer: 'This analysis is for informational purposes only and is not medical advice. Always consult with a healthcare professional before taking any medicine.'
  },
  'ibuprofen': {
    medicineName: 'Ibuprofen',
    dosage: '200-400 mg tablets',
    activeIngredients: ['Ibuprofen'],
    generalUse: 'Anti-inflammatory pain reliever. Used for headaches, muscle aches, menstrual cramps, and fever.',
    commonSideEffects: ['Stomach upset', 'Heartburn', 'Nausea', 'Dizziness'],
    precautions: ['Take with food', 'Stay hydrated', 'Not for long-term use without medical supervision'],
    ageRestrictions: {
      children: 'Safe',
      elderly: 'Use with caution',
      pregnancy: 'Avoid in third trimester'
    },
    conditionRisks: {
      highBloodPressure: 'Use with caution',
      diabetes: 'Safe',
      asthma: 'Use with caution',
      kidneyIssues: 'Use with caution',
      liverIssues: 'Safe'
    },
    drugInteractions: ['May reduce effectiveness of blood pressure medications', 'Increases risk with blood thinners'],
    safetyLevel: 'Use with Caution',
    safetyReason: 'Safe for short-term use. Long-term use may cause stomach and kidney issues.',
    disclaimer: 'This analysis is for informational purposes only and is not medical advice. Always consult with a healthcare professional before taking any medicine.'
  },
  'metformin': {
    medicineName: 'Metformin',
    dosage: '500-1000 mg tablets',
    activeIngredients: ['Metformin Hydrochloride'],
    generalUse: 'Used to treat type 2 diabetes. Helps control blood sugar levels by reducing glucose production in the liver.',
    commonSideEffects: ['Stomach upset', 'Diarrhea', 'Nausea', 'Metallic taste', 'Vitamin B12 deficiency (long-term)'],
    precautions: ['Take with food to reduce stomach upset', 'Monitor kidney function regularly', 'Avoid before surgery/imaging with contrast dye'],
    ageRestrictions: {
      children: 'Use with caution',
      elderly: 'Use with caution',
      pregnancy: 'Use with caution'
    },
    conditionRisks: {
      highBloodPressure: 'Safe',
      diabetes: 'Safe',
      asthma: 'Safe',
      kidneyIssues: 'Avoid',
      liverIssues: 'Use with caution'
    },
    drugInteractions: ['Contrast dyes may cause lactic acidosis', 'Alcohol increases risk of side effects'],
    safetyLevel: 'Safe',
    safetyReason: 'Safe for long-term use in diabetes management. Main concern is kidney function monitoring.',
    disclaimer: 'This analysis is for informational purposes only and is not medical advice. Always consult with a healthcare professional before taking any medicine.'
  },
  'lisinopril': {
    medicineName: 'Lisinopril',
    dosage: '5-20 mg tablets',
    activeIngredients: ['Lisinopril'],
    generalUse: 'ACE inhibitor used to treat high blood pressure and heart failure. Helps relax blood vessels and lower blood pressure.',
    commonSideEffects: ['Dry cough', 'Dizziness', 'Headache', 'Fatigue', 'Hyperkalemia (high potassium)'],
    precautions: ['Do not use salt substitutes without doctor approval', 'Stay hydrated', 'Monitor potassium levels'],
    ageRestrictions: {
      children: 'Use with caution',
      elderly: 'Safe',
      pregnancy: 'Avoid'
    },
    conditionRisks: {
      highBloodPressure: 'Safe',
      diabetes: 'Safe',
      asthma: 'Safe',
      kidneyIssues: 'Use with caution',
      liverIssues: 'Safe'
    },
    drugInteractions: ['NSAIDs may reduce effectiveness', 'Potassium supplements increase hyperkalemia risk'],
    safetyLevel: 'Safe',
    safetyReason: 'Proven effective for blood pressure control. Requires regular monitoring of potassium and kidney function.',
    disclaimer: 'This analysis is for informational purposes only and is not medical advice. Always consult with a healthcare professional before taking any medicine.'
  },
  'omeprazole': {
    medicineName: 'Omeprazole',
    dosage: '20-40 mg capsules',
    activeIngredients: ['Omeprazole'],
    generalUse: 'Proton pump inhibitor used to reduce stomach acid. Treats GERD, ulcers, and acid reflux.',
    commonSideEffects: ['Headache', 'Nausea', 'Diarrhea', 'Abdominal pain', 'Vitamin B12 deficiency (long-term)'],
    precautions: ['Take before meals', 'Long-term use requires monitoring', 'May affect absorption of other medicines'],
    ageRestrictions: {
      children: 'Use with caution',
      elderly: 'Safe',
      pregnancy: 'Safe'
    },
    conditionRisks: {
      highBloodPressure: 'Safe',
      diabetes: 'Safe',
      asthma: 'Safe',
      kidneyIssues: 'Safe',
      liverIssues: 'Use with caution'
    },
    drugInteractions: ['May reduce effectiveness of certain medicines', 'Affects calcium absorption'],
    safetyLevel: 'Safe',
    safetyReason: 'Safe for short and medium-term use. Long-term use requires medical supervision.',
    disclaimer: 'This analysis is for informational purposes only and is not medical advice. Always consult with a healthcare professional before taking any medicine.'
  }
};

export default function MedicineScanner({ onClose }) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [medicineName, setMedicineName] = useState('');
  const [loading, setLoading] = useState(false);
  const [medicineData, setMedicineData] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setImageFile(file);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!medicineName.trim()) {
      setError('Please enter the medicine name');
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const normalizedName = medicineName.toLowerCase().trim();
    const foundMedicine = medicineDatabase[normalizedName];

    if (!foundMedicine) {
      setError(`Medicine "${medicineName}" not found in database. Try: Stolin, Aspirin, Paracetamol, or Ibuprofen`);
      setLoading(false);
      return;
    }

    setMedicineData(foundMedicine);
    setLoading(false);
  };

  const getSafetyIcon = (level) => {
    if (level === 'Safe') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (level === 'Use with Caution') return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    return <AlertCircle className="w-5 h-5 text-red-600" />;
  };

  const getSafetyColor = (level) => {
    if (level === 'Safe') return 'bg-green-50 border-green-200';
    if (level === 'Use with Caution') return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getConditionStatus = (status) => {
    if (status === 'Safe') return 'text-green-700';
    if (status === 'Use with Caution') return 'text-yellow-700';
    return 'text-red-700';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-900">Scan Medicine</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {!medicineData ? (
            <>
              {/* Image Upload */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-900 font-medium">Click to upload medicine image</p>
                <p className="text-gray-500 text-sm mt-1">or drag and drop (optional)</p>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="space-y-3">
                  <div className="relative w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={imagePreview}
                      alt="Medicine preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="w-full py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Clear Image
                  </button>
                </div>
              )}

              {/* Medicine Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medicine Name *
                </label>
                <input
                  type="text"
                  value={medicineName}
                  onChange={(e) => setMedicineName(e.target.value)}
                  placeholder="e.g., Stolin, Aspirin, Paracetamol..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-900 font-medium">Error</p>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!medicineName.trim() || loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing Medicine...
                  </>
                ) : (
                  'Analyze Medicine'
                )}
              </button>
            </>
          ) : (
            <>
              {/* Safety Classification */}
              <div className={`p-4 border rounded-lg ${getSafetyColor(medicineData.safetyLevel)}`}>
                <div className="flex items-start gap-3">
                  {getSafetyIcon(medicineData.safetyLevel)}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">Safety Classification</p>
                    <p className="text-sm text-gray-700 mt-1">{medicineData.safetyLevel}</p>
                    <p className="text-sm text-gray-600 mt-2">{medicineData.safetyReason}</p>
                  </div>
                </div>
              </div>

              {/* Medicine Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{medicineData.medicineName}</h3>
                  <p className="text-gray-600">{medicineData.dosage}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Active Ingredients:</p>
                  <div className="flex flex-wrap gap-2">
                    {medicineData.activeIngredients?.map((ingredient, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">General Use:</p>
                  <p className="text-gray-600 text-sm">{medicineData.generalUse}</p>
                </div>

                {/* Side Effects */}
                {medicineData.commonSideEffects?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Common Side Effects:</p>
                    <ul className="space-y-1">
                      {medicineData.commonSideEffects.map((effect, i) => (
                        <li key={i} className="text-gray-600 text-sm">• {effect}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Precautions */}
                {medicineData.precautions?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Precautions:</p>
                    <ul className="space-y-1">
                      {medicineData.precautions.map((precaution, i) => (
                        <li key={i} className="text-gray-600 text-sm">• {precaution}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Age Restrictions */}
                {medicineData.ageRestrictions && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Age Restrictions:</p>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(medicineData.ageRestrictions).map(([age, status]) => (
                        <div key={age} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs font-medium text-gray-600 capitalize mb-1">
                            {age === 'children' ? 'Children' : age === 'elderly' ? 'Elderly' : 'Pregnancy'}
                          </p>
                          <p className={`text-sm font-medium ${getConditionStatus(status)}`}>
                            {status}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Condition Risks */}
                {medicineData.conditionRisks && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Condition Compatibility:</p>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(medicineData.conditionRisks).map(([condition, status]) => (
                        <div key={condition} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <p className="text-xs font-medium text-gray-600 capitalize mb-1">
                            {condition.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className={`text-sm font-medium ${getConditionStatus(status)}`}>
                            {status}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Drug Interactions */}
                {medicineData.drugInteractions?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Drug Interactions:</p>
                    <ul className="space-y-1">
                      {medicineData.drugInteractions.map((interaction, i) => (
                        <li key={i} className="text-gray-600 text-sm">• {interaction}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-xs text-gray-600">{medicineData.disclaimer}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setMedicineData(null);
                    setImageFile(null);
                    setImagePreview(null);
                    setMedicineName('');
                  }}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Scan Another
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
