'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';
import CategoryIcon from '@/components/CategoryIcon';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export default function ReportIssuePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [location, setLocation] = useState<{latitude: number, longitude: number, address: string} | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    priority: 'medium',
    city: '',
    state: '',
    pincode: '',
    streetName: '',
    nearbyLandmark: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    const fetchCategories = async () => {
      try {
        const response = await apiClient.getCategories();
        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [user, authLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      console.log('Selected files:', files.length, 'files');
      
      // Validate file types and sizes
      const validFiles = files.filter(file => {
        const isValidType = file.type.startsWith('image/');
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
        
        if (!isValidType) {
          console.error('Invalid file type:', file.name, file.type);
          setError(`Invalid file type: ${file.name}. Please select image files only.`);
        }
        if (!isValidSize) {
          console.error('File too large:', file.name, file.size);
          setError(`File too large: ${file.name}. Please select files smaller than 5MB.`);
        }
        
        return isValidType && isValidSize;
      });
      
      if (validFiles.length !== files.length) {
        // Clear error after 5 seconds
        setTimeout(() => setError(''), 5000);
      }
      
      setSelectedImages(prev => {
        const newImages = [...prev, ...validFiles].slice(0, 5); // Max 5 images
        console.log('Total images after selection:', newImages.length);
        return newImages;
      });
    }
    // Reset the input value to allow selecting the same file again
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            address: '', // Will be filled by reverse geocoding
          });
          
          // Simple reverse geocoding (in a real app, you'd use a proper service)
          setFormData(prev => ({
            ...prev,
            city: 'Your City', // This would be filled by reverse geocoding
            state: 'Your State',
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to get your location. Please enter it manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
    

      const issueData = {
        title: formData.title,
        description: formData.description,
        categoryId: parseInt(formData.categoryId),
        priority: formData.priority,
        locationAddress: location?.address || 'Location not specified',
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        streetName: formData.streetName,
        nearbyLandmark: formData.nearbyLandmark,
      };

      console.log('Submitting issue with images:', selectedImages.length);
      const response = await apiClient.createIssue(issueData, selectedImages);
      console.log('Issue created successfully:', response);
      setTicketId(response.data?.ticketId || '');
      setSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        categoryId: '',
        priority: 'medium',
        city: '',
        state: '',
        pincode: '',
        streetName: '',
        nearbyLandmark: '',
      });
      setSelectedImages([]);
      setLocation(null);
    } catch (err: any) {
      console.error('Error creating issue:', err);
      if (err.message && err.message.includes('File too large')) {
        setError('One or more images are too large. Please select images smaller than 5MB.');
      } else if (err.message && err.message.includes('Only image files are allowed')) {
        setError('Please select only image files (JPG, PNG, GIF, WebP).');
      } else {
        setError(err.message || 'Failed to create issue. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <div className="text-green-600 text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-800 mb-4">Issue Reported Successfully!</h2>
          {ticketId && (
            <div className="mb-4">
              <p className="text-green-700 mb-2">Your ticket ID:</p>
              <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded text-lg font-mono font-bold">
                {ticketId}
              </span>
            </div>
          )}
          <p className="text-green-700 mb-6">
            Thank you for reporting this issue. We'll review it and take appropriate action.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => setSuccess(false)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Report Another Issue
            </button>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-white hover:bg-gray-50 text-green-600 border border-green-600 px-6 py-2 rounded-lg font-medium"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Report a Civic Issue</h1>
        <p className="mt-2 text-gray-600">
          Help improve your community by reporting issues that need attention.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Issue Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Issue Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the issue"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide detailed information about the issue, including when you first noticed it, any safety concerns, etc."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, categoryId: category.id.toString() }))}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      formData.categoryId === category.id.toString()
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <CategoryIcon 
                        icon={category.icon} 
                        color={category.color} 
                        size="lg"
                      />
                      <span className="text-sm font-medium text-gray-700 text-center">
                        {category.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              {formData.categoryId && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected: {categories.find(c => c.id.toString() === formData.categoryId)?.name}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <select
                id="priority"
                name="priority"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Location Information</h2>
          
          <div className="mb-4">
            <button
              type="button"
              onClick={getCurrentLocation}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
            >
              📍 Get My Location
            </button>
            {location && (
              <span className="ml-4 text-green-600 text-sm">
                ✓ Location detected: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <div className="relative">
                <select
                  id="state"
                  name="state"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                required
                pattern="[0-9]{6}"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="6-digit pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label htmlFor="streetName" className="block text-sm font-medium text-gray-700 mb-2">
                Street Name *
              </label>
              <input
                type="text"
                id="streetName"
                name="streetName"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter street name"
                value={formData.streetName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="nearbyLandmark" className="block text-sm font-medium text-gray-700 mb-2">
                Nearby Landmark *
              </label>
              <input
                type="text"
                id="nearbyLandmark"
                name="nearbyLandmark"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter nearby landmark"
                value={formData.nearbyLandmark}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Photos (Optional)</h2>
          
          <div className="mb-4">
            <input
              type="file"
              id="images"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-sm text-gray-500 mt-2">
              Upload up to 5 images to help illustrate the issue. Supported formats: JPG, PNG, GIF, WebP
            </p>
            {selectedImages.length > 0 && (
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-blue-600">
                  {selectedImages.length} image(s) selected
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedImages([])}
                  className="text-sm text-red-600 hover:text-red-800 underline"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {selectedImages.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Selected Images:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative border border-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover"
                      onError={(e) => {
                        console.error(`Error loading image ${index}:`, e);
                        setError(`Failed to load image: ${image.name}`);
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                      {image.name}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 z-10"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Issue'}
          </button>
        </div>
      </form>
    </div>
  );
}
