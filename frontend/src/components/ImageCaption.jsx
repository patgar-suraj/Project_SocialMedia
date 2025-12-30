import { useState } from 'react';
import { createPost } from '../services/api';

const ImageCaption = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copied, setCopied] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
      setCaption('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!image) {
      setError('Please select an image');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await createPost(formData);
      setCaption(response.data.post.caption);
      setSuccess('Caption generated successfully!');
      setImage(null);
      setPreview('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate caption. Please make sure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-[#1a1f2e] rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Generate Image Caption</h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-400 p-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-[#6366f1] rounded-lg p-8 text-center cursor-pointer hover:border-[#8b5cf6] transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-input"
            />
            <label htmlFor="image-input" className="cursor-pointer block">
              {preview ? (
                <div>
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 mx-auto mb-4 rounded"
                  />
                  <p className="text-[#6366f1] font-semibold">Change image</p>
                </div>
              ) : (
                <div>
                  <svg
                    className="w-12 h-12 mx-auto mb-2 text-[#6366f1]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="text-white font-semibold">Upload an image</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Drag and drop or click to select
                  </p>
                </div>
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !image}
            className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-3 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating caption...' : 'Generate Caption'}
          </button>
        </form>

        {caption && (
          <div className="mt-8 bg-[#0c1019] p-6 rounded-lg border border-[#3f46e1]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-semibold">Generated Caption:</h3>
              <button
                onClick={handleCopy}
                className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-4 py-2 rounded text-sm font-semibold transition flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-gray-300 leading-relaxed">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCaption;
