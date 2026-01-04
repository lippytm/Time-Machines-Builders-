import { useState, useEffect } from 'react';
import { predictionService, modelService } from '../services/api';

function Predictions() {
  const [predictions, setPredictions] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    modelId: '',
    input: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [predictionsData, modelsData] = await Promise.all([
        predictionService.getAll(),
        modelService.getAll(),
      ]);
      setPredictions(predictionsData);
      setModels(modelsData.filter(m => m.status === 'completed'));
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(formData.input);
      await predictionService.create({
        modelId: formData.modelId,
        input: parsedInput,
      });
      setShowForm(false);
      setFormData({ modelId: '', input: '' });
      loadData();
    } catch (error) {
      alert('Failed to create prediction: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return <div className="text-white text-center py-8">Loading...</div>;
  }

  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Predictions</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
          disabled={models.length === 0}
        >
          {showForm ? 'Cancel' : '+ New Prediction'}
        </button>
      </div>

      {models.length === 0 && (
        <div className="bg-yellow-900 bg-opacity-50 border border-yellow-700 rounded-lg p-4 mb-8">
          <p className="text-yellow-200">
            You need to have at least one completed model before making predictions.
          </p>
        </div>
      )}

      {showForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Make Prediction</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Select Model</label>
              <select
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={formData.modelId}
                onChange={(e) => setFormData({ ...formData, modelId: e.target.value })}
              >
                <option value="">Choose a model</option>
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name} ({model.type})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Input Data (JSON format)</label>
              <textarea
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white font-mono text-sm"
                rows="6"
                placeholder='{"steps": 5} or {"text": "This is great!"}'
                value={formData.input}
                onChange={(e) => setFormData({ ...formData, input: e.target.value })}
              />
              <p className="text-gray-500 text-xs mt-1">
                For time-series: {`{"steps": 5}`} | For NLP: {`{"text": "your text here"}`}
              </p>
            </div>
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md"
            >
              Generate Prediction
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {predictions.map((prediction) => (
          <div key={prediction.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">
                  {prediction.MLModel?.name || 'Unknown Model'}
                </h3>
                <p className="text-gray-400 text-sm">
                  {new Date(prediction.createdAt).toLocaleString()}
                </p>
              </div>
              {prediction.confidence && (
                <span className="bg-primary-900 text-primary-200 px-3 py-1 rounded-full text-sm">
                  Confidence: {(prediction.confidence * 100).toFixed(1)}%
                </span>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded p-4">
                <p className="text-gray-300 font-semibold mb-2">Input:</p>
                <pre className="text-gray-400 text-sm overflow-x-auto">
                  {JSON.stringify(prediction.input, null, 2)}
                </pre>
              </div>
              <div className="bg-gray-700 rounded p-4">
                <p className="text-gray-300 font-semibold mb-2">Output:</p>
                <pre className="text-gray-400 text-sm overflow-x-auto">
                  {JSON.stringify(prediction.output, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      {predictions.length === 0 && !showForm && models.length > 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No predictions yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md"
          >
            Make Your First Prediction
          </button>
        </div>
      )}
    </div>
  );
}

export default Predictions;
