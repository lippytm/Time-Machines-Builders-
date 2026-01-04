import { useState, useEffect } from 'react';
import { modelService, datasetService } from '../services/api';

function Models() {
  const [models, setModels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'time-series',
    datasetId: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [modelsData, datasetsData] = await Promise.all([
        modelService.getAll(),
        datasetService.getAll(),
      ]);
      setModels(modelsData);
      setDatasets(datasetsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await modelService.create(formData);
      setShowForm(false);
      setFormData({ name: '', type: 'time-series', datasetId: '' });
      loadData();
    } catch (error) {
      alert('Failed to create model: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) {
    return <div className="text-white text-center py-8">Loading...</div>;
  }

  return (
    <div className="px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">AI/ML Models</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md"
          disabled={datasets.length === 0}
        >
          {showForm ? 'Cancel' : '+ Train New Model'}
        </button>
      </div>

      {datasets.length === 0 && (
        <div className="bg-yellow-900 bg-opacity-50 border border-yellow-700 rounded-lg p-4 mb-8">
          <p className="text-yellow-200">
            You need to create a dataset first before training models.
          </p>
        </div>
      )}

      {showForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Train New Model</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Model Name</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Model Type</label>
              <select
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="time-series">Time Series Forecasting</option>
                <option value="nlp">NLP / Text Analysis</option>
                <option value="classification">Classification</option>
                <option value="regression">Regression</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Dataset</label>
              <select
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={formData.datasetId}
                onChange={(e) => setFormData({ ...formData, datasetId: e.target.value })}
              >
                <option value="">Select a dataset</option>
                {datasets.map((dataset) => (
                  <option key={dataset.id} value={dataset.id}>
                    {dataset.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md"
            >
              Start Training
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div key={model.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">{model.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs ${
                model.status === 'completed' ? 'bg-green-900 text-green-200' :
                model.status === 'training' ? 'bg-yellow-900 text-yellow-200' :
                model.status === 'failed' ? 'bg-red-900 text-red-200' :
                'bg-gray-600 text-gray-200'
              }`}>
                {model.status}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-2">Type: {model.type}</p>
            {model.Dataset && (
              <p className="text-gray-500 text-xs mb-4">Dataset: {model.Dataset.name}</p>
            )}
            {model.metrics && Object.keys(model.metrics).length > 0 && (
              <div className="bg-gray-700 rounded p-3">
                <p className="text-gray-300 text-xs font-semibold mb-2">Metrics:</p>
                {Object.entries(model.metrics).map(([key, value]) => (
                  <p key={key} className="text-gray-400 text-xs">
                    {key}: {typeof value === 'number' ? value.toFixed(4) : value}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {models.length === 0 && !showForm && datasets.length > 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No models trained yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md"
          >
            Train Your First Model
          </button>
        </div>
      )}
    </div>
  );
}

export default Models;
